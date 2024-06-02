import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "bootstrap/dist/css/bootstrap.min.css";
import { HashRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));

const renderReactDom = () => {
  root.render(
    <React.StrictMode>
      <HashRouter>
        <App />
      </HashRouter>
    </React.StrictMode>
  );
};

if (window.cordova) {
  document.addEventListener(
    "deviceready",
    () => {
      renderReactDom();
    },
    false
  );
} else {
  renderReactDom();
}
