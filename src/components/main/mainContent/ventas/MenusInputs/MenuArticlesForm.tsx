import React, { useState } from "react";
import Downshift from "downshift";

interface Article {
  name: string;
  code?: string; // Hacemos `code` opcional para que coincida con el tipo esperado
  total: string;
  amount: {
    value: string;
    unit: string;
  };
}

interface articleData {
  article: {
    name: string;
    venta: number;
    stock: {
      unit: {
        abrevUnit: string;
      };
      amount: number;
    };
  };
  brand: {
    value: string;
    label: string;
  };
  code: string;
  barcode: string;
  category: {
    value: string;
    label: string;
  };
  subCategory: {
    value: string;
    label: string;
  };
  dateToRegister: string;
  supplier: string;
  sales: number;
  taxes: number;
  deposits: string;
}

type propsInput = {
  style: string;
  articles: articleData[];
  addProduct: (article: Article) => void;
  value?: string;
};

const MenuArticlesForm: React.FC<propsInput> = ({
  style,
  addProduct,
  articles,
  value,
}) => {
  const [newValue, setNewValue] = useState<string>("");
  const [amountArticle, setAmountArticle] = useState<string>("");
  const [articleSelect, setArticleSelect] = useState<articleData | null>(null);
  const [unitShow, setUnitShow] = useState<string>("Ud");
  const [errorShowAmount, setErrorShowAmount] = useState(false);
  const [errorShowArticle, setErrorShowArticle] = useState(false);

  const onChangeNewValue = (newValue: string) => {
    if (/^[a-zA-Z0-9\s]*$/.test(newValue)) {
      setNewValue(newValue);
      sendArticle("", false, true);
    }
  };

  const sendArticle = (
    code: String,
    send?: boolean,
    showCurrentArticle?: boolean
  ) => {
    const [articleToSend] = articles.filter((article) => {
      if (code) {
        return article.code === code;
      } else {
        return (
          article.article.name.slice(0, newValue.length).toLowerCase() ===
          newValue.toLowerCase()
        );
      }
    });
    if (articleToSend) {
      const price = articleToSend.article.venta;

      const totalAmount = Number(amountArticle) * Number(price);

      const articleForList: Article = {
        name: articleToSend.article.name,
        code: articleToSend.code,
        total: `${totalAmount}`,
        amount: {
          value: `${amountArticle}`,
          unit: `${articleToSend.article.stock.unit.abrevUnit}`,
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
      setArticleSelect(articleToSend);
    }
  };
  const abreviationUnit = (unit: string) => {
    let abreviation = "";
    const units = ["kilogramos", "unidades", "litros", "paquetes", "cajas"];
    if (units.includes(unit.toLowerCase())) {
      switch (unit.toLowerCase()) {
        case "kilogramos":
          abreviation = "Kg";
          break;
        case "unidades":
          abreviation = "Ud";
          break;
        case "litros":
          abreviation = "L";
          break;
        case "paquetes":
          abreviation = "Paq";
          break;
        case "cajas":
          abreviation = "Caj";
          break;
        default:
          break;
      }
    }
    if (abreviation !== "") {
      setUnitShow(abreviation);
    }
  };
  const compareSelectItemWithInputValue = (i: articleData): any => {
    const toSearch = i;
    const inputLength = newValue.length;

    const result = Object.values(toSearch).some((val) => {
      if (typeof val === "string") {
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
      return toSearch.article.name;
    }
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
        setArticleSelect(selectedItem);
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
        <div className="relative flex flex-col flex-1 h-12 bg-slate-800 rounded-lg text-xl">
          <div className="absolute h-12 right-0 rounded-md bg-green-500 flex justify-center hover:bg-green-600">
            <div className="flex relative">
              <input
                type="text"
                name="amount"
                placeholder="0"
                onChange={(e) => {
                  if (/^[0-9]*$/.test(e.target.value)) {
                    setAmountArticle(e.target.value);
                  }
                }}
                value={amountArticle}
                className={`w-32 outline-none rounded-l-md border-l-2 pl-2 border-slate-600 bg-teal-800 ${
                  errorShowAmount && " shadow-inset-cmg"
                }`}
              />
              <p className="absolute bottom-1 right-1 text-slate-400 text-xs select-none">
                {articleSelect?.article.stock.unit.abrevUnit}
              </p>
            </div>
            <button
              className="flex justify-center items-center rounded-md px-2 bg-green-500  hover:bg-green-600"
              onClick={() => sendArticle("", true, true)}
            >
              <p>AÑADIR</p>
            </button>
          </div>
          <div
            style={{ display: "inline-block" }}
            {...getRootProps({}, { suppressRefError: true })}
            className="w-full h-full"
          >
            <input
              placeholder="Añadir articulo"
              {...getInputProps()}
              className={`${style} ${
                isOpen ? "rounded-b-none" : "rounded-r-md"
              } w-full h-full bg-teal-950 ${
                errorShowArticle && "shadow-inset-cmg"
              }`}
            />
          </div>
          <ul
            {...getMenuProps()}
            className="w-full absolute top-full rounded-b-sm text-2xl z-50"
          >
            {isOpen ? (
              <li className="w-full flex bg-teal-400 px-1 text-slate-700 h-10 items-center justify-center border-b-2 border-teal-200">
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
                        <p>${item.article.venta}</p>
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
