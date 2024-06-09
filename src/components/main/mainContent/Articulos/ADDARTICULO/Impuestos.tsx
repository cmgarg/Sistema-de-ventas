import { articleData, brandType, categoryType } from "../../../../../../types";
import React, { useEffect, useState } from "react";
import Downshift from "downshift";
import { TrashIcon } from "@radix-ui/react-icons";

type propsInput = {
  articleData: articleData;
  setChangeData: (e: string, data: any) => void;
};

const Impuestos = ({ articleData, setChangeData }: propsInput) => {
  const [addImpuesto, setAddImpuesto] = useState(false);
  const [taxData, setTaxData] = useState<{
    name: string;
    percentage: number;
  }>({
    name: "",
    percentage: 0,
  });

  const onChangeTaxName = (taxName: string) => {
    setTaxData({ ...taxData, name: taxName });
  };
  const onChangeTaxPercentage = (taxPercentage: string) => {
    setTaxData({ ...taxData, percentage: Number(taxPercentage) });
  };

  const addNewTax = () => {
    console.log("EJECUITEASDASDASDASD", taxData);
    setChangeData("newTax", taxData);

    setTaxData({ name: "", percentage: 0 });
    setAddImpuesto(false);
  };
  const deleteTax = (id: number) => {
    setChangeData("deleteTax", id);
  };
  useEffect(() => {}, []);

  return (
    <div className="flex-1 h-full flex flex-col relative">
      {addImpuesto && (
        <div className="absolute h-full bg-slate-950 -left-1 -right-1 z-50">
          <div className="flex flex-col">
            <label htmlFor="nombreImpuesto">Impuesto</label>
            <input
              name="nombreImpuesto"
              type="text"
              onChange={(e) => onChangeTaxName(e.target.value)}
              value={taxData.name}
              className="bg-slate-900 outline-none h-12 rounded-lg  border border-slate-800 px-2"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="nombreImpuesto">Porcentaje</label>
            <input
              name="nombreImpuesto"
              type="text"
              onChange={(e) => onChangeTaxPercentage(e.target.value)}
              value={taxData.percentage}
              className="bg-slate-900 outline-none h-12 rounded-lg  border border-slate-800 px-2"
            />
          </div>
          <div className="absolute right-0 top-0 h-5 flex space-x-5 text-sm z-50">
            <button
              className="text-red-500"
              onClick={() => setAddImpuesto(false)}
            >
              Cancelar
            </button>
            <button className="text-green-500" onClick={() => addNewTax()}>
              Agregar
            </button>
          </div>
        </div>
      )}
      <div className="absolute right-0 text-green-300 z-40 hover:text-green-200 flex space-x-2">
        <button
          onClick={() => {
            setAddImpuesto(true);
          }}
          className="select-none"
        >
          Agregar
        </button>
      </div>
      <div>
        <p className="select-none">Impuestos aplicados</p>
      </div>
      <div className="flex-1 w-full">
        <ul className="min-h-full w-full">
          <li
            className={`flex justify-between text-xs bg-blue-900 px-2 border-b border-slate-800`}
          >
            <p>Nombre</p>
            <p>%</p>
          </li>
          {articleData.taxes.map((tax, index) => {
            return (
              <li
                className={`flex justify-between text-xs bg-blue-950 px-2 border-slate-700 h-7 items-center ${
                  index > -1 && index !== articleData.taxes.length - 1
                    ? "border-b"
                    : null
                }`}
                onClick={() => deleteTax(index)}
              >
                <p>{tax.name}</p>
                <button>
                  <TrashIcon color="#fff" width={15} height={15} fill="#fff" />
                </button>
                <p>{tax.percentage}%</p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Impuestos;
