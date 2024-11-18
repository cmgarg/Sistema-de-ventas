import React, { useEffect, useState } from "react";
import { clientData, IUser, saleData } from "../../../../../../types/types";
import { IoClose, IoCloseCircle } from "react-icons/io5";
import ButtonR from "../../buttons/ButtonR";
import { isEqual } from "lodash";
type SelectSellerProps = {
  saleState: saleData;
  loadSeller: (seller: IUser) => void;
  estilosInput: string;
  onClickSeller: (e: boolean) => void;
  userLoggin: { userType: string; datosUsuario: IUser };
};

const SelectSeller: React.FC<SelectSellerProps> = ({
  estilosInput,
  onClickSeller,
  loadSeller,
  userLoggin,
  saleState,
}) => {
  const [usuarios, setUsuarios] = useState<IUser[]>([]);
  const [sellerSelected, setSellerSelected] = useState<IUser>();

  const onSelectSeller = (e: IUser) => {
    console.log("Vendedor seleccionado", e);
    setSellerSelected(e);
  };

  const acceptSeller = () => {
    if (sellerSelected) {
      loadSeller(sellerSelected);
    }
  };
  useEffect(() => {
    console.log(userLoggin, "USUARIO LOGEADO");
    window.api.enviarEvento("cargar-todos-usuarios");

    onSelectSeller(saleState.seller);

    // Escuchar la respuesta del backend
    window.api.recibirEvento("respuesta-cargar-todos-usuarios", (response) => {
      console.log("RESPUESTA", response);
      if (response.exito) {
        console.log("USUARIOS CARGADOSD", response.usuarios);
        let sellers = response.usuarios.filter((users: any) => {
          return users.permisos.ventas || users.permisos.gerente;
        });
        setUsuarios(sellers);
      } else {
        console.error("Error al cargar usuarios:", response.error);
      }
    });
  }, []);

  return (
    <div className="flex justify-center overflow-auto items-center flex-col flex-1 z-50 backdrop-brightness-50 absolute top-0 bottom-0 right-0 left-0 select-none">
      <div className="h-96 w-1/2 bg-[#2f2f2fff] relative max-h-full max-w-full flex flex-col text-lg overflow-auto rounded-lg border border-slate-800">
        <div className="w-full flex h-12 text-xl justify-between pl-2">
          <div className="h-full flex items-center">
            <p>Vendedores</p>
          </div>
        </div>
        {usuarios.length > 0 && (
          <ul className="flex flex-col overflow-auto max-h-full w-full h-full max-w-full rounded-lg">
            <li
              onClick={() => {
                console.log(userLoggin.datosUsuario);
                onSelectSeller(userLoggin.datosUsuario);
              }}
              className={`cursor-pointer flex border-b border-gray-600 ${
                isEqual(sellerSelected, userLoggin.datosUsuario)
                  ? "border-yellow-600"
                  : "border-gray-600"
              } justify-between w-full items-center font-normal min-h-12 h-12 text-slate-50 hover:text-yellow-500 bg-gradient-to-r from-gray-950 via-gray-900 hover:bg-slate-700 overflow-hidden`}
            >
              <div
                className={`h-full pl-2 flex flex-1 items-center bg-gradient-to-r ${
                  isEqual(sellerSelected, userLoggin.datosUsuario)
                    ? "from-yellow-500 via-black to-black"
                    : "from-gray-950 via-gray-900 to-black"
                }`}
              >
                <p>{userLoggin.datosUsuario.username} (Tú)</p>
              </div>
              <div className="h-full flex items-center pt-2 relative overflow-hidden">
                <div
                  className={`absolute ${
                    isEqual(sellerSelected, userLoggin.datosUsuario)
                      ? "bg-gradient-to-r from-black via-transparent to-transparent top-0 w-20 -left-1 bottom-0"
                      : "bg-gradient-to-r from-black via-transparent to-transparent top-0 left-0 bottom-0 right-0 backdrop-grayscale"
                  }`}
                ></div>
                <img
                  src={userLoggin.datosUsuario.imageUrl}
                  className="h-32 w-44"
                ></img>
              </div>
            </li>
            {usuarios.map((seller, index) => {
              return (
                <li
                  key={index}
                  onClick={() => {
                    console.log(seller);
                    onSelectSeller(seller);
                  }}
                  className={`cursor-pointer ${
                    index < usuarios.length - 1 ? "border-b" : ""
                  } flex ${
                    isEqual(sellerSelected, seller)
                      ? "border-yellow-600 h-14"
                      : "border-gray-600 hover:text-yellow-500"
                  } justify-between min-h-12 h-12 items-center font-normal text-slate-50  bg-gradient-to-r from-gray-950 via-gray-900 hover:bg-slate-700 overflow-hidden`}
                >
                  <div
                    className={`h-full pl-2 flex flex-1 items-center bg-gradient-to-r ${
                      isEqual(sellerSelected, seller)
                        ? "from-yellow-500 via-black to-black"
                        : "from-gray-950 via-gray-900 to-black"
                    }`}
                  >
                    <p>{seller.nombre}</p>
                  </div>
                  <div className="h-full flex items-center pt-2 relative overflow-hidden">
                    <div
                      className={`absolute ${
                        isEqual(sellerSelected, seller)
                          ? "bg-gradient-to-r from-black via-transparent to-transparent top-0 w-20 -left-1 bottom-0"
                          : "bg-gradient-to-r from-black via-transparent to-transparent top-0 left-0 bottom-0 right-0 backdrop-grayscale"
                      }`}
                    ></div>
                    <img src={seller.imageUrl} className="h-32 w-44"></img>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
        <div className="w-full h-12 flex justify-end items-center px-2 space-x-2">
          <ButtonR
            onClick={() => onClickSeller(false)}
            height="h-7"
            width="w-24"
            bgColor="bg-gradient-to-l from-gray-700 via-gray-700 to-gray-500"
            title="Cancelar"
          ></ButtonR>
          <ButtonR
            onClick={acceptSeller}
            height="h-7"
            width="w-32"
            bgColor="bg-gradient-to-l from-yellow-700 via-yellow-700 to-yellow-500"
            title="Aceptar"
            disabled={sellerSelected ? false : true}
          ></ButtonR>
        </div>
      </div>
    </div>
  );
};

export default SelectSeller;
