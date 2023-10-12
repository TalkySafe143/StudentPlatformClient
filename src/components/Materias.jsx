import React, {useState} from 'react';
import {DndContext} from '@dnd-kit/core';
import {Draggable} from './Draggable';
import {Droppable} from './Droppable';

export default function Materias() {
    const [parent1, setParent1] = useState(null);
    const [parent2, setParent2] = useState(null);
    const [parent3, setParent3] = useState(null);
    const [parent4, setParent4] = useState(null);
    const [parent5, setParent5] = useState(null);


    const draggable1 = (
        <Draggable id="draggable1">
            Materia1.
        </Draggable>
    );

    const draggable2 = (
        <Draggable id="draggable2">
            Materia2.
        </Draggable>
    );

    const draggable3 = (
        <Draggable id="draggable3">
            Materia3.
        </Draggable>
    );

    const draggable4 = (
        <Draggable id="draggable4">
            Materia4.
        </Draggable>
    );

    const draggable5 = (
        <Draggable id="draggable5">
            Materia5.
        </Draggable>
    );

    return (
        <DndContext onDragEnd={handleDragEnd}>
            <div style={{ display: 'flex' }}>

                <div style={{ flex: 1, textAlign: 'center' }} className="mb-2 mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    <Droppable id="droppable">
                        {parent1 === "droppable" ? draggable1 : 'Drop here'}
                    </Droppable>
                </div>

                <div style={{ flex: 1, textAlign: 'center' }} className="mb-2 mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    <div className="mb-2 mt-5">{!parent1 ? draggable1 : null}</div>
                    <div className="mb-2 mt-5">{!parent2 ? draggable2 : null}</div>
                    <div className="mb-2 mt-5">{!parent3 ? draggable3 : null}</div>
                    <div className="mb-2 mt-5">{!parent4 ? draggable4 : null}</div>
                    <div className="mb-2 mt-5">{!parent5 ? draggable5 : null}</div>
                </div>

            </div>
        </DndContext>
    );

    function handleDragEnd({over}) {
        setParent1(over ? over.id : null);
        setParent2(over ? over.id : null);
        setParent3(over ? over.id : null);
        setParent4(over ? over.id : null);
        setParent5(over ? over.id : null);
    }
}
