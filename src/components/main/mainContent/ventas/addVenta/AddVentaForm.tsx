import React, { useEffect, useReducer, useRef, useState } from "react";
import {
  clientData,
  IUser,
  saleData,
  storeType,
} from "../../../../../../types/types";
import { useSelector } from "react-redux";
import ListaProductos from "./ListaProductos";
import AsideForm from "./AsideForm";
import Factura from "./Factura/Factura";
import SelectBuyer from "./SelectBuyer";
import SelectSeller from "./SelectSeller";
import FooterForm from "./FooterForm";
import PayMethod from "./PayMethod/PayMethod";
import SaleEnd from "./SaleEnd";
import ButtonR from "../../buttons/ButtonR";
import { Route, Router, Routes } from "react-router-dom";

interface AddVentaForm {
  onChangeModal: (p: boolean) => void;
  addSales: (e: saleData) => void;
  formatMony: (number: number) => string;
}
type productOfList = {
  name: string;
  code?: string;
  total: string;
  amount: string;
};

const AddVentaForm: React.FC<AddVentaForm> = ({
  onChangeModal,
  addSales,
  formatMony,
}) => {
  //DATOS USUARIOS
  //@ts-ignore

  const initialState: saleData = {
    articles: [],
    buyer: {
      client: {
        active: false,
        clientData: {
          name: "",
          email: "",
          address: "",
          _id: "", // Asegúrate de incluir _id aquí
          phone: "",
          dni: "",
        },
      },
      finalConsumer: {
        active: false,
        cae: "",
      },
    },
    seller: {
      username: "",
      _id: "",
      imageUrl: "",
      codigopostal: "",
      direccion: "",
      nombre: "",
      email: "",
      esAdmin: false,
      ubicacion: "",
      uuid: "",
    },
    billData: { billType: "" },
    sold: 0,
  };
  type Action = {
    type:
      | "ARTICLES"
      | "SOLD"
      | "BUYER"
      | "SELLER"
      | "PAY_METHOD"
      | "BILL_TYPE"
      | "DELETE_ARTICLE";
    payload: any;
  };
  const saleDataReducer = (saleDataState: saleData, action: Action) => {
    const existingAction = [
      "ARTICLES",
      "SOLD",
      "BUYER",
      "SELLER",
      "PAY_METHOD",
      "BILL_TYPE",
      "DELETE_ARTICLE",
    ];
    const { type, payload } = action;
    if (existingAction.includes(type)) {
      switch (type) {
        case "ARTICLES":
          return {
            ...saleDataState,
            articles: [...saleDataState.articles, ...payload],
          };
        case "DELETE_ARTICLE":
          return {
            ...saleDataState,
            articles: [...payload],
          };
        case "SOLD":
          return { ...saleDataState, sold: payload };
        case "BUYER":
          return { ...saleDataState, buyer: { ...payload } };
        case "SELLER":
          return { ...saleDataState, seller: payload };
        case "BILL_TYPE":
          return {
            ...saleDataState,
            billData: { ...saleDataState.billData, billType: payload },
          };
        case "PAY_METHOD":
          return {
            ...saleDataState,
            pM: payload,
          };

        default:
          break;
      }
    } else {
      console.log("NO ESTA");
    }
  };
  const [saleState, dispatch] = useReducer(saleDataReducer, initialState);
  const userLoggin = useSelector((state: storeType) => state.estadoTipoDeUser);
  const clients = useSelector((state: storeType) => state.clientState);
  const articles = useSelector((state: storeType) => state.articleState);
  const [userData, setUserData] = useState<{
    userType: string;
    datosUsuario: IUser;
  }>();
  const [currentStage, setCurrentStage] = useState<
    "factura" | "payMethod" | "saleEnd" | "close"
  >("close");

  const [errors, setErrors] = useState<string[]>([]);
  const [cost, setCost] = useState<number>(0);
  const [clientData, setClientData] = useState<clientData>({
    name: "",
    email: "",
    address: "",
    phone: 0,
    DNI: 0,
    birthdate: "",
    shopping: [],
    clientType: "",
    conditionIVA: "",
    CUIT_CUIL: "",
    nationality: "",
    payMethod: "",
    rubro: "",
  });
  const [showModalBuyer, setShowModalBuyer] = useState(false);
  const [showModalSeller, setShowModalSeller] = useState(false);
  const [saveSaleExit, setSaveSaleExit] = useState(false);

  const onClickBuyer = (e: boolean) => {
    setShowModalBuyer(e);
  };
  const onClickSeller = (e: boolean) => {
    setShowModalSeller(e);
  };
  const loadClient = () => {
    if (clientData.name) {
      loadBuyer("client");
    }
  };
  const loadSeller = (seller: IUser) => {
    dispatch({ type: "SELLER", payload: seller });
    onClickSeller(false);
  };

  const loadBuyer = (value: string) => {
    const buyerType = ["finalConsumer", "client"];

    if (buyerType.includes(value)) {
      switch (value) {
        case "finalConsumer":
          dispatch({
            type: "BUYER",
            payload: {
              client: {
                active: false,
                client: {
                  name: "",
                  email: "",
                  address: "",
                  phone: "",
                  dni: "",
                },
              },
              finalConsumer: { active: true, cae: "2334r12" },
            },
          });
          break;
        case "client":
          dispatch({
            type: "BUYER",
            payload: {
              client: {
                active: true,
                clientData: { ...clientData },
              },
              finalConsumer: { active: false, cae: "" },
            },
          });
          break;

        default:
          break;
      }
    }
  };

  const newError = (e: string) => {
    let oldError = [...errors];
    oldError.push(e);
    setErrors(oldError);
  };

  const addProduct = (e: {
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
  }) => {
    const arr = [];
    arr.push(e);

    dispatch({ type: "ARTICLES", payload: arr });
  };
  const sumCost = () => {
    const arr = saleState.articles.map((product) => product.total);
    let suma = 0;
    arr.map((a) => {
      suma += typeof a === "string" ? parseInt(a) : a;
    });
    dispatch({ type: "SOLD", payload: suma });
    setCost(suma);
  };
  //

  const deleteOfList = (id: number) => {
    const arr = saleState.articles.filter((ar, index) => index !== id);
    dispatch({ type: "DELETE_ARTICLE", payload: arr });
  };

  //CHECK SI HAYH ARTICULOS Y SI SE SELECCIONO EL COMPRADOR
  const checkInformation = () => {
    const existArticles = saleState.articles.length > 0;
    const existBuyer =
      saleState.buyer.client.active || saleState.buyer.finalConsumer.active;

    return { existArticles, existBuyer };
  };

  //

  const subirVenta = () => {
    const { existArticles, existBuyer } = checkInformation();
    if (existArticles && existBuyer) {
      setCurrentStage("factura");
    } else if (!existArticles && !existBuyer) {
      newError("ALL");
    } else if (!existBuyer) {
      newError("BUYER");
    } else if (!existArticles) {
      newError("ARTICLES");
    }
  };

  useEffect(() => {
    sumCost();
  }, [saleState.articles]);

  const printBill = () => {
    window.api.enviarEvento("imprimir-pa", saleState);
  };
  useEffect(() => {
    setUserData(userLoggin);
    dispatch({ type: "SELLER", payload: userLoggin.datosUsuario });
    console.log("TOROJAAAAAAAAAAAAAA", userLoggin);
  }, []);
  useEffect(() => {
    console.log(saleState, "NARIZLOCAMASSA");
  }, [saleState]);

  //ESTILOS INPUT
  const estilosInput = "outline-none px-2";

  return (
    <div className="absolute bottom-0 top-0 right-0 left-0 flex justify-center items-center backdrop-blur-lg z-50 app-region-no-drag">
      {/*SI SE VERIFICA QUE HAY ARTICULOS SELECCIONADOS PARA LA VENTA Y EL CLIENTE AL QUE SE LE VA A VENDER, PROCEDE AL PROCOSO DE GENERAR, LA FACTURA Y DEMAS. UNA VEZ ELIGE FACTURA, CONTINUA CON LA ELECCION DE MTODO DE PAGO, Y UNA VEZ ELEGIDA EL METODO DE PAGO, SIGUE A LA PARTE FINAL QUE ES DONDE SE MEUSTRA LA INFORMACION COMPLETA DE LA VENTA.*/}
      {currentStage === "factura" && (
        <Factura setCurrentStage={setCurrentStage} dispatch={dispatch} />
      )}
      {currentStage === "payMethod" && (
        <PayMethod setCurrentStage={setCurrentStage} dispatch={dispatch} />
      )}

      {currentStage === "saleEnd" && (
        <SaleEnd
          setCurrentStage={setCurrentStage}
          setSaveSaleExit={setSaveSaleExit}
          saveSaleExit={saveSaleExit}
          saleState={saleState}
          addSales={addSales}
        />
      )}
      {saveSaleExit && (
        <div className="absolute top-0 left-0 right-0 bottom-0 backdrop-brightness-50 z-50 flex justify-center items-center">
          <div className="absolute z-50 h-32 w-64 p-2 bg-[#2f2f2fff] flex flex-col text-slate-50 rounded-lg border border-slate-700">
            <div className="flex-1 flex justify-center items-center text-lg">
              <p>¿Quieres imprimir la factura?</p>
            </div>
            <div className="w-full h-7 text-xs flex space-x-2">
              <ButtonR
                onClick={() => onChangeModal(false)}
                height="h-7"
                width="w-32"
                title="Despues"
                bgColor="bg-gradient-to-l from-gray-700 via-gray-700 to-gray-500 text-sm"
              ></ButtonR>
              <ButtonR
                onClick={printBill}
                height="h-7"
                width="w-32"
                bgColor="bg-gradient-to-l from-yellow-700 via-yellow-700 to-yellow-500"
                title="Imprimir"
              ></ButtonR>
            </div>
          </div>
        </div>
      )}
      <div className="w-4/5 h-4/5 bg-[#2f2f2fff]  text-slate-50 rounded-lg flex relative">
        <AsideForm
          subirVenta={subirVenta}
          onChangeModal={onChangeModal}
          onClickBuyer={onClickBuyer}
          onClickSeller={onClickSeller}
          userData={userData}
          saleState={saleState}
          errors={errors}
        />

        {showModalBuyer && (
          <SelectBuyer
            clientData={clientData}
            clients={clients}
            loadBuyer={loadBuyer}
            setShowModalBuyer={setShowModalBuyer}
            estilosInput={estilosInput}
            loadClient={loadClient}
            setClientData={setClientData}
          />
        )}
        {showModalSeller && (
          <SelectSeller
            loadSeller={loadSeller}
            estilosInput={estilosInput}
            userLoggin={userData}
            saleState={saleState}
            onClickSeller={onClickSeller}
          />
        )}
        <div className="flex-1 flex w-full flex-col overflow-auto">
          <div className="flex-1 flex overflow-hidden">
            <ListaProductos
              deleteOfList={deleteOfList}
              listProduct={saleState.articles}
              articles={articles}
              addProduct={addProduct}
              estilosInput={estilosInput}
              formatMony={formatMony}
              errors={errors}
            />
          </div>
          <FooterForm cost={cost} sumCost={sumCost} />
        </div>
      </div>
    </div>
  );
};

export default AddVentaForm;
