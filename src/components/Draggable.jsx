import React from 'react';
import {useDraggable} from '@dnd-kit/core';
import {CSS} from '@dnd-kit/utilities';
import PropTypes from 'prop-types'; // Importa PropTypes

export function Draggable(props){
    const {attributes, listeners, setNodeRef, transform} = useDraggable({
        id: props.id,
    });
    const style = {
        transform: CSS.Translate.toString(transform),
    };

    return (
        <button    ref={setNodeRef}
                   style={style}
                   {...listeners}
                   {...attributes}
                   className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow">
            {props.children}
        </button>
    );
}


// Define prop validations
Draggable.propTypes = {
    id: PropTypes.string.isRequired,
    children: PropTypes.node,
};


