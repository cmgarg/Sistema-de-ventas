import React, { useEffect, useState } from 'react';
import { login } from '../../redux/estados/authSlice.ts';
import { useDispatch, useSelector } from 'react-redux';
import PasswordRecovery from './PasswordRecovery.js';

type LoginProps = {
  setEstadoRecuperacionCuenta: (estado: boolean) => void;
  setShowLoadingScreen: (estado: boolean) => void;
};

const Login: React.FC<LoginProps> = ({ setEstadoRecuperacionCuenta, setShowLoadingScreen }) => {
  const [loginIncorrecto, setLoginIncorrecto] = useState<boolean>(false);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [showRecovery, setShowRecovery] = useState({
    show: false,
    username: "",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const userId = localStorage.getItem("userId");
      console.log("Token encontrado en localStorage:", token);
      dispatch(login({ userId, token }));
      setEstadoRecuperacionCuenta(true);
    }
  }, [dispatch, setEstadoRecuperacionCuenta]);

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    console.log(`Campo ${name} cambiado a:`, value);
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = () => {
    setShowLoadingScreen(true);
    console.log("Enviando credenciales:", credentials);
    window.api.enviarEvento("iniciar-sesion", credentials);
    
  };

  const handleKeyPress = (e: { key: string }) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  useEffect(() => {
    window.api.recibirEvento("respuesta-iniciar-sesion", (respuesta) => {
      console.log("Respuesta recibida del backend:", respuesta);
      if (respuesta.exito) {
        console.log("Inicio de sesión exitoso.");
        localStorage.setItem("token", respuesta.token);
        localStorage.setItem("userId", respuesta.userId);
        dispatch(login({ userId: respuesta.userId, token: respuesta.token }));
        setEstadoRecuperacionCuenta(true); // Asegúrate de actualizar el estado después del login exitoso
      } else {
        console.log("Inicio de sesión fallido.");
        setLoginIncorrecto(true);
      }
    });

    return () => {
      window.api.removeAllListeners("respuesta-iniciar-sesion");
    };
  }, [dispatch, setEstadoRecuperacionCuenta]);
  const userType = useSelector((state: RootState) => state.estadoTipoDeUser.userType);
  console.log(userType,"--este ees le estado reduxxxxxx")

  return (
    <div
      className={`flex flex-1 items-center justify-center text-white ${
        showRecovery.show
          ? "bg-gradient-to-b to-blue-950 from-slate-800 bg-opacity-10"
          : "bg-gradient-to-b to-blue-950 from-slate-800"
      }`}
    >
      <div className="flex flex-col items-center justify-center border border-slate-900 rounded-lg w-1/5 h-1/2 pt-5 bg-black bg-opacity-20">
        <h1 className=" p-5 text-2xl">Punto De Venta CMG</h1>
        <p>Iniciar Sección</p>

        <div className=" flex flex-col p-5 w-full h-full">
          <label htmlFor="username" className='text-xl'>Usuario</label>
          <input
            className="outline-none h-14 px-2 rounded-md bg-slate-900 border-slate-900 m-3 p-1"
            id="username"
            placeholder="Usuario"
            type="text"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            onKeyUp={handleKeyPress}
            required
          />
          <label htmlFor="password" className='text-xl'>Contraseña</label>
          <input
            className="outline-none h-14 px-2 rounded-md bg-slate-900 border-slate-900 m-3 p-1"
            type="password"
            id="password"
            placeholder="*********"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            onKeyUp={handleKeyPress}
            required
          />
          {loginIncorrecto && (
            <>
              <p className="text-red-700">
                El usuario o la contraseña son incorrectas.
              </p>
              <div
                className="text-blue-700 cursor-pointer hover:underline"
                onClick={() =>
                  setShowRecovery({
                    show: true,
                    username: credentials.username,
                  })
                }
              >
                ¿Olvidaste la contraseña?
              </div>
            </>
          )}
          <button
            className=" h-10 p-2 bg-cyan-700 justify-center hover:bg-cyan-800 outline-none rounded-lg mt-6"
            type="button"
            onClick={handleSubmit}
          >
            Iniciar
          </button>
        </div>
      </div>
      {showRecovery.show && (
        <PasswordRecovery
          setEstadoRecuperacionCuenta={setEstadoRecuperacionCuenta} // Ajusta esto según sea necesario
          username={showRecovery.username}
          onClose={() => setShowRecovery({ show: false, username: "" })}
        />
      )}
    </div>
  );
};

export default Login;
