import { useEffect, useState } from "react";
import "./App.css";
import "./index.css";
import Header from "./components/nav/header";
import Aside from "./components/nav/aside/Aside";
import Main from "./components/main/Main";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CrearUsuarioAdmin from "./components/Usuario/CrearUsuarioAdmin";
import Login from "./components/Usuario/Login";

import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "./redux/estados/authSlice.ts";
import Programabloqueado from "./components/Usuario/Programabloqueado.js";

function App() {
  const [adminExists, setAdminExists] = useState<boolean | null>(null);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [bloqueoPrograma, setBloqueoPrograma] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {}, []);
  console.log(bloqueoPrograma, "programa bloqueado");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    if (token && userId) {
      dispatch(login({ userId, token }));
    } else {
      dispatch(logout());
    }
  }, [dispatch]);

  function renderContent() {
    if (adminExists === null) {
      return <div>Cargando...</div>;
    } else if (bloqueoPrograma) {
      return <Programabloqueado />;
    } else if (adminExists) {
      return isAuthenticated ? (
        <>
          <Aside />
          <Main />
        </>
      ) : (
        <Login />
      );
    } else {
      return <CrearUsuarioAdmin setAdminExists={setAdminExists} />;
    }
  }

  return (
    <div className="w-full h-screen grid grid-cmg-program bg-gray-800 font-medium overflow-hidden box-border">
      <Header />
      <div className="flex flex-row row-start-2 row-end-7">
        <Router>{renderContent()}</Router>
      </div>
    </div>
  );
}

export default App;
