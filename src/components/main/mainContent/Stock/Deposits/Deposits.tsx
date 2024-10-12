import React, { useEffect, useState } from "react";
import { depositType } from "../../../../../../types/types";
import TableHead from "../../../tablaMain/TableHead";
import TableMain from "../../../tablaMain/TableMain";
import TableRow from "../../../tablaMain/TableRow";
import DepositDetails from "./DepositDetails";
import ButtonR from "../../buttons/ButtonR";
import { BiAddToQueue } from "react-icons/bi";
import { IoAdd } from "react-icons/io5";
import CreateDeposit from "./CreateDeposit";

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
  const [onCreateDeposit, setOnCreateDeposit] = useState<boolean>(false);
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

  const onChangeCreateDeposit = (e: boolean) => {
    setOnCreateDeposit(e);
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
      {onCreateDeposit && (
        <CreateDeposit onChangeCreateDeposit={onChangeCreateDeposit} />
      )}
      <div className="w-full mb-2">
        <ButtonR
          title="Crear nuevo deposito"
          bgColor="bg-gradient-to-l from-green-800 via-green-700 to-green-500 text-xs"
          width="w-44"
          height="h-8"
          onClick={() => onChangeCreateDeposit(true)}
        >
          <IoAdd size={20} />
        </ButtonR>
      </div>
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
