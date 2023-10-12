import PropTypes from 'prop-types'; // Importa PropTypes
import React from 'react';
import {useDroppable} from '@dnd-kit/core';

export function Droppable(props) {
    const {isOver, setNodeRef} = useDroppable({
        id: props.id,
    });
    const style = {
        opacity: isOver ? 1 : 0.5,
    };

    return (
        <div ref={setNodeRef} style={style}>
            {props.children}
        </div>
    );
}


// Define prop validations
Droppable.propTypes = {
    id: PropTypes.string.isRequired,
    children: PropTypes.node,
};