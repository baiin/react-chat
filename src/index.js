import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import * as firebase from "firebase";
import * as CONFIG from "./config";

const config = {
  apiKey: CONFIG.APIKEY,
  authDomain: CONFIG.AUTHDOMAIN,
  databaseURL: CONFIG.DATABASEURL,
  projectId: CONFIG.PROJECTID,
  storageBucket: CONFIG.STORAGEBUCKET,
  messagingSenderId: CONFIG.MESSAGINGSENDERID,
  appId: CONFIG.APPID
};

firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
