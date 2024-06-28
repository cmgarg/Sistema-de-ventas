import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

interface AddAccountToPay2Props {
  setEstadoAgregarCuenta: (arg0: boolean) => void;
  setCerrarModal: (arg0: boolean) => void;
  estadoAgregarCuenta: boolean;
}

const AddAccountToPay2: React.FC<AddAccountToPay2Props> = ({
  setEstadoAgregarCuenta,
  setCerrarModal,
  estadoAgregarCuenta,
}) => {
  type AccountObject = {
    tipodegasto: string;
    date: string;
    pay: string;
    descripcion: string;
    pagado: boolean;
    meses: number;
    time?: string;
    pagado2?: string;
    pagado3?: string;
  };

  const [accountData, setAccountData] = useState<AccountObject>({
    tipodegasto: "",
    date: "",
    pay: "",
    descripcion: "",
    pagado: false,
    meses: 1,
  });

  useEffect(() => {
    if (!estadoAgregarCuenta) {
      setCerrarModal(false);
    }
  }, [estadoAgregarCuenta]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        event.preventDefault();
        validateAndSubmit();
      } else if (event.key === "Escape") {
        clearForm();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [accountData]);

  const setChangeData = (data: keyof AccountObject, value: string | number | boolean) => {
    setAccountData((prev) => ({ ...prev, [data]: value }));
  };

  const validateAndSubmit = () => {
    if (
      !accountData.tipodegasto ||
      !accountData.date ||
      !accountData.pay ||
      !accountData.descripcion
    ) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Todos los campos deben ser completados antes de continuar.",
        confirmButtonText: "Entendido",
      });
      return;
    }
    submitAccount();
  };

  const submitAccount = () => {
    const now = new Date();
    const time = now.toTimeString().split(" ")[0];
    const date = now.toISOString().split("T")[0];
    const pagado2 = accountData.pagado ? date : "";
    const pagado3 = accountData.pagado ? time : "";
    const newAccountData = { ...accountData, time, pagado2, pagado3 };

    window.api.enviarEvento("save-accountToPay", newAccountData);
    clearForm();
  };

  const clearForm = () => {
    setAccountData({
      tipodegasto: "",
      date: "",
      pay: "",
      descripcion: "",
      pagado: false,
      meses: 1,
    });
    setEstadoAgregarCuenta(false);
  };

  return (
    <div className="absolute bottom-0 top-0 right-0 left-0 flex justify-center items-center z-50 w-full h-full">
      <div className="absolute top-0 right-0 bottom-0 left-0 bg-black opacity-60"></div>
      <div
        className="w-1/4 h-2/2 bg-gray-600 space-y-5 rounded-3xl relative justify-start text-white border-gray-50 border"
        style={{ backgroundColor: "rgba(30, 41, 59, 0.9)" }}
      >
        <div className="flex-1 flex flex-row h-8 mt-6 text-3xl items-center justify-center">
          <div>Agregar Cuenta</div>
        </div>
        <div className="flex-1 flex space-y-5 flex-col px-2 pb-2 items-center justify-center">
          <div className="flex flex-row space-x-1 items-center justify-center">
            <div className="flex-1 flex flex-col">
              <label htmlFor="tipodegasto" className="text-xl p-2">Tipo De Gasto</label>
              <div className="flex flex-row flex-1">
                <select
                  name="tipodegasto"
                  className="outline-none h-9 w-56 px-2 rounded-md bg-slate-700"
                  value={accountData.tipodegasto}
                  onChange={(e) => setChangeData("tipodegasto", e.target.value)}
                >
                  <option value="">Selecciona una opción</option>
                  <option value="Vencimiento Mensual">Vencimiento Mensual</option>
                  <option value="Gasto Diario">Gasto Diario</option>
                </select>
                {accountData.tipodegasto === "Vencimiento Mensual" && (
                  <div className="flex w-10">
                    <input
                      type="number"
                      name="meses"
                      className="bg-slate-700 ml-1 rounded-md w-12 text-center outline-none"
                      value={accountData.meses}
                      min="1"
                      onChange={(e) => setChangeData("meses", e.target.value)}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="descripcion" className="text-xl p-2">Descripción</label>
            <input
              type="text"
              maxLength={18}
              name="descripcion"
              className="outline-none h-9 w-56 px-2 rounded-md bg-slate-700"
              value={accountData.descripcion}
              onChange={(e) => setChangeData("descripcion", e.target.value)}
            />
          </div>
          <div className="flex-1 flex flex-col">
            <label htmlFor="date" className="text-xl p-2">Día de Vencimiento</label>
            <input
              type="date"
              name="date"
              className="outline-none h-9 w-56 px-2 rounded-md bg-slate-700 fecha-input fecha-input:focus"
              value={accountData.date}
              onChange={(e) => setChangeData("date", e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="pay" className="text-xl p-2">Monto</label>
            <input
              type="number"
              name="pay"
              className="outline-none h-9 w-56 px-2 rounded-md bg-slate-700"
              value={accountData.pay}
              onChange={(e) => setChangeData("pay", e.target.value)}
            />
          </div>
          <div className="w-56 text-xl pl-2">Estado de cuenta</div>
          <div className="flex w-56 rounded-md bg-slate-700 items-center justify-around">
            <label htmlFor="pagado" className="text-xl p-2">Pagado</label>
            <input
              type="checkbox"
              name="pagado"
              className="h-6 w-6"
              checked={accountData.pagado}
              onChange={(e) => setChangeData("pagado", e.target.checked)}
            />
          </div>
          <div className="flex flex-row space-x-10 p-8">
            <button className="p-2 bg-blue-600 rounded-md" onClick={validateAndSubmit}>
              Agregar
            </button>
            <button className="p-2 bg-red-600 rounded-md" onClick={clearForm}>
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAccountToPay2;
