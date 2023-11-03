import React, {useEffect, useState} from 'react';
import {
    DndContext,
    DragOverlay,
    closestCorners,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors
} from '@dnd-kit/core';
import {Droppable} from './Droppable';
import {AnimatePresence, motion} from "framer-motion";
import Navegacion from "./Navegacion.jsx";
import {useNavigate} from "react-router-dom";
import {Chip} from "@nextui-org/react";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable"
import {Draggable} from "./Draggable.jsx";

export default function Materias() {

    const navigate =useNavigate();
    const [draggables, setDragables] = useState([]);
    const [activeId, setActiveId] = useState();
    const [items, setItems] = useState({
        "system": [],
        "student": []
    })

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );


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
                    drag.push(
                        {
                            id: materia.materia_id,
                            name: materia.name
                        }
                    )
                })
                if (drag.length === 0) drag.push(<><Chip id={"chipMateria"} color={"primary"}>
                    No existen materias en el sistema, lo sentimos.
                </Chip></>)
                setDragables(drag);

                fetch(`${import.meta.env.VITE_API_URL}/api/materiaxestudiante`, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('jwt')
                    }
                }).then(res => res.json())
                    .then(json => {
                        const nuevoStudent = [];
                        json.data.forEach(rel => {
                            if (rel.estudiante_cc === localStorage.getItem("user")) {
                                nuevoStudent.push(drag.filter(item => item.id === rel.materia_materia_id)[0]);
                            }
                        })
                        nuevoStudent.forEach(materiaa => {
                            for (let i = 0; i < drag.length; i++) {
                                if (drag[i].id === materiaa.id) {
                                    drag.splice(i, 1);
                                    break;
                                }
                            }
                        })
                        setItems({
                            system: drag,
                            student: nuevoStudent
                        })
                    })
            });
    }, []);

    function findContainer(id) {
        if(items["system"].filter(item => item.id === id)[0]) return "system";
        else return "student"
    }

    function handleDragEnd({ over, active }) {
        if (over) {
            const fromId = findContainer(active.id)
            const toId = findContainer(over.id)

            const nuevoStudent = Array.from(items["student"])
            const nuevoSystem = Array.from(items["system"])

            // Aqui se van a asociar las materias o a desasociarlas
            let selected;
            for (let i = 0; i < (fromId === 'system' ? nuevoSystem.length : nuevoStudent.length); i++) {
                if ((fromId === 'system' ? nuevoSystem[i] : nuevoStudent[i]).id === active.id) {
                    selected = (fromId === 'system' ? nuevoSystem[i] : nuevoStudent[i]);
                    (fromId === 'system' ? nuevoSystem : nuevoStudent).splice(i, 1);
                    break;
                }
            }
            (fromId === 'student' ? nuevoSystem : nuevoStudent).push(selected);

            setItems({
                system: nuevoSystem,
                student: nuevoStudent
            })
        }
    }

    function handleDragStart(event) {
        setActiveId(event.active.id);
    }

    return (
        <>
        <Navegacion />
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ ease: "easeOut", duration: 0.5 }}
            >
        <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <div  id="materiasAsociadas" className="mb-2 mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 flex flex-row">
                <div id="estudiante" className="flex flex-col gap-3 m-auto">
                    <Droppable id={"student"} items={items["student"]} />
                </div>

                <div id="sistema" className="flex flex-col gap-3 m-auto">
                    <Droppable id={"system"} items={items["system"]} />
                </div>
            </div>
            <DragOverlay>{ activeId ? <Draggable key={activeId} id={activeId} >{
                (items["system"].filter(item => item.id === activeId)[0] ?
                    items["system"].filter(item => item.id === activeId)[0].name:
                        items["student"].filter(item => item.id === activeId)[0].name
                )
            }</Draggable> : null}</DragOverlay>
        </DndContext>
            </motion.div></AnimatePresence>
        </>
    );
}
