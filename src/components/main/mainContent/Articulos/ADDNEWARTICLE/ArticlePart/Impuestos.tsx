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
    <div className="w-1/3 h-52 flex flex-col ">
      {addImpuesto && (
        <AddTax
          setAddImpuesto={setAddImpuesto}
          dispatch={dispatch}
          stateArticle={stateArticle}
        />
      )}
      <div className="flex-1 flex flex-col h-full relative">
        <div className="flex justify-between">
          <div>
            <p className="select-none">Impuestos aplicados</p>
          </div>
          <div className=" text-green-300 z-40 hover:text-green-200 flex space-x-2 ">
            <ButtonR
              bgColor="bg-gradient-to-l text-[#ffd700ff]  from-gray-700 via-gray-700 to-gray-500 text-[#fff8dcff]"
              onClick={() => {
                setAddImpuesto(true);
              }}
              width="w-32"
              textSize="text-xs text-[#ffd700ff] "
              height="h-5"
              title="Añadir impuesto"
            ></ButtonR>
          </div>
        </div>
        <div className="mt-2 flex-1 w-full bg-[#2f2f2fff] rounded-lg shadow-[0_2px_5px_rgba(0,0,0,0.50)]">
          <ul className="min-h-full w-full rounded-t-lg overflow-hidden">
            <li
              className={`flex justify-between text-xs px-2 border-b-2 border-gray-700`}
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
                  className={`flex relative justify-between text-xs bg-[#425461ff] px-2 border-slate-700 h-7 items-center ${
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
