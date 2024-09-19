import React, { useEffect, useState } from 'react';
import { login } from '../../redux/estados/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import PasswordRecovery from './PasswordRecovery.js';
import { RootState } from '../../redux/store.js';

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

  // Función para manejar el efecto ripple
  const handleRippleEffect = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    const ripple = document.createElement("span");

    // Obtener el tamaño y la posición del botón
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = `${size}px`;

    // Obtener las coordenadas del clic
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.classList.add("ripple");

    // Agregar el efecto ripple al botón
    button.appendChild(ripple);

    // Remover el efecto ripple después de la animación
    ripple.addEventListener("animationend", () => {
      ripple.remove();
    });
  };

  return (
    <div
      className={`flex flex-1 items-center justify-center text-[#fff8dcff]  ${
        showRecovery.show
          ? "bg-gradient-to-t from-[#262626] via-[#2f2f2fff] to-[#000000] bg-opacity-10"
          : "bg-gradient-to-t from-[#262626] via-[#2f2f2fff] to-[#000000]"
      }`}
    >
      <div className="flex flex-col items-center justify-center shadow-[0_2px_5px_rgba(0,0,0,0.50)] rounded-lg w-1/5 h-1/2 pt-5 bg-black bg-opacity-20">
        <h1 className=" p-5 text-2xl">Punto De Venta CMG</h1>
        <p>Iniciar Sección</p>

        <div className=" flex flex-col p-5 w-full h-full">
          <label htmlFor="username" className='text-xl'>Usuario</label>
          <input
            className="outline-none h-14 px-2 rounded-md bg-[#404040ff] m-3 p-1"
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
            className="outline-none h-14 px-2 rounded-md bg-[#404040ff] m-3 p-1"
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
            className="relative overflow-hidden h-10 p-2 bg-gradient-to-l from-yellow-800 via-yellow-700 to-yellow-500 justify-center hover:bg-cyan-800 outline-none rounded-lg mt-10"
            type="button"
            onClick={(event) => {
              handleRippleEffect(event);
              handleSubmit();
            }}
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
