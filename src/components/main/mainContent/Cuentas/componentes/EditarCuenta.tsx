import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import ReactSwitch from "react-switch";

interface Cuenta {
  meses: number; // asegúrate de que 'meses' sea siempre un número
  tipodegasto: string;
  date: string;
  time?: string; // Agrega la propiedad 'time' si es necesario
  pay: number;
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
  const [accountData, setAccountData] = useState<Cuenta>(
    cuentaSeleccionada || {
      tipodegasto: "",
      date: "",
      time: "", // Agrega la propiedad 'time' si es necesario
      pay: 0,
      descripcion: "",
      pagado: false,
      meses: 1,
      _id: "",
      notifiacion: cuentaSeleccionada.notifiacion,
    }
  );

  useEffect(() => {
    if (cuentaSeleccionada) {
      setAccountData(cuentaSeleccionada);
    }
  }, [cuentaSeleccionada]);

  function setChangeData<K extends keyof Cuenta>(key: K, value: Cuenta[K]) {
    setAccountData((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  async function guardarHistorialCuenta(cuentaActualizada: Cuenta) {
    const fechaActual = new Date();
  
    // Obtener la fecha en formato "YYYY-MM-DD"
    const fecha_edicion = fechaActual.toLocaleDateString('es-AR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).split('/').reverse().join('-');
  
    // Obtener la hora exacta en formato "HH:MM:SS"
    const fecha_edicionHora = fechaActual.toLocaleTimeString('es-AR', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
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
    if (!tipodegasto || !date || pay <= 0 || !descripcion) {
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
  
  return (
    <div className="absolute bottom-0 top-0 right-0 left-0 flex justify-center items-center z-50 w-full h-full">
      <div className="absolute top-0 right-0 bottom-0 left-0 bg-black opacity-60"></div>
      <div
        className="w-1/4 h-2/2 bg-gray-600 space-y-5 rounded-3xl relative justify-start text-white border-gray-50 border"
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
                  setChangeData("tipodegasto", e.target.value as string);
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
                      setChangeData("meses", Number(e.target.value));
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
                setChangeData("date", e.target.value as string);
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
            <label htmlFor="pay" className="text-white text-lg p-2">
              Monto
            </label>
            <input
              type="number"
              name="pay"
              className="outline-none h-9 w-56 px-2 rounded-md bg-slate-700"
              value={accountData.pay}
              onChange={(e) => {
                setChangeData("pay", Number(e.target.value));
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
              className="outline-none h-9 w-56 px-2 rounded-md bg-slate-700"
              value={accountData.descripcion}
              onChange={(e) => {
                setChangeData("descripcion", e.target.value as string);
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
