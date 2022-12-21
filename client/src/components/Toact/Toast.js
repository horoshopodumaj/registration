import React from "react";
import style from "./Toast.module.scss";

export default function Toast({ message, show, top }) {
    return (
        <div className={style.container + " " + `${show ? style.show : ""}`} style={{ top: top }}>
            {message}
        </div>
    );
}
