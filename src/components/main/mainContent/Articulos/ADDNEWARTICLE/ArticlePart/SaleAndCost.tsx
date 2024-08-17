import React, { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import { Action, articleData } from "../../../../../../../types/types";

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
            value={stateArticle.article.costo}
            onValueChange={(values) => {
              const { formattedValue, value } = values;
              console.log(formattedValue);
              dispatch({ type: "SET_COST", payload: value });
            }}
            className={`${inputStyle} h-14 rounded-l-lg bg-slate-900 ${
              errorIn.includes("COST")
                ? "overline outline-red-500 outline-2"
                : ""
            }`}
          />
        </div>
        <div className="flex flex-col">
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
            className={`${inputStyle} "h-14 bg-slate-900 border border-slate-800"`}
            value={stateArticle.article.profit}
          />
        </div>
        <div className="flex flex-1 flex-col">
          <label htmlFor="venta" className="select-none">
            Precio final
          </label>
          <input
            type="text"
            name="venta"
            className={`${inputStyle} "h-14 bg-slate-900 border border-slate-800"`}
            value={finalPrice}
            disabled
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

  useEffect(() => {
    const finalPrice = applyTaxes(costo, percentajeToSale);
    console.log("PRECIO FINAL LOQUITO", finalPrice);
    setFinalPrice(finalPrice);
  }, [costo, percentajeToSale, articleState.taxes]);

  return (
    <div className="flex flex-col">
      <div className="flex space-x-5 w-full border-cyan-700 border-b">
        <h3 className="font-bold">Cálculo Detallado |</h3>
        <p>
          Precio Base (Costo): <span className="font-bold">${costo}</span>
        </p>
      </div>
      <div className="flex flex-1 border-b border-cyan-700">
        <div className="flex flex-col border-r flex-1 font-medium border-cyan-700">
          <p className="font-thin">
            Impuestos sobre el Costo:{" "}
            <span className="font-bold text-teal-500">
              {toShowOperation.taxCostPriceSuma}%
            </span>
          </p>
          <p className="font-thin">
            Precio con Impuestos sobre el Costo:
            <span className="font-bold">
              {formatMoney(toShowOperation.priceWithTaxCost)}
            </span>
          </p>
          <p className="text-teal-700 font-medium">{`${formatMoney(
            costo
          )} x (1 + ${toShowOperation.taxCostPriceSuma}% / 100) = ${formatMoney(
            toShowOperation.priceWithTaxCost
          )} `}</p>
        </div>
        <div className="flex flex-col border-r flex-1 border-cyan-700 pl-2">
          <p className="font-thin">
            Impuestos sobre el Precio Final:{" "}
            <span className="font-bold text-cyan-500">
              {`${toShowOperation.taxFinalPriceSuma}% `}
            </span>
          </p>
          <p>
            Precio con Impuestos sobre el Costo y Final:
            <span className="font-bold">
              {formatMoney(toShowOperation.priceWithTaxCostAndFinalPrice)}
            </span>
          </p>
          <p className="text-teal-700 font-medium">{`${formatMoney(
            toShowOperation.priceWithTaxCost
          )} x (1 + ${toShowOperation.taxFinalPriceSuma}% / 100) = ${formatMoney(
            toShowOperation.priceWithTaxCostAndFinalPrice
          )} `}</p>
        </div>
        <div className="flex flex-col pl-2">
          <p>
            Porcentaje de Ganancia:{" "}
            <span className="font-bold text-sky-300">
              {toShowOperation.percentaje}%
            </span>
          </p>
          <p>
            Precio Final con Ganancia:
            <span className="font-bold">
              {formatMoney(toShowOperation.priceWithTaxsAndProfit)}
            </span>
          </p>
          <p className="text-teal-700 font-medium">{`${formatMoney(
            toShowOperation.priceWithTaxCostAndFinalPrice
          )} x (1 + ${toShowOperation.percentaje}% / 100) = ${formatMoney(
            toShowOperation.priceWithTaxsAndProfit
          )} `}</p>
        </div>
      </div>
      <p>
        Precio Final: <span className="font-bold">{finalPrice}</span>
      </p>
    </div>
  );
};

export default SaleAndCost;
