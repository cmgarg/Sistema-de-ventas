import React, { useEffect, useState } from "react";
import CustomAlert from "./CustomAlert"; // Importa tu componente de alerta personalizado
import ReactSwitch from "react-switch";
import SelectM from "../../../Select/Select";
import ButtonR from "../../../buttons/ButtonR";
import { motion } from "framer-motion";
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
  useEffect(() => {
    console.log(accountData.meses);
  }, [accountData.meses]);

  return (
    <div className="absolute bottom-0 top-0 right-0 left-0 flex justify-center items-center z-50 w-full h-full">
      <div className="absolute top-0 right-0 bottom-0 left-0 bg-black opacity-60"></div>
      <motion.div
        animate={{ opacity: 1, height: "auto" }} // Estado cuando está visible
        transition={{ duration: 0.3 }}
        layout
        className="flex flex-col w-[500px] py-2 bg-[#2f2f2fff] rounded-md relative justify-start text-white border-slate-800 border overflow-hidden"
      >
        <div className="flex flex-1 flex-col space-y-2 ">
          <div className="flex w-full justify-evenly space-x-2 px-2">
            <motion.div
              animate={{ opacity: 1, height: "auto" }} // Estado cuando está visible
              exit={{ opacity: 0, height: 0 }} // Estado al salir
              transition={{ duration: 0.3 }}
              className="flex-1 flex flex-col justify-center"
            >
              <label htmlFor="tipodegasto" className="text-sm">
                Tipo de gasto
              </label>
              <motion.div
                animate={{ opacity: 1, height: "auto" }} // Estado cuando está visible
                transition={{ duration: 0.3 }}
                className="flex flex-col flex-1 space-y-2 transition-all"
              >
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
                  <motion.div
                    initial={{ opacity: 0, height: 0 }} // Estado inicial (oculto)
                    animate={{ opacity: 1, height: "auto" }} // Estado cuando está visible
                    exit={{ opacity: 0, height: 0 }} // Estado al salir
                    transition={{ duration: 0.2 }} // Duración de la animación (0.3 segundos)
                    className="flex h-9"
                  >
                    <input
                      type="number"
                      name="meses"
                      className="bg-[#707070ff] shadow-[0_2px_5px_rgba(0,0,0,0.50)] focus:bg-[#909090ff] rounded-md w-20 text-start pl-2 outline-none border-slate-800 "
                      value={accountData.meses}
                      min="1"
                      onChange={(e) => {
                        setChangeData("meses", e.target.value);
                      }}
                    />
                  </motion.div>
                ) : null}
              </motion.div>
            </motion.div>

            <div className="flex flex-1 flex-col w-60">
              <label htmlFor="descripcion" className="text-sm">
                Descripcion
              </label>
              <input
                type="text"
                maxLength={18}
                name="descripcion"
                className="outline-none h-10 pl-2 rounded-md bg-[#707070ff] focus:bg-[#909090ff] border shadow-[0_2px_5px_rgba(0,0,0,0.50)] border-gray-600 w-full"
                value={accountData.descripcion}
                onChange={(e) => {
                  setChangeData("descripcion", e.target.value);
                }}
              />
            </div>
          </div>
          <div className="flex pr-2">
            <div className="flex flex-1 flex-col px-2">
              <div className="flex-1 flex flex-col">
                <div className="flex w-full">
                  <label
                    htmlFor="date"
                    className="text-sm h-7 flex items-center"
                  >
                    Dia de vencimiento
                  </label>
                </div>
                <input
                  type="date"
                  name="date"
                  className="outline-none cursor-pointer h-10 px-2 w-full rounded-md bg-[#707070ff] focus:bg-[#909090ff] border shadow-[0_2px_5px_rgba(0,0,0,0.50)] fecha-input fecha-input:focus border-gray-600 text-sm"
                  value={accountData.date}
                  onChange={(e) => {
                    setChangeData("date", e.target.value);
                  }}
                />
              </div>

              <div className="flex-1 flex flex-col items-center justify-center rounded-md border-slate-900 "></div>
            </div>

            <div className="flex flex-1 flex-col">
              <label htmlFor="pay" className="text-sm h-7 flex items-center">
                Monto
              </label>
              <input
                type="text"
                name="pay"
                className="outline-none h-10 px-2 w-full rounded-md bg-[#707070ff] focus:bg-[#909090ff] border shadow-[0_2px_5px_rgba(0,0,0,0.50)] fecha-input fecha-input:focus border-gray-600 text-sm"
                value={accountData.pay}
                onChange={handlePayChange}
                onBlur={handlePayBlur}
              />
            </div>
          </div>
          <div className="flex flex-1">
            <div className="flex space-y-3 items-start justify-start flex-col flex-1 px-2 pt-2">
              <div className=" w-13 flex items-center space-x-2">
                <label htmlFor="notifiacion" className="text-xs">
                  Notificarme el dia de vencimiento
                </label>
                <input
                  type="checkbox"
                  name="pagado"
                  className="h-5 w-5 checked:bg-green-500 rounded-full"
                  checked={accountData.notifiacion}
                  onChange={(e) => {
                    setChangeData("notifiacion", e.target.checked);
                  }}
                />
              </div>
              <div className="flex space-x-2 items-center">
                <div className="text-xs ">Estado de cuenta :</div>

                <div className="flex justify-center space-x-1 rounded-md items-center border-slate-900">
                  <input
                    type="checkbox"
                    name="pagado"
                    className="h-5 w-5 checked:bg-green-500 rounded-full flex"
                    checked={accountData.pagado}
                    onChange={(e) => {
                      setChangeData("pagado", e.target.checked);
                      setEstadoPagado(e.target.checked);
                    }}
                  />
                  <label
                    htmlFor="pagado"
                    className={`text-[10px] ${
                      accountData.pagado && "text-green-500"
                    }`}
                  >
                    Pagado
                  </label>
                </div>
              </div>
            </div>
            <div className="flex w-full text-md justify-end pr-2 space-x-2 flex-1 items-end">
              <ButtonR
                height="h-7"
                width="w-24"
                title="Cancelar"
                bgColor="bg-gradient-to-l from-gray-700 via-gray-700 to-gray-500 text-[#fff8dcff] text-sm"
                textSize="text-sm"
                onClick={() => {
                  onChangeModal(false);
                }}
              ></ButtonR>
              <ButtonR
                height="h-7"
                width="w-32"
                title="Agregar"
                bgColor="bg-gradient-to-l from-yellow-700 via-yellow-700 to-yellow-500 text-[#fff8dcff] text-sm"
                textSize="text-sm"
                onClick={validateAndSubmit}
              ></ButtonR>
            </div>
          </div>{" "}
        </div>
      </motion.div>
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
