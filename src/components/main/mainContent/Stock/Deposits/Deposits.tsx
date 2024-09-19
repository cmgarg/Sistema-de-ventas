import React, { useEffect, useState } from "react";
import { depositType } from "../../../../../../types/types";
import TableHead from "../../../tablaMain/TableHead";
import TableMain from "../../../tablaMain/TableMain";
import TableRow from "../../../tablaMain/TableRow";
import DepositDetails from "./DepositDetails";

type DepositsProps = {
  // Define tus props aquí
};

const Deposits: React.FC<DepositsProps> = (props) => {
  const [deposits, setDeposits] = useState<depositType[]>([]);
  const [depositToSee, setDepositToSee] = useState<{
    active: boolean;
    deposit: depositType;
  }>({
    active: false,
    deposit: {
      name: "",
      address: "",
      sectors: [],
    },
  });
  //
  const onChangeModalDepositToSee = (e: {
    active: boolean;
    deposit: depositType;
  }) => {
    setDepositToSee(e);
  };
  const getDeposits = () => {
    window.api.enviarEvento("get-deposits");
  };
  useEffect(() => {
    getDeposits();
    window.api.recibirEvento("response-get-deposits", (e) => {
      setDeposits(e);
    });

    return () => {
      window.api.removeAllListeners("response-get-deposits");
    };
  }, []);

  return (
    <div
      className={`flex w-full flex-wrap ${
        deposits.length > 2 ? "justify-between" : ""
      }`}
    >
      {depositToSee.active ? (
        <DepositDetails
          deposit={depositToSee.deposit}
          onChangeModalDepositToSee={onChangeModalDepositToSee}
        />
      ) : null}
      <TableMain>
        <TableHead>
          <div className="flex-1 flex justify-start items-center">Nombre</div>
          <div className="flex-1 flex justify-center items-center">
            Direccion
          </div>
          <div className="flex-1 flex justify-end items-center">Sectores</div>
        </TableHead>
        {deposits.map((dep) => (
          <TableRow
            onClick={() =>
              onChangeModalDepositToSee({ active: true, deposit: dep })
            }
            className="w-1/5 h-52 bg-[#2f2f2fff] border border-gray-600 rounded-lg m-2 text-white"
          >
            <div className="w-full flex flex-1 justify-start text-lg pl-2">
              <p>{dep.name}</p>
            </div>
            <div className="flex flex-1 justify-center">
              <p> {dep.address}</p>
            </div>
            <div className="flex flex-1 justify-end pr-2">
              <p>{dep.sectors.length}</p>
            </div>
          </TableRow>
        ))}
      </TableMain>
    </div>
  );
};

export default Deposits;
