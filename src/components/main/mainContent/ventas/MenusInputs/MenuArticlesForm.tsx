import { articleData } from "../../../../../../types/types";
import React, { useEffect, useState, useRef } from "react";
import SelectM from "../../Select/Select";
import ButtonR from "../../buttons/ButtonR";
import { LuEqual } from "react-icons/lu";
import SelectArticle from "./SelectArticle";

type propsInput = {
  style: string;
  articles: articleData[];
  addProduct: (article: {
    name: string;
    code?: string;
    total: string;
    amount: {
      value: string;
      unit: {
        value: string;
        label: string;
        abrevUnit: string;
      };
    };
  }) => void;
  value?: string;
};

const MenuArticlesForm = ({
  style,
  addProduct,
  articles,
  value,
}: propsInput) => {
  const [newValue, setNewValue] = useState<string>("");
  const [amountArticle, setAmountArticle] = useState<string>("");
  const [errors, setErrors] = useState<string[]>([]);
  const [articleSelect, setarticleSelect] = useState<articleData | null>(null);
  const [optionXSelect, setOptionX] = useState<{
    value: string;
    label: string;
    abrevUnit: string;
  }>({
    value: "",
    label: "",
    abrevUnit: "",
  });
  const [optionsAmountSelect, setOptionsAmountSelect] = useState<
    { value: string; label: string; abrevUnit: string }[]
  >([]);
  const [amountOptions, setAmountOptions] = useState<{
    pallet: {
      active: boolean;
      amount: number;
    };
    forBulk: {
      active: boolean;
      amount: number;
    };
  }>({
    pallet: {
      active: false,
      amount: 0,
    },
    forBulk: {
      active: false,
      amount: 0,
    },
  });
  const [totalUnit, setTotalUnit] = useState<number>(0);

  // Ref para almacenar el temporizador de error
  const errorTimeoutRef = useRef<number | undefined>(undefined);

  const sendArticle = () => {
    let errors: string[] = [];
    if (articleSelect) {
      let totalAmount = calculateTotal(
        articleSelect,
        optionXSelect,
        amountArticle
      );

      if (Number(amountArticle) <= 0) errors.push("AMOUNT_ERROR");

      if (errors.length === 0) {
        addProduct({
          name: articleSelect.article.name,
          code: articleSelect.code,
          total: totalAmount.toString(),
          amount: {
            value: amountArticle,
            unit: optionXSelect,
          },
        });
      } else {
        setErrors(errors);
        // Limpiar cualquier temporizador de error previo antes de crear uno nuevo
        if (errorTimeoutRef.current) {
          clearTimeout(errorTimeoutRef.current);
        }
        errorTimeoutRef.current = window.setTimeout(() => setErrors([]), 2000);
      }
    } else {
      setErrors(["ARTICLE_ERROR"]);
      if (errorTimeoutRef.current) {
        clearTimeout(errorTimeoutRef.current);
      }
      errorTimeoutRef.current = window.setTimeout(() => setErrors([]), 2000);
    }
  };

  const calculateTotal = (
    articleToSend: articleData,
    optionXSelect: { value: string; label: string; abrevUnit: string },
    amountArticle: string
  ) => {
    const price = Number(articleToSend.article.venta);
    const amount = Number(amountArticle);

    if (optionXSelect.value === "xPalet") {
      return amount * amountOptions.pallet.amount * price;
    } else if (optionXSelect.value === "xBulk") {
      return amount * amountOptions.forBulk.amount * price;
    } else {
      return amount * price;
    }
  };

  const amountSelect = () => {
    let amountOptions = {
      pallet: { active: false, amount: 0 },
      forBulk: { active: false, amount: 0 },
    };

    if (articleSelect) {
      if (articleSelect.article.pallet.active) {
        amountOptions.pallet = {
          active: true,
          amount: Number(articleSelect.article.pallet.value),
        };
      }
      if (articleSelect.article.forBulk.active) {
        amountOptions.forBulk = {
          active: true,
          amount: Number(articleSelect.article.forBulk.value),
        };
      }
    }
    setAmountOptions(amountOptions);
    setOptionsAmount(amountOptions);
  };

  const setOptionsAmount = (amountOptions: {
    pallet: { active: boolean; amount: number };
    forBulk: { active: boolean; amount: number };
  }) => {
    const optionsToEstablish = [
      ...(amountOptions.pallet.active
        ? [{ label: "Palets", value: "xPalet", abrevUnit: "Pal" }]
        : []),
      ...(amountOptions.forBulk.active
        ? [{ label: "Bultos", value: "xBulk", abrevUnit: "Bto" }]
        : []),
    ];

    setOptionsAmountSelect([
      ...optionsToEstablish,
      {
        label: `${articleSelect?.article.stock.unit.label}`,
        value: `${articleSelect?.article.stock.unit.value}`,
        abrevUnit: `${articleSelect?.article.stock.unit.abrevUnit}`,
      },
    ]);
  };

  const selectionXAmount = (e: {
    label: string;
    value: string;
    abrevUnit: string;
  }) => {
    setOptionX(e);
  };

  useEffect(() => {
    setTotalUnit(getTotalUnit());
  }, [amountArticle, optionXSelect]);

  const getTotalUnit = () => {
    const amountX =
      optionXSelect.value === "xPalet"
        ? amountOptions.pallet.amount
        : optionXSelect.value === "xBulk"
        ? amountOptions.forBulk.amount
        : 1;
    return Number(amountArticle) * amountX;
  };

  useEffect(() => {
    amountSelect();
    if (articleSelect) setOptionX(articleSelect.article.stock.unit);
  }, [articleSelect]);

  return (
    <div className="h-10 w-full flex">
      <SelectArticle
        articles={articles}
        setArticleSelect={setarticleSelect}
        errors={errors}
      />
      <div className="flex rounded-lg">
        <div className="h-full relative">
          <input
            type="text"
            className={`w-44 h-full bg-gray-700 border border-gray-600 outline-none pl-2 ${
              errors.includes("AMOUNT_ERROR") ? "border-red-500" : ""
            }`}
            value={amountArticle}
            onChange={(e) => setAmountArticle(e.target.value)}
          />
          <div className="absolute right-0 top-0 h-full w-20 flex items-center pl-2">
            <div className="absolute -left-2 ">
              <LuEqual size={15} />
            </div>
            <p>{totalUnit}</p>
          </div>
        </div>
        <div className="w-24 ">
          <SelectM
            onChangeSelection={selectionXAmount}
            options={optionsAmountSelect}
            className="h-10 w-full flex-1 rounded-r-lg rounded-l-none bg-gradient-to-l  from-gray-800 via-gray-800 to-gray-700"
            placeholder=""
            slice={-1}
            todos={false}
            value={optionXSelect.abrevUnit}
          />
        </div>
        <div className="h-full flex items-center w-32 px-1">
          <ButtonR
            bgColor="bg-gradient-to-l from-yellow-700 via-yellow-700 to-yellow-600"
            height="h-9"
            width="w-full"
            title="Añadir"
            onClick={() => sendArticle()}
          />
        </div>
      </div>
    </div>
  );
};

export default MenuArticlesForm;
