import ContraVisibleSVG from "../../assets/SvgUsuario/ContraVisibleSVG";
import ContraNoVisibleSVG from "../../assets/SvgUsuario/ContraNoVisibleSVG";
import React, { useEffect, useState } from "react";

const ModalCambiarContraseña = ({ setBloqueoPrograma }) => {
  const [nuevaContraseña, setNuevaContraseña] = useState("");
  const [mostrarContraseña, setMostrarContraseña] = useState(false);
  const [datosUsuario, setDatosUsuario] = useState();

  const handleChange = (event) => {
    setNuevaContraseña(event.target.value);
  };

  const toggleMostrarContraseña = () => {
    setMostrarContraseña(!mostrarContraseña);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (datosUsuario) {
      // Envía el evento de IPC para cambiar la contraseña del usuario
      window.api.enviarEvento("cambiar-contrasena", {
        userId: datosUsuario._id,
        nuevaContrasena: nuevaContraseña,
      });
      window.api.enviarEvento("reiniciar-recuperacioncuenta", datosUsuario._id);
      setBloqueoPrograma(false);
    } else {
      console.error("No se han obtenido los datos del usuario");
    }
  };

  useEffect(() => {
    window.api.enviarEvento("obtener-admin");

    const handleDatosAdminObtenidos = (respuesta) => {
      if (respuesta.exito) {
        setDatosUsuario(respuesta.admin);
      } else {
        console.error(
          "Error al obtener los datos del administrador:",
          respuesta.error
        );
      }
    };

    window.api.recibirEvento(
      "respuesta-obtener-admin",
      handleDatosAdminObtenidos
    );

    return () => {
      window.api.removeAllListeners("respuesta-obtener-admin");
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gradient-to-b to-blue-950 from-slate-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-lg mb-4">Cambiar Contraseña</h2>
        <p>Nueva contraseña</p>
        {datosUsuario ? (
          <form onSubmit={handleSubmit} className="relative">
            <input
              type={mostrarContraseña ? "text" : "password"}
              value={nuevaContraseña}
              onChange={handleChange}
              className="border border-gray-600 bg-slate-800 focus:outline-none w-full mb-5 pr-10"
            />
            <button
              type="button"
              onClick={toggleMostrarContraseña}
              className="absolute right-2 top-1 text-sm text-white"
            >
              {mostrarContraseña ? (
                <ContraVisibleSVG />
              ) : (
                <ContraNoVisibleSVG />
              )}
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
            >
              Cambiar Contraseña
            </button>
          </form>
        ) : (
          <p>Cargando datos del usuario...</p>
        )}
      </div>
    </div>
  );
};

export default ModalCambiarContraseña;
