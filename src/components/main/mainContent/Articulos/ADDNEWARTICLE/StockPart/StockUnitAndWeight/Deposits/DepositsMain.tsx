import React, { useEffect, useState } from "react";
import { AiFillAppstore } from "react-icons/ai";
import {
  Action,
  articleData,
  depositType,
} from "../../../../../../../../../types/types";
import CreateDeposit from "./CreateDeposit";
import EstablishDeposit from "./EstablishDeposit";
import { RiDeleteBin5Fill, RiEdit2Fill } from "react-icons/ri";
import EditDepositEstablished from "./EditDepositEstablished";
import ButtonR from "../../../../../buttons/ButtonR";
import { PiHandDeposit } from "react-icons/pi";
import { IoAdd, IoAddCircle } from "react-icons/io5";

type DepositsMainProps = {
  stateArticle: articleData;
  dispatchMain: React.Dispatch<Action>;
  deposits: depositType[];
  errorIn: string[];
  depositState: {
    idObject: string;
    name: string;
    depositId: string;
    address: string;
    sector: {
      name: string;
      sectorId: string;
    };
  }[];
  dispatchDeposit: React.Dispatch<Action>;
};

const DepositsMain: React.FC<DepositsMainProps> = ({
  stateArticle,
  dispatchDeposit,
  depositState,
  dispatchMain,
}) => {
  const [depositCreateForm, setDepositCreateForm] = useState<boolean>(false);
  const [depositEditForm, setDepositEditForm] = useState<{
    active: boolean;
    depositToEdit: {
      idObject: string;
      name: string;
      depositId: string;
      address: string;
      sector: {
        name: string;
        sectorId: string;
      };
    };
  }>({
    active: false,
    depositToEdit: {
      name: "",
      address: "",
      sector: { sectorId: "", name: "" },
      idObject: "",
      depositId: "",
    },
  });

  const [deposits, setDeposits] = useState<depositType[]>([]);
  const [establishDeposit, setestablishDeposit] = useState(false);
  const onChangeCreateDeposit = (e: boolean) => {
    setDepositCreateForm(e);
  };
  const alternEstablishDepositForm = (e: boolean) => {
    setestablishDeposit(e);
  };
  const alternEditDepositEstablished = (e: {
    active: boolean;
    depositToEdit: {
      idObject: string;
      name: string;
      depositId: string;
      address: string;
      sector: {
        name: string;
        sectorId: string;
      };
    };
  }) => {
    let state = depositEditForm;
    if (e.active) {
      setDepositEditForm(e);
    } else {
      setDepositEditForm({ ...state, active: false });
    }
  };
  const deleteDeposit = (id: string) => {
    dispatchDeposit({ type: "DELETE_DEPOSIT", payload: id });
  };
  useEffect(() => {
    window.api.enviarEvento("get-deposits");
    window.api.recibirEvento("response-get-deposits", (data) => {
      console.log("RESPONDIDO DE CACA", data);
      setDeposits(data);
    });

    return () => {
      window.api.removeAllListeners("response-get-deposits");
    };
  }, []);

  return (
    <div className="flex-1 flex flex-col relative">
      {depositCreateForm && (
        <CreateDeposit onChangeCreateDeposit={onChangeCreateDeposit} />
      )}
      {establishDeposit && (
        <EstablishDeposit
          deposits={deposits}
          alternEstablishDepositForm={alternEstablishDepositForm}
          dispatchDeposit={dispatchDeposit}
          onChangeCreateDeposit={onChangeCreateDeposit}
        />
      )}
      {depositEditForm.active && (
        <EditDepositEstablished
          deposits={deposits}
          alternEditDepositEstablished={alternEditDepositEstablished}
          dispatchDeposit={dispatchDeposit}
          depositToEdit={depositEditForm.depositToEdit}
          onChangeCreateDeposit={onChangeCreateDeposit}
        />
      )}

      <div className="w-full font-bold px-2 text-2xl flex space-x-2 justify-between border-t-8 border-slate-800 mt-2 rounded-t-lg">
        <div className="flex-1 flex space-x-5 h-full items-center">
          <p className="text-2xl">Depositos</p>
          <AiFillAppstore size={30} className="text-amber-300" />
        </div>
        <div className="flex text-base h-full items-center">
          <ButtonR
            bgColor=" bg-gradient-to-l text-[#ffd700ff]  from-gray-700 via-gray-700 to-gray-500 text-[#fff8dcff] text-sm"
            textSize="text-sm"
            height="h-7"
            width="w-52"
            onClick={() => alternEstablishDepositForm(true)}
            title={"Establecer deposito"}
          >
            <AiFillAppstore size={20} className="text-white" />
          </ButtonR>
          <ButtonR
            bgColor="bg-gradient-to-l text-[#ffd700ff]  from-gray-700 via-gray-700 to-gray-500 text-[#fff8dcff] text-sm"
            onClick={() => onChangeCreateDeposit(true)}
            height="h-7"
            title={"Crear nuevo deposito"}
          >
            <div className="relative">
              <AiFillAppstore size={20} className="text-white" />
              <IoAddCircle
                size={15}
                className="absolute z-50 rounded-full bg-black -right-1 -bottom-1 text-green-300"
              />
            </div>
          </ButtonR>
        </div>
      </div>
      <div
        className={`w-full bg-slate-950 flex flex-wrap overflow-x-hidden overflow-auto ${
          depositState.length > 2 ? "justify-between" : ""
        }`}
      >
        {depositState.map((deposit) => (
          <div className="flex flex-col w-1/4 h-52 m-2 bg-slate-900 rounded-lg border border-slate-700 p-2 relative">
            <div className="w-full flex border-b border-slate-700 justify-center text-xl">
              <p className="font-bold">{deposit.name}</p>
            </div>
            <div className="w-full flex-1 flex flex-col text-normal">
              <div className="flex flex-1 flex-col">
                <p>Direccion</p>
                <p className="font-medium text-2xl">{deposit.address}</p>
              </div>
              <div className="flex flex-1 flex-col">
                <p>Sector</p>
                <p className="font-medium text-2xl">{deposit.sector.name}</p>
              </div>
            </div>
            <div className="absolute right-0 bottom-0 flex flex-col space-y-2 p-2">
              <button
                className="w-7 h-7 flex items-center justify-center bg-black border border-red-500 rounded-full hover:bg-red-500"
                onClick={() => deleteDeposit(deposit.idObject)}
              >
                <RiDeleteBin5Fill className="w-4" />
              </button>
              <button
                className="w-7 h-7 flex items-center justify-center bg-black border border-green-500 rounded-full hover:bg-green-500"
                onClick={() =>
                  alternEditDepositEstablished({
                    active: true,
                    depositToEdit: deposit,
                  })
                }
              >
                <RiEdit2Fill className="w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DepositsMain;
