import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "../src/redux/store.js";

import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDS_IAVmdRNa8pfv7c8L0KJeSfdVBDFdqU",
  authDomain: "cmg-company.firebaseapp.com",
  projectId: "cmg-company",
  storageBucket: "cmg-company.appspot.com",
  messagingSenderId: "206948296278",
  appId: "1:206948296278:web:6a2348d8e8e2ea75743df7",
  measurementId: "G-2YKHCCRVNK"
};

// Inicializar Firebase solo si no está inicializado
const firebaseApp = initializeApp(firebaseConfig);

// Exportar la instancia de Firebase para que se pueda utilizar en otros archivos
export const messaging = getMessaging(firebaseApp);


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// Remove Preload scripts loading
postMessage({ payload: "removeLoading" }, "*");
