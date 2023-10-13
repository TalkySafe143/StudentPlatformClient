import React, {useState} from 'react';
import {DndContext} from '@dnd-kit/core';
import {Draggable} from './Draggable';
import {Droppable} from './Droppable';

export default function Materias() {

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
