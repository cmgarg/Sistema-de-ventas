import React from "react";
import { IoIosWarning } from "react-icons/io";

function WarningModal({ onConfirm, onCancel }) {
    
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div
        className="flex bg-gray-700 rounded-3xl relative justify-start text-white border-gray-50 border flex-col p-10 max-w-lg w-full"
        style={{ backgroundColor: "rgba(30, 41, 59, 0.9)" }}
      >
        <div className="flex w-full h-full flex-col justify-center items-center">
            <div className="flex items-center justify-center"><IoIosWarning size={100} color="red"/></div>
            <h2 className="text-white text-2xl m-4">Advertencia</h2>
            </div>
        
        <div className="flex flex-col p-3">
          <p className="text-xl p-2">
            Cambiar el tipo de perfil del usuario podría perjudicar el funcionamiento del perfil, ya que no estarían las mismas áreas disponibles para trabajar.
          </p>
          <div className="flex justify-around mt-4">
            <button
              onClick={onCancel}
              className="bg-red-800 hover:bg-red-700 text-white font-bold py-2 px-4 rounded m-3"
            >
              Cancelar
            </button>
            <button
              onClick={onConfirm}
              className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-3"
            >
              Confirmar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WarningModal;
