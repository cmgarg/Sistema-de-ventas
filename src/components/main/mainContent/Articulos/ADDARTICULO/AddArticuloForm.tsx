import React, { useEffect, useState } from "react";
import InputBrand from "./InputBrand";
import InputCategory from "./InputCategory";

interface AddArticulosFormProps {
  onChangeModal: (p: boolean) => void;
  addArticles: (article: object) => void;
}

const AddArticuloForm: React.FC<AddArticulosFormProps> = ({
  onChangeModal,
  addArticles,
}) => {
  //DATOS USUARIOS

  type articuloDataObject = {
    articulo: string;
    costo: string;
    venta: string;
    stock: string;
    brand: string;
    category: string;
  };

  const [articuloData, setarticuloData] = useState<articuloDataObject>({
    articulo: "",
    costo: "",
    venta: "",
    stock: "",
    brand: "",
    category: "",
  });

  const [categorysAndBrands, setCategorysAndBrands] = useState<object[]>([]);

  function getBrandsAndCategorys() {
    window.api.enviarEvento("get-categoryAndBrand");
  }

  function setChangeData(data: string, value: string) {
    const existingData = [
      "articulo",
      "brand",
      "costo",
      "venta",
      "stock",
      "category",
    ];
    console.log(existingData.includes(data), "esto");
    if (existingData.includes(data)) {
      switch (data) {
        case "articulo":
          setarticuloData({ ...articuloData, articulo: value });
          break;
        case "brand":
          setarticuloData({ ...articuloData, brand: value });
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
        case "category":
          setarticuloData({ ...articuloData, category: value });
          break;

        default:
          break;
      }
    } else {
      console.log("NO ESTA");
    }
  }

  function saveArticle() {
    window.api.enviarEvento("guardar-articulo", articuloData);

    addArticles(articuloData);

    setarticuloData({
      articulo: "",
      costo: "",
      venta: "",
      stock: "",
      brand: "",
      category: "",
    });
    onChangeModal(false);
  }
  //ESTILOS INPUT
  const estilosInput = "outline-none h-9 w-full bg-slate-600 px-2 rounded-md";

  useEffect(() => {
    getBrandsAndCategorys();
    window.api.recibirEvento("response-get-categoryAndBrand", (data) => {
      setCategorysAndBrands([...data]);
    });
  }, []);
  useEffect(() => {
    console.log(articuloData);
  }, [articuloData]);

  return (
    <div className="absolute bottom-0 top-0 right-0 left-0 flex justify-center items-center z-50">
      <div className="w-96 border border-gray-500 text-gray-200 bg-slate-800 bg-opacity-95 space-y-5 p-5 rounded-md relative">
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
            <label htmlFor="articulo">Articulo</label>
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
          <div className="flex-1 relative">
            <InputBrand
              style={estilosInput}
              articuloData={articuloData}
              setChangeData={setChangeData}
              categorysAndBrands={categorysAndBrands}
            />
          </div>
        </div>
        <div className="flex space-x-1">
          <div className="flex-1">
            <label htmlFor="costo">costo</label>
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
          <div className="flex-1 relative">
            <InputCategory
              style={estilosInput}
              articuloData={articuloData}
              setChangeData={setChangeData}
              categorysAndBrands={categorysAndBrands}
            />
          </div>
        </div>
        <div>
          <label htmlFor="venta">Venta</label>
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
          <label htmlFor="stock">Stock</label>
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
          <button className="w-52 h-10 bg-green-400 rounded-md">Añadir</button>
        </div>
      </div>
    </div>
  );
};

export default AddArticuloForm;
