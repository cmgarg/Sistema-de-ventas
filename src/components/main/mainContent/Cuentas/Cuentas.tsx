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


interface Cuenta {
  _id: string;
  date: string;
  time: string;
  tipodegasto: string;
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
  console.log(cuentaId,"este es el id de la cuenta de notificacionQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ")
  //////
  const onChangeModal = (p: boolean) => {
    setActiveModalForm(p);
  };

  const addAccountToPay = (e: {
    date: string;
    tipodegasto: string;
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
    <div className="flex flex-col flex-1 mt-2">
      <NavMain title="Cuentas" setLoginUser={""}>
        <ButtonR
          borderSize="border-b-[4px]"
          textSize="text-lg"
          onClick={onChangeModal}
          bgIconColor="bg-gradient-to-l from-gray-700 via-gray-700 to-gray-500 text-[#fff8dcff]"
          height="h-10"
          width="w-10"
        >
          <BiExport size={30} className="text-white" />
        </ButtonR>
        <ButtonR
          borderSize="border-b-[4px]"
          textSize="text-lg"
          onClick={onChangeModal}
          bgIconColor="bg-gradient-to-l from-gray-700 via-gray-700 to-gray-500 text-[#fff8dcff]"
          height="h-10"
          width="w-10"
        >
          <IoAdd size={30} className="text-white" />
        </ButtonR>
      </NavMain>

      <div className="flex flex-1 flex-row">
        {activeModalForm && (
          <AddAccountToPay
            onChangeModal={onChangeModal}
            addAccountToPay={addAccountToPay}
          />
        )}
        <div className="flex flex-1 flex-col m-2">
          <div className="flex flex-row space-x-2 mb-2">
            <div className="flex h-[3rem] w-[11rem] text-white justify-center items-center border rounded-lg border-gray-600">
              Mes
            </div>
            <div
              className="flex-1 flex relative h-[3rem] text-white justify-center items-center hover:bg-slate-900 border rounded-lg border-gray-600"
              onClick={() => cambiarFiltro("tipodegasto")}
            >
              Tipo De Gasto
              <div className="flex absolute right-3"></div>
            </div>
            <div
              className="flex-1 flex relative h-[3rem] text-white justify-center items-center hover:bg-slate-900 border rounded-lg border-gray-600"
              onClick={() => cambiarFiltro("descripcion")}
            >
              Descripcion
              <div className="flex absolute right-3"></div>
            </div>
            <div
              onClick={() => cambiarFiltro("fechafiltrada")}
              className="flex-1 flex relative h-[3rem] text-white justify-center items-center hover:bg-slate-900 border rounded-lg border-gray-600"
            >
              Fecha y Hora
              <div className="flex absolute right-3"></div>
            </div>
            <div
              onClick={() => cambiarFiltro("monto")}
              className="flex-1 flex relative h-[3rem] text-white justify-center items-center hover:bg-slate-900 border rounded-lg border-gray-600"
            >
              Monto
              <div className="flex absolute right-3"></div>
            </div>
            <div
              onClick={() => cambiarFiltro("pagado")}
              className="flex-1 flex relative h-[3rem] text-white justify-center items-center hover:bg-slate-900 border rounded-lg border-gray-600"
            >
              Pagado
              <div className="flex absolute right-3"></div>
            </div>
          </div>
          <div className=" w-full h-full">
            <ListCuenta
            cuentas={accountToPay}
            filtroActivo={filtroActivo}
            orden={orden}
            getAccountsToPay={getAccountsToPay}
            idcuenta={cuentaId}
            />
          </div>
        </div>

        <div className="flex h-[90vh] text-white justify-start flex-col mt-2 mr-3 rounded-lg">
          <div className="flex h-[21rem] mb-3">
            <Calendar
              diaSeleccionado={diaSeleccionado}
              setDiaSeleccionado={setDiaSeleccionado}
            />
          </div>
          <div className="flex flex-col h-[58vh]">
            <div className="pb-3">
              <div className="flex border-gray-600 border mb-2 rounded-lg p-2 items-center justify-center">
                <p className="pl-3">Vencimiento Mensual</p>
              </div>
              <div className="flex pb-10 border border-gray-600 rounded-lg h-[23.5vh] overflow-y-scroll">
                <div className="w-full">
                  {accountToPay
                    .filter(
                      (cuenta) =>
                        cuenta.date === diaSeleccionado &&
                        cuenta.tipodegasto === "Vencimiento Mensual"
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
            <div className="">
              <div className="flex p-2 items-center mb-2 border border-gray-600 rounded-lg justify-center">
                <p className="pl-3">Gastos Diario</p>
              </div>
              <div className="border border-gray-600 rounded-lg h-[23.5vh] overflow-y-scroll">
                <div>
                  {accountToPay
                    .filter(
                      (cuenta) =>
                        cuenta.date === diaSeleccionado &&
                        cuenta.tipodegasto === "Gasto Diario"
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
    </div>
  );
};

export default Cuentas;
