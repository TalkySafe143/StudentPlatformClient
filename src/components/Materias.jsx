import React, {useEffect, useState} from 'react';
import {DndContext} from '@dnd-kit/core';
import {Draggable} from './Draggable';
import {Droppable} from './Droppable';
import {AnimatePresence, motion} from "framer-motion";
import Navegacion from "./Navegacion.jsx";
import {useNavigate} from "react-router-dom";

export default function Materias() {

    const navigate =useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('jwt')) {
            navigate("/login")
        }
    }, []);

    const [droppedElements, setDroppedElements] = useState([]);
    const [parent, setParent] = useState(null);
    const draggables = [
        <Draggable key="draggable1" id="draggable1">Draggable 1</Draggable>,
        <Draggable key="draggable2" id="draggable2">Draggable 2</Draggable>,
        <Draggable key="draggable3" id="draggable3">Draggable 3</Draggable>,
        <Draggable key="draggable4" id="draggable4">Draggable 4</Draggable>,
        <Draggable key="draggable5" id="draggable5">Draggable 5</Draggable>
    ];

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
                draggableId: active.id,
                // Otros datos que quieras almacenar
            };

            setDroppedElements([...droppedElements, elementDropped]);

            console.log('Dropped Elements:', elementDropped);
        }
    }
}
