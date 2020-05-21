import React from "react";

export function Avatar (props) {
    return (
        <ul className="collection">
            {props.children}
        </ul>
    );
}

export function AvatarWPic(props) {
    const {imagePath, imageHeight, altText, title, text, hRef, key} = props

    return (
        <li className="collection-item avatar" key={key}>
            <img src={imagePath} alt={altText} height={imageHeight} className="circle" />
            <span className="title">{title}</span>
            <p>{(!Array.isArray(text) ? text : text.map(line => <p>{line}</p>))}</p>
            <a href={hRef} className="secondary-content"><i className="material-icons">grade</i></a>
        </li>
    );
}
