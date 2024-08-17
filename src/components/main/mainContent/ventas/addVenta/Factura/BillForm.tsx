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
type BillFormProps = {
  saleData: saleData; // Define tus props aquí
  setRoutesBill: (e: string) => void;
  setChangeData: (data: string, value: any) => void;
  facturaOk: boolean;
  setFacturaOk: (e: boolean) => void;
};

const BillForm: React.FC<BillFormProps> = ({
  saleData,
  setRoutesBill,
  setFacturaOk,
  setChangeData,
}) => {
  const [selectBillType, setSelectBillType] = useState<string>("");

  const onSelectBillType = (e: string) => {
    setSelectBillType(e);
  };
  const acceptButton = () => {
    setFacturaOk(true);
    setChangeData("billType", selectBillType);
  };
  return (
    <div className="flex-1 flex-col relative w-full flex justify-center bg-slate-950 rounded-lg border border-slate-800">
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
      <div className="text-3xl">
        <p>Tipo de factura:</p>
      </div>
      <div className="flex flex-1 w-full bg-slate-900 items-center px-2 space-x-2">
        <button
          onClick={() => onSelectBillType("TYPEA")}
          className={`flex flex-1 border h-36 justify-center items-center rounded-lg text-blue-300 border-slate-700 bg-gradient-to-t to-blue-500 from-blue-950  hover:text-blue-50 ${
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
          className={`flex flex-1 border border-slate-700 h-36 justify-center items-center rounded-lg bg-gradient-to-t to-red-500 from-red-950 text-red-300  hover:text-red-50 ${
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
          className={`flex flex-1 border border-slate-700 h-36 justify-center items-center rounded-lg bg-gradient-to-t to-teal-500 from-teal-950 text-green-300 hover:bg-teal-800 hover:text-green-50 ${
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
      <div className="flex w-full justify-end p-2">
        <button
          className="h-7 w-32 bg-green-700 rounded-lg hover:bg-green-600"
          onClick={acceptButton}
        >
          Aceptar
        </button>
      </div>
      <div className="absolute bottom-0 left-0 w-32 h-12 flex items-center pl-2">
        <Biñeta title="Volver" bg="bg-amber-900">
          <BiArrowBack
            size={30}
            className="text-blue-300 hover:text-blue-50 cursor-pointer select-none"
            onClick={() => setRoutesBill("/")}
          />
        </Biñeta>
      </div>
    </div>
  );
};

export default BillForm;
