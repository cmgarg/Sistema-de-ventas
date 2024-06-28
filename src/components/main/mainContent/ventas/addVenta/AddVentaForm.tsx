import React, { useEffect, useRef, useState } from "react";
import MenuClientsForm from "../MenusInputs/MenuClientsForm";
import MenuArticlesForm from "../MenusInputs/MenuArticlesForm";
import { articleData, saleData, storeType } from "../../../../../../types";
import { useSelector } from "react-redux";
import ListaProductos from "./ListaProductos";
import ClientSvg from "../../../../../../src/assets/MAINSVGS/articlesSVG/ClientSvg";
import FinalConsumer from "../../../../../../src/assets/MAINSVGS/articlesSVG/FinalConsumer";
import AsideForm from "./AsideForm";
import { CheckCircledIcon } from "@radix-ui/react-icons";

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
      email: "Admin",
      address: "Admin",
      phone: "Admin",
      dni: "Admin",
    },
    sold: 0,
  });
  const [userData, setUserData] = useState<any>({});

  const clients = useSelector((state: storeType) => state.clientState);
  const articles = useSelector((state: storeType) => state.articleState);
  const [showOkSignal, setShowOkSignal] = useState<boolean>(false);
  const [showError, setShowError] = useState<{ in: string }>({ in: "" });
  const [listProduct, setListProduct] = useState<
    {
      name: string;
      code?: string;
      total: string;
      amount: string;
    }[]
  >([]);
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

  const addProduct = (e: {
    name: string;
    code?: string;
    total: string;
    amount: string;
  }) => {
    const arr = [...listProduct];
    arr.push(e);

    setChangeData("articles", arr);
  };
  const sumCost = () => {
    const arr = saleData.articles.map((product) => product.total);
    let suma = 0;
    arr.map((a) => {
      suma += parseInt(a);
    });
    setChangeData("sold", suma);
    setCost(suma);
  };
  //

  const deleteOfList = (id: number) => {
    const arr = [...listProduct];

    arr.splice(id, 1);

    setListProduct(arr);
  };

  const showOkSaveSignal = (b: boolean) => {
    setShowOkSignal(b);
  };
  function setChangeData(data: string, value: any) {
    const existingData = ["articles", "sold", "buyer", "seller"];
    if (existingData.includes(data)) {
      switch (data) {
        case "articles":
          console.log("se cumple esrte");
          setSaleData({
            ...saleData,
            articles: [...saleData.articles, ...value],
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
    console.log(listProduct);
    sumCost();
  }, [saleData.articles]);

  useEffect(() => {
    window.api.recibirEvento("response-sale-process", (response) => {
      console.log("SE GUARDO SARPADAMENTE", response);
      if (response.save) {
        showOkSaveSignal(true);

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
            email: "Admin",
            address: "Admin",
            phone: "Admin",
            dni: "Admin",
          },
          sold: 0,
        });
      } else {
        console.log("ERROREEES");
      }
    });
  }, []);
  //
  const getUserData = () => {
    const userId = localStorage.getItem("userId");
    window.api.enviarEvento("obtener-datos-usuario", userId);
  }; //
  useEffect(() => {
    getUserData();
    window.api.recibirEvento("datos-usuario-obtenidos", (e) => {
      console.log(e, "ESTO ES GONZA");

      if (e.success) {
        setUserData(e.data);
        setChangeData("seller", e.data);
      }
    });
  }, []);

  //ESTILOS INPUT
  const estilosInput = "outline-none px-2";

  return (
    <div className="absolute bottom-0 top-0 right-0 left-0 flex justify-center items-center z-50 app-region-no-drag">
      {showOkSignal && (
        <div className="absolute bottom-0 top-0 right-0 left-0 flex flex-col borde items-center justify-center text-slate-50 text-lg border-slate-800 rounded-md z-50 backdrop-blur-xl">
          <div className="h-1/2 w-1/2 bg-slate-950 flex flex-col justify-center items-center">
            <div className="flex flex-col items-center w-full flex-1 justify-center ">
              <CheckCircledIcon
                width={200}
                height={200}
                color="rgb(134 239 172)"
              ></CheckCircledIcon>
              <p>Se creo la venta correctamente</p>
            </div>

            <div className="flex w-full">
              <button
                className="flex-1 bg-red-800 h-12 rounded-bl-md"
                onClick={() => {
                  onChangeModal(false);
                }}
              >
                Salir
              </button>
              <button
                onClick={() => showOkSaveSignal(false)}
                className="flex-1 bg-green-800 h-12 rounded-br-md"
              >
                Crear otra
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="w-full h-full bg-slate-900  text-slate-50 rounded-md flex relative">
        <AsideForm
          subirVenta={subirVenta}
          onChangeModal={onChangeModal}
          modalClient={modalClient}
          userData={userData}
          saleData={saleData}
          showError={showError}
        />

        {showModalBuyer && (
          <div className="flex flex-col absolute h-2/4 w-2/4 left-1/4 top-1/4 bg-gradient-to-t from-slate-950 to-blue-800 rounded-md z-50">
            {/* <div>
              <MenuClientsForm
                clients={clients}
                setClientData={setClientData}style={estilosInput}
                
              <button>Aceptar</button>
              <button>Cancelar</button>e
              />
            </div> */}
            <div className="absolute bottom-full text-4xl font-bold italic text-slate-600">
              <p>COMPRADOR</p>
            </div>
            <div className="flex flex-1 items-center select-none relative">
              {showClientForm && (
                <div className="absolute flex w-full h-full bg-slate-900 rounded-md rounded-bl-md bg-gradient-to-t from-slate-950 to-blue-950 flex-col">
                  <MenuClientsForm
                    style={estilosInput}
                    clients={clients}
                    setClientData={setClientData}
                  ></MenuClientsForm>
                  <div className="flex flex-1">
                    <div className="flex flex-col border-r border-slate-800">
                      <div className="flex-1 flex justify-center items-center">
                        <ClientSvg color="#fff" size={200}></ClientSvg>
                      </div>
                      <div className="flex w-full justify-start">
                        <button
                          onClick={() => {
                            setShowClientForm(false);
                            setClientData({
                              name: "",
                              email: "",
                              address: "",
                              phone: "",
                              dni: "",
                            });
                          }}
                          className="bg-red-500 text-xl w-32 h-10 rounded-bl-md"
                        >
                          Cancelar
                        </button>
                        <button
                          onClick={() => {
                            loadClient();
                          }}
                          className="bg-green-500 text-xl w-32 h-10"
                        >
                          Aceptar
                        </button>
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col text-lg justify-around">
                      <div className="flex flex-col flex-1">
                        <p className="border-b-2 border-slate-800 pl-2">
                          Nombre
                        </p>
                        <p className="pl-2">{clientData.name}</p>
                      </div>
                      <div className="flex flex-col flex-1">
                        <p className="border-b-2 border-slate-800 pl-2">CUIT</p>
                        <p className="pl-2">{clientData.dni}</p>
                      </div>
                      <div className="flex flex-col flex-1">
                        <p className="border-b-2 border-slate-800 pl-2">
                          Direccion
                        </p>
                        <p className="pl-2">{clientData.address}</p>
                      </div>
                      <div className="flex flex-col flex-1">
                        <p className="border-b-2 border-slate-800 pl-2">
                          Correo electronico
                        </p>
                        <p className="pl-2">{clientData.email}</p>
                      </div>
                      <div className="flex flex-col flex-1">
                        <p className="border-b-2 border-slate-800 pl-2">
                          Telefono
                        </p>
                        <p className="pl-2">{clientData.phone}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <button
                onClick={() => loadBuyer("finalConsumer")}
                className="h-full flex flex-col items-center justify-center space-y-5 w-1/2 shadow-inner shadow-slate-950 hover:shadow-transparent bg-gradient-to-t from-slate-950 to-blue-800 rounded-md hover:to-blue-600"
              >
                <FinalConsumer size={300}></FinalConsumer>
                <p className="text-3xl">CONSUMIDOR FINAL</p>
              </button>
              <button
                onClick={() => {
                  onShowClientForm(true);
                }}
                className="h-full flex flex-col items-center justify-center space-y-5 w-1/2 shadow-inner shadow-slate-950 hover:shadow-transparent bg-gradient-to-t from-slate-950 to-blue-800 rounded-md hover:to-blue-600"
              >
                <ClientSvg color="#fff" size={300}></ClientSvg>
                <p className="text-3xl">CLIENTE</p>
              </button>
            </div>
          </div>
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
          <div className="flex justify-end space-x-2 bg-slate-950">
            <button className="p-2 bg-blue-500 flex-1">
              <p>Generar factura</p>
            </button>
            <div className="flex space-x-2 bg-teal-900 rounded-tl-lg p-1">
              <p className="text-green-50 text-4xl font-bold" onClick={sumCost}>
                Total
              </p>
              <p className="text-4xl text-green-400 font-bold">
                {formatMony(cost)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddVentaForm;
