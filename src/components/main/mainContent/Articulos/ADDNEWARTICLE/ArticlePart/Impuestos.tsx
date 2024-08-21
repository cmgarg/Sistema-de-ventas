import React, { useEffect, useState } from "react";
import Downshift from "downshift";
import { TrashIcon } from "@radix-ui/react-icons";
import {
  Action,
  articleData,
  brandType,
  categoryType,
} from "../../../../../../../types/types";
import AddTax from "./AddTax";
import ButtonR from "../../../buttons/ButtonR";
import { BiMoney } from "react-icons/bi";

type propsInput = {
  stateArticle: articleData;
  errorIn: string[];
  dispatch: React.Dispatch<Action>;
};

const Impuestos = ({ stateArticle, dispatch }: propsInput) => {
  const [addImpuesto, setAddImpuesto] = useState(false);

  const deleteTax = (id: number) => {
    dispatch({ type: "DELETE_TAX", payload: id });
  };
  useEffect(() => {}, []);

  return (
    <div className="flex-1 h-80 flex flex-col">
      {addImpuesto && (
        <AddTax
          setAddImpuesto={setAddImpuesto}
          dispatch={dispatch}
          stateArticle={stateArticle}
        />
      )}
      <div className="flex-1 flex flex-col h-full relative p-2">
        <div>
          <p className="select-none">Impuestos aplicados</p>
        </div>
        <div className="absolute top-0 right-2 text-green-300 z-40 hover:text-green-200 flex space-x-2">
          <ButtonR
            bgColor="bg-green-700"
            onClick={() => {
              setAddImpuesto(true);
            }}
            width="w-44"
            textSize="text-sm"
            height="h-7"
            title="Añadir impuesto"
          >
            <BiMoney size={20} color="#fff" />
          </ButtonR>
        </div>
        <div className="flex-1 w-full">
          <ul className="min-h-full w-full">
            <li
              className={`flex justify-between text-xs bg-blue-900 px-2 border-b border-slate-800`}
            >
              <div className="flex-1 flex justify-start">
                <p>Nombre</p>
              </div>
              <div className="flex-1 flex justify-center">
                <p>Aplica sobre</p>
              </div>
              <div className="flex-1 flex justify-end">
                <p>%</p>
              </div>
            </li>
            {stateArticle.taxes.map((tax, index) => {
              return (
                <li
                  className={`flex relative justify-between text-xs bg-blue-950 px-2 border-slate-700 h-7 items-center ${
                    index > -1 && index !== stateArticle.taxes.length - 1
                      ? "border-b"
                      : null
                  }`}
                >
                  <div className="flex-1 flex justify-start">
                    <p>{tax.name}</p>
                  </div>

                  <div className="flex-1 flex justify-center">
                    <p>
                      {tax.type.costPrice ? "Precio costo" : "Precio final"}
                    </p>
                  </div>
                  <div className="absolute h-full flex items-center right-20 text-red-200">
                    <button onClick={() => deleteTax(index)}>
                      <TrashIcon width={15} height={15} />
                    </button>
                  </div>

                  <div className="flex-1 flex justify-end">
                    <p>{tax.percentage}%</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Impuestos;
