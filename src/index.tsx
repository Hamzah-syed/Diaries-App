import React from "react";
import ReactDOM from "react-dom";
import "./assets/css/index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
//server
import { setupServer } from "./services/mirage/server";
//redux store
import { Provider } from "react-redux";
import store from "./store";

if (process.env.NODE_ENV === "development") {
  setupServer("development");
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
