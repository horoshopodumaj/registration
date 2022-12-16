import React, { useContext, useState } from "react";
import { Context } from "../..";
import style from "./Content.module.scss";

const Content = () => {
    const { store } = useContext(Context);
    const [users, setUsers] = useState([]);

    const onClick = async () => {
        const response = await store.getUsers();
        setUsers(response);
    };

    return (
        <>
            <h1 className={style.welcome}>
                {store.isAuth ? `Congratulations, you are logged in to your account!` : "LOG IN"}
            </h1>

            {store.user.isActivated ? (
                <>
                    <h2 className={style.confirm}>The account is confirmed by mail</h2>
                    <button className={style.button} onClick={onClick}>
                        Get all users
                    </button>
                    {users.map((user) => (
                        <div key={user.email} className={style.email}>
                            {user.email}
                        </div>
                    ))}
                </>
            ) : (
                <h2>Check your email and verify your account to get a list of users.</h2>
            )}
        </>
    );
};

export default Content;
