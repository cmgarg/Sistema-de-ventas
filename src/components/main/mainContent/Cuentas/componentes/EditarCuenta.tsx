import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import ReactSwitch from "react-switch";
import ButtonR from "../../buttons/ButtonR";
import SelectM from "../../Select/Select";
import { motion } from "framer-motion";
interface Cuenta {
  meses: number | string; // asegúrate de que 'meses' sea siempre un número
  tipodegasto: { value: string; label: string };
  date: string;
  time?: string; // Agrega la propiedad 'time' si es necesario
  pay: string;
  descripcion: string;
  pagado: boolean;
  _id: string;
  notifiacion: boolean;
}

interface EditarCuentaProps {
  onChangeModal: (p: boolean) => void;
  cuentaSeleccionada: any;
  getAccountsToPay: () => void;
}

const EditarCuenta: React.FC<EditarCuentaProps> = ({
  onChangeModal,
  cuentaSeleccionada,
  getAccountsToPay,
}) => {
  const [accountData, setAccountData] = useState<Cuenta>(cuentaSeleccionada);

  useEffect(() => {
    if (cuentaSeleccionada) {
      setAccountData(cuentaSeleccionada);
    }
  }, []);

  function setChangeData<K extends keyof Cuenta>(key: K, value: Cuenta[K]) {
    setAccountData((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  async function guardarHistorialCuenta(cuentaActualizada: Cuenta) {
    const fechaActual = new Date();

    // Obtener la fecha en formato "YYYY-MM-DD"
    const fecha_edicion = fechaActual
      .toLocaleDateString("es-AR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .split("/")
      .reverse()
      .join("-");

    // Obtener la hora exacta en formato "HH:MM:SS"
    const fecha_edicionHora = fechaActual.toLocaleTimeString("es-AR", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    // Crear el objeto historial con la fecha y la hora separadas
    const historial = {
      fecha_edicion, // Fecha de edición actual (solo la fecha)
      fecha_edicionHora, // Hora de edición actual (solo la hora)
      cuenta: { ...cuentaActualizada }, // Guardar toda la cuenta actualizada dentro del objeto 'cuenta'
    };

    // Enviar el evento para guardar el historial
    window.api.enviarEvento("guardar-historial-cuenta", historial);
  }

  function validateAndSubmit() {
    const { tipodegasto, date, pay, descripcion } = accountData;
    if (!tipodegasto || !date || pay <= "" || !descripcion) {
      Swal.fire({
        title: "Error!",
        text: "Por favor, completa todos los campos antes de continuar.",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }

    if (cuentaSeleccionada) {
      // Aquí llamamos al evento save-accountToPay para actualizar la cuenta en la base de datos
      window.api.enviarEvento("save-accountToPayeditar", accountData);

      onChangeModal(false);

      // Mostrar mensaje de éxito
      Swal.fire({
        title: "¡Éxito!",
        text: "La cuenta ha sido editada correctamente.",
        icon: "success",
        confirmButtonText: "Ok",
      });

      // Refrescar las cuentas después de actualizar
      getAccountsToPay();
    } else {
      console.error("No hay cuenta seleccionada para actualizar");
    }

    // Guardar el historial de la cuenta editada
    guardarHistorialCuenta(accountData);
  }
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
    console.log(accountData);
  }, []);

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
            <div className="flex flex-1 flex-col">
              <label
                htmlFor="descripcion"
                className="text-sm h-7 flex items-center"
              >
                <p>Descripcion</p>
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
            <div className="flex items-start justify-start flex-col flex-1 px-2 pt-2">
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
                title="Guardar"
                bgColor="bg-gradient-to-l from-yellow-700 via-yellow-700 to-yellow-500 text-[#fff8dcff] text-sm"
                textSize="text-sm"
                onClick={validateAndSubmit}
              ></ButtonR>
            </div>
          </div>{" "}
        </div>
      </motion.div>
    </div>
  );
};

export default EditarCuenta;
