import React, { useEffect, useReducer, useState } from "react";
import {
  Action,
  articleData,
  supplierType,
  unitType,
} from "../../../../../../../../types/types";
import ButtonCheck from "../ButtonCheck";
import SelectUnitForm from "./Unit/SelectUnitForm";
import CantidadPor from "./CantidadPor/CantidadPor";
import InputSupplier from "./Supplier/InputSupplier";
import { NumericFormat } from "react-number-format";
import ButtonR from "../../../../buttons/ButtonR";
import InitialBatches from "./InitialBatches";

type propsInput = {
  stateArticle: articleData;
  inputValueSupplierInput: string;
  setInputValueSupplierInput: (e: string) => void;
  dispatch: React.Dispatch<Action>;
  errorIn: string[];
  suppliers: supplierType[];
  setSuppliers: (e: supplierType[]) => void;
  inputStyle: string;
  setSupplierForm: (e: boolean) => void;
  setUnitForm: (e: boolean) => void;
  unitsArticleForm: unitType[];
};

const StockArticleForm = ({
  stateArticle,
  inputStyle,
  setInputValueSupplierInput,
  unitsArticleForm,
  inputValueSupplierInput,
  setSupplierForm,
  errorIn,
  dispatch,
  setUnitForm,
  suppliers,
}: propsInput) => {
  const [unitSelect, setUnitSelect] = useState("Kg");
  const [optionsUnits, setOptionsUnits] = useState<unitType[]>([
    { value: "cajas", label: "Cajas", abrevUnit: "Caj" },
    { value: "paquetes", label: "Paquetes", abrevUnit: "Paq" },
    { value: "unidades", label: "Unidades", abrevUnit: "Ud" },
    { value: "litros", label: "Litros", abrevUnit: "L" },
    { value: "kilogramos", label: "Kilogramos", abrevUnit: "Kg" },
  ]);

  function onChangeSelectUnit(unit: string) {
    let abrevUnit = "";
    const unitObject = optionsUnits.filter((o) => {
      if (o.value === unit) {
        abrevUnit = o.abrevUnit;

        return true;
      }
    });
    dispatch({ type: "SET_STOCK_UNIT", payload: unitObject[0] });
    setUnitSelect(abrevUnit);
  }
  const loadUnits = () => {
    const allUnits = [
      { value: "cajas", label: "Cajas", abrevUnit: "Caj" },
      { value: "paquetes", label: "Paquetes", abrevUnit: "Paq" },
      { value: "unidades", label: "Unidades", abrevUnit: "Ud" },
      { value: "litros", label: "Litros", abrevUnit: "L" },
      { value: "kilogramos", label: "Kilogramos", abrevUnit: "Kg" },
      ,
      ...unitsArticleForm,
    ];

    setOptionsUnits(allUnits);
  };

  useEffect(() => {
    loadUnits();
  }, []);

  useEffect(() => {
    loadUnits();
  }, [unitsArticleForm]);

  return (
    <div className="flex w-full h-full flex-col">
      {/* stock y peso */}
      <div className="flex space-x-2 rounded-md relative p-2 w-full border-b border-slate-700">
        {/* PESO */}

        <div></div>
      </div>

      {/* CANTIDAD POR */}
      <div className="flex flex-1 space-x-2 justify-between px-2">
        <div className="flex flex-col">
          <div className="w-full flex h-8 items-center justify-between">
            <p>Proveedor</p>
            <ButtonR
              width="w-24"
              height="h-5"
              bgColor="bg-gradient-to-l from-gray-800 via-gray-800 to-gray-700 text-xs"
              title="Proveedores"
              onClick={() => setSupplierForm(true)}
            ></ButtonR>
          </div>
          <InputSupplier
            suppliers={suppliers}
            setInputValueSupplierInput={setInputValueSupplierInput}
            stateArticle={stateArticle}
            errorIn={errorIn}
            dispatch={dispatch}
            inputValueSupplierInput={inputValueSupplierInput}
            value={stateArticle.supplier.name}
            style={inputStyle}
            setSupplierForm={setSupplierForm}
          />
        </div>
        <div className="flex flex-col space-y-2">
          <div className="w-full flex space-x-2">
            <div className="flex flex-col w-44 justify-center space-y-1">
              <label
                htmlFor="minstock"
                className="select-none flex relative h-5"
              >
                <p>Stock</p>
                <p className="text-xs flex h-full items-end">.Min</p>
              </label>
              <input
                type="text"
                name="minstock"
                className={`outline-none bg-[#707070ff] h-10 w-full rounded-sm text-slate-50 px-2 shadow-[0_2px_5px_rgba(0,0,0,0.50)] ${
                  errorIn.includes("MINSTOCK")
                    ? "overline outline-red-500 outline-2"
                    : ""
                }`}
                value={stateArticle.article.stock.minStock}
                onChange={(e) => {
                  dispatch({ type: "SET_MIN_STOCK", payload: e.target.value });
                }}
              />
            </div>
            <div className="flex flex-col justify-center h-full w-24 space-y-1">
              <p className="w-full flex justify-start select-none h-5">
                Unidad
              </p>
              <div className="w-full h-10 flex items-center bg-[#707070ff] rounded-sm shadow-[0_2px_5px_rgba(0,0,0,0.50)] ">
                <SelectUnitForm
                  options={optionsUnits}
                  value={unitSelect}
                  onChangeSelection={onChangeSelectUnit}
                  filter={"Unit"}
                  slice={3}
                  placeholder={unitSelect}
                  backGround="bg-[#707070ff]"
                  backGround2="bg-zinc-950"
                  border={false}
                  todos={false}
                  setUnitForm={setUnitForm}
                />
              </div>
            </div>
          </div>
          <CantidadPor
            stateArticle={stateArticle}
            dispatch={dispatch}
            errorIn={errorIn}
          />
          <div className="flex flex-1 space-x-2">
            <div className="w-32 relative space-y-1">
              <div className="flex h-5">
                <label htmlFor="costo" className="select-none">
                  Peso bruto
                </label>
              </div>
              <div className="flex outline-none bg-[#707070ff] h-10 w-full rounded-sm shadow-[0_2px_5px_rgba(0,0,0,0.50)]">
                <NumericFormat
                  value={stateArticle.article.grossWeight.value}
                  onValueChange={(values) => {
                    const { formattedValue, value } = values;
                    dispatch({
                      type: "SET_GROSS_WEIGHT",
                      payload: value,
                    });
                  }}
                  thousandSeparator={true}
                  className={`outline-none bg-[#707070ff] h-10 w-full rounded-sm px-2 ${
                    errorIn.includes("GROSSWEIGHT")
                      ? "overline outline-red-500 outline-2"
                      : ""
                  }`}
                  suffix=" KG"
                  displayType="input"
                />
                <div className="flex flex-col items-center justify-center h-10 pr-1">
                  <ButtonCheck
                    className={`h-4 w-4 border rounded-full ${
                      stateArticle.article.grossWeight.approx
                        ? "bg-blue-500"
                        : "bg-[#707070ff]"
                    }`}
                    onClick={() =>
                      dispatch({
                        type: "SET_GROSS_WEIGHT_APP",
                        payload: !stateArticle.article.grossWeight.approx,
                      })
                    }
                    checked={stateArticle.article.grossWeight.approx}
                  />
                  <p className="text-xs font-thin">Aprox</p>
                </div>
              </div>
            </div>
            <div className="w-32 relative space-y-1">
              <div className="flex h-5">
                <label htmlFor="costo" className="select-none">
                  Peso Liquido
                </label>
              </div>
              <div className="flex outline-none bg-[#707070ff] h-10 w-full rounded-sm shadow-[0_2px_5px_rgba(0,0,0,0.50)]">
                <NumericFormat
                  value={stateArticle.article.liquidWeight.value}
                  onValueChange={(values) => {
                    const { formattedValue, value } = values;
                    dispatch({
                      type: "SET_LIQUID_WEIGHT",
                      payload: value,
                    });
                  }}
                  thousandSeparator={true}
                  className={`w-full h-10 flex items-center bg-[#707070ff] rounded-sm px-2 ${
                    errorIn.includes("LIQUIDWEIGHT")
                      ? "overline outline-red-500 outline-2"
                      : ""
                  }`}
                  suffix=" L"
                  displayType="input"
                />
                <div className="flex flex-col items-center justify-center h-10 pr-1">
                  <ButtonCheck
                    className={`h-4 w-4 border rounded-full ${
                      stateArticle.article.liquidWeight.approx
                        ? "bg-blue-500"
                        : "bg-[#707070ff]"
                    }`}
                    onClick={() =>
                      dispatch({
                        type: "SET_LIQUID_WEIGHT_APP",
                        payload: !stateArticle.article.liquidWeight.approx,
                      })
                    }
                    checked={stateArticle.article.liquidWeight.approx}
                  />
                  <p className="text-xs">Aprox</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <InitialBatches
          dispatch={dispatch}
          errorIn={errorIn}
          stateArticle={stateArticle}
        />
      </div>
    </div>
  );
};

export default StockArticleForm;
