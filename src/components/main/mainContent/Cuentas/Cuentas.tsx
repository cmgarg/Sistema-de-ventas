import React, { useEffect, useState } from "react";
import NavMain from "../../navmain/NavMain";
import Export from "../buttons/Export";
import Calendar from "./componentes/Calendar";
import Agregar from "../buttons/Agregar";
import AddAccountToPay from "./componentes/AddAccountToPay/AddAccountToPay";

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

    window.api.recibirEvento("response-get-accountToPay", (accounts) => {
      setAccountToPay([accounts]);
    });

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
        <div className="flex flex-1 flex-col bg-black">
          <div className=" flex flex-row bg-slate-900 h-4/6">
            <div className="flex text-white w-1/4"></div>
            <div className=" flex-1"></div>
          </div>
          <div className=" flex-1 bg-red-600"></div>
        </div>

        <div className=" flex w-1/4 text-white justify-center">
          <Calendar />
        </div>
      </div>
    </div>
  );
};

export default Cuentas;
