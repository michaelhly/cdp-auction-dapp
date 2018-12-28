import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.min.css";
import Web3Provider from "web3-react";

function AppWrapper() {
  return (
    <Web3Provider supportedNetworks={[42]}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Web3Provider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<AppWrapper />, rootElement);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
