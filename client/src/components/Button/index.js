import React from "react";

/**
 * Button control
 * @param {Object} param0 id, buttonClass, text, onClick
 */
export function Button({ id, buttonClass, text, onClick }) {
    return (
        <a id={id} className={"waves-effect waves-light btn" + (buttonClass ? " " + buttonClass : "")} onClick={onClick}>{text}</a>
    );
}

/**
 * Floating Button Control
 * @param {Object} param0 id, color, buttonClass, iconName, onClick
 */
export function FloatingButton({ id, color, buttonClass, iconName, onClick }) {
    return (
        <a id={id} className={"btn-floating btn-large waves-effect waves-light " + (color ? color : "red") + (buttonClass ? " " + buttonClass : "")} onClick={onClick}><i class="material-icons">{(iconName ? iconName : "add")}</i></a>
    )
}

/**
 * Submit Button control
 * @param {Object} param0 id, type = "submit", name = "action", text, icon = "send", onClick
 */
export function SubmitButton({ id, type, name, text, icon, onClick }) {
    return (
        <button id={id} className="btn waves-effect waves-light" type={(type ? type : "submit")} name={name ? name : "action"} onClick={onClick}>{text}
            <i className="material-icons right">{(icon ? icon : "send")}</i>
        </button>
    )
}