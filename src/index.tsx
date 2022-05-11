import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter } from "react-router-dom";

import "./index.css";

import reportWebVitals from "./reportWebVitals";
import App from "./App";
import UserContextProvider from "./context/UserContext";

ReactDOM.render(
  <BrowserRouter>
    <UserContextProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </UserContextProvider>
  </BrowserRouter>,
  document.getElementById("root")
);

reportWebVitals();
