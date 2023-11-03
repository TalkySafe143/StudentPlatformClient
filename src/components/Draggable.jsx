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
        width: "250px",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid black",
        margin: "10px 0",
        background: "white",
        color: "black"
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


