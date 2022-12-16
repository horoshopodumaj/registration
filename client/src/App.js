import { useContext, useEffect } from "react";
import { Context } from "./index";
import Login from "./components/Login";
import { observer } from "mobx-react-lite";
import Header from "./components/Header";
import Content from "./components/Content";
import Spinner from "./components/Spinner";

export const URL = process.env.REACT_APP_SERVER_URL;

function App() {
    const { store } = useContext(Context);

    useEffect(() => {
        if (localStorage.getItem("token")) {
            store.checkAuth();
        }
    }, []);

    if (store.isLoading) {
        return <Spinner />;
    }

    return (
        <div className="App">
            <Header />
            <div className="container">{!store.isAuth ? <Login /> : <Content />}</div>
        </div>
    );
}

export default observer(App);
