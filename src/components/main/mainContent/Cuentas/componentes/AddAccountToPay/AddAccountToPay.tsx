import React, { useEffect, useState } from "react";

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
  };

  const [accountData, setAccountData] = useState<accountObject>({
    tipodegasto: "",
    date: "",
    pay: "",
    descripcion: "",
  });

  function setChangeData(data: string, value: string) {
    const existingData = ["tipodegasto", "date", "pay", "descripcion"];
    if (existingData.includes(data)) {
      let newValue = value;
  
      // Limitar la longitud del texto a 20 caracteres para los campos específicos
      if (data === "pay" || data === "descripcion") {
        newValue = value.slice(0, 20);
      }
  
      let newAccountData = { ...accountData };
  
      if (data === "tipodegasto") {
        newAccountData.tipodegasto = newValue;
        // Si el tipo de gasto es Vencimiento Mensual y ya se tiene una fecha, actualizar solo el día
        if (newValue === "Vencimiento Mensual" && newAccountData.date) {
          newAccountData.date = newAccountData.date.split("-").pop(); // Conservar solo el día
        }
      } else if (data === "date") {
        // Si el tipo de gasto es Vencimiento Mensual, actualizar solo el día
        if (newAccountData.tipodegasto === "Vencimiento Mensual") {
          newAccountData.date = newValue.split("-").pop();
        } else {
          newAccountData.date = newValue;
        }
      } else {
        newAccountData[data] = newValue;
      }
  
      setAccountData(newAccountData);
    }
  }
  

  useEffect(() => {
    console.log(accountData);
  }, [accountData]);

  function subirArticulo() {
    console.log("se subio el articulo", accountData);
    window.api.enviarEvento("save-accountToPay", accountData);
    addAccountToPay(accountData);
    setAccountData({
      tipodegasto: "",
      date: "",
      pay: "",
      descripcion: "",
    });
    onChangeModal(false);
  }

  const estilosInput = "outline-none h-9 w-full bg-slate-600 px-2 rounded-md";

  return (
    <div className="absolute bottom-0 top-0 right-0 left-0 flex justify-center items-center z-50">
      <div className="absolute top-0 right-0 bottom-0 left-0 bg-black opacity-60"></div>
      <div className="w-96 bg-white space-y-5 rounded-md relative justify-start text-white  border-black border-2">
        <div className="flex-1 flex flex-row h-8 justify-between bg-slate-700">
          <div className="flex items-center p-1 pl-2">Agrega un Gasto</div>
          <button
            className="bg-red-700 h-8 w-8"
            onClick={() => {
              onChangeModal(false);
            }}
          >
            X
          </button>
        </div>
        <div className="flex-1 flex space-y-5 flex-col px-2 pb-2">
          <div className="flex flex-row space-x-1">
            <div className="flex-1">
              <label htmlFor="tipodegasto" className="text-slate-600">
                Tipo De Gasto
              </label>
              <select
                name="tipodegasto"
                className={estilosInput}
                value={accountData.tipodegasto}
                onChange={(e) => {
                  setChangeData("tipodegasto", e.target.value);
                }}
              >
                <option value="">Selecciona una opción</option>
                <option value="Vencimiento Mensual">Vencimiento Mensual</option>
                <option value="Gasto Diario">Gasto Diario</option>
              </select>
            </div>
          </div>
          <div className="flex-1">
            <label htmlFor="date" className="text-slate-600">
              Dia De Vencimiento
            </label>
            <input
              type={
                accountData.tipodegasto === "Vencimiento Mensual"
                  ? "text"
                  : "date"
              }
              name="date"
              className={estilosInput}
              value={accountData.date}
              onChange={(e) => {
                setChangeData("date", e.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="pay" className="text-slate-600">
              Monto
            </label>
            <input
              type="number"
              name="pay"
              className={estilosInput}
              value={accountData.pay}
              onChange={(e) => {
                setChangeData("pay", e.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="descripcion" className="text-slate-600">
              Descripcion
            </label>
            <input
              type="text"
              name="descripcion"
              className={estilosInput}
              value={accountData.descripcion}
              onChange={(e) => {
                setChangeData("descripcion", e.target.value);
              }}
            />
          </div>
          <div className="flex flex-row space-x-5">
            <button
              className="w-52 h-10 bg-red-700 rounded-md"
              onClick={() => {
                onChangeModal(false);
              }}
            >
              Cancelar
            </button>
            <button
              className="w-52 h-10 bg-green-700 rounded-md"
              onClick={subirArticulo}
            >
              Agregar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAccountToPay;
