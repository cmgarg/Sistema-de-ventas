import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

interface Cuenta {
  tipodegasto: string;
  date: string;
  pay: string;
  descripcion: string;
  pagado: boolean;
  meses: number;
  _id: string;
}

interface EditarCuentaProps {
  onChangeModal: (p: boolean) => void;
  cuentaSeleccionada: Cuenta | null;
  updateAccount: (id: string, updatedAccount: object) => void;
  getAccountsToPay: () => any[];
}

const EditarCuenta: React.FC<EditarCuentaProps> = ({
  onChangeModal,
  cuentaSeleccionada,
  updateAccount,
  getAccountsToPay,
}) => {
  const [accountData, setAccountData] = useState<Cuenta>(
    cuentaSeleccionada || {
      tipodegasto: "",
      date: "",
      pay: "",
      descripcion: "",
      pagado: false,
      meses: 1,
      _id: "",
    }
  );

  useEffect(() => {
    if (cuentaSeleccionada) {
      setAccountData(cuentaSeleccionada);
    }
  }, [cuentaSeleccionada]);

  function setChangeData(data: string, value: string | number) {
    let newAccountData = { ...accountData };
    newAccountData[data as keyof Cuenta] = value;
    setAccountData(newAccountData);
  }

  function validateAndSubmit() {
    const { tipodegasto, date, pay, descripcion } = accountData;
    if (!tipodegasto || !date || !pay || !descripcion) {
      Swal.fire({
        title: "Error!",
        text: "Por favor, completa todos los campos antes de continuar.",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }

    if (cuentaSeleccionada) {
      console.log("Datos a enviar para actualizar:", accountData);
      updateAccount(cuentaSeleccionada._id, accountData);
      onChangeModal(false);
      Swal.fire({
        title: "¡Éxito!",
        text: "La cuenta ha sido editada correctamente.",
        icon: "success",
        confirmButtonText: "Ok",
      });
    } else {
      console.error("No hay cuenta seleccionada para actualizar");
    }

    getAccountsToPay();
  }

  return (
    <div className="absolute bottom-0 top-0 right-0 left-0 flex justify-center items-center z-50 w-full h-full">
      <div className="absolute top-0 right-0 bottom-0 left-0 bg-black opacity-60"></div>
      <div
        className="w-1/4 h-2/2 bg-gray-600 space-y-5 rounded-3xl relative justify-start text-white  border-gray-50 border"
        style={{ backgroundColor: "rgba(30, 41, 59, 0.9)" }}
      >
        <div className="flex-1 flex flex-row h-8 mt-6 text-white text-2xl items-center justify-center">
          <div>Modificar Cuenta</div>
        </div>
        <div className="flex-1 flex w-full space-y-5 flex-col px-2 pb-2 items-center justify-center">
          <div className="flex flex-row space-x-1 items-center justify-center">
            <div className="flex-1 flex flex-col">
              <label htmlFor="tipodegasto" className="text-white text-lg p-2">
                Tipo De Gasto
              </label>
              <select
                name="tipodegasto"
                className="outline-none h-9 w-56 bg-slate-700 px-2 rounded-md"
                value={accountData.tipodegasto}
                onChange={(e) => {
                  setChangeData("tipodegasto", e.target.value);
                }}
              >
                <option value="">Selecciona una opción</option>
                <option value="Vencimiento Mensual">Vencimiento Mensual</option>
                <option value="Gasto Diario">Gasto Diario</option>
              </select>
              {accountData.tipodegasto === "Vencimiento Mensual" ? (
                <div className="flex flex-1 pt-4 flex-col">
                  <label htmlFor="meses" className="text-white text-lg p-2">
                    Meses a Pagar
                  </label>
                  <input
                    type="number"
                    name="meses"
                    className="outline-none h-9 w-56 px-2 rounded-md bg-slate-700"
                    value={accountData.meses}
                    min="1"
                    onChange={(e) => {
                      setChangeData("meses", e.target.value);
                    }}
                  />
                </div>
              ) : null}
            </div>
          </div>
          <div className="flex-1 flex flex-col ">
            <label htmlFor="date" className="text-white text-lg p-2">
              Dia De Vencimiento
            </label>
            <input
              type="date"
              name="date"
              className="outline-none h-9 w-56 px-2 rounded-md bg-slate-700 fecha-input fecha-input:focus"
              value={accountData.date}
              onChange={(e) => {
                setChangeData("date", e.target.value);
              }}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="pay" className="text-white text-lg p-2">
              Monto
            </label>
            <input
              type="number"
              name="pay"
              className="outline-none h-9 w-56 px-2 rounded-md bg-slate-700 "
              value={accountData.pay}
              onChange={(e) => {
                setChangeData("pay", e.target.value);
              }}
            />
          </div>
          <div className=" flex flex-col">
            <label htmlFor="descripcion" className="text-white text-lg p-2">
              Descripcion
            </label>
            <input
              type="text"
              name="descripcion"
              className="outline-none h-9 w-56 px-2 rounded-md bg-slate-700 "
              value={accountData.descripcion}
              onChange={(e) => {
                setChangeData("descripcion", e.target.value);
              }}
            />
          </div>
          <div className="flex flex-row space-x-10 p-8">
            <button
              className=" p-2 bg-blue-600 rounded-md"
              onClick={validateAndSubmit}
            >
              Aceptar
            </button>

            <button
              className=" p-2 bg-red-600 rounded-md"
              onClick={() => {
                onChangeModal(false);
              }}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditarCuenta;
