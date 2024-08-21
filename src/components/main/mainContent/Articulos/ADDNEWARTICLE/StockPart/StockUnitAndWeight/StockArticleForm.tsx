import React, { useEffect, useState } from "react";
import {
  Action,
  articleData,
  depositType,
  supplierType,
  unitType,
} from "../../../../../../../../types/types";
import ButtonCheck from "../ButtonCheck";
import SelectUnitForm from "./Unit/SelectUnitForm";
import CantidadPor from "./CantidadPor/CantidadPor";
import InputSupplier from "./Supplier/InputSupplier";
import DepositsMain from "./Deposits/DepositsMain";
import { NumericFormat } from "react-number-format";

type propsInput = {
  stateArticle: articleData;
  inputValueSupplierInput: string;
  setInputValueSupplierInput: (e: string) => void;
  dispatch: React.Dispatch<Action>;
  depositState: {
    idObject: string;
    name: string;
    depositId: string;
    address: string;
    sector: {
      name: string;
      sectorId: string;
    };
  }[];
  dispatchDeposit: React.Dispatch<Action>;
  deposits: depositType[];
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
  dispatchDeposit,
  depositState,
  deposits,
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
    const allUnits = [...optionsUnits, ...unitsArticleForm];

    setOptionsUnits(allUnits);
  };
  useEffect(() => {
    console.log("STOCK ARTRICLE FORM ARTICLE STATE", stateArticle);
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
          <div className={`flex justify-center flex-col space-y-1`}>
            <label
              htmlFor="stock"
              className="select-none flex justify-start w-full h-5"
            >
              Stock
            </label>
            <input
              type="text"
              name="stock"
              className={`outline-none h-12 w-full bg-zinc-900 px-2 rounded-l-lg border border-gray-600 ${
                errorIn.includes("STOCK")
                  ? "overline outline-red-500 outline-2"
                  : ""
              }`}
              value={stateArticle.article.stock.amount}
              onChange={(e) => {
                dispatch({ type: "SET_STOCK", payload: e.target.value });
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
              className={`outline-none h-12 w-full bg-zinc-900 border-t border-b border-gray-600 px-2 ${
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
            <p className="w-full flex justify-start select-none h-5">Unidad</p>
            <div className="w-full h-12 flex items-center bg-zinc-900 border-l border-r border-t border-b rounded-r-lg border-gray-600">
              <SelectUnitForm
                options={optionsUnits}
                value={unitSelect}
                onChangeSelection={onChangeSelectUnit}
                filter={"Unit"}
                slice={3}
                placeholder={unitSelect}
                backGround="bg-zinc-900"
                backGround2="bg-zinc-950"
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
            <div className="flex bg-slate-900 border border-slate-500  h-14 w-full rounded-l-lg">
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
                className={`outline-none w-full bg-slate-900 rounded-lg px-2 ${
                  errorIn.includes("GROSSWEIGHT")
                    ? "overline outline-red-500 outline-2"
                    : ""
                }`}
                suffix=" KG"
                displayType="input"
              />
              <div className="flex flex-col items-center justify-center h-14 pr-1">
                <ButtonCheck
                  className={`h-4 w-4 border text-slate-50 rounded-full ${
                    stateArticle.article.grossWeight.approx
                      ? "bg-blue-500"
                      : "bg-blue-950"
                  }`}
                  onClick={() =>
                    dispatch({
                      type: "SET_GROSS_WEIGHT_APP",
                      payload: !stateArticle.article.grossWeight.approx,
                    })
                  }
                  checked={stateArticle.article.grossWeight.approx}
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
            <div className="flex bg-slate-900 border border-slate-500  h-14 w-full">
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
                className={`outline-none w-full bg-slate-900 rounded-lg px-2 ${
                  errorIn.includes("LIQUIDWEIGHT")
                    ? "overline outline-red-500 outline-2"
                    : ""
                }`}
                suffix=" L"
                displayType="input"
              />
              <div className="flex flex-col items-center justify-center h-14 pr-1">
                <ButtonCheck
                  className={`h-4 w-4 border rounded-full ${
                    stateArticle.article.liquidWeight.approx
                      ? "bg-blue-500"
                      : "bg-blue-950"
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
        <div></div>
      </div>
      {/* CANTIDAD POR */}
      <div className="flex items-end space-x-2">
        <CantidadPor
          stateArticle={stateArticle}
          dispatch={dispatch}
          errorIn={errorIn}
        />
        <div className="flex-1 flex flex-col pr-1">
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
      </div>
      <DepositsMain
        deposits={deposits}
        stateArticle={stateArticle}
        dispatchMain={dispatch}
        depositState={depositState}
        dispatchDeposit={dispatchDeposit}
        errorIn={errorIn}
      />
    </div>
  );
};

export default StockArticleForm;
