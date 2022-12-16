import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import Store from "./store/store";
import { BrowserRouter } from "react-router-dom";

export const store = new Store();
export const Context = createContext({
    store,
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
        <Context.Provider value={{ store }}>
            <App />
        </Context.Provider>
    </BrowserRouter>
);
