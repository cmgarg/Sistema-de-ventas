import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import CustomAlert from "../../Cuentas/componentes/AddAccountToPay/CustomAlert"; // Importa tu componente de alerta personalizado

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

  const [estadoPagado, setEstadoPagado] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

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
      setAlertMessage("Por favor, completa todos los campos antes de continuar.");
      setShowAlert(true);
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
    setEstadoPagado(false);
    setEstadoAgregarCuenta(false);
  };

  return (
    <div className="absolute bottom-0 top-0 right-0 left-0 flex justify-center items-center z-50 w-full h-full">
      <div className="absolute top-0 right-0 bottom-0 left-0 bg-black opacity-60"></div>
      <div className="flex flex-col w-1/4 h-2/2 bg-slate-950 space-y-5 rounded-3xl relative justify-start text-white border-slate-800 border overflow-hidden">
        <div className="flex flex-1 flex-row h-8 mt-6 text-3xl items-center justify-center">
          <div>Agregar Cuenta</div>
        </div>
        <div className="flex flex-1 flex-col">
          <div className="flex flex-row space-x-1 items-center justify-center">
            <div className="flex-1 flex flex-col">
              <label htmlFor="tipodegasto" className="text-xl pl-4">
                Tipo De Gasto
              </label>
              <div className="flex flex-row flex-1">
                <select
                  name="tipodegasto"
                  className="outline-none h-14 w-full px-2 rounded-md bg-slate-900 border-slate-900 ml-3 mr-3"
                  value={accountData.tipodegasto}
                  onChange={(e) => setChangeData("tipodegasto", e.target.value)}
                >
                  <option value="">Selecciona una opción</option>
                  <option value="Vencimiento Mensual">Vencimiento Mensual</option>
                  <option value="Gasto Diario">Gasto Diario</option>
                </select>
                {accountData.tipodegasto === "Vencimiento Mensual" && (
                  <div className="flex h-14 mr-3">
                    <input
                      type="number"
                      name="meses"
                      className="bg-slate-900 rounded-md w-12 text-center outline-none border-slate-800"
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
            <label htmlFor="descripcion" className="text-xl pl-4 p-2">
              Descripción
            </label>
            <input
              type="text"
              maxLength={18}
              name="descripcion"
              className="outline-none h-14 px-2 rounded-md bg-slate-900 border-slate-900 mr-3 ml-3"
              value={accountData.descripcion}
              onChange={(e) => setChangeData("descripcion", e.target.value)}
            />
          </div>

          <div className="flex-1 flex flex-col">
            <label htmlFor="date" className="text-xl p-2 pl-4">
              Día de Vencimiento
            </label>
            <input
              type="date"
              name="date"
              className="outline-none h-14 px-2 rounded-md bg-slate-900 fecha-input fecha-input:focus border-slate-900 mr-3 ml-3  text-2xl"
              value={accountData.date}
              onChange={(e) => setChangeData("date", e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="pay" className="text-xl p-2 pl-4">
              Monto
            </label>
            <input
              type="text"
              name="pay"
              className="outline-none h-14 px-2 rounded-md bg-slate-900 border-slate-900 mr-3 ml-3"
              value={accountData.pay}
              onChange={(e) => setChangeData("pay", e.target.value)}
            />
          </div>

          <div className="w-56 text-xl pl-2 mt-2 pl-4">Estado de cuenta</div>

          <div className="flex h-14 rounded-md bg-slate-900 items-center justify-around border-slate-900 mb-4 m-3 ">
            <label htmlFor="pagado" className={`text-xl p-2 pl-4 ${estadoPagado ? "text-green-500" : ""}`}>
              Pagado
            </label>
            <input
              type="checkbox"
              name="pagado"
              className="h-6 w-6 custom-checkbox"
              checked={accountData.pagado}
              onChange={(e) => {
                setChangeData("pagado", e.target.checked);
                setEstadoPagado(e.target.checked);
              }}
            />
          </div>

          <div className="flex flex-1 w-full bg-slate-100">
            <button
              className="flex flex-1 p-2 bg-rose-700 justify-center hover:bg-rose-800 outline-none"
              onClick={clearForm}
            >
              Cancelar
            </button>
            <button
              className="flex flex-1 h-10 p-2 bg-cyan-700 justify-center hover:bg-cyan-800 outline-none"
              onClick={validateAndSubmit}
            >
              Agregar
            </button>
          </div>
        </div>
      </div>
      {showAlert && (
        <CustomAlert
          title="Error!"
          message={alertMessage}
          onClose={() => setShowAlert(false)}
        />
      )}
    </div>
  );
};

export default AddAccountToPay2;
