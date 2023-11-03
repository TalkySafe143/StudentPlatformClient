import React from 'react';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import PropTypes from 'prop-types'; // Importa PropTypes

export function Draggable(props){
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({ id: props.id });
    const style = {
        transform: CSS.Translate.toString(transform),
        transition,
        margin: "20px",
        width: "250px",
        height: "100px",
        background: "white",
        borderRadius: "10px",
        color: "black",
        boxShadow: "inset 0 -3em 3em rgba(0,0,0,0.1), 0 0  0 2px rgb(190, 190, 190), 0.3em 0.3em 1em rgba(0,0,0,0.3)"
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


