import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Provider from "./mqtt/Provider";

ReactDOM.render(
  <React.StrictMode>
    <Provider url="ws://localhost:8888">
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
