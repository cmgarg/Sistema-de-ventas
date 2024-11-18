import React, { useState } from "react";
import SelectM from "../../../Select/Select";
import { clientData, saleData } from "../../../../../../../types/types";
import { BiArrowBack } from "react-icons/bi";
import Biñeta from "../../../Biñeta/Biñieta";
import { RiBillFill } from "react-icons/ri";
import {
  TbCircleLetterA,
  TbCircleLetterB,
  TbCircleLetterC,
  TbLetterC,
} from "react-icons/tb";
import ButtonR from "../../../buttons/ButtonR";
type BillFormProps = {
  setRoutesBill: (e: string) => void;
  dispatch: (action: {
    type:
      | "ARTICLES"
      | "SOLD"
      | "BUYER"
      | "SELLER"
      | "PAY_METHOD"
      | "BILL_TYPE"
      | "DELETE_ARTICLE";
    payload: any;
  }) => void;
  setCurrentStage: (e: "factura" | "payMethod" | "saleEnd" | "close") => void;
};

const BillForm: React.FC<BillFormProps> = ({
  setRoutesBill,
  setCurrentStage,
  dispatch,
}) => {
  const [selectBillType, setSelectBillType] = useState<string>("");

  const onSelectBillType = (e: string) => {
    setSelectBillType(e);
  };
  const acceptButton = () => {
    setCurrentStage("payMethod");
    dispatch({ type: "BILL_TYPE", payload: selectBillType });
  };
  return (
    <div className="flex-1 flex-col relative w-full flex justify-center rounded-lg">
      {/* <div className="flex w-full pl-2 pt-2">
        <div className="w-52 h-12 flex flex-col rounded-lg border border-800 bg-gradient-to-t from-slate-950 to-slate-800 border-slate-800">
          <p className="text-xs pl-2 text-slate-400">Factura tipo:</p>
          <SelectM
            options={options}
            onChangeSelection={onSelectType}
            slice={-1}
            placeholder={"ESTABLECER"}
            className="text-slate-50 w-52 h-7 bg-transparent border-none"
            classNameDeploy={
              "top-0 mb-5 cursor-pointer text-slate-50 font-mono bg-gradient-to-t from-slate-950 to-slate-800 border-slate-800"
            }
            value={selectFactura}
            todos={false}
          />
        </div>
      </div> */}
      <div className="text-lg">
        <p>Tipo de factura</p>
      </div>
      <div className="flex flex-1 w-full items-center px-2 space-x-2">
        <button
          onClick={() => onSelectBillType("TYPEA")}
          className={`flex flex-1 border h-36 shadow-[0_2px_5px_rgba(0,0,0,0.50)]  justify-center items-center rounded-lg text-blue-300 border-gray-600 bg-gradient-to-t to-blue-500 from-blue-950 hover:brightness-125  hover:text-yellow-500 ${
            selectBillType === "TYPEA"
              ? "outline outline-4 outline-yellow-500"
              : ""
          }`}
        >
          <div className="relative flex justify-center items-center h-20 w-20 rounded-full">
            <TbCircleLetterA size={100} />
          </div>
        </button>
        <button
          onClick={() => onSelectBillType("TYPEB")}
          className={`flex flex-1 border border-slate-600 shadow-[0_2px_5px_rgba(0,0,0,0.50)] h-36 justify-center items-center rounded-lg bg-gradient-to-t to-red-500 from-red-950 text-red-300 hover:brightness-125  hover:text-yellow-500 ${
            selectBillType === "TYPEB"
              ? "outline outline-4 outline-yellow-500"
              : ""
          } `}
        >
          <div className="relative flex justify-center items-center h-20 w-20 rounded-full">
            <TbCircleLetterB size={100} />
          </div>
        </button>
        <button
          onClick={() => onSelectBillType("TYPEC")}
          className={`flex flex-1 border border-slate-600 h-36 shadow-[0_2px_5px_rgba(0,0,0,0.50)] justify-center items-center rounded-lg bg-gradient-to-t to-teal-500 from-teal-950 text-green-300 hover:brightness-125 hover:bg-teal-800 hover:text-yellow-500 ${
            selectBillType === "TYPEC"
              ? "outline outline-4 outline-yellow-500"
              : ""
          }`}
        >
          <div className="relative flex justify-center items-center h-20 w-20 rounded-full">
            <TbCircleLetterC size={100} />
          </div>
        </button>
      </div>
      <div className="flex w-full justify-end p-2 space-x-2">
        <ButtonR
          title="Volver"
          bgColor="bg-gradient-to-l from-gray-700 via-gray-700 to-gray-500"
          width="w-24"
          height="h-7"
          onClick={() => setRoutesBill("/")}
        />
        <ButtonR
          height="h-7"
          width="w-32"
          bgColor="bg-gradient-to-l from-yellow-700 via-yellow-700 to-yellow-500"
          onClick={acceptButton}
          title="Aceptar"
        ></ButtonR>
      </div>
    </div>
  );
};

export default BillForm;
