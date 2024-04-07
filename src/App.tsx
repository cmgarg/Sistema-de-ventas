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
import { login, logout } from "./redux/estados/authSlice.js";
import Programabloqueado from "./components/Usuario/Programabloqueado.js";

function App() {
  const [adminExists, setAdminExists] = useState<boolean | null>(null);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [bloqueoPrograma, setBloqueoPrograma] = useState(false)
  const dispatch = useDispatch();

  useEffect(() => {
    ipcRenderer.send('verificar-admin-existente');
    ipcRenderer.on('respuesta-verificar-admin', (event, { existeAdmin, recuperacioncuenta }) => {
      setAdminExists(existeAdmin);
      if (recuperacioncuenta == 0) {
        setBloqueoPrograma(true)
      }
    });

  
    return () => {
      ipcRenderer.removeAllListeners('respuesta-verificar-admin');
    };
  }, []);
  console.log(bloqueoPrograma, "programa bloqueado")

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
      return <Programabloqueado/>;
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
    <div className="w-full h-screen flex flex-col bg-gray-200 font-medium overflow-hidden box-border">
      <Header />
      <div className="flex flex-row h-5/6 w-full max-w-full box-border flex-1">
        <Router>
          {renderContent()}
        </Router>
      </div>
    </div>
  );
}

export default App;
