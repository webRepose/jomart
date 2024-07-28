import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/index/index.module.scss";
import "./styles/adapt/adapt.scss";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA9Kz4BBCHi-o6GNAwol-Tq1vEh-WXPSWQ",
  authDomain: "news-c0c1f.firebaseapp.com",
  projectId: "news-c0c1f",
  storageBucket: "news-c0c1f.appspot.com",
  messagingSenderId: "561864860116",
  appId: "1:561864860116:web:f1cfa7b41c3073b389f641",
};

const Context = createContext(null);
export default Context;
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getStorage(app);
export const db = getFirestore(app);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Context.Provider
      value={{
        firebaseConfig,
        auth,
        firestore,
      }}
    >
      <App />
    </Context.Provider>
  </React.StrictMode>
);
