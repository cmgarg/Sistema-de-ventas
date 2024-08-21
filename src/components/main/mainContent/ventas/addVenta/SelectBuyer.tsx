import React, { useEffect, useState } from "react";
import MenuClientsForm from "../MenusInputs/MenuClientsForm";
import { clientData, saleData } from "../../../../../../types/types";
import { FaBasketShopping } from "react-icons/fa6";
import { FcBusinessman } from "react-icons/fc";
type SelectBuyerProps = {
  clients: clientData[]; // Define tus props aquí
  clientData: clientData;
  saleData: saleData;
  setClientData: (e: clientData) => void;
  estilosInput: string;
  loadClient: () => void;
  loadBuyer: (e: string) => void;
};

const SelectBuyer: React.FC<SelectBuyerProps> = ({
  clients,
  setClientData,
  estilosInput,
  loadClient,
  loadBuyer,
  clientData,
  saleData,
}) => {
  const [showClientForm, setShowClientForm] = useState(false);
  useEffect(() => {
    if (clientData.name) {
      setShowClientForm(true);
    }
  }, []);

  return (
    <div className="flex justify-center items-center flex-1 z-50 backdrop-brightness-50 absolute top-0 bottom-0 right-0 left-0">
      <div className="h-3/5 w-3/5 flex border rounded-md border-slate-800 relative">
        <div className="absolute bottom-full text-4xl font-bold italic text-slate-50">
          <p>COMPRADOR</p>
        </div>
        {showClientForm && (
          <div className="flex flex-1 bg-slate-900 rounded-md rounded-bl-md bg-gradient-to-t from-slate-950 to-blue-950 flex-col">
            <MenuClientsForm
              style={estilosInput}
              clients={clients}
              setClientData={setClientData}
            ></MenuClientsForm>
            <div className="flex flex-1">
              <div className="flex flex-col border-r border-slate-800">
                <div className="flex-1 flex justify-center items-center">
                  <FcBusinessman size={250} />
                </div>
                <div className="flex w-full justify-start">
                  <button
                    onClick={() => {
                      setShowClientForm(false);
                      setClientData({
                        name: "",
                        email: "",
                        address: "",
                        phone: 0,
                        DNI: 0,
                        birthdate: "",
                        shopping: [],
                      });
                    }}
                    className={`bg-blue-500 text-xl w-32 h-10 rounded-bl-md`}
                  >
                    Volver
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
                  <p className="border-b-2 border-slate-800 pl-2 text-sm font-bold">
                    Nombre
                  </p>
                  <p className="pl-2 font-thin">{clientData.name}</p>
                </div>
                <div className="flex flex-col flex-1">
                  <p className="border-b-2 border-slate-800 pl-2 text-sm font-bold">
                    CUIT
                  </p>
                  <p className="pl-2 font-thin">{clientData.DNI}</p>
                </div>
                <div className="flex flex-col flex-1">
                  <p className="border-b-2 border-slate-800 pl-2 text-sm font-bold">
                    Direccion
                  </p>
                  <p className="pl-2 font-thin">{clientData.address}</p>
                </div>
                <div className="flex flex-col flex-1">
                  <p className="border-b-2 border-slate-800 pl-2 text-sm font-bold">
                    Correo electronico
                  </p>
                  <p className="pl-2 font-thin">{clientData.email}</p>
                </div>
                <div className="flex flex-col flex-1">
                  <p className="border-b-2 border-slate-800 pl-2 text-sm font-bold">
                    Telefono
                  </p>
                  <p className="pl-2 font-thin">{clientData.phone}</p>
                </div>
              </div>
            </div>
          </div>
        )}
        {!showClientForm && (
          <div className="flex flex-1 relative p-2 space-x-2">
            <button
              onClick={() => loadBuyer("finalConsumer")}
              className="h-full flex-1 flex flex-col items-center border border-slate-700 text-lg font-bold justify-center hover:shadow-transparent bg-gradient-to-t from-slate-950 to-slate-800 rounded-md hover:to-teal-900"
            >
              <FaBasketShopping
                size={140}
                className="text-rose-500"
              ></FaBasketShopping>
              <div className="absolute bottom-5">
                <p>CONSUMIDOR FINAL</p>
              </div>
            </button>
            <button
              onClick={() => {
                setShowClientForm(true);
              }}
              className="h-full flex flex-1 flex-col items-center border border-slate-700 text-lg font-bold justify-center bg-gradient-to-t from-slate-950 to-slate-800 rounded-md hover:to-teal-900"
            >
              <FcBusinessman size={150}></FcBusinessman>
              <div className="absolute bottom-5">
                <p>CLIENTE</p>
              </div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectBuyer;
