import React, { useContext, useEffect, useState } from "react";
import style from "./Login.module.scss";
import { Context } from "../../index";
import { observer } from "mobx-react-lite";
import Toast from "../Toact/Toast";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [type, setType] = useState(true);
    const [showEmailError, setShowEmailError] = useState(false);
    const [showPasswordError, setShowPasswordError] = useState(false);
    const [emailDirty, setEmailDirty] = useState(false);
    const [passwordDirty, setPasswordlDirty] = useState(false);
    const [formValid, setFormValid] = useState(false);
    const [emailError, setEmailError] = useState("Email cannot be empty");
    const [passwordError, setPasswordError] = useState("Password cannot be empty");
    const { store } = useContext(Context);

    useEffect(() => {
        if (emailError || passwordError) {
            setFormValid(false);
        } else {
            setFormValid(true);
        }
    }, [emailError, passwordError]);

    const registration = (email, password) => {
        store.registration(email, password);
    };
    const login = (email, password) => {
        store.login(email, password);
    };

    const blurHandler = (event) => {
        switch (event.target.name) {
            case "email":
                setEmailDirty(true);
                if (emailDirty && emailError) {
                    setShowEmailError(true);
                }

                break;
            case "password":
                setPasswordlDirty(true);
                if (passwordDirty && passwordError) {
                    setShowPasswordError(true);
                }

                break;
        }
    };

    const emailHandler = (event) => {
        setEmail(event.target.value);

        const re =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(String(event.target.value).toLowerCase())) {
            setEmailError("Incorrect email");
            setShowEmailError(true);
            if (!event.target.value) {
                setEmailError("Email cannot be empty");
                setShowEmailError(true);
            }
        } else {
            setEmailError("");
            setShowEmailError(false);
        }
    };

    const passwordHandler = (event) => {
        setPassword(event.target.value);
        if (event.target.value.length < 3 || event.target.value.length > 16) {
            setPasswordError("Password from 3 to 16 characters");
            setShowPasswordError(true);
            if (!event.target.value) {
                setPasswordError("Password cannot be empty");
                setShowPasswordError(true);
            }
        } else {
            setPasswordError("");
            setShowPasswordError(false);
        }
    };
    return (
        <>
            <div className={style.error}>{store.userMessage}</div>
            <div className={style.container}>
                <Toast message={passwordError} show={showPasswordError} top={"70px"} />
                <Toast message={emailError} show={showEmailError} top={"120px"} />
                <form className={style.loginForm}>
                    <label htmlFor="email" className={style.label}>
                        Email
                    </label>
                    <input
                        onChange={(event) => emailHandler(event)}
                        onBlur={(e) => blurHandler(e)}
                        value={email}
                        type="email"
                        id="email"
                        placeholder="Email"
                        name="email"
                        className={style.input}
                    />
                    <label htmlFor="password" className={style.label}>
                        Password
                    </label>
                    <input
                        onChange={(event) => passwordHandler(event)}
                        onBlur={(e) => blurHandler(e)}
                        value={password}
                        type={type ? "password" : "text"}
                        placeholder="Password"
                        id="password"
                        name="password"
                        className={style.input}
                    />
                    <div className={style.checkboxContainer}>
                        <input
                            type="checkbox"
                            id="pass"
                            className={style.checkbox}
                            onClick={() => setType(!type)}
                        />
                        <label htmlFor="pass">Show password</label>
                    </div>
                    <div className={style.buttons}>
                        <button
                            className={style.button}
                            disabled={store.isDisabled || !formValid ? "disabled" : ""}
                            onClick={() => login(email, password)}>
                            Login
                        </button>
                        <button
                            className={style.button}
                            disabled={store.isDisabled || !formValid ? "disabled" : ""}
                            onClick={() => registration(email, password)}>
                            Registration
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default observer(Login);
