import React, { useState, ChangeEvent, FormEvent } from "react";

interface ModalIngresarCodigoProps {
  setVerificarCodigo: (codigo: string) => void;
  setMostrarModalCodigo: (mostrar: boolean) => void;
}

const ModalIngresarCodigo: React.FC<ModalIngresarCodigoProps> = ({
  setVerificarCodigo,
  setMostrarModalCodigo,
}) => {
  const [codigo, setCodigo] = useState<string>("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCodigo(event.target.value);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setVerificarCodigo(codigo);
    setMostrarModalCodigo(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gradient-to-b to-blue-950 from-slate-800 p-6 rounded-lg shadow-lg z-50 flex flex-col">
        <h2 className="text-lg mb-4">Ingrese el Código de Desbloqueo</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={codigo}
            onChange={handleChange}
            className="border border-gray-600 bg-slate-800 focus:outline-none w-full mb-5"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Verificar Código
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalIngresarCodigo;
