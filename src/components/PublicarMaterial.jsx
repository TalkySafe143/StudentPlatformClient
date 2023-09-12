import {
    Button, ButtonGroup, cn, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Progress, Textarea,
    useDisclosure
} from "@nextui-org/react";
import { AiOutlinePlus } from 'react-icons/ai'
import {useEffect, useRef, useState} from "react";
import ReactMarkdown from "react-markdown";
import {AddNoteIcon} from "../assets/AddNoteIcon.jsx";
import {DeleteDocumentIcon} from "../assets/DeleteDocumentIcon.jsx";
import Preview from "./Preview.jsx";
export default function PublicarMaterial() {

    const inputFile = useRef(null);
    const [file, setFile] = useState("");
    const [title, setTitle] = useState("");
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [enabled, setEnabled] = useState(false)
    const [posted, setPosted] = useState(false);
    const [error, setError] = useState(false);
    const [description, setDescription] = useState("");
    const iconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0";
    const handleOpen = () => {
        onOpen();
    }

    const onPost = (e) => {
        //setPosted(true);
        //setError(true)
        setEnabled(true);
        //inputFile.current.files
        console.log(inputFile.current.files[0])

        var titulo = document.getElementById("idTitulo");
        var valorTitulo = titulo.value.trim();
        if(valorTitulo === ""){
            alert("Ingrese un titulo");
            setEnabled(false);
        }

        var descripcion = document.getElementById("idDescripcion");
        var valorDescripcion = descripcion.value.trim();
        if(valorDescripcion === ""){
            alert("Ingrese una descrpcion");
            setEnabled(false);
        }

    }

    const addFile = (e) => {
        setFile(e.target.value)
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
        <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1 text-2xl">¡Publica un material!</ModalHeader>
                        <ModalBody>
                            <Input type="text"
                                   label="Titulo del material"
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
                            <ButtonGroup>
                                <Preview content={description} title={title} file={file}/>
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
                            <Dropdown>
                                <DropdownTrigger>
                                    <Button
                                        variant="bordered"
                                    >
                                        Seleccione una materia
                                    </Button>
                                </DropdownTrigger>
                                <DropdownMenu aria-label="Static Actions">
                                    <DropdownItem key="new">Estructuras de datos</DropdownItem>
                                    <DropdownItem key="copy">Bases de datos</DropdownItem>
                                    <DropdownItem key="edit">Ingenieria de software</DropdownItem>
                                    <DropdownItem key="edit">Sistemas de informacion</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>

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
            </ModalContent>gi
        </Modal>
        </>
    )
}