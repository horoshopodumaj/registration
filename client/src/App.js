import Login from "./components/Login";

export const URL = process.env.REACT_APP_SERVER_URL;

function App() {
    return (
        <div className="App">
            <Login />
        </div>
    );
}

export default App;
