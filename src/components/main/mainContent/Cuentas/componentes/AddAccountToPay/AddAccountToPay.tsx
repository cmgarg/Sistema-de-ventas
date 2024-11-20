import React, { useEffect, useState } from "react";
import CustomAlert from "./CustomAlert"; // Importa tu componente de alerta personalizado
import ReactSwitch from "react-switch";
import SelectM from "../../../Select/Select";

interface AddAccountToPayProps {
  onChangeModal: (p: boolean) => void;
  addAccountToPay: (account: {
    date: string;
    dateTime: string;
    tipodegasto: { value: string; label: string };
    descripcion: string;
    pay: number;
    pagado: boolean;
    pagado2?: string;
    pagado3?: string;
    notifiacion?: boolean;
    senotifico?: boolean; // Agregamos la propiedad aquí
  }) => void;
}

const AddAccountToPay: React.FC<AddAccountToPayProps> = ({
  onChangeModal,
  addAccountToPay,
}) => {
  type accountObject = {
    tipodegasto: { value: string; label: string };
    date: string;
    dateTime: string;
    pay: string; // Mantener como string para el estado interno
    descripcion: string;
    pagado: boolean;
    meses: number;
    time?: string;
    pagado2?: string;
    pagado3?: string;
    notifiacion?: boolean;
    senotifico?: boolean;
  };

  const [accountData, setAccountData] = useState<accountObject>({
    tipodegasto: { value: "", label: "" },
    date: "",
    dateTime: "",
    pay: "",
    descripcion: "",
    pagado: false,
    meses: 1,
    notifiacion: false,
    senotifico: false,
  });

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [estadoPagado, setEstadoPagado] = useState(false);

  function setChangeData(data: string, value: string | number | boolean) {
    let newAccountData = { ...accountData };
    (newAccountData as any)[data] = value;
    setAccountData(newAccountData);
  }

  useEffect(() => {
    console.log(accountData);
  }, [accountData]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        event.preventDefault();
        validateAndSubmit();
      } else if (event.key === "Escape") {
        onChangeModal(false);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [accountData]);

  function subirArticulo() {
    const now = new Date();
    const time = now.toTimeString().split(" ")[0];
    const dateTime = new Date().toLocaleTimeString("es-AR", { hour12: false });
    const dateDay = now.toISOString().split("T")[0];
    const date = now.toISOString().split("T")[0];
    const pagado2 = accountData.pagado ? date : "";
    const pagado3 = accountData.pagado ? time : "";
    const newAccountData = {
      ...accountData,
      time,
      dateTime,
      dateDay,
      pagado2,
      pagado3,
    };

    const newAccount = {
      date: newAccountData.date,
      dateTime: newAccountData.dateTime,
      dateDay: newAccountData.dateDay, // Añadir `dateDay` aquí
      tipodegasto: newAccountData.tipodegasto,
      descripcion: newAccountData.descripcion,
      pay: parseFloat(newAccountData.pay.replace(/,/g, "")), // Convertir `pay` a número
      pagado: newAccountData.pagado,
      pagado2: newAccountData.pagado2,
      pagado3: newAccountData.pagado3,
      notifiacion: newAccountData.notifiacion,
      senotifico: newAccountData.senotifico, // Aseguramos que senotifico se incluya
    };

    if (accountData.tipodegasto.value === "vencimiento-mensual") {
      for (let i = 0; i < accountData.meses; i++) {
        const accountWithDate = {
          ...newAccount,
          date: new Date(
            new Date(accountData.date).setMonth(
              new Date(accountData.date).getMonth() + i
            )
          )
            .toISOString()
            .split("T")[0],
          dateTime: i === 0 ? dateTime : "", // Solo asignar `dateTime` en la primera cuenta
        };
        window.api.enviarEvento("save-accountToPay", accountWithDate);
        addAccountToPay(accountWithDate);
      }
    } else {
      window.api.enviarEvento("save-accountToPay", newAccount);
      addAccountToPay(newAccount);
    }
    // Reiniciar los valores
    setAccountData({
      tipodegasto: { value: "", label: "" },
      date: "",
      dateTime: "",
      pay: "",
      descripcion: "",
      pagado: false,
      meses: 1,
      notifiacion: false,
      senotifico: false, // Reiniciar la propiedad
    });
    onChangeModal(false);
  }

  function validateAndSubmit() {
    const { tipodegasto, date, pay, descripcion } = accountData;
    if (!tipodegasto.value || !date || !pay || !descripcion) {
      setAlertMessage(
        "Por favor, completa todos los campos antes de continuar."
      );
      setShowAlert(true);
      return;
    }

    subirArticulo();
  }

  const formatNumber = (value: string) => {
    if (!value) return "";
    const [integerPart, decimalPart] = value.split(".");
    const formattedIntegerPart = parseInt(integerPart).toLocaleString("en-US");
    return decimalPart !== undefined
      ? `${formattedIntegerPart}.${decimalPart}`
      : formattedIntegerPart;
  };

  const handlePayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, "");
    if (!isNaN(Number(value)) || value === "") {
      setChangeData("pay", value);
    }
  };

  const handlePayBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value.replace(/,/g, ""));
    if (!isNaN(value)) {
      setChangeData(
        "pay",
        value.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      );
    }
  };

  return (
    <div className="absolute bottom-0 top-0 right-0 left-0 flex justify-center items-center z-50 w-full h-full">
      <div className="absolute top-0 right-0 bottom-0 left-0 bg-black opacity-60"></div>
      <div className="flex flex-col w-[600px] h-4/5 bg-slate-950 rounded-3xl relative justify-start text-white border-slate-800 border overflow-hidden">
        <div className="flex flex-row h-8 text-xl items-center justify-center bg-red-500">
          <div>Agregar Cuenta</div>
        </div>
        <div className="flex flex-1 flex-col bg-green-500">
          <div className="flex w-full justify-evenly space-x-2 px-2">
            <div className="flex-1 flex flex-col justify-center">
              <label htmlFor="tipodegasto" className="text-sm">
                Tipo de gasto
              </label>
              <div className="flex flex-row flex-1">
                <SelectM
                  className="outline-none h-10 w-full rounded-md bg-[#707070ff] shadow-[0_2px_5px_rgba(0,0,0,0.50)] focus:bg-[#909090ff] border-gray-600 cursor-pointer"
                  value={accountData.tipodegasto.label}
                  onChangeSelection={(e) => {
                    setChangeData("tipodegasto", e);
                  }}
                  options={[
                    {
                      value: "vencimiento-mensual",
                      label: "Vencimiento Mensual",
                    },
                    { value: "gasto-diario", label: "Gasto Diario" },
                  ]}
                  todos={false}
                  slice={3}
                  placeholder="Selecciona una opcion"
                ></SelectM>

                {accountData.tipodegasto.value === "vencimiento-mensual" ? (
                  <div className="flex h-14 mr-3">
                    <input
                      type="number"
                      name="meses"
                      className="bg-[#707070ff] shadow-[0_2px_5px_rgba(0,0,0,0.50)] focus:bg-[#909090ff] rounded-md w-12 text-center outline-none border-slate-800"
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

            <div className="flex flex-1 flex-col w-60">
              <label htmlFor="descripcion" className="text-sm">
                Descripcion
              </label>
              <input
                type="text"
                maxLength={18}
                name="descripcion"
                className="outline-none h-10 pl-2 rounded-md bg-[#707070ff] focus:bg-[#909090ff] border shadow-[0_2px_5px_rgba(0,0,0,0.50)] border-slate-900 w-full"
                value={accountData.descripcion}
                onChange={(e) => {
                  setChangeData("descripcion", e.target.value);
                }}
              />
            </div>
          </div>

          <div className="flex-1 flex flex-col">
            <label htmlFor="date" className="text-sm p-2 pl-4">
              Dia De Vencimiento
            </label>
            <input
              type="date"
              name="date"
              className="outline-none h-14 px-2 rounded-md bg-slate-900 fecha-input fecha-input:focus border-slate-900 mr-3 ml-3  text-2xl"
              value={accountData.date}
              onChange={(e) => {
                setChangeData("date", e.target.value);
              }}
            />
          </div>

          <div className="flex-1 flex items-center h-14 rounded-md bg-slate-900 border-slate-900 m-3">
            <label htmlFor="notifiacion" className="text-xl p-2 pl-4">
              Notificarme el dia de vencimiento
            </label>
            <ReactSwitch
              id="notifiacion"
              checked={accountData.notifiacion}
              onChange={(checked) => {
                setChangeData("notifiacion", checked);
              }}
              onColor="#86d3ff"
              onHandleColor="#2693e6"
              handleDiameter={30}
              uncheckedIcon={false}
              checkedIcon={false}
              boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
              activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
              height={20}
              width={48}
              className="ml-10"
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
              onChange={handlePayChange}
              onBlur={handlePayBlur}
            />
          </div>

          <div className="w-56 text-xl pl-4 mt-2">Estado de cuenta</div>

          <div className="flex h-14 rounded-md bg-slate-900 items-center justify-around border-slate-900 mb-4 m-3 ">
            <label
              htmlFor="pagado"
              className={`text-2xl p-2 pl-4 ${
                estadoPagado && "text-green-500"
              }`}
            >
              Pagado
            </label>
            <input
              type="checkbox"
              name="pagado"
              className="h-6 w-6 checked:bg-green-500"
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
              onClick={() => {
                onChangeModal(false);
              }}
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

export default AddAccountToPay;
