import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ProjectContextProvider } from "./context/ProjectContext";
import { AuthContextProvidor } from "./context/authContext";
//import { ProjectContextProvider } from "./context/projectContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ProjectContextProvider>
        <AuthContextProvidor>
          <App />
        </AuthContextProvidor>
      </ProjectContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
