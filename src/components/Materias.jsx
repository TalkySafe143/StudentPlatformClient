import React, {useEffect, useState} from 'react';
import {DndContext} from '@dnd-kit/core';
import {Draggable} from './Draggable';
import {Droppable} from './Droppable';
import {AnimatePresence, motion} from "framer-motion";
import Navegacion from "./Navegacion.jsx";
import {useNavigate} from "react-router-dom";
import {Chip} from "@nextui-org/react";

export default function Materias() {

    const navigate =useNavigate();
    const [droppedElements, setDroppedElements] = useState([]);
    const [parent, setParent] = useState(null);
    const [draggables, setDragables] = useState([]);
    useEffect(() => {
        if (!localStorage.getItem('jwt')) {
            navigate("/login")
        }

        fetch(`${import.meta.env.VITE_API_URL}/api/materias`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            }
        }).then(res => res.json())
            .then(json => {
                const drag = [];

                json.data.forEach(materia => {
                    drag.push(<>
                        <Draggable key={materia.materia_id} id={materia.materia_id}>{materia.name}</Draggable>
                    </>)
                })
                if (drag.length === 0) drag.push(<><Chip id={"chipMateria"} color={"primary"}>
                    No existen materias en el sistema, lo sentimos.
                </Chip></>)
                setDragables(drag);
            })
    }, []);
    /*const draggables = [
        <Draggable key="draggable1" id="draggable1">Materia 1</Draggable>,
        <Draggable key="draggable2" id="draggable2">Materia 2</Draggable>,
        <Draggable key="draggable3" id="draggable3">Materia 3</Draggable>,
        <Draggable key="draggable4" id="draggable4">Materia 4</Draggable>,
        <Draggable key="draggable5" id="draggable5">Materia 5</Draggable>
    ];*/

    return (
        <>
        <Navegacion />
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ ease: "easeOut", duration: 0.5 }}
            >
        <DndContext onDragEnd={handleDragEnd}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }} className="mb-2 mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">

                <div className="flex flex-col gap-3 m-auto">
                    <Droppable id="droppable" validIds={['draggable1', 'draggable2', 'draggable3', 'draggable4', 'draggable5']} >
                        {parent ? `Dropped on ${parent}` : 'Drop here'}
                        {droppedElements.map((element, index) => {
                            <div key = {index}>{element.draggableId}</div>
                        })} 
                    </Droppable>
                </div>

                <div className="flex flex-col gap-3 m-auto">
                        {draggables}
                </div>
            </div>
        </DndContext>
            </motion.div></AnimatePresence>
        </>
    );

    function handleDragEnd({ over, active }) {
        if (over) {
            const elementDropped = {
                containerId: over.id,
                draggableId: active.id
            };

            setDroppedElements([...droppedElements, elementDropped]);

            console.log('Dropped Elements:', elementDropped);
        }
    }
}
