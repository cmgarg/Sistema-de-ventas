import React, { useEffect, useRef, useState } from "react";
import { clientData, saleData, storeType } from "../../../../../../types/types";
import { useSelector } from "react-redux";
import ListaProductos from "./ListaProductos";
import AsideForm from "./AsideForm";
import Factura from "./Factura/Factura";
import SelectBuyer from "./SelectBuyer";
import SelectSeller from "./SelectSeller";
import FooterForm from "./FooterForm";
import PayMethod from "./PayMethod/PayMethod";
import SaleEnd from "./SaleEnd";

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
  const [saleData, setSaleData] = useState<saleData>({
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
      name: "Admin",
      id: "admin",
      image: "admin",
    },
    billData: { billType: "" },
    sold: 0,
  });
  
  const [userData, setUserData] = useState<any>({});
  const [facturaOk, setFacturaOk] = useState<boolean>(false);
  const [pMOk, setpMOk] = useState<boolean>(false);
  const [saleEnd, setSaleEnd] = useState(false);
  const clients = useSelector((state: storeType) => state.clientState);
  const articles = useSelector((state: storeType) => state.articleState);
  const [showOkSignal, setShowOkSignal] = useState<{
    show: boolean;
    save: boolean;
    message: string;
  }>({ show: false, save: false, message: "" });
  const [showError, setShowError] = useState<{ in: string }>({ in: "" });
  const [cost, setCost] = useState<number>(0);
  const [clientData, setClientData] = useState<clientData>({
    name: "",
    email: "",
    address: "",
    phone: 0,
    DNI: 0,
    birthdate: "",
    shopping: [],
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
  const loadSeller = (seller: { name: string; id: string; image: string }) => {
    setChangeData("seller", seller);
    onClickSeller(false);
  };

  const loadBuyer = (value: string) => {
    const buyerType = ["finalConsumer", "client"];

    if (buyerType.includes(value)) {
      switch (value) {
        case "finalConsumer":
          setChangeData("buyer", {
            client: {
              active: false,
              client: { name: "", email: "", address: "", phone: "", dni: "" },
            },
            finalConsumer: { active: true, cae: "2334r12" },
          });
          setShowModalBuyer(false);
          break;
        case "client":
          setChangeData("buyer", {
            client: {
              active: true,
              clientData: { ...clientData },
            },
            finalConsumer: { active: false, cae: "" },
          });
          setShowModalBuyer(false);
          break;

        default:
          break;
      }
    }
  };

  const changeShowError = (e: string) => {
    setShowError({ in: e });
    setTimeout(() => {
      setShowError({ in: "" });
    }, 3000);
  };

  const addProduct = (e: {
    name: string;
    code?: string;
    total: string;
    amount: {
      value: string;
      unit: { label: string; palette: boolean; bulk: boolean };
    };
  }) => {
    const arr = [];
    arr.push(e);

    setChangeData("articles", arr);
  };
  const sumCost = () => {
    const arr = saleData.articles.map((product) => product.total);
    let suma = 0;
    arr.map((a) => {
      suma += typeof a === "string" ? parseInt(a) : a;
    });
    setChangeData("sold", suma);
    setCost(suma);
  };
  //

  const deleteOfList = (id: number) => {
    console.log("EJECUTANDOOO");
    const arr = saleData.articles.filter((ar, index) => index !== id);
    setChangeData("DELETE-ARTICLE", arr);
  };

  const showOkSaveSignal = (b: {
    save: boolean;
    show: boolean;
    message: string;
  }) => {
    setShowOkSignal(b);
  };
  function setChangeData(data: string, value: any) {
    const existingData = [
      "articles",
      "sold",
      "buyer",
      "seller",
      "payMethod",
      "billType",
      "DELETE-ARTICLE",
    ];
    if (existingData.includes(data)) {
      switch (data) {
        case "articles":
          console.log("se cumple esrte");
          setSaleData({
            ...saleData,
            articles: [...saleData.articles, ...value],
          });
          break;
        case "DELETE-ARTICLE":
          console.log("se cumple esrte");
          setSaleData({
            ...saleData,
            articles: [...value],
          });
          break;
        case "sold":
          setSaleData({ ...saleData, sold: value });
          break;
        case "buyer":
          console.log("ACA SE LLEGA RICO", value);
          setSaleData({ ...saleData, buyer: { ...value } });
          break;
        case "seller":
          setSaleData({ ...saleData, seller: value });
          break;
        case "billType":
          setSaleData({
            ...saleData,
            billData: { ...saleData.billData, billType: value },
          });
          break;
        case "payMethod":
          setSaleData({
            ...saleData,
            pM: value,
          });
          break;

        default:
          break;
      }
    } else {
      console.log("NO ESTA");
    }
  }

  //SUBIR USUARIO A BASE DE DATOS LOCAL

  function subirVenta() {
    const existArticles = saleData.articles.length > 0;
    const existBuyer =
      saleData.buyer.client.active || saleData.buyer.finalConsumer.active;
    if (existArticles && existBuyer) {
      showOkSaveSignal({
        show: true,
        save: true,
        message: "Verificaciones realizadas",
      });
    } else if (!existArticles && !existBuyer) {
      changeShowError("all");
    } else if (!existBuyer) {
      changeShowError("buyer");
    } else if (!existArticles) {
      changeShowError("articles");
    }
  }

  useEffect(() => {
    sumCost();
  }, [saleData.articles]);

  useEffect(() => {
    window.api.recibirEvento("response-sale-process", (response) => {
      console.log("SE GUARDO SARPADAMENTE", response);
      if (response.success) {
        showOkSaveSignal({
          show: false,
          save: false,
          message: "Venta realizada con éxito",
        });
        window.api.enviarEvento("get-articles");
        setpMOk(false);
        setFacturaOk(false);
        setSaveSaleExit(true);
        setSaleData({
          articles: [],
          buyer: {
            client: {
              active: false,
              clientData: {
                name: "",
                email: "",
                address: "",
                phone: "",
                dni: "",
                _id: "",
              },
            },
            finalConsumer: {
              active: false,
              cae: "",
            },
          },
          seller: {
            name: "Admin",
            id: "admin",
            image: "admin",
          },
          sold: 0,
        });
      } else {
        showOkSaveSignal({
          show: true,
          save: false,
          message: response.message,
        });
      }
    });
  }, []);
  //
  const getUserData = () => {
    const userId = localStorage.getItem("userId");
    window.api.enviarEvento("obtener-datos-usuario", userId);
  }; //
  const printBill = () => {
    window.api.enviarEvento("imprimir-pa", saleData);
  };
  useEffect(() => {
    getUserData();
    window.api.recibirEvento("datos-usuario-obtenidos", (e) => {
      console.log(e.data.username, "ESTO ES GONZA");

      if (e.success) {
        setUserData(e.data);
        setChangeData("seller", {
          name: e.data.username,
          id: e.data._id,
          image: e.data.imageUrl,
        });
      }
    });
  }, []);
  useEffect(() => {
    if (pMOk && facturaOk) {
      setSaleEnd(true);
    } else {
      setSaleEnd(false);
    }
  }, [pMOk, facturaOk]);

  //ESTILOS INPUT
  const estilosInput = "outline-none px-2";

  return (
    <div className="absolute bottom-0 top-0 right-0 left-0 flex justify-center items-center backdrop-blur-lg z-50 app-region-no-drag">
      {showOkSignal.show &&
        (!facturaOk ? (
          <Factura
            showOkSaveSignal={showOkSaveSignal}
            subirVenta={subirVenta}
            setChangeData={setChangeData}
            setFacturaOk={setFacturaOk}
            facturaOk={facturaOk}
            saleData={saleData}
          />
        ) : (
          <PayMethod pMOk={setpMOk} setChangeData={setChangeData} />
        ))}
      {saleEnd && (
        <SaleEnd
          setFacturaOk={setFacturaOk}
          setPMOk={setpMOk}
          setSaleEnd={setSaleEnd}
          saleData={saleData}
          addSales={addSales}
        />
      )}
      {saveSaleExit && (
        <div className="absolute z-50 h-32 w-64 p-2 bg-slate-950 flex flex-col text-slate-50 rounded-lg border border-slate-700">
          <div className="flex-1 flex justify-center">
            <p>¿Quieres imprimir la factura?</p>
          </div>{" "}
          <div className="w-full h-5 text-xs flex space-x-2">
            <button
              onClick={() => onChangeModal(false)}
              className="flex-1 h-full bg-red-500 rounded-lg"
            >
              DESPUES
            </button>
            <button
              onClick={printBill}
              className="flex-1 h-full bg-green-500 rounded-lg"
            >
              IMPRIMIR
            </button>
          </div>
        </div>
      )}
      <div className="w-4/5 h-4/5 bg-[#2f2f2fff]  text-slate-50 rounded-lg overflow-hidden flex relative pt-2">
        <AsideForm
          subirVenta={subirVenta}
          onChangeModal={onChangeModal}
          onClickBuyer={onClickBuyer}
          onClickSeller={onClickSeller}
          userData={userData}
          saleData={saleData}
          showError={showError}
        />

        {showModalBuyer && (
          <SelectBuyer
            clientData={clientData}
            clients={clients}
            loadBuyer={loadBuyer}
            estilosInput={estilosInput}
            saleData={saleData}
            loadClient={loadClient}
            setClientData={setClientData}
          />
        )}
        {showModalSeller && (
          <SelectSeller
            loadSeller={loadSeller}
            estilosInput={estilosInput}
            saleData={saleData}
            onClickSeller={onClickSeller}
          />
        )}
        <div className="flex-1 flex w-full flex-col overflow-auto">
          <div className="flex-1 flex overflow-hidden">
            <ListaProductos
              deleteOfList={deleteOfList}
              listProduct={saleData.articles}
              articles={articles}
              addProduct={addProduct}
              estilosInput={estilosInput}
              formatMony={formatMony}
              showError={showError}
            />
          </div>
          <FooterForm cost={cost} sumCost={sumCost} />
        </div>
      </div>
    </div>
  );
};

export default AddVentaForm;
