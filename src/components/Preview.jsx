import React, {useEffect, useState} from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Chip} from "@nextui-org/react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import "katex/dist/katex.min.css"
import rehypeKatex from "rehype-katex";
import FileViewer from 'react-file-viewer-extended'
import { AcmeLogo } from "../assets/AcmeLogo";
import {AiOutlineUser} from 'react-icons/ai'

export default function Preview(props) {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [title, setTitle] = useState(props.title);
    const [materia, setMateria] = useState(props.materia)
    const [content, setContent] = useState(props.content)
    const [type, setType] = useState("pdf");
    const [author, setAuthor] = useState(<></>);
    const url = "https://materiales-javeplatform.s3.amazonaws.com/"

    useEffect(() => {

        if (props.author) {
            fetch(`${import.meta.env.VITE_API_URL}/api/material/`, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('jwt')
                }
            }).then(res => res.json())
                .then(json => {
                    const authorId = json.data.find(material => material.material_id === props.content).estudiante_cc;

                    fetch(`${import.meta.env.VITE_API_URL}/api/users/${authorId}`, {
                        headers: {
                            'Authorization': 'Bearer ' + localStorage.getItem('jwt')
                        }
                    }).then(response => response.json())
                        .then(user => {
                            setAuthor(
                                <>
                                    <Chip color="warning"> 
                                        <div className="flex flex-row gap-5">
                                            <div className="p-2">
                                                <AiOutlineUser />
                                            </div>
                                             <h1 className="font-bold text-sm m-auto">Autor: {user.data[0].name} - {user.data[0].career}</h1>
                                        </div>
                                    </Chip>
                                </>
                            )
                        })
                })
        }

        if (!props.prev) {
            fetch(`${url}${props.content}/${props.content}-desc.txt`)
                .then(file => file.text())
                .then(raw => setContent(raw))

            const fileExtensionS = props.file.split('.');
            const fileType = fileExtensionS[fileExtensionS.length-1]
            setType(fileType)
        }
        fetch(`${import.meta.env.VITE_API_URL}/api/materias/`+props.materia, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            }
        })
            .then(res => res.json())
            .then(data => setMateria(data.data[0].name))
    }, []);

    return (
        <>
            <Button color="primary" onPress={onOpen} id={"previewMaterial"}>Preview</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur" scrollBehavior="inside" size="5xl">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-row gap-6" id={"materialModal"}>
                                <AcmeLogo />
                                <h4 className="font-bold text-large">{props.prev ? props.title : title}</h4>
                                <Chip color="success" id={"chipMateria"}>{materia}</Chip>
                                {author}
                            </ModalHeader>
                            <ModalBody className="leading-8" id={"cuerpoModal"}>
                                <ReactMarkdown
                                    children={props.prev ? props.content : content}
                                    remarkPlugins={[remarkMath]}
                                    rehypePlugins={[rehypeKatex]}
                                />
                                {!props.prev ? (
                                    <div className="w-full h-unit-7xl" id={"filePreview"}>
                                        <FileViewer
                                            filePath={
                                                (props.file === `${url}${props.content}/${props.content}-desc.txt`) ? (
                                                'https://materiales-javeplatform.s3.amazonaws.com/noFile.png'
                                                ) : (props.file)
                                            }
                                            fileType={(props.file === `${url}${props.content}/${props.content}-desc.txt`) ? (
                                                'png'
                                            ) : (type)}
                                        />
                                    </div>
                                ) : <h1 style={{ color: "red" }}>Lo sentimos, tu archivo no esta disponible en la preview</h1>}
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Cerrar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
