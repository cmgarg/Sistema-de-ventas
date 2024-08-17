import React from "react";

// Definición de tipos
interface ClientData {
  name: string;
  email: string;
  address: string;
  phone: string;
  dni: string;
  _id: string;
}

interface Buyer {
  client: {
    active: boolean;
    clientData: ClientData;
  };
  finalConsumer: {
    active: boolean;
    cae: string;
  };
}

interface Article {
  name: string;
  code: string;
  total: string | number;
  amount: {
    value: string | number;
    unit: string;
  };
}

interface saleData {
  buyer: Buyer;
  articles: Article[];
  dateOfRegister: string;
  sold: number;
}

interface AsideFormProps {
  onChangeModal: (p: boolean) => void;
  formatMony: (number: number) => string;
  cost: number;
  saleData: saleData;
  subirVenta: () => void;
  showError: { in: string };
}

const AsideForm: React.FC<AsideFormProps> = ({
  onChangeModal,
  formatMony,
  cost,
  saleData,
  subirVenta,
  showError,
}) => {
  return (
    <div className="w-1/4 h-full flex flex-col bg-white shadow-md rounded-lg">
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Resumen de Venta</h2>
        <p className="mb-2">Total: {formatMony(cost)}</p>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={subirVenta}
        >
          Confirmar Venta
        </button>
        {showError.in === "all" && (
          <p className="text-red-600 mt-4">
            Debes añadir productos y seleccionar un comprador
          </p>
        )}
        {showError.in === "buyer" && (
          <p className="text-red-600 mt-4">Debes seleccionar un comprador</p>
        )}
        {showError.in === "articles" && (
          <p className="text-red-600 mt-4">Debes añadir productos</p>
        )}
      </div>
    </div>
  );
};

export default AsideForm;
