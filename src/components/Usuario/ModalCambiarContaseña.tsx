import ContraVisibleSVG from "/src/assets/SvgUsuario/ContraVisibleSVG";
import ContraNoVisibleSVG from "/src/assets/SvgUsuario/ContraNoVisibleSVG";
import React, { useState } from "react";

const ModalCambiarContraseña = () => {
  const [nuevaContraseña, setNuevaContraseña] = useState("");
  const [mostrarContraseña, setMostrarContraseña] = useState(false);

  const handleChange = (event) => {
    setNuevaContraseña(event.target.value);
  };

  const toggleMostrarContraseña = () => {
    setMostrarContraseña(!mostrarContraseña);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí debes implementar la lógica para cambiar la contraseña en la base de datos
    console.log("Nueva contraseña:", nuevaContraseña);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gradient-to-b to-blue-950 from-slate-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-lg mb-4">Cambiar Contraseña</h2>
        <p>Nueva contraseña</p>
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
            {mostrarContraseña ? <ContraVisibleSVG /> : <ContraNoVisibleSVG />}
          </button>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
          >
            Cambiar Contraseña
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalCambiarContraseña;
