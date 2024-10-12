import React, { useEffect, useState } from "react";
import { clientData, saleData } from "../../../../../../types/types";
import { IoClose, IoCloseCircle } from "react-icons/io5";
import ButtonR from "../../buttons/ButtonR";
type SelectSellerProps = {
  saleData: saleData;
  loadSeller: (seller: { name: string; id: string; image: string }) => void;
  estilosInput: string;
  onClickSeller: (e: boolean) => void;
};

const SelectSeller: React.FC<SelectSellerProps> = ({
  estilosInput,
  onClickSeller,
  loadSeller,
  saleData,
}) => {
  const [usuarios, setUsuarios] = useState<any>();
  useEffect(() => {
    window.api.enviarEvento("cargar-todos-usuarios");

    // Escuchar la respuesta del backend
    window.api.recibirEvento("respuesta-cargar-todos-usuarios", (response) => {
      console.log("RESPUESTA", response);
      if (response.exito) {
        console.log("USUARIOS CARGADOSD", response.usuarios);
        let sellers = response.usuarios.filter(
          (users: any) => users.permisos.ventas || users.permisos.gerente
        );
        setUsuarios(sellers);
      } else {
        console.error("Error al cargar usuarios:", response.error);
      }
    });
  }, []);

  return (
    <div className="flex justify-center items-center flex-col flex-1 z-50 backdrop-brightness-50 absolute top-0 bottom-0 right-0 left-0">
      <div className="h-3/4 w-1/2 bg-[#2f2f2fff] custom-scrollbar relative bg-cyan-9500 flex flex-col  rounded-lg border border-slate-800 space-y-1 overflow-auto">
        <div className="w-full flex h-12 text-xl justify-between pl-2">
          <div className="h-full flex items-center">
            <p>VENDEDORES</p>
          </div>
        </div>
        <div className="flex flex-1 flex-col">
          {usuarios &&
            usuarios.map((seller: any) => {
              return (
                <div
                  key={seller.id}
                  onClick={() => {
                    console.log(seller);
                    loadSeller({
                      name: seller.nombre,
                      id: seller._id,
                      image: seller.imageUrl,
                    });
                  }}
                  className={`cursor-pointer flex border-y border-gray-600 justify-between px-2 h-10 items-center font-normal text-slate-50 bg-slate-900 hover:bg-slate-700`}
                >
                  <div>
                    <p>{seller.nombre}</p>
                  </div>
                  <div>
                    <p>{seller.nombre}</p>
                  </div>
                </div>
              );
            })}
        </div>
        <div className="w-full bg-red-500 h-12"></div>
      </div>
    </div>
  );
};

export default SelectSeller;
