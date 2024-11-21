import React, { useEffect, useState } from "react";
import NavMain from "../../navmain/NavMain";
import Export from "../buttons/Export";
import Calendar from "./componentes/Calendar";
import Agregar from "../buttons/Agregar";
import AddAccountToPay from "./componentes/AddAccountToPay/AddAccountToPay";
import ListCuenta from "./componentes/ListCuenta";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { v4 as uuidv4 } from "uuid";
import ButtonR from "../buttons/ButtonR";
import { IoAdd } from "react-icons/io5";
import { BiExport } from "react-icons/bi";
import { sendNotification } from "../../Main";
import { useLocation } from "react-router-dom";
import { MdAdd } from "react-icons/md";

interface Cuenta {
  _id: string;
  date: string;
  time: string;
  tipodegasto: { value: string; label: string };
  descripcion: string;
  pay: number;
  pagado: boolean;
  meses: number;
}

const Cuentas: React.FC = () => {
  const [activeModalForm, setActiveModalForm] = useState(false);
  const [accountToPay, setAccountToPay] = useState<Cuenta[]>([]);
  const [filtroActivo, setFiltroActivo] = useState<string>("ninguno");
  const [orden, setOrden] = useState<"asc" | "desc">("asc");
  const [diaSeleccionado, setDiaSeleccionado] = useState(
    format(new Date(), "yyyy-MM-dd")
  );

  ///id cuenta a actualizar
  // Obtener parámetros de la URL
  ///id cuenta a actualizar
  // Obtener parámetros de la URL
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search); // Asegúrate de usar correctamente URLSearchParams
  const cuentaId = queryParams.get("idcuenta"); // Usamos "idcuenta" como nombre de parámetro en la URL
  console.log(
    cuentaId,
    "este es el id de la cuenta de notificacionQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ"
  );
  //////
  const onChangeModal = (p: boolean) => {
    setActiveModalForm(p);
  };

  const addAccountToPay = (e: {
    date: string;
    tipodegasto: { value: string; label: string };
    descripcion: string;
    pay: number;
    pagado: boolean;
    pagado2?: string;
    pagado3?: string;
  }) => {
    const newAccount: Cuenta = {
      ...e,
      _id: uuidv4(),
      time: new Date().toISOString().split("T")[1].split(".")[0],
      meses: 1,
    };
    setAccountToPay((prev) => [...prev, newAccount]);
  };

  const getAccountsToPay = () => {
    window.api.enviarEvento("get-accountToPay");
  };

  useEffect(() => {
    // Solicitar cuentas cada vez que el componente se monta
    getAccountsToPay();

    const recibirCuentas = (accounts: Cuenta[]) => {
      console.log("Cuentas recibidas desde el backend:", accounts);
      setAccountToPay([...accounts]);
    };

    // Configurar el listener para recibir las cuentas
    window.api.recibirEvento("response-get-accountToPay", recibirCuentas);

    return () => {
      // Eliminar el listener cuando el componente se desmonta
      console.log("Eliminando listener para 'response-get-accountToPay'");
      window.api.removeListener("response-get-accountToPay", recibirCuentas);
    };
  }, []); // Se elimina accountToPay de las dependencias para evitar bucles

  const cambiarFiltro = (tipo: string) => {
    if (filtroActivo === tipo) {
      setOrden(orden === "asc" ? "desc" : "asc");
    } else {
      setFiltroActivo(tipo);
      setOrden("asc");
    }
  };

  const datosUsuarioRedux = useSelector(
    (state: RootState) => state.estadoTipoDeUser.datosUsuario
  );

  const formatNumber = (num: number | string) => {
    const number = typeof num === "number" ? num : parseFloat(num);
    if (isNaN(number)) {
      return "0.00";
    }
    return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
  };

  return (
    <div className="flex flex-col flex-1 overflow-auto">
      <div className="absolute top-0 right-[339px] left-44 h-10 z-30 app-region-drag">
        <NavMain title="Articulos" setLoginUser={""}>
          <Export></Export>
          <ButtonR
            borderSize="border-x border-gray-600"
            textSize="text-lg"
            onClick={onChangeModal}
            bgIconColor="bg-gradient-to-l from-gray-700 via-gray-700 to-gray-500 text-[#fff8dcff]"
            height="h-8"
            width="w-10"
          >
            <IoAdd size={30} className="text-white" />
          </ButtonR>
        </NavMain>
      </div>
      <div className="flex flex-1 flex-row h-full">
        {activeModalForm && (
          <AddAccountToPay
            onChangeModal={onChangeModal}
            addAccountToPay={addAccountToPay}
          />
        )}
        <div className="flex flex-1 flex-col m-2 space-y-2">
          <div className="flex flex-row h-12 space-x-2 ">
            <div className="flex h-full w-52 text-white justify-center items-center border rounded-lg border-gray-600 select-none cursor-pointer hover:brightness-125 bg-black bg-opacity-35 hover:border-yellow-900">
              <p>Mes</p>
            </div>
            <div
              className="flex-1 flex relative h-full text-white justify-center items-center hover:bg-slate-900 border rounded-lg border-gray-600 select-none cursor-pointer hover:brightness-125 bg-black bg-opacity-35 hover:border-yellow-900"
              onClick={() => cambiarFiltro("tipodegasto")}
            >
              <p>Tipo De Gasto</p>
            </div>
            <div
              className="flex-1 flex relative h-full text-white  justify-center items-center hover:bg-slate-900 border rounded-lg border-gray-600 select-none cursor-pointer hover:brightness-125 bg-black bg-opacity-35 hover:border-yellow-900"
              onClick={() => cambiarFiltro("descripcion")}
            >
              <p>Descripcion</p>
            </div>
            <div
              onClick={() => cambiarFiltro("fechafiltrada")}
              className="flex-1 flex relative h-full text-white justify-center items-center hover:bg-slate-900 border rounded-lg border-gray-600 select-none cursor-pointer hover:brightness-125 bg-black bg-opacity-35 hover:border-yellow-900"
            >
              <p> Fecha y Hora</p>
            </div>
            <div
              onClick={() => cambiarFiltro("monto")}
              className="flex-1 flex relative h-full text-white justify-center items-center hover:bg-slate-900 border rounded-lg border-gray-600 select-none cursor-pointer hover:brightness-125 bg-black bg-opacity-35 hover:border-yellow-900"
            >
              <p>Monto</p>
            </div>
            <div
              onClick={() => cambiarFiltro("pagado")}
              className="flex-1 flex relative h-full text-white justify-center items-center hover:bg-slate-900 border rounded-lg border-gray-600 select-none cursor-pointer hover:brightness-125 bg-black bg-opacity-35 hover:border-yellow-900"
            >
              <p>Pagado</p>
            </div>
          </div>
          <div className="w-full flex-1 flex">
            <ListCuenta
              cuentas={accountToPay}
              filtroActivo={filtroActivo}
              orden={orden}
              getAccountsToPay={getAccountsToPay}
              idcuenta={cuentaId}
            />
          </div>
        </div>
        <div className="flex p-2 h-full text-white flex-col rounded-lg space-y-2">
          <div className="flex">
            <Calendar
              diaSeleccionado={diaSeleccionado}
              setDiaSeleccionado={setDiaSeleccionado}
            />
          </div>
          <div className="flex-1 flex flex-col">
            <div className="flex border-gray-600 border rounded-t-lg justify-center items-center h-10">
              <p className="">Vencimiento Mensual</p>
            </div>
            <div className="flex border border-gray-600 rounded-b-lg flex-1 overflow-y-scroll">
              <div className="w-full">
                {accountToPay
                  .filter(
                    (cuenta) =>
                      cuenta.date === diaSeleccionado &&
                      cuenta.tipodegasto.value === "vencimiento-mensual"
                  )
                  .map((cuenta) => (
                    <div
                      className="p-2 border-b-1 border-gray-600"
                      key={cuenta._id}
                    >
                      <div className="flex">
                        <p className="flex-1 pl-1">{cuenta.descripcion}</p>
                        <p className="flex-1 ">${formatNumber(cuenta.pay)}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="flex-1 h-32 flex flex-col">
            <div className="flex items-center border border-gray-600 rounded-t-lg justify-center h-10">
              <p className="">Gastos Diarios</p>
            </div>
            <div className="border border-gray-600 rounded-b-lg flex-1 overflow-y-scroll">
              <div>
                {accountToPay
                  .filter(
                    (cuenta) =>
                      cuenta.date === diaSeleccionado &&
                      cuenta.tipodegasto.value === "gasto-diario"
                  )
                  .map((cuenta) => (
                    <div
                      className="p-2 border-b-1 border-gray-600"
                      key={cuenta._id}
                    >
                      <div className="flex">
                        <p className="flex-1 pl-1">{cuenta.descripcion}</p>
                        <p className="flex-1 ">${formatNumber(cuenta.pay)}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cuentas;
