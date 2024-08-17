import React, { useEffect, useReducer, useState } from "react";
import Article from "./ArticlePart/Article";
import Stock from "./StockPart/Stock";
import Head from "./Head";
import Modals from "./Modals";
import {
  articleData,
  depositType,
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

  const [deposits, setDeposits] = useState<depositType[]>([]);
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
      quantityperunit: {
        active: false,
        value: 0,
      },
      description: "",
      code: ""
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
    deposits: [],
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
            stock: { ...state.article.stock, amount: action.payload },
          },
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
            palette: {
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
      case "SET_QUANTITYPERUNITVALUE":
        return {
          ...state,
          article: {
            ...state.article,
            quantityperunit: {
              ...state.article.quantityperunit,
              value: action.payload,
            },
          },
        };
      case "SET_QUANTITYPERUNITACTIVE":
        return {
          ...state,
          article: {
            ...state.article,
            quantityperunit: {
              value: 0,
              active: action.payload,
            },
          },
        };
      case "SET_SUPPLIER":
        const supp = suppliers.filter((e: supplierType) => {
          return e.name
            .toLowerCase()
            .includes(action.payload.name || action.payload);
        });
        return {
          ...state,
          supplier: {
            ...supp[0],
          },
        };
      case "SET_DEPOSITS":
        return {
          ...state,
          deposits: [...action.payload],
        };
      default:
        return { ...state };
    }
  };
  const [stateArticle, dispatch] = useReducer(articleReducer, initialState);
  //ESTADO DE DEPOSITOS
  type initialStateType = {
    idObject: string;
    name: string;
    depositId: string;
    address: string;
    sector: { name: string; sectorId: string };
  }[];
  const initialStateDeposit: initialStateType = [];
  const depositReducer = (
    state: initialStateType,
    action: { type: string; payload: any }
  ) => {
    switch (action.type) {
      case "SET_DEPOSITS":
        return [...action.payload];
      case "ADD_DEPOSIT":
        const newValue = [...state, action.payload];

        return newValue;
      case "EDIT_DEPOSIT":
        console.log("EDITANDO", action.payload);
        const newStateWithUpdatedDeposit = state.map((d) => {
          console.log();
          if (d.idObject === action.payload.idObject) {
            d = action.payload;
          }
          console.log(d, "OBJETO ACUALIZADO");
          return d;
        });
        return newStateWithUpdatedDeposit;
      case "DELETE_DEPOSIT":
        const newState = state.filter((d) => {
          return d.idObject !== action.payload;
        });
        console.log(
          state,
          "ESTADO ANTESD DE ELIMINAR el deposito",
          action.payload
        );
        console.log(
          "NUEVO ESTADOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO AL ELIMINAR",
          newState
        );
        return newState;
      case "SET_DEPOSIT":
        const newStateWithUpdatedName = state.map((d) => {
          if (d.idObject === action.payload.idObject) {
            return { ...d, deposit: { ...action.payload.deposit } };
          }
          return d;
        });
        console.log("MODIFICANDO depositState", newStateWithUpdatedName);
        return [...newStateWithUpdatedName];
      case "SET_DEPOSIT_SECTOR":
        const newStateWithUpdatedSector = state.map((d) => {
          if (d.idObject === action.payload.idObject) {
            return {
              ...d,
              deposit: {
                ...d,
                sector: {
                  name: action.payload.sector.name,
                  sectorId: action.payload.sector.sectorId,
                },
              },
            };
          }
          return d;
        });
        return [...newStateWithUpdatedSector];
      default:
        return state;
    }
  };
  const [depositState, dispatchDeposit] = useReducer(
    depositReducer,
    initialStateDeposit
  );

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
  const loadDeposits = () => {
    return window.api.recibirEvento("response-get-deposits", (res) => {
      if (res) {
        console.log("ESTO RESPONDE EL BACKEND AL PEDIR DEPOSITOS", res);
        setDeposits([...res]);
      }
      console.log("respuesta bakend", res);
    }); // Aquí puedes cargar tus datos de depositos
    // setDeposits(dataDeposits);
  };
  const loadSuppliers = () => {
    window.api.enviarEvento("get-suppliers");
    window.api.recibirEvento("response-get-suppliers", (res) => {
      if (res) {
        setSuppliers(res);
      }
    });
  };
  useEffect(() => {
    loadDeposits();
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
      window.api.removeAllListeners("response-get-deposits");
    };
  }, []);
  useEffect(() => {
    console.log(stateArticle, "AVEREEE||||||||||||||||||||||||");
  }, [stateArticle]);
  useEffect(() => {
    console.log(depositState, "DEPOSITSSELECTS");
    dispatch({ type: "SET_DEPOSITS", payload: depositState });
  }, [depositState]);
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
    <div className="absolute right-0 top-0 bottom-0 left-0 overflow-hidden bg-blue-950 flex flex-col z-40 hover:bg-slate-600">
      <div className="flex h-full w-full flex-col relative z-40">
        <Head
          setRouter={setRouter}
          router={router}
          onChangeModal={onChangeModal}
          errorIn={errorIn}
          setErrorIn={setErrorIn}
          stateArticle={stateArticle}
        />
        <div className="flex-1 bg-slate-950 app-region-no-drag overflow-auto">
          {router === "article" ? (
            <Article
              stateArticle={stateArticle}
              errorIn={errorIn}
              dispatch={dispatch}
              errorToSave={errorToSave}
              router={router}
            />
          ) : router === "stock" ? (
            <Stock
              stateArticle={stateArticle}
              inputValueSupplierInput={inputValueSupplierInput}
              deposits={deposits}
              depositState={depositState}
              dispatchDeposit={dispatchDeposit}
              setInputValueSupplierInput={setInputValueSupplierInput}
              router={router}
              errorIn={errorIn}
              errorToSave={errorToSave}
              suppliers={suppliers}
              setSuppliers={setSuppliers}
              dispatch={dispatch}
              unitsArticleForm={unitsArticleForm}
            />
          ) : null}
        </div>
        {errorToSave.active ? (
          <Modals errorToSave={errorToSave} setErrorToSave={setErrorToSave} />
        ) : null}
      </div>
    </div>
  );
};

export default ForAddNewArticle;
