import React, { useEffect, useState } from "react";
import NavMain from "../../navmain/NavMain";
import Export from "../buttons/Export";
import Calendar from "./componentes/Calendar";
import Agregar from "../buttons/Agregar";
import AddAccountToPay from "./componentes/AddAccountToPay/AddAccountToPay";
import ListCuenta from "./componentes/ListCuenta";
import FlechaAbajoSVG from "../../../../assets/MAINSVGS/Cuentas SVG/FlechaAbajoSVG";
import FlechaArribaSVG from "../../../../assets/MAINSVGS/Cuentas SVG/FlechaArribaSVG";

interface CuentasProps {
  //PROPS
}

const Cuentas: React.FC<CuentasProps> = (
  {
    /*PROPS*/
  }
) => {
  const [activeModalForm, setActiveModalForm] = useState(false);

  const [accountToPay, setAccountToPay] = useState<object[]>([]);
  const [filtroBoton, setfiltroBoton] = useState(true);
  const [filtroBoton2, setfiltroBoton2] = useState(true);
  const [filtroBoton3, setfiltroBoton3] = useState(true);
  const [filtroBoton4, setfiltroBoton4] = useState(true);

  function onChangeModal(p: boolean) {
    setActiveModalForm(p);
  }
  function addAccountToPay(e: object) {
    const arrayAccounts = [...accountToPay, e];
    setAccountToPay(arrayAccounts);
    getAccountsToPay();
  }
  function getAccountsToPay() {
    window.api.enviarEvento("get-accountToPay");
  }

  useEffect(() => {
    getAccountsToPay();

    window.api.recibirEvento(
      "response-get-accountToPay",
      (accounts: object[]) => {
        setAccountToPay(accounts);
      }
    );

    console.log("CUENTAS A PAGAR", accountToPay);
  }, []);

  const cambiarTipoGasto = () => {
    if (filtroBoton === true) {
      setfiltroBoton(false);
    } else {
      setfiltroBoton(true);
    }
    console.log(filtroBoton);
  };

  const cambiarDescripcion = () => {
    if (filtroBoton2 === true) {
      setfiltroBoton2(false);
    } else {
      setfiltroBoton2(true);
    }
  };

  const cambiarFecha = () => {
    if (filtroBoton3 === true) {
      setfiltroBoton3(false);
    } else {
      setfiltroBoton3(true);
    }
  };

  const cambiarDinero = () => {
    if (filtroBoton4 === true) {
      setfiltroBoton4(false);
    } else {
      setfiltroBoton4(true);
    }
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="flex-2 border-b-2 border-slate-100">
        <NavMain title="Cuentas A Pagar">
          <Export></Export>
          <Agregar onChangeModal={onChangeModal} title="Cuenta" />
        </NavMain>
      </div>
      <div className="flex flex-1 flex-row bg-slate-800 relative">
        {activeModalForm && (
          <AddAccountToPay
            onChangeModal={onChangeModal}
            addAccountToPay={addAccountToPay}
          ></AddAccountToPay>
        )}
        <div className="flex flex-1 flex-col bg-slate-700">
          <div className=" flex flex-row border-b-2 border-gray-900 bg-slate-700">
            <div
              style={{ userSelect: "none" }}
              className="flex h-12 w-44 bg-slate-700 text-white justify-center items-center border-r-2 border-gray-900"
            >
              Mes
            </div>
            <div
              style={{ userSelect: "none" }}
              className="flex-1 flex relative h-12 bg-slate-700 text-white justify-center items-center border-r-2 border-gray-900 hover:bg-slate-900"
              onClick={cambiarTipoGasto}
            >
              Tipo De Gasto
              <div className="flex absolute right-3">
                {filtroBoton === true ? (
                  <FlechaAbajoSVG height="15" width="15" />
                ) : (
                  <FlechaArribaSVG height="15" width="15" />
                )}
              </div>
            </div>
            <div
              style={{ userSelect: "none" }}
              className="flex-1 flex relative h-12 bg-slate-700 text-white justify-center items-center border-r-2 border-gray-900 hover:bg-slate-900"
              onClick={cambiarDescripcion}
            >
              Descripcion
              <div className="flex absolute right-3">
                {filtroBoton2 === true ? (
                  <FlechaAbajoSVG height="15" width="15" />
                ) : (
                  <FlechaArribaSVG height="15" width="15" />
                )}
              </div>
            </div>
            <div
              style={{ userSelect: "none" }}
              onClick={cambiarFecha}
              className="flex-1 flex relative h-12 bg-slate-700 text-white justify-center items-center border-r-2 border-gray-900 hover:bg-slate-900"
            >
              Vencimiento
              <div className="flex absolute right-3">
                {filtroBoton3 === true ? (
                  <FlechaAbajoSVG height="15" width="15" />
                ) : (
                  <FlechaArribaSVG height="15" width="15" />
                )}
              </div>
            </div>
            <div
              style={{ userSelect: "none" }}
              onClick={cambiarDinero}
              className="flex-1 flex relative h-12 bg-slate-700 text-white justify-center items-center border-r-2 border-gray-900 hover:bg-slate-900"
            >
              Monto
              <div className="flex absolute right-3">
                {filtroBoton4 === true ? (
                  <FlechaAbajoSVG height="15" width="15" />
                ) : (
                  <FlechaArribaSVG height="15" width="15" />
                )}
              </div>
            </div>
            <div
              style={{ userSelect: "none" }}
              className="flex-1 flex h-12 bg-slate-700 text-white justify-center items-center border-r-2 border-gray-900"
            >
              Pagado
            </div>
          </div>

          <ListCuenta
            Cuentas={accountToPay}
            filtroBoton={filtroBoton}
            filtroBoton2={filtroBoton2}
            filtroBoton3={filtroBoton3}
            filtroBoton4={filtroBoton4}
            setAccountToPay={setAccountToPay}
          />
        </div>

        <div className=" flex w-1/4 text-white justify-start flex-col  ">
          <div className=" h-2/5 px-5">
            <Calendar />
          </div>
          <div className=" border-white border-b-2">
            <p className="pl-3">Vencimiento Mensual</p>
          </div>
          <div className=" border-white border-b-2 pt-5">
            <p className="pl-3">Gastos Diario</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cuentas;
