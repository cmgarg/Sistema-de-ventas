import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import MenuClientsForm from "../MenusInputs/MenuClientsForm";
import MenuArticlesForm from "../MenusInputs/MenuArticlesForm";
import ListaProductos from "./ListaProductos";
import AsideForm from "./AsideForm";
import Factura from "./Factura";

// Definiciones de tipo
interface Article {
  name: string;
  code: string;
  total: string | number;
  amount: {
    value: string | number;
    unit: string;
  };
}

interface ClientData {
  name: string;
  email: string;
  address: string;
  phone: string;
  dni: string;
  _id: string;
  DNI: string;
}

interface Buyer {
  client: {
    active: boolean;
    clientData: ClientData;
  };
  finalConsumer: {
    active: boolean;
    cae: string;
  };
}

interface Seller {
  name: string;
  email: string;
  address: string;
  phone: string;
  dni: string;
}

interface saleData {
  _id: string;
  dateOfRegister: string;
  articles: Article[];
  buyer: Buyer;
  seller: Seller;
  sold: number;
}

interface ClientState {
  clientState: ClientData[];
}

interface ArticleState {
  articleState: Article[];
}

interface AddVentaFormProps {
  onChangeModal: (p: boolean) => void;
  addSales: any;
  formatMony: (number: number) => string;
}

const AddVentaForm: React.FC<AddVentaFormProps> = ({
  onChangeModal,
  addSales,
  formatMony,
}) => {
  const [saleData, setSaleData] = useState<saleData>({
    _id: "",
    dateOfRegister: "",
    articles: [],
    buyer: {
      client: {
        active: false,
        clientData: {
          name: "",
          email: "",
          address: "",
          _id: "",
          phone: "",
          dni: "",
          DNI: "",
        },
      },
      finalConsumer: {
        active: false,
        cae: "",
      },
    },
    seller: {
      name: "Admin",
      email: "Admin",
      address: "Admin",
      phone: "Admin",
      dni: "Admin",
    },
    sold: 0,
  });

  const [listProduct, setListProduct] = useState<Article[]>([]);
  const clients = useSelector((state: ClientState) => state.clientState);
  const articles = useSelector((state: ArticleState) => state.articleState);
  const [showOkSignal, setShowOkSignal] = useState<{
    show: boolean;
    save: boolean;
    message: string;
  }>({ show: false, save: false, message: "" });
  const [showError, setShowError] = useState<{ in: string }>({ in: "" });
  const [cost, setCost] = useState<number>(0);
  const [clientData, setClientData] = useState<{
    name: string;
    email: string;
    address: string;
    phone: string;
    dni: string;
  }>({
    name: "",
    email: "",
    address: "",
    phone: "",
    dni: "",
  });
  const [showModalBuyer, setShowModalBuyer] = useState(false);
  const [showClientForm, setShowClientForm] = useState(false);

  const modalClient = () => {
    setShowModalBuyer(true);
  };

  const onShowClientForm = (s: boolean) => {
    setShowClientForm(s);
  };

  const loadClient = () => {
    if (clientData.name) {
      loadBuyer("client");
      onShowClientForm(false);
    }
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

  const addProduct = (e: Article) => {
    const arr = [...listProduct];
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

  const deleteOfList = (id: number) => {
    const arr = [...listProduct];
    arr.splice(id, 1);
    setListProduct(arr);
  };

  const showOkSaveSignal = (b: {
    save: boolean;
    show: boolean;
    message: string;
  }) => {
    setShowOkSignal(b);
  };

  function setChangeData(data: string, value: any) {
    const existingData = ["articles", "sold", "buyer", "seller"];
    if (existingData.includes(data)) {
      switch (data) {
        case "articles":
          setSaleData({
            ...saleData,
            articles: value,
          });
          break;
        case "sold":
          setSaleData({ ...saleData, sold: value });
          break;
        case "buyer":
          setSaleData({ ...saleData, buyer: { ...value } });
          break;
        case "seller":
          setSaleData({ ...saleData, seller: value });
          break;

        default:
          break;
      }
    }
  }

  function subirVenta() {
    const existArticles = saleData.articles.length > 0;
    const existBuyer =
      saleData.buyer.client.active || saleData.buyer.finalConsumer.active;
    if (existArticles && existBuyer) {
      window.api.enviarEvento("sale-process", saleData);
      addSales(saleData);
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
      if (response.success) {
        showOkSaveSignal({
          show: true,
          save: true,
          message: "Venta realizada con éxito",
        });

        setSaleData({
          _id: "",
          dateOfRegister: "",
          articles: [],
          buyer: {
            client: {
              active: false,
              clientData: {
                name: "",
                email: "",
                address: "",
                _id: "",
                phone: "",
                dni: "",
                DNI: "",
              },
            },
            finalConsumer: {
              active: false,
              cae: "",
            },
          },
          seller: {
            name: "Admin",
            email: "Admin",
            address: "Admin",
            phone: "Admin",
            dni: "Admin",
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

  const getUserData = () => {
    const userId = localStorage.getItem("userId");
    window.api.enviarEvento("obtener-datos-usuario", userId);
  };

  useEffect(() => {
    getUserData();
    window.api.recibirEvento("datos-usuario-obtenidos", (e) => {
      if (e.success) {
        setChangeData("seller", e.data);
      }
    });
  }, []);

  const estilosInput = "outline-none px-2";

  return (
    <div className="absolute bottom-0 top-0 right-0 left-0 flex justify-center items-center z-50 app-region-no-drag">
      {showOkSignal.show && (
        <Factura
          onChangeModal={onChangeModal}
          showOkSaveSignal={showOkSaveSignal}
          subirVenta={subirVenta}
        />
      )}
      <div className="w-full h-full bg-gray-600 opacity-95 absolute z-10"></div>
      <div className="relative z-30 flex flex-col w-11/12 h-5/6 rounded-md p-2 bg-gray-100">
        <h3 className="text-2xl underline text-center my-2">
          Añadir nueva venta
        </h3>
        <div className="flex w-full h-full gap-2">
          <div className="flex flex-col w-3/4 h-full">
            <ListaProductos
              deleteOfList={deleteOfList}
              listProduct={listProduct}
              articles={articles}
              addProduct={addProduct}
              estilosInput={estilosInput}
              formatMony={formatMony}
              showError={showError}
            />
            <MenuClientsForm
              modalClient={modalClient}
              showModalBuyer={showModalBuyer}
              setShowModalBuyer={setShowModalBuyer}
              clients={clients}
              loadBuyer={loadBuyer}
              onShowClientForm={onShowClientForm}
              loadClient={loadClient}
              setClientData={setClientData}
              showClientForm={showClientForm} style={""}            />
          </div>
          <AsideForm
            onChangeModal={onChangeModal}
            formatMony={formatMony}
            cost={cost}
            saleData={saleData}
            subirVenta={subirVenta}
            showError={showError}
          />
        </div>
      </div>
    </div>
  );
};

export default AddVentaForm;
