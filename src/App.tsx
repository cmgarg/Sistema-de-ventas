import { useEffect, useState } from "react";
import "./App.css";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/nav/header";
import Aside from "./components/nav/aside/Aside";
import Main from "./components/main/Main";
import CrearUsuarioAdmin from "./components/Usuario/CrearUsuarioAdmin";
import Login from "./components/Usuario/Login";
import Programabloqueado from "./components/Usuario/Programabloqueado";
import { login, logout } from "./redux/estados/authSlice";
import { cambiar, datosUsuario } from "./redux/estados/estadoTipoDeUser";
import { RootState } from "./redux/store";
import PantallaDeCarga from "./components/main/PantallaDeCarga";
import React from "react";

function App() {
  const [adminExists, setAdminExists] = useState<boolean | null>(null);
  const [bloqueoPrograma, setBloqueoPrograma] = useState(false);
  const [estadoRecuperacionCuenta, setEstadoRecuperacionCuenta] =
    useState(false);
  const [loading, setLoading] = useState(true);
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const userType = useSelector(
    (state: RootState) => state.estadoTipoDeUser.userType
  );
  const datosUsuarioRedux = useSelector(
    (state: RootState) => state.estadoTipoDeUser.datosUsuario
  );
  const [_estadoRedux, setestadoRedux] = useState("");

  useEffect(() => {
    window.api.enviarEvento("verificar-admin-existente");
    window.api.recibirEvento(
      "respuesta-verificar-admin",
      ({ existeAdmin, recuperacioncuenta }) => {
        setAdminExists(existeAdmin);
        if (recuperacioncuenta === 0) {
          setBloqueoPrograma(true);
        }
        setLoading(false); // Actualizar el estado de carga después de verificar el administrador existente
      }
    );

    return () => {
      window.api.removeAllListeners("respuesta-verificar-admin");
    };
  }, [estadoRecuperacionCuenta]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    if (token && userId) {
      dispatch(login({ userId, token }));
      window.api.enviarEvento("obtener-permisos-usuario", userId);
      window.api.enviarEvento("obtener-datos-usuario", userId); // Enviar evento para obtener los datos del usuario
    } else {
      dispatch(logout());
      setLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    const handleObtenerPermisosUsuario = (response: any) => {
      if (response.success) {
        const permisos = response.data || {};
        const datosUsuario = response.usuario || {};
        if (response.isAdmin) {
          dispatch(cambiar({ userType: "admin", datosUsuario }));
        } else {
          if (permisos.gerente) {
            dispatch(cambiar({ userType: "gerente", datosUsuario }));
          } else if (permisos.logistica) {
            dispatch(cambiar({ userType: "logistica", datosUsuario }));
          } else if (permisos.ventas) {
            dispatch(cambiar({ userType: "ventas", datosUsuario }));
          } else if (permisos.stock) {
            dispatch(cambiar({ userType: "stock", datosUsuario }));
          }
        }
      } else {
        console.error(
          "Permisos del usuario no encontrados o incorrectos",
          response
        );
      }
      setLoading(false); // Marca que la carga ha terminado
    };

    window.api.recibirEvento(
      "respuesta-obtener-permisos-usuario",
      handleObtenerPermisosUsuario
    );

    return () => {
      window.api.removeListener(
        "respuesta-obtener-permisos-usuario",
        handleObtenerPermisosUsuario
      );
    };
  }, [dispatch]);

  useEffect(() => {
    const handleObtenerDatosUsuario = (response: any) => {
      if (response.success) {
        console.log(response, "esto recibo del backend");
        dispatch(datosUsuario({ datosUsuario: response.data }));
      } else {
        console.error("Error al obtener los datos del usuario", response.error);
      }
    };

    window.api.recibirEvento(
      "datos-usuario-obtenidos",
      handleObtenerDatosUsuario
    );

    return () => {
      window.api.removeListener(
        "datos-usuario-obtenidos",
        handleObtenerDatosUsuario
      );
    };
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      const userId = localStorage.getItem("userId");
      if (userId) {
        window.api.enviarEvento("obtener-permisos-usuario", userId);
        window.api.enviarEvento("obtener-datos-usuario", userId); // Enviar evento para obtener los datos del usuario
      }
    }
  }, [isAuthenticated]);

  // Mostrar la pantalla de carga por 5 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoadingScreen(false);
    }, 5000); // Tiempo mínimo de carga de 5 segundos

    return () => clearTimeout(timer);
  }, [showLoadingScreen]);

  function renderContent() {
    if (loading) {
      return <div>Cargando... no se obtuvieron los permisos</div>; // Muestra un mensaje de carga mientras se obtienen los permisos
    }
    if (adminExists === null) {
      return <div>Cargando... el admin no existe</div>;
    } else if (bloqueoPrograma) {
      return <Programabloqueado setBloqueoPrograma={setBloqueoPrograma} />;
    } else if (adminExists) {
      return isAuthenticated ? (
        <>
          {showLoadingScreen ? <PantallaDeCarga /> : null}
          <div
            className={`${showLoadingScreen ? "hidden" : "flex w-full h-full"}`}
          >
            <Aside />
            <Main />
          </div>
        </>
      ) : (
        <Login
          setEstadoRecuperacionCuenta={setEstadoRecuperacionCuenta}
          setShowLoadingScreen={setShowLoadingScreen}
        />
      );
    } else {
      return <CrearUsuarioAdmin setAdminExists={setAdminExists} />;
    }
  }

  // Estado redux saber qué tipo de usuario se inició y aplicar las restricciones
  useEffect(() => {
    setestadoRedux(userType);
  }, [userType]);

  console.log(datosUsuarioRedux, "Estos son los datos del usuario que inicio");

  return (
    <div className="w-full h-screen grid grid-cmg-program bg-gradient-to-t from-[#262626] via-[#2f2f2fff] to-[#000000] font-medium overflow-hidden box-border">
      <Header />
      <div className="flex flex-row row-start-2 row-end-7 relative">
        <Router>{renderContent()}</Router>
      </div>
    </div>
  );
}

export default App;
