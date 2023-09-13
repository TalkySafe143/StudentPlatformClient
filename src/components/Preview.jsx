import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Chip} from "@nextui-org/react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import "katex/dist/katex.min.css"
import rehypeKatex from "rehype-katex";
export default function Preview(props) {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    return (
        <>
            <Button onPress={onOpen}>Preview</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex gap-1 text-2xl">
                                {props.title}
                                <Chip color="success">{props.materia}</Chip>
                            </ModalHeader>
                            <ModalBody className="leading-8">
                                <ReactMarkdown
                                    children={props.content}
                                    remarkPlugins={[remarkMath]}
                                    rehypePlugins={[rehypeKatex]}
                                />
                                {props.file.startsWith("https") ? props.file : <h1 style={{ color: "red" }}>Lo sentimos, tu archivo no esta disponible en la preview</h1>}
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
