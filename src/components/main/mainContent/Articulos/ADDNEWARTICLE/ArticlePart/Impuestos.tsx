import React, { useEffect, useState } from "react";
import Downshift from "downshift";
import { TrashIcon } from "@radix-ui/react-icons";
import {
  articleData,
  brandType,
  categoryType,
} from "../../../../../../../types";
import AddTax from "./AddTax";

type propsInput = {
  articleState: articleData;
  setChangeData: (e: string, data: any) => void;
};

const Impuestos = ({ articleState, setChangeData }: propsInput) => {
  const [addImpuesto, setAddImpuesto] = useState(false);

  const deleteTax = (id: number) => {
    setChangeData("deleteTax", id);
  };
  useEffect(() => {}, []);

  return (
    <div className="flex-1 h-full flex flex-col">
      {addImpuesto && (
        <AddTax setAddImpuesto={setAddImpuesto} setChangeData={setChangeData} />
      )}
      <div className="flex-1 flex flex-col h-full relative p-2">
        <div>
          <p className="select-none">Impuestos aplicados</p>
        </div>
        <div className="absolute top-0 right-2 text-green-300 z-40 hover:text-green-200 flex space-x-2">
          <button
            onClick={() => {
              setAddImpuesto(true);
            }}
            className="select-none text-sm font-bold bg-cyan-600 text-slate-50 p-1 rounded-lg"
          >
            Agregar
          </button>
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
            {articleState.taxes.map((tax, index) => {
              return (
                <li
                  className={`flex relative justify-between text-xs bg-blue-950 px-2 border-slate-700 h-7 items-center ${
                    index > -1 && index !== articleState.taxes.length - 1
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
