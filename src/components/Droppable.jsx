import PropTypes from 'prop-types'; // Importa PropTypes
import React from 'react';
import {useDroppable} from '@dnd-kit/core';
import {
    SortableContext,
    verticalListSortingStrategy
} from '@dnd-kit/sortable'
import {Draggable} from "./Draggable.jsx";

export function Droppable(props) {
    const {isOver, setNodeRef} = useDroppable({
        id: props.id,
    });
    const style = {
        opacity: isOver ? 1 : 0.5,
        border: "1px solid gray",
        width: "500px",
        minHeight: "700px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "5%"
    };

    return (
        <SortableContext items={props.items} id={props.id} strategy={verticalListSortingStrategy}>
            <div ref={setNodeRef} style={style}>
                {props.items.map(item => (
                    <Draggable key={item.id+"s"} id={item.id}> {item.name}</Draggable>
                )) }
            </div>
        </SortableContext>
    );
}


// Define prop validations
Droppable.propTypes = {
    id: PropTypes.string.isRequired,
    children: PropTypes.node,
};

