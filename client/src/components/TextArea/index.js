import React from "react";

/**
 * Textarea component
 * @param {Object} propz id, colSize, label, text, wrapperClass
 */
export function Textarea (propz) {
    const { id, colSize, text, label , wrapperClass } = propz;
    return (
        <div className={"input-field col " + (!colSize ? "s12" : colSize) + (wrapperClass ? " " + wrapperClass : "")}>
          <textarea id={id} className="materialize-textarea">{text}</textarea>
          <label htmlFor={id}>{label}</label>
        </div>
    )
}

/**
 * Textarea component with icon prefix
 * @param {Object} propz id, colSize, icon, label, text, wrapperClass
 */
export function TextareaWIcon (propz) {
    const {id, colSize, text, label, icon, wrapperClass } = propz;
    return (
        <div className={"input-field col " + (!colSize ? "s12" : colSize) + (wrapperClass ? " " + wrapperClass : "")}>
          <i className="material-icons prefix">{icon}</i>
          <textarea id={id} className="materialize-textarea">{text}</textarea>
          <label htmlFor={id}>{label}</label>
        </div>
    )
}