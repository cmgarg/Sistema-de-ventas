import React, { useEffect, useState } from "react";
import NavMain from "../../navmain/NavMain";
import Export from "../buttons/Export";
import Calendar from "./componentes/Calendar";
import Agregar from "../buttons/Agregar";
import AddAccountToPay from "./componentes/AddAccountToPay/AddAccountToPay";
import ListCuenta from "./componentes/ListCuenta";
import { format } from "date-fns";

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
  const [diaSeleccionado, setDiaSeleccionado] = useState(
    format(new Date(), "yyyy-MM-dd")
  );
  console.log(accountToPay, "estas son las cuentas obtenidas en cuentas");

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

  const cuentasFiltradasPorDia1 = accountToPay.filter(
    (cuenta) =>
      cuenta.date === diaSeleccionado &&
      cuenta.tipodegasto === "Vencimiento Mensual"
  );

  const cuentasFiltradasPorDia2 = accountToPay.filter(
    (cuenta) =>
      cuenta.date === diaSeleccionado && cuenta.tipodegasto === "Gasto Diario"
  );

  return (
    <div className="flex flex-col flex-1">
      <div className="flex-2">
        <NavMain title="Cuentas A Pagar">
          <Export></Export>
          <Agregar onChangeModal={onChangeModal} title="Cuenta" />
        </NavMain>
      </div>
      <div className="flex flex-1 flex-row ">
        {activeModalForm && (
          <AddAccountToPay
            onChangeModal={onChangeModal}
            addAccountToPay={addAccountToPay}
          ></AddAccountToPay>
        )}
        <div className="flex flex-1 flex-col m-2">
          <div className=" flex flex-row space-x-2 mb-2">
            <div
              style={{ userSelect: "none" }}
              className="flex h-12 w-44  text-white justify-center items-center border rounded-lg border-gray-600"
            >
              Mes
            </div>
            <div
              style={{ userSelect: "none" }}
              className="flex-1 flex relative h-12 text-white justify-center items-center  hover:bg-slate-900 border rounded-lg border-gray-600"
              onClick={cambiarTipoGasto}
            >
              Tipo De Gasto
              <div className="flex absolute right-3"></div>
            </div>
            <div
              style={{ userSelect: "none" }}
              className="flex-1 flex relative h-12 text-white justify-center items-center  hover:bg-slate-900 border rounded-lg border-gray-600"
              onClick={cambiarDescripcion}
            >
              Descripcion
              <div className="flex absolute right-3"></div>
            </div>
            <div
              style={{ userSelect: "none" }}
              onClick={cambiarFecha}
              className="flex-1 flex relative h-12  text-white justify-center items-center hover:bg-slate-900 border rounded-lg border-gray-600"
            >
              Vencimiento
              <div className="flex absolute right-3"></div>
            </div>
            <div
              style={{ userSelect: "none" }}
              onClick={cambiarDinero}
              className="flex-1 flex relative h-12  text-white justify-center items-center hover:bg-slate-900 border rounded-lg border-gray-600"
            >
              Monto
              <div className="flex absolute right-3"></div>
            </div>
            <div
              style={{ userSelect: "none" }}
              className="flex-1 flex h-12  text-white justify-center items-center border rounded-lg border-gray-600"
            >
              Pagado
            </div>
          </div>

          <ListCuenta
            cuentas={accountToPay}
            filtroBoton={filtroBoton}
            filtroBoton2={filtroBoton2}
            filtroBoton3={filtroBoton3}
            filtroBoton4={filtroBoton4}
            getAccountsToPay={getAccountsToPay}
          />
        </div>

        <div className="flex text-white justify-start flex-col mt-2 mr-3 rounded-lg">
          <div className="w-[22rem] h-[21rem] px-5 mb-6">
            <Calendar
              diaSeleccionado={diaSeleccionado}
              setDiaSeleccionado={setDiaSeleccionado}
            />
          </div>
          <div className="medidas-1 flex flex-col">
            <div className="medidas-2">
              <div className="flex border-gray-600 border mb-2 rounded-lg p-2 items-center justify-center">
                <p className="pl-3">Vencimiento Mensual</p>
              </div>
              <div className="mb-10 border border-gray-600 rounded-lg medidas-3 overflow-auto scroll-container">
                <div className="scroll-content">
                  {cuentasFiltradasPorDia1.map((cuenta, index) => (
                    <div className="p-2 border-b-1 border-gray-600" key={index}>
                      <div className="flex flex-row">
                        <p className="flex-1 pl-1 text-center">
                          {cuenta.descripcion}
                        </p>{" "}
                        <p className="flex-1 text-center">${cuenta.pay}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="medidas-2">
              <div className="flex p-2 items-center mb-3 border border-gray-600 rounded-lg justify-center">
                <p className="pl-3">Gastos Diario</p>
              </div>
              <div className="border border-gray-600 rounded-lg medidas-3 overflow-auto scroll-container">
                <div className="scroll-content">
                  {cuentasFiltradasPorDia2.map((cuenta, index) => (
                    <div className="p-2 border-b-1 border-gray-600" key={index}>
                      <div className="flex flex-row">
                        <p className="flex-1 pl-1 text-center">
                          {cuenta.descripcion}
                        </p>{" "}
                        <p className="flex-1 text-center">${cuenta.pay}</p>
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
