import React from "react";

/**
 * Text Input control
 * @param {Object} props id, colSize, placeholder, label, type ("text" by default)
 */
export default function Input(props) {
    return (
        <div className={"input-field col " + props.colSize}>
            <input 
                id={props.id} 
                className="validate" 
                placeholder={props.placeholder} 
                type={!props.type ? "text" : props.type} 
            />
            <label for={props.id}>{props.label}</label>
        </div>
    );
  }