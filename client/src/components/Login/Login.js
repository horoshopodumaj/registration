import React, { useState } from "react";
import style from "./Login.module.scss";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    return (
        <div>
            <input
                onChange={(event) => setEmail(event.target.value)}
                value={email}
                type="text"
                placeholder="Email"
            />
            <input
                onChange={(event) => setPassword(event.target.value)}
                value={password}
                type="password"
                placeholder="Password"
            />
            <button>Login</button>
            <button>Registration</button>
        </div>
    );
};

export default Login;
