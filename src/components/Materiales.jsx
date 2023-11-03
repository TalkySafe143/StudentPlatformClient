import {Button, Card, CardBody, Chip, Popover, PopoverTrigger, PopoverContent} from "@nextui-org/react";
import {AnimatePresence, motion} from "framer-motion";
import PublicarMaterial from "./PublicarMaterial.jsx";
import {useEffect, useState} from "react";
import Preview from "./Preview.jsx";
import Navegacion from "./Navegacion.jsx";
import {useNavigate} from "react-router-dom";
export default function Materiales() {
    const navigate =useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('jwt')) {
            navigate("/login")
        }
    }, []);

    const [materiales, setMateriales] = useState([])
    const [confirm, setConfirm] = useState("");

    const onDelete = e => {

        fetch(`${import.meta.env.VITE_API_URL}/api/material/`+e, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            }
        })
            .then(res => res.json())
            .then(data => setConfirm("eliminado"))
            .catch(err => setConfirm("error"))

    }

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/api/material?estudiante_cc=${localStorage.getItem("user")}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            }
        })
            .then(json => json.json())
            .then(data => {
                const elements = [];
                data.data.forEach(material => {
                    elements.push(
                        <Card className="m-auto w-3/6" key={material.material_id}>
                            <CardBody className="flex-row justify-center items-center gap-x-5">
                                <h1 className="m-auto text-2xl font-serif">{material.title}</h1>
                                <Preview content={material.material_id} title={
                                    <div className="flex gap-2" id={"tituloPreview"}>
                                        {material.title}
                                    </div>
                                } file={material.link} materia={material.materia_materia_id} prev={false}
                                />
                                <Popover>
                                    <PopoverTrigger>
                                        <Button id={"selectEliminar"} color="danger">Eliminar</Button>
                                    </PopoverTrigger>
                                    <PopoverContent>
                                        <div className="flex-col items-center justify-center">
                                            <h1 className="m-3">¿Estas seguro?
                                                {confirm === "" ? "" : <Chip color="primary">{confirm}</Chip>}
                                            </h1>
                                            <Button id={"eliminarMaterial"} onClick={() => onDelete(material.material_id)} color="danger" className="m-3 ml-4 p-1" key={material.material_id}>Si</Button>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </CardBody>
                        </Card>
                    )
                })

                if (elements.length === 0) {
                    elements.push(<div className={"flex items-center justify-center"}>
                        <Chip color={"primary"} id={"publicaAlgo"}>Comienza a publicar tus materiales</Chip>
                    </div>)
                }
                setMateriales(elements)
            })
    }, []);

    return (
        <>
        <Navegacion />
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ ease: "easeOut", duration: 0.5 }}
                className="flex-col justify-center items-center m-10"
            >
                <div className="flex justify-center items-center m-10">
                    <h1 className="text-3xl mr-10">Materiales</h1>
                    <PublicarMaterial />
                </div>
                {materiales}

            </motion.div>
        </AnimatePresence>
        </>
    )
}