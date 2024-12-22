import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "../src/styles/_styles.scss";
import { AuthProvider } from "./app/context/AuthContext";

const rootElement = document.getElementById("root") as HTMLElement;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
