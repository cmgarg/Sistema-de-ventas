import React, { useEffect, useState } from "react";
import MenuBrandForm from "../MenusInputs/MenuBrandForm";
import MenuCategoryForm from "../MenusInputs/MenuCategoryForm";
import Category from "../../Category/Category";

interface AddArticulosFormProps {
  onChangeModal: (p: boolean) => void;
  addArticles: (article: object) => void;
}

const AddArticuloForm: React.FC<AddArticulosFormProps> = ({
  onChangeModal,
  addArticles,
}) => {
  function obtenerArticulos() {
    window.api.enviarEvento("obtener-articulos");
  }
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
    console.log("LLAMA LA FUNCION");
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
          console.log("se cumple esrte");
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
  useEffect(() => {
    console.log(articuloData);
  }, [articuloData]);

  //SUBIR USUARIO A BASE DE DATOS LOCAL
  function checkExisCategoryAndBrand(
    categorysAndBrands: object[],
    exist: { searchIn: string; value: string }
  ) {
    console.log(categorysAndBrands, "|||||||||||||||||||||||||||||||||||");
    const categorys = categorysAndBrands.filter((object) => {
      return object.typeFilter === "category";
    });
    const brands = categorysAndBrands.filter((object) => {
      return object.typeFilter === "brand";
    });

    if (exist.searchIn === "category") {
      let result = categorys.some((object) => object.value === exist.value);
      console.log("CATEGORIAS", categorys);
      console.log("A BUSCAAAAAAAAAAAAAAAAAAAAR", exist.value);
      return result;
    } else if (exist.searchIn === "brand") {
      let result = brands.some((object) => object.value === exist.value);

      return result;
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

  function subirArticulo() {
    getBrandsAndCategorys();
    const exitCategory = checkExisCategoryAndBrand(categorysAndBrands, {
      searchIn: "category",
      value: articuloData.category.value,
    });
    const existBrand = checkExisCategoryAndBrand(categorysAndBrands, {
      searchIn: "brand",
      value: articuloData.brand.value,
    });
    if (!exitCategory) {
      window.api.enviarEvento("save-category", {
        value: articuloData.category.value,
        label: articuloData.category.label,
        typeFilter: "category",
      });
    }
    if (!existBrand) {
      window.api.enviarEvento("save-brand", {
        value: articuloData.brand.value,
        label: articuloData.brand.label,
        typeFilter: "brand",
      });
    }
    saveArticle();
    console.log(exitCategory, "EXISTE O NO EXISTE CATEGORIAAAA????");
  }
  //ESTILOS INPUT
  const estilosInput = "outline-none h-9 w-full bg-slate-600 px-2 rounded-md";

  useEffect(() => {
    window.api.recibirEvento("response-get-categoryAndBrand", (data) => {
      setCategorysAndBrands([...data]);
    });
  }, []);

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

          <MenuBrandForm style={estilosInput} setChangeData={setChangeData} />
        </div>
        <MenuCategoryForm style={estilosInput} setChangeData={setChangeData} />
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
