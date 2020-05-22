import React from "react";

/**
 * Text Input control
 * @param {Object} propz id, colSize, placeholder, label, type ("text" by default)
 */
export default function Input(propz) {
    const { id, colSize, placeholder, label, type } = propz
    return (
        <div className={"input-field col " + colSize}>
            <input 
                id={id} 
                className="validate" 
                placeholder={placeholder} 
                type={!type ? "text" : type} 
            />
            <label for={id}>{label}</label>
        </div>
    );
  }