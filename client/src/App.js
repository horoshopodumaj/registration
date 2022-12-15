import { useContext, useEffect } from "react";
import { Context } from "./index";
import Login from "./components/Login";
import { observer } from "mobx-react-lite";

export const URL = process.env.REACT_APP_SERVER_URL;

function App() {
    const { store } = useContext(Context);
    useEffect(() => {
        if (localStorage.getItem("token")) {
            store.checkAuth();
        }
    }, []);

    if (!store.isAuth) {
        return <Login />;
    }
    return (
        <div className="App">
            <h1>
                {store.isAuth ? `Пользователь авторизован ${store.user.email}` : "АВТОРИЗУЙТЕСЬ"}
            </h1>
            <button onClick={() => store.logout()}>Logout</button>
        </div>
    );
}

export default observer(App);
