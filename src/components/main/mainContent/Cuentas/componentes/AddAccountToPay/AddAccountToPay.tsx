import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

interface AddAccountToPayProps {
  onChangeModal: (p: boolean) => void;
  addAccountToPay: (account: object) => void;
}

const AddAccountToPay: React.FC<AddAccountToPayProps> = ({
  onChangeModal,
  addAccountToPay,
}) => {
  type accountObject = {
    tipodegasto: string;
    date: string;
    pay: string;
    descripcion: string;
    pagado: boolean;
    meses: number;
  };

  const [accountData, setAccountData] = useState<accountObject>({
    tipodegasto: "",
    date: "",
    pay: "",
    descripcion: "",
    pagado: false,
    meses: 1,
  });

  function setChangeData(data: string, value: string | number | boolean) {
    let newAccountData = { ...accountData };
    (newAccountData as any)[data] = value;
    setAccountData(newAccountData);
  }

  useEffect(() => {
    console.log(accountData);
  }, [accountData]);

  function subirArticulo() {
    if (accountData.tipodegasto === "Vencimiento Mensual") {
      for (let i = 0; i < accountData.meses; i++) {
        const newAccount = {
          ...accountData,
          date: new Date(
            new Date(accountData.date).setMonth(
              new Date(accountData.date).getMonth() + i
            )
          )
            .toISOString()
            .split("T")[0],
        };
        window.api.enviarEvento("save-accountToPay", newAccount);
        addAccountToPay(newAccount);
      }
    } else {
      window.api.enviarEvento("save-accountToPay", accountData);
      addAccountToPay(accountData);
    }
    setAccountData({
      tipodegasto: "",
      date: "",
      pay: "",
      descripcion: "",
      pagado: false,
      meses: 1,
    });
    onChangeModal(false);
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

    subirArticulo();
  }

  return (
    <div className="absolute bottom-0 top-0 right-0 left-0 flex justify-center items-center z-50 w-full h-full">
      <div className="absolute top-0 right-0 bottom-0 left-0 bg-black opacity-60"></div>
      <div className="w-1/4 h-2/2 bg-gray-600 space-y-5 rounded-3xl relative justify-start text-white border-gray-50 border"
        style={{ backgroundColor: 'rgba(30, 41, 59, 0.9)' }}>
        <div className="flex-1 flex flex-row h-8 mt-6 text-3xl items-center justify-center">
          <div>Agregar Cuenta</div>
        </div>
        <div className="flex-1 flex space-y-5 flex-col px-2 pb-2 items-center justify-center">
          <div className="flex flex-row space-x-1 items-center justify-center">
            <div className="flex-1 flex flex-col">
              <label htmlFor="tipodegasto" className="text-xl p-2">
                Tipo De Gasto
              </label>
              <div className="flex flex-row flex-1">
                <select
                  name="tipodegasto"
                  className="outline-none h-9 w-56 px-2 rounded-md bg-slate-700"
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
                  <div className="flex w-10">
                    <input
                      type="number"
                      name="meses"
                      className="bg-slate-700 ml-1 rounded-md w-12 text-center outline-none"
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
          </div>

          <div className="flex flex-col">
            <label htmlFor="descripcion" className="text-xl p-2">
              Descripcion
            </label>
            <input
              type="text"
              name="descripcion"
              className="outline-none h-9 w-56 px-2 rounded-md bg-slate-700"
              value={accountData.descripcion}
              onChange={(e) => {
                setChangeData("descripcion", e.target.value);
              }}
            />
          </div>

          <div className="flex-1 flex flex-col">
            <label htmlFor="date" className="text-xl p-2">
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
            <label htmlFor="pay" className="text-xl p-2">
              Monto
            </label>
            <input
              type="number"
              name="pay"
              className="outline-none h-9 w-56 px-2 rounded-md bg-slate-700"
              value={accountData.pay}
              onChange={(e) => {
                setChangeData("pay", e.target.value);
              }}
            />
          </div>

          <div className="w-56 text-xl pl-2">Estado de cuenta</div>

          <div className="flex w-56 rounded-md bg-slate-700 items-center justify-around">
            <label htmlFor="pagado" className="text-xl p-2">
              Pagado
            </label>
            <input
              type="checkbox"
              name="pagado"
              className="h-6 w-6"
              checked={accountData.pagado}
              onChange={(e) => {
                setChangeData("pagado", e.target.checked);
              }}
            />
          </div>

          <div className="flex flex-row space-x-10 p-8">
            <button
              className="p-2 bg-blue-600 rounded-md"
              onClick={validateAndSubmit}
            >
              Agregar
            </button>
            <button
              className="p-2 bg-red-600 rounded-md"
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

export default AddAccountToPay;
