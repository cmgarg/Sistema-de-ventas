import React, { useCallback, useEffect, useReducer, useState } from "react";
import { AiFillAppstore } from "react-icons/ai";
import {
  Action,
  articleData,
  depositType,
} from "../../../../../../../../../types/types";
import CreateDeposit from "./CreateDeposit";
import Deposit from "./Deposit";

type DepositsMainProps = {
  stateArticle: articleData;
  dispatchMain: React.Dispatch<Action>;
  deposits: depositType[];
  errorIn: string[];
  depositState: {
    deposit: {
      idObject: string;
      name: string;
      depositId: string;
      address: string;
      sector: {
        name: string;
        sectorId: string;
      };
    };
    element: React.ReactNode;
  }[];
  dispatchDeposit: React.Dispatch<Action>;
};

const DepositsMain: React.FC<DepositsMainProps> = ({
  stateArticle,
  dispatchDeposit,
  depositState,
  deposits,
  dispatchMain,
}) => {
  const generateId = () => {
    return `${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  };
  const [depositCreateForm, setDepositCreateForm] = useState<boolean>(false);
  const [depositsToLoad, setDepositsToLoad] = useState<React.ReactNode[]>([]);

  const onChangeCreateDeposit = (e: boolean) => {
    setDepositCreateForm(e);
  };

  const updateDeposit = (deposit: {
    idObject: string;
    name: string;
    depositId: string;
    sector: {
      name: string;
      sectorId: string;
    };
  }) => {
    console.log("EJECUTANDO UPDATE DEPOSIT POR EL DEPOSITO", deposit);
    const { idObject } = deposit;
    dispatchDeposit({
      type: "SET_DEPOSIT",
      payload: { idObject, deposit: deposit },
    });
    return "JOYA";
  };
  const loadDepositSelect = () => {
    const id = generateId();
    const newElement = (
      <Deposit
        id={id}
        unLoadDeposit={unLoadDeposit}
        dispatchDeposit={dispatchDeposit}
        updateDeposit={updateDeposit}
        deposits={deposits}
      />
    );
    dispatchDeposit({
      type: "ADD_DEPOSIT",
      payload: {
        deposit: {
          idObject: id,
          name: "",
          depositId: "",
          address: "",
          sector: { name: "", sectorId: "" },
        },
        element: newElement,
      },
    });
  };
  const unLoadDeposit = (depositToDeleteIndex: string) => {
    dispatchDeposit({ type: "DELETE_DEPOSIT", payload: depositToDeleteIndex });
  };

  const getDeposits = () => {
    window.api.enviarEvento("get-deposits");
  };
  const loadDepositsElement = () => {
    const elements = depositState.map((deposit) => (
      <Deposit
        id={deposit.deposit.idObject}
        depositObject={deposit.deposit}
        deposits={deposits}
        dispatchDeposit={dispatchDeposit}
        unLoadDeposit={unLoadDeposit}
        updateDeposit={updateDeposit}
      ></Deposit>
    ));
    setDepositsToLoad([...elements]);
  };
  useEffect(() => {
    getDeposits();
    loadDepositsElement();
  }, []);

  useEffect(() => {
    console.log("DEPOSITSTATE CAMBIA LOCO", depositState);
    loadDepositsElement();
  }, [depositState]);

  useEffect(() => {
    dispatchMain({
      type: "SET_DEPOSITS",
      payload: depositState.map((deposit) => deposit.deposit),
    });
  }, [depositState]);

  return (
    <div className="flex-1 flex flex-col relative">
      {depositCreateForm && (
        <CreateDeposit onChangeCreateDeposit={onChangeCreateDeposit} />
      )}

      <div className="w-full font-bold px-2 text-2xl flex space-x-2 justify-between border-t-8 border-slate-800 mt-2 rounded-t-lg">
        <div className="flex-1 flex space-x-5 h-full items-center">
          <p className="text-2xl">Depositos</p>
          <AiFillAppstore size={30} className="text-amber-300" />
        </div>
        <div className="flex text-base h-full items-center">
          <button
            className="h-7 bg-yellow-700  rounded-l-lg border-r border-slate-800 px-2"
            onClick={loadDepositSelect}
          >
            Establecer deposito
          </button>
          <button
            className="px-2 h-7 bg-purple-900 font-bold rounded-r-lg"
            onClick={() => onChangeCreateDeposit(true)}
          >
            Crear nuevo deposito
          </button>
        </div>
      </div>
      <div className="w-full bg-slate-950 flex flex-wrap overflow-x-hidden">
        {depositsToLoad}
      </div>
    </div>
  );
};

export default DepositsMain;
