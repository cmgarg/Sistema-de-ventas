import React, { useEffect, useState } from "react";

interface AddAccountToPayProps {
  onChangeModal: (p: boolean) => void;
  addAccountToPay: (account: object) => void;
}

const AddAccountToPay: React.FC<AddAccountToPayProps> = ({
  onChangeModal,
  addAccountToPay,
}) => {
  //DATOS USUARIOS

  type accountObject = {
    text: string;
    date: string;
    pay: string;
  };

  const [accountData, setAccountData] = useState<accountObject>({
    text: "",
    date: "",
    pay: "",
  });

  function setChangeData(data: string, value: string) {
    console.log("LLAMA LA FUNCION");
    const existingData = ["text", "date", "pay"];
    console.log(existingData.includes(data), "esto");
    if (existingData.includes(data)) {
      switch (data) {
        case "text":
          console.log("se cumple esrte");
          setAccountData({ ...accountData, text: value });
          break;
        case "date":
          setAccountData({ ...accountData, date: value });
          break;
        case "pay":
          setAccountData({ ...accountData, pay: value });
          break;
        default:
          break;
      }
    } else {
      console.log("NO ESTA");
    }
  }
  useEffect(() => {
    console.log(accountData);
  }, [accountData]);

  //SUBIR USUARIO A BASE DE DATOS LOCAL

  function subirArticulo() {
    window.api.enviarEvento("save-accountToPay", accountData);

    addAccountToPay(accountData);

    setAccountData({
      text: "",
      date: "",
      pay: "",
    });
    onChangeModal(false);
  }
  //ESTILOS INPUT
  const estilosInput = "outline-none h-9 w-full bg-slate-600 px-2 rounded-md";

  return (
    <div className="absolute bottom-0 top-0 right-0 left-0 flex justify-center items-center z-50">
      <div className="w-96 bg-white space-y-5 p-2 text-white rounded-md relative">
        <button
          className="bg-red-500 h-10 w-10 rounded-full absolute -right-2 -top-2"
          onClick={() => {
            onChangeModal(false);
          }}
        >
          X
        </button>
        <div className="flex flex-row space-x-1">
          <div className="flex-1">
            <label htmlFor="text" className="text-slate-600">
              Cuenta
            </label>
            <input
              type="text"
              name="text"
              className={estilosInput}
              value={accountData.text}
              onChange={(e) => {
                setChangeData("text", e.target.value);
              }}
            />
          </div>
          <div className="flex-1">
            <label htmlFor="date" className="text-slate-600">
              Fecha
            </label>
            <input
              type="date"
              name="marca"
              className={estilosInput}
              value={accountData.date}
              onChange={(e) => {
                setChangeData("date", e.target.value);
              }}
            />
          </div>
        </div>
        <div>
          <label htmlFor="pay" className="text-slate-600">
            Monto
          </label>
          <input
            type="text"
            name="pay"
            className={estilosInput}
            value={accountData.pay}
            onChange={(e) => {
              setChangeData("pay", e.target.value);
            }}
          />
        </div>
        <div className="flex flex-row space-x-5">
          <button
            className="w-52 h-10 bg-red-400 rounded-md"
            onClick={() => {
              onChangeModal(false);
            }}
          >
            Cancelar
          </button>
          <button
            className="w-52 h-10 bg-green-400 rounded-md"
            onClick={subirArticulo}
          >
            Añadir
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddAccountToPay;
