import { articleData } from "../../../../../../types/types";
import React, { useEffect, useState } from "react";
import Downshift from "downshift";
import { NumericFormat } from "react-number-format";
import SelectM from "../../Select/Select";
import ButtonR from "../../buttons/ButtonR";
import SelectDefinitive from "../../Select/SelectDefinitive";

type propsInput = {
  style: string;
  articles: articleData[];
  addProduct: (article: {
    name: string;
    code?: string;
    total: string;
    amount: {
      value: string;
      unit: { label: string; palette: boolean; bulk: boolean };
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
  const [articleSelect, setarticleSelect] = useState<articleData>();
  const [optionXSelect, setOptionX] = useState<string>("unit");
  const [optionsAmountSelect, setOptionsAmountSelect] = useState<
    { value: string; label: string }[]
  >([]);
  const [amountOptions, setAmountOptions] = useState<{
    palette: {
      active: boolean;
      amount: number;
    };
    forBulk: {
      active: boolean;
      amount: number;
    };
  }>({
    palette: {
      active: false,
      amount: 0,
    },
    forBulk: {
      active: false,
      amount: 0,
    },
  });
  const [errorShowAmount, setErrorShowAmount] = useState(false);
  const [errorShowArticle, setErrorShowArticle] = useState(false);

  const onChangeNewValue = (newValue: string) => {
    if (/^[a-zA-Z0-9\sñÑ]*$/.test(newValue)) {
      setNewValue(newValue);
      sendArticle(false, true);
    }
  };

  const sendArticle = (send: boolean, showCurrentArticle: boolean) => {
    const [articleToSend] = articles.filter((article) => {
      return (
        article.article.name.slice(0, newValue.length).toLowerCase() ===
        newValue.toLowerCase()
      );
    });
    if (articleToSend) {
      const price = articleToSend.article.venta;
      console.log(optionXSelect, "OPCION SELECCIONADA", amountOptions);
      let totalAmount;
      totalAmount = Number(amountArticle) * Number(price);

      let labelUnit = "";
      if (optionXSelect === "xPalet") {
        labelUnit = "Palets";
        totalAmount =
          Number(amountArticle) * amountOptions.palette.amount * Number(price);
      } else if (optionXSelect === "xBulto") {
        labelUnit = "Bultos";
        console.log("SE CUMPLE BULTOS ACATAMBIEN");
        totalAmount =
          Number(amountArticle) * amountOptions.forBulk.amount * Number(price);
      } else {
        labelUnit = articleToSend.article.stock.unit.abrevUnit;
      }
      console.log(labelUnit, optionXSelect);
      const articleForList = {
        name: articleToSend.article.name,
        code: articleToSend.code,
        total: `${totalAmount}`,
        amount: {
          value: `${amountArticle}`,
          unit: {
            label: labelUnit,
            palette: optionXSelect === "XPalet" ? true : false,
            bulk: optionXSelect === "XBulto" ? true : false,
          },
        },
      };

      if (send) {
        if (amountArticle && newValue) {
          addProduct(articleForList);

          setErrorShowArticle(false);
          setErrorShowAmount(false);
        } else if (!amountArticle && !newValue) {
          setErrorShowAmount(true);
          setErrorShowArticle(true);
          setTimeout(() => {
            setErrorShowAmount(false);
            setErrorShowArticle(false);
          }, 3000);
        } else if (!newValue) {
          setErrorShowArticle(true);
          setTimeout(() => {
            setErrorShowArticle(false);
          }, 3000);
          setErrorShowAmount(false);
        } else if (!amountArticle) {
          setErrorShowAmount(true);
          setTimeout(() => {
            setErrorShowAmount(false);
          }, 3000);
          setErrorShowArticle(false);
        }
      }
    }
    if (showCurrentArticle) {
      setarticleSelect(articleToSend);
    }
  };
  const amountSelect = () => {
    let amountOptions = {
      palette: {
        active: false,
        amount: 0,
      },
      forBulk: {
        active: false,
        amount: 0,
      },
    };
    let articleS;
    if (articleSelect) {
      articleS = articleSelect;
      if (articleS.article.pallet.active) {
        console.log("Se cumple PALETTE");
        amountOptions = {
          ...amountOptions,
          palette: {
            active: true,
            amount: Number(articleS.article.pallet.value),
          },
        };
      }
      if (articleS.article.forBulk.active) {
        console.log("Se cumple BULTO");

        amountOptions = {
          ...amountOptions,
          forBulk: {
            active: true,
            amount: Number(articleS.article.forBulk.value),
          },
        };
      }
    } else {
      return;
    }
    setAmountOptions({ ...amountOptions });
    setOptionsAmount(amountOptions);
    console.log(articleS.article.pallet, "ARTICULOS COCO5");
  };
  const setOptionsAmount = (amountOptions: {
    palette: {
      active: boolean;
      amount: number;
    };
    forBulk: {
      active: boolean;
      amount: number;
    };
  }) => {
    let optionsToEstablish = [];
    if (amountOptions.palette.active) {
      optionsToEstablish.push({
        label: "Palets",
        value: "xPalet",
      });
    }
    if (amountOptions.forBulk.active) {
      optionsToEstablish.push({
        label: "Bultos",
        value: "xBulto",
      });
    }
    if (optionsToEstablish) {
      setOptionsAmountSelect([
        ...optionsToEstablish,
        {
          label: `${articleSelect?.article.stock.unit.abrevUnit}`,
          value: `${articleSelect?.article.stock.unit.abrevUnit}`,
        },
      ]);
    }
  };
  const selectionXAmount = (e: string) => {
    setOptionX(e);
  };

  const searchInArticles = (e: articleData) => {
    const toSearch = e;
    const inputLength = newValue.length;

    const result = Object.values(toSearch).some((val) => {
      if (typeof val === "string") {
        if (
          val
            .toLowerCase()
            .slice(0, inputLength)
            .includes(newValue.toLowerCase())
        ) {
          return true;
        } else if (val.toLowerCase().includes(newValue.toLowerCase())) {
          return true;
        }
        return val
          .toLowerCase()
          .slice(0, inputLength)
          .includes(newValue.toLowerCase());
      } else if (typeof val === "object") {
        return Object.values(val).some((u) => {
          if (typeof u === "string") {
            return u
              .toLowerCase()
              .slice(0, inputLength)
              .includes(newValue.toLowerCase());
          }
        });
      }
    });

    if (result) {
      return true;
    }
  };
  const getTotalUnit = () => {
    let option = optionXSelect;
    let amount = amountArticle;
    let amountX;

    if (option === "xPalet") {
      amountX = amountOptions.palette.amount;
    }
    if (option === "xBulto") {
      amountX = amountOptions.forBulk.amount;
    }

    return amountX ? Number(amount) * amountX : Number(amount) * 1;
  };
  useEffect(() => {
    amountSelect();
  }, [articleSelect]);
  useEffect(() => {
    console.log(amountOptions, "OPCIONES DE CANTIDADES ");
  }, [amountOptions]);
  useEffect(() => {
    console.log(optionsAmountSelect, "Opciones a sloeccionar x cantidad");
  }, [optionsAmountSelect]);

  return (
    <Downshift
      onChange={(selection) => {
        onChangeNewValue(selection);
      }}
      inputValue={newValue}
      itemToString={(item) => (newValue ? newValue : "")}
      onInputValueChange={(e, stateAndHelpers) => {
        onChangeNewValue(e);
      }}
      onSelect={(selectedItem) => {
        onChangeNewValue(selectedItem.article.name);
        setarticleSelect(selectedItem);
      }}
    >
      {({
        getInputProps,
        getItemProps,
        getMenuProps,
        isOpen,
        inputValue,
        highlightedIndex,
        selectedItem,
        getLabelProps,
        getRootProps,
      }) => (
        <div className="relative flex flex-col flex-1 h-10 rounded-sm text-sm justify-center">
          <div
            {...getRootProps({}, { suppressRefError: true })}
            className="flex-1 h-full rounded-sm flex items-center"
          >
            <div className="flex-1 h-full">
              <input
                placeholder="Añadir articulo"
                {...getInputProps()}
                className={`${style} rounded-sm rounded-r-none ${
                  isOpen ? "rounded-b-none" : ""
                } w-full h-full bg-[#707070ff] ${
                  errorShowArticle && "shadow-inset-cmg"
                }`}
              />
            </div>
            <div className="text-sm h-full rounded-md items-center flex space-x-2 pr-2">
              <div className="flex h-full flex-1 relative rounded-lg items-center">
                <div className="flex w-32 h-full border border-slate-600 rounded-l-lg relative items-center justify-center">
                  <div className="flex-1 w-full h-full">
                    <input
                      type="text"
                      name="amount"
                      placeholder="0"
                      onChange={(e) => {
                        console.log(/^[0-9]*$/.test(e.target.value));
                        if (/^[0-9]*$/.test(e.target.value)) {
                          setAmountArticle(e.target.value);
                        }
                      }}
                      value={amountArticle}
                      className={`w-16 h-full outline-none rounded-l-lg pl-3 bg-[#404040ff] focus:bg-[#909090ff] ${
                        errorShowAmount && " shadow-inset-cmg"
                      }`}
                    />
                  </div>
                  <p className="absolute">=</p>
                  <div className="flex pl-3 h-full flex-1 items-center bg-[#707070ff] select-none">
                    <p> {getTotalUnit()}</p>
                  </div>
                </div>
                <div className="w-24 h-full flex items-center border border-slate-600 bg-gradient-to-l from-gray-700 via-gray-700 to-gray-500 rounded-r-lg">
                  <SelectM
                    onChangeSelection={selectionXAmount}
                    options={optionsAmountSelect}
                    className="h-full flex-1 rounded-r-lg rounded-l-none border-none bg-gradient-to-l from-gray-700 via-gray-700 to-gray-500"
                    placeholder=""
                    slice={-1}
                    todos={false}
                    value={optionXSelect}
                  />
                </div>
                <p className="absolute bottom-1 right-1 text-slate-400 text-xs select-none flex-1">
                  {articleSelect?.article.stock.unit.abrevUnit}
                </p>
              </div>
              <ButtonR
                title="Añadir"
                width="w-24"
                height="h-7"
                bgColor="bg-gradient-to-l from-yellow-700 via-yellow-700 to-yellow-500 text-sm"
                onClick={() => sendArticle(true, true)}
              ></ButtonR>
            </div>
          </div>
          <ul
            {...getMenuProps()}
            className="w-full absolute top-full rounded-b-sm text-normal z-50"
          >
            {isOpen ? (
              <li className="w-full flex bg-teal-400 px-1 text-slate-700 h-7 items-center justify-center border-b-2 border-teal-200">
                <div className="flex-1 flex justify-start items-center">
                  <p>Nombre</p>
                </div>
                <div className="flex-1 flex justify-center">
                  <p>Marca</p>
                </div>
                <div className="flex-1 flex justify-center">
                  <p>Venta</p>
                </div>
                <div className="flex-1 flex justify-end">
                  <p>Codigo</p>
                </div>
              </li>
            ) : null}
            {isOpen
              ? articles
                  .filter((item) => !inputValue || searchInArticles(item))
                  .map((item, index) => (
                    <li
                      {...getItemProps({
                        key: item.code,
                        index,
                        item,
                        style: {
                          border: selectedItem === item ? "2px blue" : "normal",
                          position: "relative",
                        },
                      })}
                      className={`flex px-1 h-12 ${
                        highlightedIndex === index
                          ? "bg-teal-700"
                          : "bg-teal-600 bg-"
                      } ${
                        highlightedIndex === index
                          ? "text-slate-50"
                          : "text-blue-200"
                      }`}
                    >
                      <div className="flex justify-start flex-1 items-center">
                        <p>{item.article.name}</p>
                      </div>
                      <div className="flex justify-center flex-1 items-center">
                        <p>{item.brand.label}</p>
                      </div>
                      <div className="flex justify-center flex-1 items-center">
                        <NumericFormat
                          allowLeadingZeros
                          allowedDecimalSeparators={[".", "."]}
                          value={item.article.venta}
                          decimalScale={2}
                          thousandSeparator=","
                          displayType={"text"}
                          className="text-2xl text-green-400 font-bold"
                          prefix={"$"}
                          renderText={(formattedValue) => (
                            <div>{formattedValue}</div>
                          )}
                        />
                      </div>
                      <div className="flex justify-end flex-1 items-center">
                        <p>{item.code}</p>
                      </div>
                    </li>
                  ))
              : null}
          </ul>
        </div>
      )}
    </Downshift>
  );
};

export default MenuArticlesForm;
