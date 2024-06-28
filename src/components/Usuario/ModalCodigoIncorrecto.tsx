import React from "react";

const ModalCodigoIncorrecto = ({setModalCodigoIncorrecto}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gradient-to-b to-blue-950 from-slate-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-lg mb-4">Código Incorrecto</h2>
        <p>El código es incorrecto, vuelva a intentarlo.</p>
        <button
          onClick={()=> setModalCodigoIncorrecto(false)}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
          
          Aceptar
        </button>
      </div>
    </div>
  );
};

export default ModalCodigoIncorrecto;
