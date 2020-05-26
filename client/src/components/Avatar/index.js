import React from "react";

export function Avatar (propz) {
    return (
        <ul className="collection">
            {propz.children}
        </ul>
    );
}

/**
 * Avatar component with circular picture
 * @param {Object} param0 imagePath, imageHeight, altText, title, text, hRef, colSize, wrapperClass, key
 */
export function AvatarWPic({ imagePath, imageHeight, altText, title, text, hRef, colSize, wrapperClass, key }) {
    return (
        <li className={"collection-item avatar col " + (colSize ? colSize : "s12") + (wrapperClass ? " " + wrapperClass : "")} key={key}>
            <img src={imagePath} alt={altText} height={imageHeight} className="circle" />
            <span className="title">{title}</span>
            <div>{(!Array.isArray(text) ? <p>{text}</p> : text.map(line => <p>{line}</p>))}</div>
            <a href={hRef} className="secondary-content"><i className="material-icons">grade</i></a>
        </li>
    );
}
