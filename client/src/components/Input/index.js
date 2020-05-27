import React from "react";

/**
 * Text Input control
 * @param {Object} propz id, colSize, placeholder, label, type ("text"), inputClass ("validate"), wrapperClass, value, onChange, isDisabled, isRequired
 */
export function Input(propz) {
    const { 
        id, 
        colSize, 
        placeholder, 
        label, 
        type, 
        inputClass, 
        wrapperClass, 
        value, 
        defaultValue, 
        onChange, 
        isDisabled, 
        isRequired 
    } = propz
    return (
        <div className={"input-field col " + (colSize ? colSize : "s12") + (wrapperClass ? " " + wrapperClass : "")}>
            <input 
                id={id} 
                className={!inputClass ? "validate" : inputClass}
                placeholder={placeholder} 
                type={!type ? "text" : type} 
                defaultValue={defaultValue}
                value={value}
                onChange={onChange}
                disabled={isDisabled}
                required={isRequired}
            />
            <label htmlFor={id}>{label}</label>
        </div>
    );
}

/**
 * Text Input control
 * @param {Object} propz id, colSize, placeholder, icon, label, type ("text"), inputClass ("validate"), wrapperClass, value, onChange, isDisabled, isRequired
 */
export function InputWIcon(propz) {
    const { 
        id, 
        colSize, 
        placeholder, 
        label, 
        type, 
        inputClass, 
        wrapperClass, 
        icon, 
        value, 
        defaultValue, 
        onChange, 
        isDisabled, 
        isRequired 
    } = propz
    return (
        <div className={"input-field col " + (colSize ? colSize : "s12") + (wrapperClass ? " " + wrapperClass : "")}>
            <i className="material-icons prefix">{icon}</i>
            <input 
                id={id} 
                className={!inputClass ? "validate" : inputClass}
                placeholder={placeholder} 
                type={!type ? "text" : type} 
                defaultValue={defaultValue}
                value={value}
                onChange={onChange}
                disabled={isDisabled}
                required={isRequired}
            />
            <label htmlFor={id}>{label}</label>
        </div>
    );
}
