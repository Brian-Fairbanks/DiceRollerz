import React from "react";

/**
 * Textarea component
 * @param {Object} propz id, colSize, label, text
 */
export function Textarea (propz) {
    const { id, colSize, text, label } = propz;
    return (
        <div className={"input-field col " + colSize}>
          <textarea id={id} className="materialize-textarea">{text}</textarea>
          <label htmlFor={id}>{label}</label>
        </div>
    )
}

/**
 * Textarea component with icon prefix
 * @param {Object} propz id, colSize, icon, label, text
 */
export function TextareaWIcon (propz) {
    const {id, colSize, text, label, icon } = propz;
    return (
        <div className={"input-field col " + colSize}>
          <i className="material-icons prefix">{icon}</i>
          <textarea id={id} className="materialize-textarea">{text}</textarea>
          <label htmlFor={id}>{label}</label>
        </div>
    )
}