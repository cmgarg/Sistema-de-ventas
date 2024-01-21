import React, { useEffect, useState } from "react";
import NavMain from "../../navmain/NavMain";
import Export from "../buttons/Export";
import Calendar from "./componentes/Calendar";
import Agregar from "../buttons/Agregar";
import AddAccountToPay from "./componentes/AddAccountToPay/AddAccountToPay";
import ListCuenta from "./componentes/ListCuenta";

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

  function onChangeModal(p: boolean) {
    setActiveModalForm(p);
  }
  function addAccountToPay(e: object) {
    const arrayAccounts = [...accountToPay, e];
    setAccountToPay(arrayAccounts);
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
            <div className="flex h-12 w-44 bg-slate-700 text-white justify-center items-center border-r-2 border-gray-900">
              <div>Mes Actual</div>
              <div>a</div>
            </div>
            <div className="flex-1 flex h-12 bg-slate-700 text-white justify-center items-center border-r-2 border-gray-900">
              Tipo De Gasto
            </div>
            <div className="flex-1 flex h-12 bg-slate-700 text-white justify-center items-center border-r-2 border-gray-900">
              Descripcion
            </div>
            <div className="flex-1 flex h-12 bg-slate-700 text-white justify-center items-center border-r-2 border-gray-900">
              Dia de vencimiento
            </div>
            <div className="flex-1 flex h-12 bg-slate-700 text-white justify-center items-center border-r-2 border-gray-900">
              Monto
            </div>
            <div className="flex-1 flex h-12 bg-slate-700 text-white justify-center items-center border-r-2 border-gray-900">
              Pagado
            </div>
          </div>

          <ListCuenta Cuentas={accountToPay} />
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
