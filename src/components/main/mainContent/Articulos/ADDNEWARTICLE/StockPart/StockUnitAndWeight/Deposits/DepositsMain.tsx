import React, { useEffect, useState } from "react";
import { AiFillAppstore } from "react-icons/ai";
import {
  Action,
  articleData,
  depositType,
} from "../../../../../../../../../types/types";
import CreateDeposit from "./CreateDeposit";
import EstablishDeposit from "./EstablishDeposit";
import {
  RiDeleteBin2Fill,
  RiDeleteBin5Fill,
  RiEdit2Fill,
} from "react-icons/ri";
import ButtonR from "../../../../../buttons/ButtonR";
import { PiHandDeposit } from "react-icons/pi";
import { IoAdd, IoAddCircle } from "react-icons/io5";
import { TbTrash } from "react-icons/tb";

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
      amount: {
        value: number;
        saveCount: string;
      };
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

  const [deposits, setDeposits] = useState<depositType[]>([]);
  const [establishDeposit, setestablishDeposit] = useState(false);
  const onChangeCreateDeposit = (e: boolean) => {
    setDepositCreateForm(e);
  };
  const alternEstablishDepositForm = (e: boolean) => {
    setestablishDeposit(e);
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
    <div className="flex-1 flex flex-col">
      {depositCreateForm && (
        <CreateDeposit onChangeCreateDeposit={onChangeCreateDeposit} />
      )}
      {establishDeposit && (
        <EstablishDeposit
          deposits={deposits}
          alternEstablishDepositForm={alternEstablishDepositForm}
          stateArticle={stateArticle}
          depositState={depositState}
          dispatchDeposit={dispatchDeposit}
          onChangeCreateDeposit={onChangeCreateDeposit}
        />
      )}

      <div className="w-full font-bold px-2 text-2xl flex space-x-2 justify-between border-t-2 border-gray-700 mt-2 rounded-t-lg">
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
        className={`w-full flex flex-wrap overflow-x-hidden overflow-auto ${
          depositState.length > 2 ? "justify-between" : ""
        }`}
      >
        {depositState.map((deposit) => (
          <div className="flex flex-col w-52 font-normal m-2 shadow-[0_2px_5px_rgba(0,0,0,0.50)] text-sm bg-gradient-to-b  from-gray-800 via-gray-800 to-gray-700 rounded-lg border border-slate-700 p-2 relative">
            <div className="w-full flex border-b border-slate-700 justify-center">
              <p>{deposit.name}</p>
            </div>
            <div className="w-full flex-1 flex flex-col text-normal space-y-2">
              <div className="flex flex-1 flex-col border-b border-gray-700">
                <p className="text-xs font-thin">Direccion</p>
                <p className="text-sm">{deposit.address}</p>
              </div>
              <div className="flex flex-1 flex-col">
                <p className="text-xs font-thin">Sector</p>
                <p className="text-sm">{deposit.sector.name}</p>
              </div>
              <div className="flex space-x-2">
                <p>{deposit.sector.amount.value}</p>
                <p>
                  {deposit.sector.amount.saveCount === "xPalet"
                    ? "Palets"
                    : deposit.sector.amount.saveCount === "xBulk"
                    ? "Bultos"
                    : stateArticle.article.stock.unit.label}
                </p>
              </div>
            </div>
            <div className="absolute right-0 bottom-0 flex flex-col space-y-2 p-2">
              <ButtonR
                onClick={() => deleteDeposit(deposit.idObject)}
                bgIconColor="bg-gradient-to-tl  from-red-950 via-red-950 to-red-700"
                width="w-5"
                height="h-5"
              >
                <TbTrash size={15} className=" text-red-500" />
              </ButtonR>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DepositsMain;
