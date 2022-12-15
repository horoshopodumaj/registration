import { useCallback, useContext, useEffect, useState } from "react";
import { Context } from "./index";
import Login from "./components/Login";
import { observer } from "mobx-react-lite";

export const URL = process.env.REACT_APP_SERVER_URL;

function App() {
    const { store } = useContext(Context);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (localStorage.getItem("token")) {
            store.checkAuth();
        }
    }, []);

    const onClick = async () => {
        const response = await store.getUsers();
        setUsers(response);
    };

    if (store.isLoading) {
        return <div>Подождите, идет загрузка</div>;
    }

    if (!store.isAuth) {
        return <Login />;
    }
    return (
        <div className="App">
            <h1>
                {store.isAuth ? `Пользователь авторизован ${store.user.email}` : "АВТОРИЗУЙТЕСЬ"}
            </h1>
            <button onClick={() => store.logout()}>Logout</button>
            <div>
                <button onClick={onClick}>Получить всех пользователей</button>
            </div>
            {users.map((user) => (
                <div key={user.email}>{user.email}</div>
            ))}
        </div>
    );
}

export default observer(App);
