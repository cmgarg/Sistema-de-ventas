import React from "react";

export default function ModalEditarUsuario() {
  return (
    <div className="absolute top-0 left-10 mb-2 w-48 bg-gray-800 shadow-lg border border-gray-600 rounded-lg text-white py-2 z-50">
      <div className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
        Editar Usuario
      </div>
      <div className="px-4 py-2 hover:bg-gray-700 cursor-pointer text-red-600">
        Eliminar Usuario
      </div>
    </div>
  );
}
