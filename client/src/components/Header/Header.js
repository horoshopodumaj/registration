import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../..";
import style from "./Header.module.scss";

const Header = () => {
    const { store } = useContext(Context);
    return (
        <header className={style.header}>
            <div className={style.logo}>
                <Link to="/">LOGO</Link>
            </div>
            {store.isAuth ? (
                <ul className={style.list}>
                    <li className={style.email}>{store.user.email}</li>
                    <li>
                        <Link to="/" className={style.link} onClick={() => store.logout()}>
                            Logout
                        </Link>
                    </li>
                </ul>
            ) : (
                <ul>
                    <li>
                        <Link to="/" className={style.link}>
                            Login
                        </Link>
                    </li>
                </ul>
            )}
        </header>
    );
};

export default Header;
