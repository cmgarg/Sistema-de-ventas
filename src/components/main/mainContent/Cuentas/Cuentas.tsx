import React, { useEffect, useState } from "react";
import NavMain from "../../navmain/NavMain";
import Export from "../buttons/Export";
import Calendar from "./componentes/Calendar";
import Agregar from "../buttons/Agregar";
import AddAccountToPay from "./componentes/AddAccountToPay/AddAccountToPay";
import ListCuenta from "./componentes/ListCuenta";
import { format } from "date-fns";
import { useSelector } from "react-redux";

interface CuentasProps {
  //PROPS
}

const Cuentas: React.FC<CuentasProps> = (
  {
    /*PROPS*/
  }
) => {
  const [activeModalForm, setActiveModalForm] = useState(false);
  const [accountToPay, setAccountToPay] = useState<
    {
      date: string;
      tipodegasto: string;
      descripcion: string;
      pay: number;
      pagado: boolean;
    }[]
  >([]);
  const [filtroActivo, setFiltroActivo] = useState<string>("ninguno");
  const [orden, setOrden] = useState<"asc" | "desc">("asc");
  const [diaSeleccionado, setDiaSeleccionado] = useState(
    format(new Date(), "yyyy-MM-dd")
  );

  function onChangeModal(p: boolean) {
    setActiveModalForm(p);
  }

  function addAccountToPay(e: {
    date: string;
    tipodegasto: string;
    descripcion: string;
    pay: number;
    pagado: boolean;
  }) {
    const arrayAccounts: {
      date: string;
      tipodegasto: string;
      descripcion: string;
      pay: number;
      pagado: boolean;
    }[] = [...accountToPay, e];
    setAccountToPay(arrayAccounts);
    getAccountsToPay();
  }

  function getAccountsToPay() {
    window.api.enviarEvento("get-accountToPay");
  }

  useEffect(() => {
    getAccountsToPay();

    const recibirCuentas = (
      accounts: {
        date: string;
        tipodegasto: string;
        descripcion: string;
        pay: number;
        pagado: boolean;
      }[]
    ) => {
      setAccountToPay(accounts);
    };

    window.api.recibirEvento("response-get-accountToPay", recibirCuentas);

    return () => {
      window.api.removeListener("response-get-accountToPay", recibirCuentas);
    };
  }, []);

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

  console.log(datosUsuarioRedux,"estos son los datos del usuario iniciaado --------------ppppppppppppppp")
  return (
    <div className="flex flex-col flex-1">
      
        <NavMain title="Cuentas" >
          <Export></Export>
          <Agregar onChangeModal={onChangeModal} title="Cuenta" />
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

          <ListCuenta
            cuentas={accountToPay}
            filtroActivo={filtroActivo}
            orden={orden}
            getAccountsToPay={getAccountsToPay}
          />
        </div>

        <div className="flex h-[90vh] text-white justify-start flex-col mt-2 mr-3 rounded-lg  ">
          <div className="flex h-[21rem] mb-3">
            <Calendar
              diaSeleccionado={diaSeleccionado}
              setDiaSeleccionado={setDiaSeleccionado}
            />
          </div>
          <div className="flex flex-col h-[58vh] ">
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
                    .map((cuenta, index) => (
                      <div
                        className="p-2 border-b-1 border-gray-600"
                        key={cuenta._id}
                      >
                        <div className="flex">
                          <p className="flex-1 pl-1">{cuenta.descripcion}</p>
                          <p className="flex-1">${cuenta.pay}</p>
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
                    .map((cuenta, index) => (
                      <div
                        className="p-2 border-b-1 border-gray-600"
                        key={cuenta._id}
                      >
                        <div className="flex">
                          <p className="flex-1 pl-1">{cuenta.descripcion}</p>
                          <p className="flex-1 ">${cuenta.pay}</p>
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
