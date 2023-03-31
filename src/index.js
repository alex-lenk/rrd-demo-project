import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { makeServer } from "./mock/server";

// Mock Server Connect
if (process.env.REACT_APP_MOCK_ENABLED) {
    const processEnv = process.env.NODE_ENV;
    if (processEnv === "development" || processEnv === "test") {
        makeServer({ environment: processEnv });
    }
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    // <React.StrictMode>
    <App />
    // </React.StrictMode>
);

reportWebVitals();
