import React from "react";
import Header from "../Header";
import style from "./Spinner.module.scss";

export default function Spinner() {
    return (
        <>
            <div className={style.container}>
                <div className={style.spinner}></div>
            </div>
        </>
    );
}
