import React, { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import { Action, articleData } from "../../../../../../../types/types";
import Impuestos from "./Impuestos";

type saleAndCost = {
  inputStyle: string;
  stateArticle: articleData;
  dispatch: React.Dispatch<Action>;
  errorIn: string[];
};

const SaleAndCost: React.FC<saleAndCost> = ({
  stateArticle,
  dispatch,
  errorIn,
  inputStyle,
}) => {
  const [finalPrice, setFinalPrice] = useState<number>(0);
  useEffect(() => {
    console.log(finalPrice, "PRECIO FINAL");
    dispatch({ type: "SET_FINAL_PRICE", payload: finalPrice });
  }, [finalPrice]);

  return (
    <div className="flex flex-col space-x-2 border-t border-slate-700 p-2">
      <div className="flex space-x-2">
        <div className="flex flex-col flex-1">
          <div className="flex space-x-2">
            <div className="flex flex-1 flex-col">
              <label htmlFor="costo" className="select-none">
                Costo
              </label>
              <NumericFormat
                thousandSeparator={true}
                prefix={"$"}
                decimalScale={2}
                fixedDecimalScale={true}
                allowNegative={false}
                valueIsNumericString={true}
                value={
                  stateArticle.article.costo > 0
                    ? stateArticle.article.costo
                    : ""
                }
                onValueChange={(values) => {
                  const { formattedValue, value } = values;
                  console.log(formattedValue);
                  dispatch({ type: "SET_COST", payload: value });
                }}
                className={`${inputStyle} h-10 rounded-l-lg bg-[#707070ff] ${
                  errorIn.includes("COST")
                    ? "overline outline-red-500 outline-2"
                    : ""
                }`}
              />
            </div>
            <div className="flex flex-1 flex-col">
              <label htmlFor="venta" className="select-none">
                Porcentaje de Venta
              </label>
              <NumericFormat
                thousandSeparator={true}
                suffix="%"
                fixedDecimalScale={true}
                allowNegative={false}
                valueIsNumericString={true}
                onValueChange={(values) => {
                  const { formattedValue, value } = values;
                  dispatch({ type: "SET_PROFIT", payload: value });
                  console.log(formattedValue);
                }}
                className={`${inputStyle} "h-10 bg-[#707070ff] border"`}
                value={
                  stateArticle.article.profit > 0
                    ? stateArticle.article.profit
                    : ""
                }
              />
            </div>
          </div>
          <PriceOfArticle
            percentajeToSale={stateArticle.article.profit}
            value={stateArticle.article.costo}
            articleState={stateArticle}
            finalPrice={finalPrice}
            setFinalPrice={setFinalPrice}
            costo={stateArticle.article.costo}
          />
        </div>
        <Impuestos
          stateArticle={stateArticle}
          dispatch={dispatch}
          errorIn={errorIn}
        />
      </div>
    </div>
  );
};

type priceOfArticle = {
  percentajeToSale: number;
  costo: number;
  articleState: articleData;
  value: number;
  finalPrice: number;
  setFinalPrice: (e: number) => void;
};

const PriceOfArticle: React.FC<priceOfArticle> = ({
  percentajeToSale,
  costo,
  articleState,
  finalPrice,
  setFinalPrice,
}) => {
  const [toShowOperation, setToShowOperation] = useState({
    taxCostPriceSuma: 0,
    priceWithTaxCost: 0,
    taxFinalPriceSuma: 0,
    taxFinalPrice: 0,
    priceWithTaxCostAndFinalPrice: 0,
    percentaje: "",
    priceWithTaxsAndProfit: 0,
  });

  const formatterCurrency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    currencyDisplay: "symbol",
  });

  const formatMoney = (n: number | string) => {
    return typeof n === "string"
      ? formatterCurrency.format(Number(n))
      : formatterCurrency.format(n);
  };

  const taxsReducer = () => {
    const taxtCostPrice = articleState.taxes.filter((e) => e.type.costPrice);
    const taxtFinalPrice = articleState.taxes.filter((e) => e.type.finalPrice);
    const taxCostPriceSuma = taxtCostPrice.reduce(
      (ac, act) => ac + act.percentage,
      0
    );
    console.log(
      taxCostPriceSuma,
      "PORCENTAJE DE IMPUESTOS SOBRE COSTO SUMADOS"
    );
    const taxFinalPriceSuma = taxtFinalPrice.reduce(
      (ac, act) => ac + act.percentage,
      0
    );
    console.log(
      taxFinalPriceSuma,
      "PORCENTAJE DE IMPUESTOS SOBRE FINAL SUMADOS"
    );

    return {
      taxCostPriceSuma,
      taxFinalPriceSuma,
    };
  };

  const applyTaxes = (value: string | number, percentaje: string | number) => {
    const { taxCostPriceSuma, taxFinalPriceSuma } = taxsReducer();
    const priceWithTaxCost = Number(value) * (1 + taxCostPriceSuma / 100);
    const priceWithTaxCostAndFinalPrice =
      priceWithTaxCost * (1 + taxFinalPriceSuma / 100);
    const priceWithTaxsAndProfit =
      priceWithTaxCostAndFinalPrice * (1 + Number(percentaje) / 100);

    setToShowOperation({
      ...toShowOperation,
      taxCostPriceSuma,
      priceWithTaxCost,
      taxFinalPriceSuma,
      priceWithTaxCostAndFinalPrice,
      percentaje: percentaje.toString(),
      priceWithTaxsAndProfit,
    });

    return priceWithTaxsAndProfit;
  };
  const [expand, setExpand] = useState(false);
  const onChangeExpand = (e: boolean) => {
    setExpand(e);
  };

  useEffect(() => {
    const finalPrice = applyTaxes(costo, percentajeToSale);
    console.log("PRECIO FINAL LOQUITO", finalPrice);
    setFinalPrice(finalPrice);
  }, [costo, percentajeToSale, articleState.taxes]);

  return (
    <div
      className={`${
        expand ? "flex flex-col text-sm font-thin rounded-sm" : ""
      }`}
    >
      <div className="flex text-xs w-full border-gray-700 border-b">
        <h3
          className="font-bold cursor-pointer"
          onClick={() => onChangeExpand(!expand)}
        >
          Cálculo Detallado |
        </h3>
        <p>
          Precio Base (Costo): <span className="font-bold">${costo}</span>
        </p>
      </div>
      {expand ? (
        <div className="flex  border-gray-700">
          <div className="flex flex-col space-y-1 border-r flex-1 font-medium border-gray-700">
            <p className="font-thin">
              Impuestos sobre el Costo:{" "}
              <span className="font-bold text-teal-500">
                {toShowOperation.taxCostPriceSuma}%
              </span>
            </p>
            <p className="font-thin">
              Impuestos sobre el Precio Final:{" "}
              <span className="font-bold text-cyan-500">
                {`${toShowOperation.taxFinalPriceSuma}% `}
              </span>
            </p>
            <p>
              Porcentaje de venta:{" "}
              <span className="font-bold text-sky-300">
                {toShowOperation.percentaje}%
              </span>
            </p>
          </div>
          <div className="flex flex-col border-r flex-1 border-cyan-700 pl-2">
            {/* OPERACION */}
            <p className="italic text-yellow-300 text-xs">
              Agregando impuesto sobre el costo.
            </p>
            <div className="text-teal-700 font-medium flex">
              <span className="mr-1 text-blue-200">{`${formatMoney(
                costo
              )}`}</span>
              <span className="text-gray-400">{`x (1 + `}</span>
              <span className="text-teal-500">{`${toShowOperation.taxCostPriceSuma}% `}</span>
              <span>{`/ 100) =`}</span>
              <span className="text-red-300">{`${formatMoney(
                toShowOperation.priceWithTaxCost
              )}`}</span>
            </div>
            <p className="font-thin">
              Precio con Impuestos sobre el Costo:
              <span className="font-bold text-red-300">
                {formatMoney(toShowOperation.priceWithTaxCost)}
              </span>
            </p>

            {/* <p className="text-teal-700 font-medium">{`${formatMoney(
              toShowOperation.priceWithTaxCost
            )} x (1 + ${
              toShowOperation.taxFinalPriceSuma
            }% / 100) = ${formatMoney(
              toShowOperation.priceWithTaxCostAndFinalPrice
            )} `}</p> */}
            {/* OPERACION
             */}
            <p className="italic text-yellow-300 text-xs border-t-1 border-gray-700">
              Agregando impuesto sobre el precio final.
            </p>
            <div className="text-teal-700 font-medium flex">
              <span className="mr-1 text-red-300">{`${formatMoney(
                toShowOperation.priceWithTaxCost
              )}`}</span>
              <span className="text-gray-400">{`x (1 + `}</span>
              <span className="text-cyan-500">
                {toShowOperation.taxFinalPriceSuma}%
              </span>
              <span>{`/ 100) =`}</span>
              <span className="text-violet-300">{`${formatMoney(
                toShowOperation.priceWithTaxCostAndFinalPrice
              )}`}</span>
            </div>
            <p>
              Precio con Impuestos sobre el Costo y Final:
              <span className="font-bold text-violet-300">
                {formatMoney(toShowOperation.priceWithTaxCostAndFinalPrice)}
              </span>
            </p>
            <p className="italic text-yellow-300 text-xs border-t-1 border-gray-700">
              Agregando porcentaje de venta.
            </p>
            <div className="text-teal-700 font-medium flex border-gray-700">
              <span className="mr-1 text-violet-300">{`${formatMoney(
                toShowOperation.priceWithTaxCostAndFinalPrice
              )}`}</span>
              <span className="text-gray-400">{`x (1 + `}</span>
              <span className="text-sky-300">
                ${toShowOperation.percentaje}%
              </span>
              <span>{`/ 100) =`}</span>
              <span className="text-violet-300">{`${formatMoney(
                toShowOperation.priceWithTaxsAndProfit
              )}`}</span>
            </div>
            <p>
              Precio Final con Ganancia:
              <span className="font-bold">
                {formatMoney(toShowOperation.priceWithTaxsAndProfit)}
              </span>
            </p>
          </div>

          {/* <p className="text-teal-700 font-medium">{`${formatMoney(
              toShowOperation.priceWithTaxCostAndFinalPrice
            )} x (1 + ${toShowOperation.percentaje}% / 100) = ${formatMoney(
              toShowOperation.priceWithTaxsAndProfit
            )} `}</p> */}
        </div>
      ) : null}
      <div className="text-2xl flex space-x-3 border-b border-gray-700 border-r-1 border-t-1">
        <p>Precio Final:</p>{" "}
        <NumericFormat
          value={finalPrice}
          displayType={"text"}
          prefix={"$"}
          renderText={(formattedValue) => (
            <div className="font-bold">{formattedValue}</div>
          )}
          decimalScale={2}
        />
      </div>
    </div>
  );
};

export default SaleAndCost;
