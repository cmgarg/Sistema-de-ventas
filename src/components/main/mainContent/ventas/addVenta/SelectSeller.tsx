import React, { useEffect, useState } from "react";
import { clientData, saleData } from "../../../../../../types/types";
import { IoClose, IoCloseCircle } from "react-icons/io5";
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
      <div className="w-96 flex p-2 justify-between">
        <div className="italic text-slate-300 font-bold text-sm h-full flex items-center">
          <p>VENDEDORES</p>
        </div>
        <button
          className="w-7 h-7 border-4 border-red-500 rounded-full flex justify-center items-center"
          onClick={() => onClickSeller(false)}
        >
          <IoClose size={30} className="text-red-500" />
        </button>
      </div>
      <div className="h-80 w-96 custom-scrollbar relative bg-cyan-9500 px-2 flex flex-col py-2  rounded-lg border border-slate-800 space-y-1 overflow-auto">
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
                className={`cursor-pointer flex rounded-lg border border-slate-700 justify-between px-2 h-7 font-normal text-slate-50 bg-slate-900 hover:bg-slate-700`}
              >
                <div>
                  <p>{seller.nombre}</p>
                </div>
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
    </div>
  );
};

export default SelectSeller;
