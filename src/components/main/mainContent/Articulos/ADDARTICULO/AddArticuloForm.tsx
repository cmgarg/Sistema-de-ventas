import React, { useEffect, useState } from "react";

interface AddArticulosFormProps {
  onChangeModal: (p: boolean) => void;
}

const AddArticuloForm: React.FC<AddArticulosFormProps> = ({
  onChangeModal,
}) => {
  function obtenerArticulos() {
    window.api.enviarEvento("obtener-articulos");
  }
  //DATOS USUARIOS

  type articuloDataObject = {
    articulo: string;
    marca: string;
    costo: string;
    venta: string;
    stock: string;
  };

  const [articuloData, setarticuloData] = useState<articuloDataObject>({
    articulo: "",
    marca: "",
    costo: "",
    venta: "",
    stock: "",
  });

  function setChangeData(data: string, value: string) {
    console.log("LLAMA LA FUNCION");
    const existingData = ["articulo", "marca", "costo", "venta", "stock"];
    console.log(existingData.includes(data), "esto");
    if (existingData.includes(data)) {
      switch (data) {
        case "articulo":
          console.log("se cumple esrte");
          setarticuloData({ ...articuloData, articulo: value });
          break;
        case "marca":
          setarticuloData({ ...articuloData, marca: value });
          break;
        case "costo":
          setarticuloData({ ...articuloData, costo: value });
          break;
        case "venta":
          setarticuloData({ ...articuloData, venta: value });
          break;
        case "stock":
          setarticuloData({ ...articuloData, stock: value });
          break;

        default:
          break;
      }
    } else {
      console.log("NO ESTA");
    }
  }
  useEffect(() => {
    console.log(articuloData);
  }, [articuloData]);

  //SUBIR USUARIO A BASE DE DATOS LOCAL

  function subirArticulo() {
    window.api.enviarEvento("guardar-articulo", articuloData);

    obtenerArticulos();

    setarticuloData({
      articulo: "",
      marca: "",
      costo: "",
      venta: "",
      stock: "",
    });
    onChangeModal(false);
  }
  //ESTILOS INPUT
  const estilosInput = "outline-none h-9 w-full bg-slate-600 px-2 rounded-md";

  return (
    <div className="absolute bottom-0 top-0 right-0 left-0 flex justify-center items-center z-50">
      <div className="w-96 bg-white space-y-5 p-2 text-white rounded-md relative">
        <button
          className="bg-red-500 h-10 w-10 rounded-full absolute -right-2 -top-2"
          onClick={() => {
            onChangeModal(false);
          }}
        >
          X
        </button>
        <div className="flex flex-row space-x-1">
          <div className="flex-1">
            <label htmlFor="articulo" className="text-slate-600">
              Articulo
            </label>
            <input
              type="text"
              name="articulo"
              className={estilosInput}
              value={articuloData.articulo}
              onChange={(e) => {
                setChangeData("articulo", e.target.value);
              }}
            />
          </div>
          <div className="flex-1">
            <label htmlFor="marca" className="text-slate-600">
              Marca
            </label>
            <input
              type="text"
              name="marca"
              className={estilosInput}
              value={articuloData.marca}
              onChange={(e) => {
                setChangeData("marca", e.target.value);
              }}
            />
          </div>
        </div>
        <div>
          <label htmlFor="costo" className="text-slate-600">
            costo
          </label>
          <input
            type="text"
            name="costo"
            className={estilosInput}
            value={articuloData.costo}
            onChange={(e) => {
              setChangeData("costo", e.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="venta" className="text-slate-600">
            Venta
          </label>
          <input
            type="text"
            name="venta"
            className={estilosInput}
            value={articuloData.venta}
            onChange={(e) => {
              setChangeData("venta", e.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="stock" className="text-slate-600">
            Stock
          </label>
          <input
            type="text"
            name="stock"
            className={estilosInput}
            value={articuloData.stock}
            onChange={(e) => {
              setChangeData("stock", e.target.value);
            }}
          />
        </div>
        <div className="flex flex-row space-x-5">
          <button
            className="w-52 h-10 bg-red-400 rounded-md"
            onClick={() => {
              onChangeModal(false);
            }}
          >
            Cancelar
          </button>
          <button
            className="w-52 h-10 bg-green-400 rounded-md"
            onClick={subirArticulo}
          >
            Añadir
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddArticuloForm;
