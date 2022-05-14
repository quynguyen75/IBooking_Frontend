import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter } from "react-router-dom";

import "./index.css";

import reportWebVitals from "./reportWebVitals";
import App from "./App";
import UserContextProvider from "./context/UserContext";
import { FilterContextProvider } from "context/FilterContext";

ReactDOM.render(
  <BrowserRouter>
    <UserContextProvider>
      <FilterContextProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </FilterContextProvider>
    </UserContextProvider>
  </BrowserRouter>,
  document.getElementById("root")
);

reportWebVitals();
