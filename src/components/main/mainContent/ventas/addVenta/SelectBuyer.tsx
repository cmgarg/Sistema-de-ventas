import React, { useEffect, useState } from "react";
import MenuClientsForm from "../MenusInputs/MenuClientsForm";
import { clientData, saleData } from "../../../../../../types/types";
import { FaBasketShopping } from "react-icons/fa6";
import { FcBusinessman } from "react-icons/fc";
import ButtonR from "../../buttons/ButtonR";
type SelectBuyerProps = {
  clients: clientData[]; // Define tus props aquí
  clientData: clientData;
  setClientData: (e: clientData) => void;
  estilosInput: string;
  loadClient: () => void;
  loadBuyer: (e: string) => void;
  setShowModalBuyer: (e: boolean) => void;
};

const SelectBuyer: React.FC<SelectBuyerProps> = ({
  clients,
  setClientData,
  estilosInput,
  loadClient,
  loadBuyer,
  clientData,
  setShowModalBuyer,
}) => {
  const [buyer, setBuyer] = useState<clientData>();
  const [showClientForm, setShowClientForm] = useState(false);
  const [optionSelect, setOptionSelect] = useState<
    "finalConsumer" | "client" | ""
  >("");

  const onSelectOption = (e: "finalConsumer" | "client" | "") => {
    setOptionSelect(e);
  };

  const acceptButton = () => {
    if (optionSelect === "finalConsumer") {
      console.log("SE CUMPLE CONDICION 1");
      loadBuyer("finalConsumer");
    } else if (optionSelect === "client") {
      console.log("SE CUMPLE CONDICION 2");
      setShowClientForm(true);

      if (buyer.name && showClientForm) {
        loadClient();
        setOptionSelect("");
      }
    }

    // Se cierra el modal en ambas ramas
    setShowModalBuyer(false);
  };

  const acceptBuyer = () => {
    if (buyer.name) {
      loadClient();
    }
  };

  useEffect(() => {
    setClientData(buyer);
  }, [buyer]);

  return (
    <div className="flex justify-center items-center flex-1 z-50 backdrop-brightness-50 absolute top-0 bottom-0 right-0 left-0">
      <div className="h-80 w-3/5 bg-[#2f2f2fff] flex border rounded-md border-gray-600 relative flex-col">
        <div className="pl-2 pt-2 text-2xl  italic text-slate-50">
          <p>COMPRADOR</p>
        </div>
        {showClientForm ? (
          <div className="flex flex-1 rounded-md rounded-bl-md flex-col">
            <div className="h-12 flex justify-start pl-2">
              <MenuClientsForm
                style={estilosInput}
                ////clients={clients}
                setBuyer={setBuyer}
                buyer={buyer}
                clients={clients}
              ></MenuClientsForm>
            </div>
            <div className="flex flex-1">
              <div className="flex-1 flex flex-col text-sm justify-around bg-black rounded-lg">
                <div className="flex flex-1 border-b-2 border-gray-600 items-center">
                  <div className="w-32 flex items-center justify-start pl-4 border-r border-gray-600 h-full">
                    <p className="pl-2 ">Nombre</p>
                  </div>
                  <p className="flex-1 pl-2 font-thin">
                    {buyer ? buyer.name : ""}
                  </p>
                </div>
                <div className="flex flex-1 items-center border-b-2 border-gray-600">
                  <div className="w-32 flex items-center justify-start pl-4 border-r border-gray-600 h-full">
                    <p className="pl-2 ">DNI</p>
                  </div>
                  <p className="pl-2 font-thin flex-1">
                    {buyer ? buyer.DNI : ""}
                  </p>
                </div>
                <div className="flex flex-1 border-b-2 border-gray-600 items-center">
                  <div className="w-32 flex items-center justify-start pl-4 border-r border-gray-600 h-full">
                    <p className="pl-2 ">Email</p>
                  </div>
                  <p className="pl-2 font-thin">{buyer ? buyer.email : ""}</p>
                </div>

                <div className="flex flex-1 items-center border-b-2 border-gray-600">
                  <div className="w-32 flex items-center justify-start pl-4 border-r border-gray-600 h-full">
                    <p className="pl-2">Direccion</p>
                  </div>
                  <p className="pl-2 font-thin">{buyer ? buyer.address : ""}</p>
                </div>

                <div className="flex flex-1 border-l border-gray-600 items-center">
                  <div className="w-32 flex items-center justify-start pl-4 border-r border-gray-600 h-full">
                    <p className="pl-2 ">Telefono</p>
                  </div>
                  <p className="pl-2 font-thin">{buyer ? buyer.phone : ""}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-1 relative p-2 space-x-2">
            <button
              onClick={() => {
                if (optionSelect !== "finalConsumer") {
                  onSelectOption("finalConsumer");
                } else {
                  onSelectOption("");
                }
              }}
              className={`h-full flex-1 flex flex-col items-center border border-slate-700 text-lg  justify-evenly bg-gradient-to-br ${
                optionSelect === "finalConsumer"
                  ? " from-yellow-700 via-yellow-500 to-yellow-500"
                  : " from-gray-700 via-gray-500 to-gray-500"
              } rounded-md shadow-[0_2px_5px_rgba(0,0,0,0.50)] hover:brightness-125`}
            >
              <FaBasketShopping
                size={140}
                className="text-rose-500"
              ></FaBasketShopping>
              <div>
                <p>CONSUMIDOR FINAL</p>
              </div>
            </button>
            <button
              onClick={() => {
                if (optionSelect !== "client") {
                  onSelectOption("client");
                } else {
                  onSelectOption("");
                }
              }}
              className={`h-full flex-1 flex flex-col items-center border border-slate-700 text-lg  justify-evenly bg-gradient-to-tl ${
                optionSelect === "client"
                  ? " from-yellow-700 via-yellow-500 to-yellow-500"
                  : " from-gray-700 via-gray-500 to-gray-500"
              } rounded-md shadow-[0_2px_5px_rgba(0,0,0,0.50)] hover:brightness-125`}
            >
              <FcBusinessman size={150}></FcBusinessman>
              <div>
                <p>CLIENTE</p>
              </div>
            </button>
          </div>
        )}
        <div className="w-full flex justify-end space-x-2 mt-2 pr-2 pb-2">
          <ButtonR
            title="Cancelar"
            height="h-8"
            width="w-32"
            bgColor={`bg-gradient-to-l from-gray-700 via-gray-700 to-gray-500`}
            onClick={() => {
              setShowModalBuyer(false);
            }}
          />
          <ButtonR
            title="Aceptar"
            onClick={acceptButton}
            height="h-8"
            width="w-32"
            bgColor="bg-gradient-to-l from-yellow-700 via-yellow-700 to-yellow-500"
            disabled={optionSelect === ""}
          />
        </div>
      </div>
    </div>
  );
};

export default SelectBuyer;
