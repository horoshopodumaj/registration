import React, { useContext, useState } from "react";
import style from "./Login.module.scss";
import { Context } from "../../index";
import { observer } from "mobx-react-lite";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { store } = useContext(Context);
    return (
        <div className={style.container}>
            <div className={style.loginForm}>
                <input
                    onChange={(event) => setEmail(event.target.value)}
                    value={email}
                    type="text"
                    placeholder="Email"
                    className={style.input}
                />
                <input
                    onChange={(event) => setPassword(event.target.value)}
                    value={password}
                    type="password"
                    placeholder="Password"
                    className={style.input}
                />
                <div className={style.buttons}>
                    <button className={style.button} onClick={() => store.login(email, password)}>
                        Login
                    </button>
                    <button
                        className={style.button}
                        onClick={() => store.registration(email, password)}>
                        Registration
                    </button>
                </div>
            </div>
        </div>
    );
};

export default observer(Login);