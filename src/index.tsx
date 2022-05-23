import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import "./index.css";

import reportWebVitals from "./reportWebVitals";
import App from "./App";
import { store } from "./store/store";
import UserContextProvider from "./context/UserContext";
import { FilterContextProvider } from "context/FilterContext";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <UserContextProvider>
        <FilterContextProvider>
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </FilterContextProvider>
      </UserContextProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();
