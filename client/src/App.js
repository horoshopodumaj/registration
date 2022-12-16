import { useContext, useEffect } from "react";
import { Context } from "./index";
import Login from "./components/Login";
import { observer } from "mobx-react-lite";
import Header from "./components/Header";
import Content from "./components/Content";

export const URL = process.env.REACT_APP_SERVER_URL;

function App() {
    const { store } = useContext(Context);

    useEffect(() => {
        if (localStorage.getItem("token")) {
            store.checkAuth();
        }
    }, []);

    return (
        <div className="App">
            <Header />
            <div className="container">
                {store.isLoading ? (
                    <div class="spinner"></div>
                ) : !store.isAuth ? (
                    <Login />
                ) : (
                    <Content />
                )}
            </div>
        </div>
    );
}

export default observer(App);
