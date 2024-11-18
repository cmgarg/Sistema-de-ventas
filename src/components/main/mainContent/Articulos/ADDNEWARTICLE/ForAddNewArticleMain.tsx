import React, { useEffect, useReducer, useState } from "react";
import Article from "./ArticlePart/Article";
import Stock from "./StockPart/Stock";
import Head from "./Head";
import Modals from "./Modals";
import {
  articleData,
  supplierType,
  unitType,
} from "../../../../../../types/types";

type ForAddNewArticleProps = {
  onChangeModal: (e: boolean) => void;
};

const ForAddNewArticle: React.FC<ForAddNewArticleProps> = ({
  onChangeModal,
}) => {
  const [router, setRouter] = useState<string>("article");
  const [suppliers, setSuppliers] = useState<supplierType[]>([]);

  const [inputValueSupplierInput, setInputValueSupplierInput] =
    useState<string>("");

  const [errorIn, setErrorIn] = useState<string[]>([]);
  const initialState: articleData = {
    article: {
      name: "",
      costo: 0,
      venta: 0,
      profit: 0,
      stock: {
        amount: 0,
        unit: {
          label: "Kilogramos",
          value: "kilogramos",
          abrevUnit: "KG",
        },
        minStock: 0,
      },
      grossWeight: { value: 0, approx: false },
      liquidWeight: { value: 0, approx: false },
      forBulk: {
        active: false,
        value: 0,
      },
      pallet: {
        active: false,
        value: 0,
      },
      description: "",
    },
    brand: { value: "", label: "" },
    code: "",
    category: { value: "", label: "" },
    subCategory: { value: "", label: "" },
    barcode: "",
    dateToRegister: "",
    sales: [],
    supplier: {
      name: "",
      phoneNumber: "",
      address: "",
      email: "",
    },
    taxes: [],
    batches: [],
    history: [],
  };
  type Action = { type: string; payload: any };
  const articleReducer = (state: articleData, action: Action) => {
    switch (action.type) {
      case "SET_NAME":
        return {
          ...state,
          article: { ...state.article, name: action.payload },
        };
      case "SET_BARCODE":
        return {
          ...state,
          barcode: action.payload,
        };
      case "SET_BRAND":
        return { ...state, brand: action.payload };
      case "SET_CATEGORY":
        return { ...state, category: action.payload };
      case "SET_SUBCATEGORY":
        return { ...state, subCategory: action.payload };
      case "SET_COST":
        return {
          ...state,
          article: { ...state.article, costo: action.payload },
        };
      case "SET_PROFIT":
        return {
          ...state,
          article: { ...state.article, profit: action.payload },
        };
      case "SET_FINAL_PRICE":
        return {
          ...state,
          article: { ...state.article, venta: action.payload },
        };
      case "SET_STOCK":
        return {
          ...state,
          article: {
            ...state.article,
            stock: {
              ...state.article.stock,
              amount: action.payload,
            },
          },
        };
      case "SET_BATCHE":
        const existBatcheIndex = state.batches.findIndex(
          (batche) => batche.lotNumber === action.payload.lotNumber
        );

        if (existBatcheIndex !== -1) {
          // Si el lote ya existe, actualizamos las cantidades correspondientes
          const updatedBatches = state.batches.map((batche, index) => {
            if (index === existBatcheIndex) {
              return {
                ...batche,
                quantity: batche.quantity + Number(action.payload.quantity),
                quantityBulk:
                  batche.quantityBulk + Number(action.payload.quantityBulk),
                quantityPallet:
                  batche.quantityPallet + Number(action.payload.quantityPallet),
              };
            }
            return batche;
          });

          return {
            ...state,
            batches: updatedBatches,
          };
        } else {
          // Si el lote no existe, añadimos el nuevo lote con las cantidades proporcionadas
          const newBatch = {
            ...action.payload,
            quantity: action.payload.quantity,
            quantityBulk: action.payload.quantityBulk,
            quantityPallet: action.payload.quantityPallet,
          };

          return {
            ...state,
            batches: [...state.batches, newBatch],
          };
        }

      case "DELETE_BATCHE":
        return {
          ...state,
          batches: [
            ...state.batches.filter((batche) => {
              return batche.lotNumber !== action.payload;
            }),
          ],
        };
      case "SET_STOCK_UNIT":
        return {
          ...state,
          article: {
            ...state.article,
            stock: { ...state.article.stock, unit: action.payload },
          },
        };
      case "SET_MIN_STOCK":
        return {
          ...state,
          article: {
            ...state.article,
            stock: { ...state.article.stock, minStock: action.payload },
          },
        };
      case "SET_GROSS_WEIGHT":
        return {
          ...state,
          article: {
            ...state.article,
            grossWeight: {
              ...state.article.grossWeight,
              value: action.payload,
            },
          },
        };

      case "SET_GROSS_WEIGHT_APP":
        return {
          ...state,
          article: {
            ...state.article,
            grossWeight: {
              ...state.article.grossWeight,
              approx: action.payload,
            },
          },
        };
      case "SET_LIQUID_WEIGHT":
        return {
          ...state,
          article: {
            ...state.article,
            liquidWeight: {
              ...state.article.liquidWeight,
              value: action.payload,
            },
          },
        };
      case "SET_LIQUID_WEIGHT_APP":
        return {
          ...state,
          article: {
            ...state.article,
            liquidWeight: {
              ...state.article.liquidWeight,
              approx: action.payload,
            },
          },
        };
      case "SET_NEW_TAX":
        return {
          ...state,
          taxes: [...state.taxes, action.payload],
        };
      case "DELETE_TAX":
        const taxes = [...state.taxes];
        taxes.splice(action.payload, 1);
        return {
          ...state,
          taxes: [...taxes],
        };
      case "SET_DESCRIPTION":
        return {
          ...state,
          article: { ...state.article, description: action.payload },
        };
      case "SET_PALETTEVALUE":
        return {
          ...state,
          article: {
            ...state.article,
            pallet: {
              ...state.article.pallet,
              value: action.payload,
            },
          },
        };
      case "SET_PALETTEACTIVE":
        return {
          ...state,
          article: {
            ...state.article,
            pallet: {
              value: 0,
              active: action.payload,
            },
          },
        };
      case "SET_BULKVALUE":
        return {
          ...state,
          article: {
            ...state.article,
            forBulk: {
              ...state.article.forBulk,
              value: action.payload,
            },
          },
        };
      case "SET_BULKACTIVE":
        return {
          ...state,
          article: {
            ...state.article,
            forBulk: {
              value: 0,
              active: action.payload,
            },
          },
        };

      case "SET_SUPPLIER":
        return {
          ...state,
          supplier: action.payload,
        };
      default:
        return { ...state };
    }
  };
  const [stateArticle, dispatch] = useReducer(articleReducer, initialState);

  const [unitsArticleForm, setUnitsArticleForm] = useState<unitType[]>([]);

  const [errorToSave, setErrorToSave] = useState<{
    message: string;
    type: string;
    active: boolean;
  }>({
    message: "Error al guardar el articulo",
    type: "",
    active: false,
  });
  const loadSuppliers = () => {
    window.api.enviarEvento("get-suppliers");
    window.api.recibirEvento("response-get-suppliers", (res) => {
      if (res) {
        setSuppliers(res);
      }
    });
  };
  useEffect(() => {
    loadSuppliers();
    window.api.recibirEvento("error-save-article", (error) => {
      console.log("GONZALO FIJATE ACA", error);
      if (!error.active) {
        onChangeModal(false);
      }
      setErrorToSave({ ...error });
    });
    window.api.enviarEvento("get-unitsArticleForm");

    window.api.recibirEvento("response-get-unitsArticleForm", (units) => {
      const unitsAll = [...units];
      setUnitsArticleForm(unitsAll);
    });
    return () => {
      window.api.removeAllListeners("response-get-unitsArticleForm");
    };
  }, []);
  useEffect(() => {
    console.log(stateArticle, "AVEREEE||||||||||||||||||||||||");
  }, [stateArticle]);

  const [barcode, setBarcode] = useState("");
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    let buffer = "";
    let timeout: string | number | NodeJS.Timeout | undefined;

    const handleKeyPress = (e: { key: string }) => {
      if (timeout) clearTimeout(timeout);
      // Append the pressed key to the buffer
      buffer += e.key;

      // Set a timeout to reset the buffer after 50ms
      timeout = setTimeout(() => {
        buffer = "";
      }, 50);

      // Detect Enter + Tab combination
      console.log(buffer, "BUFFER");
      if (buffer.endsWith("Enter")) {
        console.log("ajajajajaj");

        setBarcode(buffer.slice(0, -5)); // Remove 'Enter' and 'Tab' from the buffer
        buffer = "";
      }
    };

    window.addEventListener("keypress", handleKeyPress);

    return () => {
      window.removeEventListener("keypress", handleKeyPress);
    };
  }, []);

  useEffect(() => {
    if (barcode) {
      setInputValue(barcode); // Set the barcode value to the input
      setBarcode(""); // Reset the barcode state
      dispatch({ type: "SET_BARCODE", payload: barcode });
    }
    console.log("CODIGO DE BARRAS ESCANEADO", barcode);
  }, [barcode]);
  return (
    <div className="absolute right-0 top-0 bottom-0 left-0 overflow-hidden backdrop-brightness-50 flex flex-col justify-center items-center z-40 text-[#fff8dcff]">
      <div className="flex h-5/6 w-11/12 flex-col text-sm relative bg-[#2f2f2fff] z-50 rounded-lg border border-gray-600">
        <div className="flex-1 app-region-no-drag overflow-auto custom-scrollbar">
          <Article
            stateArticle={stateArticle}
            errorIn={errorIn}
            dispatch={dispatch}
            errorToSave={errorToSave}
            router={router}
          />
          <Stock
            stateArticle={stateArticle}
            inputValueSupplierInput={inputValueSupplierInput}
            setInputValueSupplierInput={setInputValueSupplierInput}
            router={router}
            errorIn={errorIn}
            errorToSave={errorToSave}
            suppliers={suppliers}
            setSuppliers={setSuppliers}
            dispatch={dispatch}
            unitsArticleForm={unitsArticleForm}
          />
          <Head
            setRouter={setRouter}
            router={router}
            onChangeModal={onChangeModal}
            errorIn={errorIn}
            setErrorIn={setErrorIn}
            stateArticle={stateArticle}
          />
        </div>

        {errorToSave.active ? (
          <Modals errorToSave={errorToSave} setErrorToSave={setErrorToSave} />
        ) : null}
      </div>
    </div>
  );
};

export default ForAddNewArticle;
