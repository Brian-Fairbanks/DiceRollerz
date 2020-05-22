import React from "react";

export default function Textarea (propz) {
    const { id, colSize, text, label } = propz;
    return (
        <div class={"input-field col " + colSize}>
          <textarea id={id} class="materialize-textarea">{text}</textarea>
          <label for={id}>{label}</label>
        </div>
    )
}