import {
    Button,
    Modal, 
    ModalContent, 
    ModalHeader, 
    ModalBody, 
    ModalFooter,
    useDisclosure,
    Chip,
    Card,
    CardBody
} from '@nextui-org/react'
import { AcmeLogo } from '../assets/AcmeLogo';
import { useState, useEffect } from 'react';
import Preview from './Preview';

export default function ShowMateria(props) {

    const {materia} = props;

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [materiales, setMateriales] = useState([]);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/api/material`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            }
        })
            .then(json => json.json())
            .then(data => {
                const elements = [];

                

            
                data.data.forEach(material => {

                    if (material.materia_materia_id === materia.materia_id) {
                        elements.push(
                            <Card className="m-auto" key={material.material_id}>
                                <CardBody className="flex-row justify-center items-center gap-x-5">
                                    <h1 className="m-auto text-2xl font-serif">{material.title}</h1>
                                    <Preview content={material.material_id} title={
                                        <div className="flex gap-2" id={"tituloPreview"}>
                                            {material.title}
                                        </div>
                                    } file={material.link} materia={material.materia_materia_id} prev={false}
                                    author={true}
                                    />
                                </CardBody>
                            </Card>
                        )
                    }
                })
                

                if (elements.length === 0) {
                    elements.push(<div className={"flex items-center justify-center"}>
                        <Chip color={"primary"} id={"noHayMateriaMaterial"}>No hay materiales para esta materia</Chip>
                    </div>)
                }
                setMateriales(elements)
            })
    }, []);


    return (
        <>
            <Button className="text-tiny text-white bg-white text-black" id={"showMateria"}  color="black" radius="lg" size="sm" onPress={onOpen} >
                Ingresar
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop='blur' size="5xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-row gap-6">
                <AcmeLogo />
                <h4 className="font-bold text-large">{materia.name}</h4>
                <Chip  color='success'>{materia.dept}</Chip>
                <Chip  color='default'>Pontificia Universidad Javeriana</Chip>
              </ModalHeader>
              <ModalBody>
                <div className='flex flex-col items-center justify-center gap-6'>
                    <h1 className='font-bold text-xl'>Materiales asociados a la materia</h1>
                    <p className='font-serif'>Aqui podras encontrar los materiales asociados a la materia de {materia.name}</p>
                    {materiales}
                </div>
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