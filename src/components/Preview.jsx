import React, {useEffect, useState} from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Chip} from "@nextui-org/react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import "katex/dist/katex.min.css"
import rehypeKatex from "rehype-katex";
import FileViewer from 'react-file-viewer-extended'

export default function Preview(props) {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [title, setTitle] = useState(props.title);
    const [materia, setMateria] = useState(props.materia)
    const [content, setContent] = useState(props.content)
    const [type, setType] = useState("pdf");
    const url = "https://materiales-javeplatform.s3.amazonaws.com/"

    useEffect(() => {
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
                            <ModalHeader className="flex gap-1 text-2xl">
                                {props.prev ? props.title : title}
                                <Chip color="success">{materia}</Chip>
                            </ModalHeader>
                            <ModalBody className="leading-8">
                                <ReactMarkdown
                                    children={props.prev ? props.content : content}
                                    remarkPlugins={[remarkMath]}
                                    rehypePlugins={[rehypeKatex]}
                                />
                                {!props.prev ? (
                                    <div className="w-full h-unit-7xl">
                                        <FileViewer
                                            filePath={props.file}
                                            fileType={type}
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
