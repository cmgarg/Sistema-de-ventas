import React, { useEffect, useState } from "react";
import InputBrand from "./InputBrand";
import InputCategory from "./InputCategory";
import Select from "../../Select/Select";
import { BoxSvg } from "../../../../../assets/MAINSVGS/SVGSGLOBAL/Cmgsvg";
import { articleData } from "@/types";
import { useDispatch } from "react-redux";
import { addArticle } from "../../../../../redux/estados/articlesState";

interface AddArticulosFormProps {
  onChangeModal: (p: boolean) => void;
}

const AddArticuloForm: React.FC<AddArticulosFormProps> = ({
  onChangeModal,
}) => {
  //DATOS USUARIOS

  const dispatch = useDispatch();
  const [articuloDataState, setarticuloData] = useState<articleData>({
    article: {
      name: "",
      costo: 0,
      venta: 0,
      stock: { amount: "", unit: "" },
      code: "",
    },
    brand: { value: "", label: "" },
    category: { value: "", label: "" },
    sales: [],
  });
  //add category and brand
  const [addCategoryInput, setAddCategoryInput] = useState(true);
  //
  const optionsUnits = [
    { value: "cajas", label: "Cajas", svg: <BoxSvg /> },
    { value: "paquetes", label: "Paquetes" },
    { value: "unidades", label: "Unidades" },
    { value: "litros", label: "Litros" },
    { value: "kg", label: "Kilogramos" },
  ];

  const [unitSelect, setUnitSelect] = useState("Kg");

  function onChangeSelectUnit(unit: string, filter: string) {
    setUnitSelect(unit);
    setChangeData("stock-unit", unit);
  }

  const [categorysAndBrands, setCategorysAndBrands] = useState<object[]>([]);

  const [errorToSave, setErrorToSave] = useState({
    message: "",
    type: "",
    active: false,
  });

  function getBrandsAndCategorys() {
    window.api.enviarEvento("get-categoryAndBrand");
  }

  function setChangeData(data: string, value: any) {
    const existingData = [
      "article",
      "brand",
      "costo",
      "venta",
      "stock",
      "stock-unit",
      "category",
    ];
    console.log(existingData.includes(data), "esto");
    if (existingData.includes(data)) {
      switch (data) {
        case "article":
          if (/^[a-zA-Z]*$/.test(value)) {
            setarticuloData({
              ...articuloDataState,
              article: { ...articuloDataState.article, name: value },
            });
          }
          break;
        case "brand":
          setarticuloData({
            ...articuloDataState,
            brand: { value: value, label: value },
          });

          break;
        case "costo":
          if (/^[0-9]*$/.test(value)) {
            setarticuloData({
              ...articuloDataState,
              article: { ...articuloDataState.article, costo: value },
            });
          }
          break;
        case "venta":
          if (/^[0-9]*$/.test(value)) {
            setarticuloData({
              ...articuloDataState,
              article: { ...articuloDataState.article, venta: value },
            });
          }
          break;
        case "stock":
          if (/^[0-9]*$/.test(value)) {
            setarticuloData({
              ...articuloDataState,
              article: { ...articuloDataState.article, stock: value },
            });
          }
          break;
        case "stock-unit":
          setarticuloData({
            ...articuloDataState,
            article: {
              ...articuloDataState.article,
              stock: { ...articuloDataState.article.stock, unit: value },
            },
          });
          break;
        case "category":
          setarticuloData({
            ...articuloDataState,
            category: { value: value, label: value },
          });
          break;

        default:
          break;
      }
    } else {
      console.log("NO ESTA");
    }
  }

  function saveArticle() {
    window.api.enviarEvento("save-article", articuloDataState);
  }
  //ESTILOS INPUT
  const estilosInput = "outline-none h-9 w-full bg-slate-600 px-2 rounded-md";

  useEffect(() => {
    getBrandsAndCategorys();
    window.api.recibirEvento("response-get-categoryAndBrand", (data) => {
      setCategorysAndBrands([...data]);
    });
    window.api.recibirEvento("error-save-article", (error) => {
      console.log("GONZALO FIJATE ACA", error);
      if (!error.active) {
        console.log("LLEGA A CA", articuloDataState);
        dispatch(addArticle(articuloDataState));
        onChangeModal(false);
      }
      setErrorToSave({ ...error });
    });
  }, []);
  useEffect(() => {
    console.log(articuloDataState);
  }, [articuloDataState]);

  return (
    <div className="absolute bottom-0 top-0 right-0 left-0 flex justify-center items-center z-50">
      {addCategoryInput && (
        <div className="absolute w-96 z-50 flex items-center justify-center ">
          <div className="w-full flex justify-center items-center flex-col rounded-sm border h-32 bg-slate-800">
            <label
              htmlFor="newcategory"
              className="flex justify-start w-80 text-slate-50"
            >
              <p>Nueva Categoria</p>
            </label>
            <input
              name="newcategory"
              type="text"
              className="bg-gray-600 h-10 w-80 rounded-sm"
            />
          </div>
        </div>
      )}
      <div
        className={`w-96 border border-gray-500 text-gray-200 bg-slate-800 bg-opacity-95 space-y-5 p-5 rounded-md relative ${
          addCategoryInput && "opacity-50"
        }`}
      >
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
              value={articuloDataState.article.name}
              onChange={(e) => {
                setChangeData("article", e.target.value);
              }}
            />
          </div>
          <div className="w-32 flex flex-1 items-end ">
            <div className="flex-1">
              <label htmlFor="stock">Stock</label>
              <div className="bg-slate-600 flex rounded-md relative">
                <input
                  type="text"
                  name="stock"
                  className={
                    "outline-none h-9 w-full rounded-l-md bg-slate-600 px-2 "
                  }
                  value={articuloDataState.article.stock.amount}
                  onChange={(e) => {
                    setChangeData("stock", e.target.value);
                  }}
                />
                <div className="w-32 max-w-16 min-w-16">
                  <Select
                    options={optionsUnits}
                    value={unitSelect}
                    onChangeSelection={onChangeSelectUnit}
                    filter={"Unit"}
                    slice={3}
                    placeholder={unitSelect}
                    backGround="bg-slate-700"
                    todos={false}
                  ></Select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row space-x-1">
          <div className="flex-1 relative">
            <InputBrand
              style={estilosInput}
              articuloData={articuloDataState}
              setChangeData={setChangeData}
              categorysAndBrands={categorysAndBrands}
              brandError={errorToSave}
            />
          </div>
          <div className="flex-1 relative">
            <InputCategory
              style={estilosInput}
              articuloData={articuloDataState}
              setChangeData={setChangeData}
              categorysAndBrands={categorysAndBrands}
              categoryError={errorToSave}
            />
          </div>
        </div>
        <div className="flex flex-row space-x-1">
          <div className="flex-1">
            <label htmlFor="costo">costo</label>
            <input
              type="text"
              name="costo"
              className={estilosInput}
              value={articuloDataState.article.costo}
              onChange={(e) => {
                setChangeData("costo", e.target.value);
              }}
            />
          </div>
          <div className="flex-1">
            <label htmlFor="venta">Venta</label>
            <input
              type="text"
              name="venta"
              className={estilosInput}
              value={articuloDataState.article.venta}
              onChange={(e) => {
                setChangeData("venta", e.target.value);
              }}
            />
          </div>
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
            onClick={saveArticle}
          >
            Añadir
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddArticuloForm;
