import React, { useEffect, useState } from "react";
import {
  articleData,
  supplierType,
  unitType,
} from "../../../../../../../../types";
import ButtonCheck from "../ButtonCheck";
import SelectUnitForm from "./Unit/SelectUnitForm";
import CantidadPor from "./CantidadPor/CantidadPor";
import Supplier from "./Supplier";
import InputSupplier from "./InputSupplier";

type propsInput = {
  articuloDataState: articleData;
  setChangeData: (data: string, value: any) => void;
  suppliers: supplierType[];
  setSuppliers: (e: supplierType[]) => void;
  inputStyle: string;
  setUnitForm: (e: boolean) => void;
  unitsArticleForm: unitType[];
};

const StockArticleForm = ({
  articuloDataState,
  inputStyle,
  unitsArticleForm,
  setChangeData,
  setUnitForm,
  suppliers,
}: propsInput) => {
  const [supplierForm, setSupplierForm] = useState<boolean>(false);
  const [unitSelect, setUnitSelect] = useState("Kg");
  const [optionsUnits, setOptionsUnits] = useState<unitType[]>([
    { value: "cajas", label: "Cajas", abrevUnit: "Caj" },
    { value: "paquetes", label: "Paquetes", abrevUnit: "Paq" },
    { value: "unidades", label: "Unidades", abrevUnit: "Ud" },
    { value: "litros", label: "Litros", abrevUnit: "L" },
    { value: "kilogramos", label: "Kilogramos", abrevUnit: "Kg" },
  ]);

  function onChangeSelectUnit(unit: string) {
    console.log(unit, "UNIDAD CAMBIADITA");
    let abrevUnit = "";
    const unitObject = optionsUnits.filter((o) => {
      if (o.value === unit) {
        abrevUnit = o.abrevUnit;

        return true;
      }
    });
    setChangeData("stock-unit", unitObject[0]);
    setUnitSelect(abrevUnit);
  }
  const loadUnits = () => {
    const allUnits = [...unitsArticleForm];

    setOptionsUnits(allUnits);
  };
  useEffect(() => {
    console.log(unitsArticleForm, "CAGADA");

    loadUnits();
  }, []);

  useEffect(() => {
    loadUnits();
  }, [unitsArticleForm]);

  return (
    <div className="flex w-full text-xl text-slate-50 font-thin h-full flex-col relative">
      {/* stock y peso */}
      <div className="flex space-x-2 rounded-md relative p-2 w-full border-b border-slate-700">
        <div className="flex">
          <div className="flex justify-center flex-col space-y-1">
            <label
              htmlFor="stock"
              className="select-none flex justify-start w-full h-5"
            >
              Stock
            </label>
            <input
              type="text"
              name="stock"
              className={
                "outline-none h-14 w-full bg-slate-900 px-2 rounded-l-lg border border-slate-700"
              }
              value={articuloDataState.article.stock.amount}
              onChange={(e) => {
                setChangeData("stock", e.target.value);
              }}
            />
          </div>

          <div className="flex flex-col flex-1 justify-center space-y-1">
            <label htmlFor="minstock" className="select-none flex relative h-5">
              <p>Stock</p>
              <p className="text-xs flex h-full items-end">.Min</p>
            </label>
            <input
              type="text"
              name="minstock"
              className={
                "outline-none h-14 w-full bg-slate-900 border-t border-b border-slate-700 px-2"
              }
              value={articuloDataState.article.stock.minStock}
              onChange={(e) => {
                setChangeData("min-stock", e.target.value);
              }}
            />
          </div>
          <div className="flex flex-col items-center w-24 space-y-1">
            <p className="w-full flex justify-start select-none h-5">Unidad</p>
            <div className="w-full h-14 flex items-center bg-slate-900 border-l border-r border-t border-b rounded-r-lg border-slate-700">
              <SelectUnitForm
                options={optionsUnits}
                value={unitSelect}
                onChangeSelection={onChangeSelectUnit}
                filter={"Unit"}
                slice={3}
                placeholder={unitSelect}
                backGround="bg-slate-900"
                backGround2="bg-slate-950"
                border={false}
                todos={false}
                setUnitForm={setUnitForm}
              />
            </div>
          </div>
        </div>
        {/* PESO */}
        <div className="flex flex-1">
          <div className="flex-1 relative space-y-1">
            <div className="flex h-5">
              <label htmlFor="costo" className="select-none">
                Peso bruto
              </label>
            </div>
            <div className="flex bg-slate-900 border border-slate-700  h-14 w-full rounded-l-lg">
              <input
                type="text"
                name="weight"
                className={"outline-none w-full bg-slate-900 rounded-l-lg px-2"}
                value={articuloDataState.article.grossWeight}
                onChange={(e) => {
                  setChangeData("grossWeight", e.target.value);
                }}
              />
              <div className="flex flex-col items-center justify-center h-14 pr-1">
                <ButtonCheck
                  className={`h-4 w-4 border rounded-full ${
                    articuloDataState.article.wApp
                      ? "bg-blue-500"
                      : "bg-blue-950"
                  }`}
                  onClick={() =>
                    setChangeData("wApp", !articuloDataState.article.wApp)
                  }
                  checked={articuloDataState.article.wApp}
                />
                <p className="text-xs">Aprox</p>
              </div>
            </div>
          </div>
          <div className="flex-1 relative space-y-1">
            <div className="flex h-5">
              <label htmlFor="costo" className="select-none">
                Peso Liquido
              </label>
            </div>
            <div className="flex bg-slate-900 border border-slate-700  h-14 w-full">
              <input
                type="text"
                name="weight"
                className={"outline-none w-full bg-slate-900 rounded-lg px-2"}
                value={articuloDataState.article.liquidWeight}
                onChange={(e) => {
                  setChangeData("liquidWeight", e.target.value);
                }}
              />
              <div className="flex flex-col items-center justify-center h-14 pr-1">
                <ButtonCheck
                  className={`h-4 w-4 border rounded-full ${
                    articuloDataState.article.wApp
                      ? "bg-blue-500"
                      : "bg-blue-950"
                  }`}
                  onClick={() =>
                    setChangeData("wlApp", !articuloDataState.article.wlApp)
                  }
                  checked={articuloDataState.article.wlApp}
                />
                <p className="text-xs">Aprox</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* CANTIDAD POR */}
      <div className="flex items-end space-x-2">
        <CantidadPor
          articuloDataState={articuloDataState}
          setChangeData={setChangeData}
        />
        <div className="flex-1 flex flex-col pr-1">
          <InputSupplier
            suppliers={suppliers}
            setChangeData={setChangeData}
            articuloData={articuloDataState}
            style={inputStyle}
            setSupplierForm={setSupplierForm}
          />
        </div>
      </div>
      {supplierForm && (
        <Supplier setSupplierForm={setSupplierForm} suppliers={suppliers} />
      )}
    </div>
  );
};

export default StockArticleForm;
