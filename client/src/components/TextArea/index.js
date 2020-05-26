import React from "react";

/**
 * Textarea component
 * @param {Object} propz id, colSize, label, value, wrapperClass
 */
export function Textarea (propz) {
    const { id, colSize, value, label , wrapperClass } = propz;
    return (
        <div className={"input-field col " + (!colSize ? "s12" : colSize) + (wrapperClass ? " " + wrapperClass : "")}>
          <textarea id={id} className="materialize-textarea">{value}</textarea>
          <label htmlFor={id}>{label}</label>
        </div>
    )
}

/**
 * Textarea component with icon prefix
 * @param {Object} propz id, colSize, icon, label, value, wrapperClass
 */
export function TextareaWIcon (propz) {
    const {id, colSize, value, label, icon, wrapperClass } = propz;
    return (
        <div className={"input-field col " + (!colSize ? "s12" : colSize) + (wrapperClass ? " " + wrapperClass : "")}>
          <i className="material-icons prefix">{icon}</i>
          <textarea id={id} className="materialize-textarea">{value}</textarea>
          <label htmlFor={id}>{label}</label>
        </div>
    )
}