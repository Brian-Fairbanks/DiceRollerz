import React from "react";

/**
 * Text Input control
 * @param {Object} propz id, colSize, placeholder, label, type ("text" by default), inputClass ("validate" by default)
 */
export default function Input(propz) {
    const { id, colSize, placeholder, label, type, inputClass } = propz
    return (
        <div className={"input-field col " + colSize}>
            <input 
                id={id} 
                className={!inputClass ? "validate" : inputClass}
                placeholder={placeholder} 
                type={!type ? "text" : type} 
            />
            <label for={id}>{label}</label>
        </div>
    );
}

/**
 * Text Input control
 * @param {Object} propz id, colSize, placeholder, icon, label, type ("text" by default), inputClass ("validate" by default)
 */
export default function InputWIcon(propz) {
    const { id, colSize, placeholder, label, type, inputClass, icon } = propz
    return (
        <div className={"input-field col " + colSize}>
            <i class="material-icons prefix">{icon}</i>
            <input 
                id={id} 
                className={!inputClass ? "validate" : inputClass}
                placeholder={placeholder} 
                type={!type ? "text" : type} 
            />
            <label for={id}>{label}</label>
        </div>
    );
}
