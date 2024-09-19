import React, { useState } from "react";
import ButtonCheck from "../StockPart/ButtonCheck";
import { Action, articleData } from "../../../../../../../types/types";
import ButtonR from "../../../buttons/ButtonR";

type AddTaxProps = {
  stateArticle: articleData;
  dispatch: React.Dispatch<Action>;
  setAddImpuesto: (e: boolean) => void;
};

const AddTax: React.FC<AddTaxProps> = ({ dispatch, setAddImpuesto }) => {
  const [taxData, setTaxData] = useState<{
    name: string;
    percentage: number;
    type: { finalPrice: boolean; costPrice: boolean };
  }>({
    name: "",
    percentage: 0,
    type: {
      finalPrice: false,
      costPrice: false,
    },
  });
  const [showError, setShowError] = useState<{
    active: boolean;
    message: string;
  }>({
    active: false,
    message: "",
  });

  const onShowError = () => {
    setShowError({
      active: false,
      message: "",
    });
  };

  const onCheckFinalPrice = () => {
    if (taxData.type.costPrice) {
      return setTaxData({
        ...taxData,
        type: {
          finalPrice: true,
          costPrice: false,
        },
      });
    } else {
      return setTaxData({
        ...taxData,
        type: {
          ...taxData.type,
          finalPrice: !taxData.type.finalPrice,
        },
      });
    }
  };
  const onCheckCostPrice = () => {
    if (taxData.type.finalPrice) {
      return setTaxData({
        ...taxData,
        type: {
          costPrice: true,
          finalPrice: false,
        },
      });
    } else {
      return setTaxData({
        ...taxData,
        type: {
          ...taxData.type,
          costPrice: !taxData.type.costPrice,
        },
      });
    }
  };
  const onChangeTaxName = (taxName: string) => {
    setTaxData({ ...taxData, name: taxName });
  };
  const onChangeTaxPercentage = (taxPercentage: string) => {
    if (/^[0-9.]*$/.test(taxPercentage)) {
      setTaxData({ ...taxData, percentage: Number(taxPercentage) });
    }
  };

  const addNewTax = () => {
    console.log("EJECUITEASDASDASDASD", taxData);
    if (taxData.name && taxData.percentage && taxData.type) {
      dispatch({ type: "SET_NEW_TAX", payload: taxData });

      setTaxData({
        name: "",
        percentage: 0,
        type: { finalPrice: false, costPrice: false },
      });
      setAddImpuesto(false);
    } else if (!taxData.name || !taxData.percentage || !taxData.type) {
      setShowError({
        active: true,
        message: "Campos imconpletos",
      });
    }
  };
  return (
    <div className="absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center z-50 backdrop-brightness-50">
      <div className="flex flex-col w-96 relative bg-[#2f2f2fff] rounded-lg">
        {showError.active && (
          <div className="absolute top-0 right-0 bottom-0 left-0 bg-slate-950 z-50 flex flex-col rounded-lg">
            <div className="flex-1 flex justify-center flex-col items-center p-2 text-red-500 font-mono text-3xl">
              <p>{showError.message}</p>
            </div>
            <button
              onClick={onShowError}
              className="h-10 w-full rounded-b-lg bg-green-500 font-bold"
            >
              Aceptar
            </button>
          </div>
        )}
        <div className="flex flex-col">
          <div className="text-3xl w-full flex justify-center font-bold p-2">
            <p>AGREGANDO IMPUESTO</p>
          </div>
          <div className="flex flex-col space-y-2 pl-2 pr-2 relative">
            <p className="w-full border-b border-slate-500">Aplicar sobre</p>

            <div className="flex space-x-5 ">
              <div className="flex space-x-2">
                <p>Precio Final:</p>
                <ButtonCheck
                  checked={taxData.type.finalPrice}
                  onClick={onCheckFinalPrice}
                  size="15"
                  className="h-5 w-5 text-blue-300 border border-slate-500 rounded-full"
                />
              </div>
              <div className="flex space-x-2">
                <p>Precio costo</p>
                <ButtonCheck
                  checked={taxData.type.costPrice}
                  onClick={onCheckCostPrice}
                  size="15"
                  className="h-5 w-5 text-blue-300 border border-slate-500 rounded-full"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 p-2">
          <div className="flex flex-col">
            <label htmlFor="nombreImpuesto">Impuesto</label>
            <input
              name="nombreImpuesto"
              type="text"
              onChange={(e) => onChangeTaxName(e.target.value)}
              value={taxData.name}
              className="bg-[#707070ff] outline-none h-12 rounded-lg  border border-slate-800 px-2"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="nombreImpuesto">Porcentaje</label>
            <input
              name="nombreImpuesto"
              type="text"
              onChange={(e) => onChangeTaxPercentage(e.target.value)}
              value={taxData.percentage}
              className="bg-[#707070ff] outline-none h-12 rounded-lg  border border-slate-800 px-2"
            />
          </div>
        </div>
        <div className="flex w-full text-xl font-bold justify-end items-end px-2 py-2 space-x-2">
          <ButtonR
            bgColor="bg-gradient-to-l from-gray-700 via-gray-700 to-gray-500 text-[#fff8dcff]"
            onClick={() => setAddImpuesto(false)}
            width="w-28"
            textSize="text-xs"
            height="h-8"
            title="Cancelar"
          ></ButtonR>
          <ButtonR
            bgColor="bg-gradient-to-l from-yellow-800 via-yellow-700 to-yellow-500 text-[#fff8dcff]"
            onClick={() => addNewTax()}
            width="w-28"
            textSize="text-xs"
            height="h-8"
            title="Añadir"
          ></ButtonR>
        </div>
      </div>
    </div>
  );
};

export default AddTax;
