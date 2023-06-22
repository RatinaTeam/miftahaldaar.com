import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import AuthProvider from "./contexts/AuthProvider.jsx";
import OtherProvider from "./contexts/OtherContexts.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <AuthProvider>
            <OtherProvider>
                <App />
            </OtherProvider>
        </AuthProvider>
    </React.StrictMode>
);
