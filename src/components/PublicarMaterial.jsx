import {
    Button, ButtonGroup, Chip, cn, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Progress, Textarea,
    Select,
    SelectItem,
    useDisclosure
} from "@nextui-org/react";
import { AiOutlinePlus } from 'react-icons/ai'
import {useContext, useEffect, useRef, useState} from "react";
import ReactMarkdown from "react-markdown";
import {AddNoteIcon} from "../assets/AddNoteIcon.jsx";
import {DeleteDocumentIcon} from "../assets/DeleteDocumentIcon.jsx";
import Preview from "./Preview.jsx";
import {AppContext} from "./UserContextWrapper.jsx";
export default function PublicarMaterial() {

    const { user, setUser } = useContext(AppContext)
    const inputFile = useRef(null);
    const [file, setFile] = useState("");
    const [title, setTitle] = useState("");
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [enabled, setEnabled] = useState(false)
    const [posted, setPosted] = useState(false);
    const [error, setError] = useState(false);
    const [description, setDescription] = useState("");
    const [materia, setMateria] = useState("1")
    const [invalid, setInvalid] = useState(false);
    const [materias, setMaterias] = useState([]);
    const iconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0";
    const handleOpen = () => {
        onOpen();
    }

    const onPost = (e) => {
        //setPosted(true);
        //setError(true)
        setEnabled(true);
        console.log(inputFile.current.files[0])

        if(title === "" || description === ""){
            setInvalid(true);
            setEnabled(false);
            return;
        }

        setInvalid(false)

        const form = new FormData();
        form.append('uploadedFiles', inputFile.current.files[0]);
        form.append('title', title);
        form.append('desc', description);
        form.append('materia_materia_id', materia);
        form.append('estudiante_cc', user);
        fetch(`${import.meta.env.VITE_API_URL}/api/material`, {
            method: "POST",
            body: form,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            }
        }).then(res => res.json()).then(data => {
            setPosted(true)
        }).catch(err => setError(true))
    }

    const addFile = (e) => {
        setFile(e.target.value)
    }

    // Pedirla de la base de datos
    useEffect(() => {
        const temp = [];
        fetch(`${import.meta.env.VITE_API_URL}/api/materias/`,{
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            }
        })
            .then(results => results.json())
            .then(json => {
                json.data.forEach(materia => {
                    temp.push(materia)
                })
            });
        setMaterias(temp);
    }, []);
    const onChangeMateria = e => {
        setMateria(e.target.value)
    }

    return (
        <>
        <Button
            color="success"
            onPress={() => handleOpen()}
            className="capitalize"
            endContent={<AiOutlinePlus style={{ scale: "140%" }}/>}
        >
            Publicar material
        </Button>
        <Modal backdrop="blur" isOpen={isOpen} onClose={() => {
            setFile("")
            onClose()
        }}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1 text-2xl">¡Publica un material!</ModalHeader>
                        <ModalBody>
                            {invalid ? <Chip color="danger">Rellene los campos obligatorios</Chip>: ""}
                            <Input type="text"
                                   label={"Titulo del material"}
                                   labelPlacement="outside"
                                   placeholder="Ingrese el titulo del material"
                                   value={title}
                                   onChange={e => setTitle(e.target.value)}
                                   isRequired
                                   id = "idTitulo"
                            />
                                <Textarea
                                    label="Descripcion (Markdown - Latex)"
                                    labelPlacement="outside"
                                    placeholder="Ingrese la descripcion o el cuerpo del material"
                                    value={description}
                                    onChange={e => setDescription(e.target.value)}
                                    isRequired
                                    id = "idDescripcion"
                                />
                            <input type="file" id="file" ref={inputFile} style={{ display: "none" }} onChange={addFile}
                                value={file}/>
                            <ButtonGroup className="mt-3">
                                <Preview content={description} title={
                                    <div className="flex gap-2">
                                        {title}
                                        <Chip color="primary">Preview</Chip>
                                    </div>
                                } file={file} materia={materia} prev={true}/>
                                <Dropdown>
                                    <DropdownTrigger>
                                        <Button>
                                            Agregar archivo
                                        </Button>
                                    </DropdownTrigger>
                                    <DropdownMenu variant="faded" aria-label="Dropdown menu with description">
                                        <DropdownItem
                                            key="new"
                                            description="Adjunta un nuevo archivo al material"
                                            startContent={<AddNoteIcon className={iconClasses} />}
                                            onPress={() => inputFile.current.click()}
                                        >
                                            Adjuntar archivo
                                        </DropdownItem>

                                        <DropdownItem
                                            key="delete"
                                            className="text-danger"
                                            color="danger"
                                            description="Elimina el archivo actual"
                                            startContent={<DeleteDocumentIcon className={cn(iconClasses, "text-danger")} />}
                                            onPress={() => setFile("")}
                                        >
                                            Eliminar archivo
                                        </DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                                <Button isDisabled > {file ? file.split(".")[1] : ""} </Button>
                            </ButtonGroup>

                            <Select
                                label="Materia relacionada al material"
                                placeholder="Seleccione una materia"
                                isRequired
                                onChange={onChangeMateria}
                                className="mt-5"
                            >
                                {materias.map(materiaa => (
                                    <SelectItem key={materiaa.materia_id} value={materiaa.name} textValue={materiaa.name}> {materiaa.name} </SelectItem>
                                ))}
                            </Select>

                            { enabled ? <Progress
                                isIndeterminate={!posted}
                                size="sm"
                                label={ !posted ? "Publicando..." :
                                    (posted && error) ? "¡Hubo un error en el servidor!" : "Publicado!"
                                    }
                                color={error ? "danger" :"success"}
                                value={100}
                            /> : ""}
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={() => {
                                setEnabled(false)
                                onClose()
                            }}>
                                Cerrar
                            </Button>
                            <Button color="success" onPress={onPost} isDisabled={enabled}>
                                Publicar
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
        </>
    )
}