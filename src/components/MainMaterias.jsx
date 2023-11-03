import { AiOutlinePlus } from 'react-icons/ai'
import { 
    Button,
    Card,
    CardHeader,
    CardBody,
    Image,
    CardFooter,
    Chip
} from '@nextui-org/react'
import { useNavigate } from 'react-router-dom'
import Navegacion from './Navegacion';
import { useState } from 'react';
import { useEffect } from 'react';
import ShowMateria from './ShowMateria';

export default function MainMaterias() {

    const navigate = useNavigate();
    const [cartasMaterias, setCartas] = useState([]);

    useEffect(() => {

        if (!localStorage.getItem('jwt')) {
            navigate("/login")
        }

        fetch(`${import.meta.env.VITE_API_URL}/api/materiaXestudiante/`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            }
        }).then(res => res.json())
        .then(json => {
            const materiasIds = [];
            json.data.forEach(assoc => {
                if (assoc.estudiante_cc === localStorage.getItem('user')) materiasIds.push(assoc.materia_materia_id);
            })


            fetch(`${import.meta.env.VITE_API_URL}/api/materias/`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                }
            }).then(res2 => res2.json())
                .then(json2 => {

                    
                    let cardsUserMaterias = json2.data.filter(mat => materiasIds.find(uid => uid === mat.materia_id) != undefined);

                    cardsUserMaterias = cardsUserMaterias.map(materia => (
                        <Card className='m-auto my-6' isFooterBlurred>
                            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                                <p className="text-tiny uppercase font-bold">{materia.dept}</p>
                            <small className="text-default-500">Pontifica Universidad Javeriana</small>
                            <h4 className="font-bold text-large">{materia.name}</h4>
                            </CardHeader>
                            <CardBody className="overflow-visible py-2">
                            <Image
                                alt="Card background"
                                className="object-cover rounded-xl"
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Javeriana.svg/1200px-Javeriana.svg.png"
                                width={200}
                            />
                            </CardBody>
                            <CardFooter className="justify-between bg-black/70 overflow-hidden py-1  before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10 m-1">
                            <p className="text-tiny text-white/80">Ver materiales asociados</p>
                            <ShowMateria materia={materia}/>
                        </CardFooter>
                        </Card>
                    ));

                    if (cardsUserMaterias.length === 0) {
                        cardsUserMaterias.push(
                            <>
                                <Chip id={"noMateriasVinculadas"} color='primary'>No tienes materias, agrega una</Chip>
                            </>
                        )
                    }

                    setCartas(cardsUserMaterias);
                })
        })
    }, [])

     const onGestionar = () => {
        navigate('/materias/gestionar');
     }
     const person = {}

    return (
        <>
        <Navegacion />
        <div className="flex flex-col">
        <div className='flex flex-row justify-center align-center m-10'>
        <h1 className='font-sans text-center text-4xl mx-6 italic'>Materias</h1>
         <Button onPress={onGestionar} color='success' endContent={<AiOutlinePlus style={{ scale: "140%" }}/>}>
            Gestionar materias
          </Button>
        </div>
          <div className='flex flex-row flex-wrap justify-center align-center'>
           {cartasMaterias}
          </div>
          </div>
        </>
    )
}