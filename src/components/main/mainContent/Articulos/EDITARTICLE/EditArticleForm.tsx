import React, { useEffect, useState } from "react";
import InputBrand from "../ADDARTICULO/InputBrand";
import InputCategory from "../ADDARTICULO/InputCategory";
import Select from "../../Select/Select";
import { BoxSvg } from "../../../../../assets/MAINSVGS/SVGSGLOBAL/Cmgsvg";
import {
  articleData,
  brandType,
  categoryType,
  dataToEditArticle,
} from "../../../../../../types";
import { useDispatch } from "react-redux";
import { addArticle } from "../../../../../redux/estados/articlesState";
import CheckSvg from "../../../../../assets/MAINSVGS/mainAsideSvg/editSVG/CheckSvg";
import UnCheckSvg from "../../../../../assets/MAINSVGS/mainAsideSvg/editSVG/UnCheckSvg";

interface EditArticleFormProps {
  onChangeModal: (p: boolean) => void;
  categorys: categoryType[];
  brands: brandType[];
  articles: articleData[];
  articleToEdit: { active: boolean; code: string };
}

const EditArticleForm: React.FC<EditArticleFormProps> = ({
  onChangeModal,
  categorys,
  brands,
  articles,
  articleToEdit,
}) => {
  //DATOS USUARIOS

  const dispatch = useDispatch();
  const [articuloDataState, setarticuloData] = useState<dataToEditArticle>({
    name: "",
    costo: 0,
    venta: 0,
    stock: { amount: 0, unit: "kg" },
    brand: { value: "", label: "" },
    category: { value: "", label: "" },
    code: "",
  });

  const [unitSelect, setUnitSelect] = useState("Kg");

  function onChangeSelectUnit(unit: string, filter: string) {
    setUnitSelect(unit);
    setChangeData("stock-unit", unit);
  }

  const [errorToSave, setErrorToSave] = useState({
    message: "",
    type: "",
    active: false,
  });

  //CATEGORY

  const [newCategory, setNewCategory] = useState<string>("");

  const [addCategoryInput, setAddCategoryInput] = useState(false);

  const onChangeCategory = (e: string) => {
    setNewCategory(e);
  };

  const saveNewCategory = (newCategory: string) => {
    window.api.enviarEvento("save-category", newCategory);

    setAddCategoryInput(false);
  };

  //BRAND

  const [newBrand, setNewBrand] = useState<string>("");

  const [addBrandInput, setAddBrandInput] = useState(false);

  const onChangeBrand = (e: string) => {
    setNewBrand(e);
  };

  const saveNewBrand = (newBrand: string) => {
    window.api.enviarEvento("save-brand", newBrand);

    setAddBrandInput(false);
  };
  /////
  const [editResponse, setEditResponse] = useState<{
    edit: boolean;
    active: boolean;
  }>({
    edit: false,
    active: false,
  });

  ////
  const optionsUnits = [
    { value: "cajas", label: "Cajas", svg: <BoxSvg /> },
    { value: "paquetes", label: "Paquetes" },
    { value: "unidades", label: "Unidades" },
    { value: "litros", label: "Litros" },
    { value: "kg", label: "Kilogramos" },
  ];

  function setChangeData(data: string, value: any) {
    const valueUpper =
      value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    const valueLower = value.toLowerCase();
    const existingData = [
      "name",
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
        case "name":
          if (/^[a-zA-Z\s]*$/.test(value)) {
            setarticuloData({
              ...articuloDataState,
              name: value,
            });
          }
          break;
        case "brand":
          setarticuloData({
            ...articuloDataState,
            brand: { value: valueLower, label: valueUpper },
          });

          break;
        case "costo":
          if (/^[0-9.]*$/.test(value)) {
            setarticuloData({
              ...articuloDataState,
              costo: value,
            });
          }
          break;
        case "venta":
          if (/^[0-9.]*$/.test(value)) {
            setarticuloData({
              ...articuloDataState,
              venta: value,
            });
          }
          break;
        case "stock":
          if (/^[0-9.]*$/.test(value)) {
            setarticuloData({
              ...articuloDataState,
              stock: { ...articuloDataState.stock, amount: value },
            });
          }
          break;
        case "stock-unit":
          setarticuloData({
            ...articuloDataState,
            stock: { ...articuloDataState.stock, unit: value },
          });
          break;
        case "category":
          setarticuloData({
            ...articuloDataState,
            category: { value: valueLower, label: valueUpper },
          });
          break;

        default:
          break;
      }
    } else {
      console.log("NO ESTA");
    }
  }

  function editArticle() {
    window.api.enviarEvento("edit-article", {
      ...articuloDataState,
      code: articleToEdit.code,
    });
  }

  const chargeArticle = (code: string) => {
    const articlesArray = [...articles];

    const articleToEdit = articlesArray.filter((article) => {
      return article.code === code;
    });

    if (articleToEdit.length > 0) {
      let article = {
        code: articleToEdit[0].code,
        name: articleToEdit[0].article.name,
        brand: articleToEdit[0].brand,
        category: articleToEdit[0].category,
        costo: articleToEdit[0].article.costo,
        venta: articleToEdit[0].article.venta,
        stock: { ...articleToEdit[0].article.stock },
      };
      setarticuloData(article);
    }
  };
  //ESTILOS INPUT
  const estilosInput = "outline-none h-12 w-full bg-slate-600 px-2 rounded-md";

  useEffect(() => {
    console.log("se carga....", articleToEdit.code);
    chargeArticle(articleToEdit.code);

    window.api.recibirEvento("response-edit-article", (res) => {
      if (res) {
        setEditResponse({
          edit: true,
          active: true,
        });
        window.api.enviarEvento("get-articles");
      } else {
        setEditResponse({
          edit: false,
          active: true,
        });
      }
    });
  }, []);
  useEffect(() => {
    console.log(articuloDataState);
  }, [articuloDataState]);

  return (
    <div className="absolute bottom-0 top-0 right-0 left-0 flex justify-center items-center z-50 text-xl text-slate-50">
      {/*AÑADIR NUEVA CATEGORIA*/}
      {addCategoryInput && (
        <div className="absolute w-96 z-50 flex items-center justify-center flex-col">
          <div className="w-full flex justify-center items-center flex-col rounded-md border h-36 bg-slate-800">
            <div className="w-full px-5 flex-1 flex flex-col justify-evenly">
              <label
                htmlFor="newcategory"
                className="flex justify-start w-80 text-slate-50"
              >
                <p>Nueva Categoria</p>
              </label>
              <input
                name="newcategory"
                type="text"
                value={newCategory}
                onChange={(e) => {
                  onChangeCategory(e.target.value);
                }}
                className="bg-gray-600 h-10 w-full rounded-sm outline-none text-slate-50 px-2"
              />
            </div>
            <div className="w-full flex justify-between">
              <button
                className="h-10 w-1/2 bg-red-400 rounded-bl-sm"
                onClick={() => setAddCategoryInput(false)}
              >
                Cancelar
              </button>
              <button
                className="h-10 w-1/2 bg-green-300 rounded-br-sm"
                onClick={() => saveNewCategory(newCategory)}
              >
                Crear Categoria
              </button>
            </div>
          </div>
        </div>
      )}
      {/*AÑADIR NUEVA MARCA*/}
      {addBrandInput && (
        <div className="absolute w-96 h-96 z-50 flex items-center justify-center flex-col">
          <div className="w-full flex justify-center items-center flex-col rounded-md border h-36 bg-slate-800">
            <div className="w-full px-5 flex-1 flex flex-col justify-evenly">
              <label
                htmlFor="newbrand"
                className="flex justify-start w-80 text-slate-50"
              >
                <p>Nueva Marca</p>
              </label>
              <input
                name="newbrand"
                type="text"
                value={newBrand}
                onChange={(e) => {
                  onChangeBrand(e.target.value);
                }}
                className="bg-gray-600 h-10 w-full rounded-sm outline-none text-slate-50 px-2"
              />
            </div>
            <div className="w-full flex justify-between">
              <button
                className="h-10 w-1/2 bg-red-400 rounded-bl-sm"
                onClick={() => setAddBrandInput(false)}
              >
                Cancelar
              </button>
              <button
                className="h-10 w-1/2 bg-green-300 rounded-br-sm"
                onClick={() => saveNewBrand(newBrand)}
              >
                Crear Marca
              </button>
            </div>
          </div>
        </div>
      )}
      <div
        className={`w-2/5 h-96 border border-gray-500 text-gray-200 bg-slate-800 bg-opacity-95 space-y-5 rounded-md relative flex flex-col justify-between ${
          (addCategoryInput || addBrandInput) && "opacity-50"
        }`}
      >
        {/*INFORMA SI SE EDITO O NO EL ARTICULO*/}
        {editResponse.active && (
          <div className="absolute z-50 bg-slate-950 w-full h-full rounded-md flex flex-col justify-around items-center">
            <div className="text-4xl w-full flex justify-center">
              <p
                className={`${
                  editResponse.edit ? "text-green-400" : "text-red-400"
                }`}
              >
                {editResponse.edit
                  ? "Se edito correctamente"
                  : "Error al editar"}
              </p>
            </div>
            {editResponse.edit ? (
              <div className="flex-1 flex items-center">
                <CheckSvg size={200} color="rgb(134 239 172)"></CheckSvg>
              </div>
            ) : (
              <div className="flex-1 flex items-center">
                <UnCheckSvg size={200} color="rgb(248 113 113)"></UnCheckSvg>
              </div>
            )}
            <button
              className="w-full bg-green-300 rounded-b-md flex justify-center text-black font-bold hover:bg-green-200"
              onClick={() => {
                onChangeModal(false);
              }}
            >
              <p>Aceptar</p>
            </button>
          </div>
        )}
        <div className="flex flex-row space-x-1 px-5 pt-5">
          <div className="flex-1">
            <label htmlFor="articulo">Articulo</label>
            <input
              type="text"
              name="articulo"
              className={estilosInput}
              value={articuloDataState.name}
              onChange={(e) => {
                setChangeData("name", e.target.value);
              }}
            />
          </div>
          <div className="w-32 flex flex-1 items-end">
            <div className="flex-1">
              <label htmlFor="stock">Stock</label>
              <div className="bg-slate-600 flex rounded-md relative">
                <input
                  type="text"
                  name="stock"
                  className={
                    "outline-none h-12 w-full rounded-l-md bg-slate-600 px-2 "
                  }
                  value={articuloDataState.stock.amount}
                  onChange={(e) => {
                    setChangeData("stock", e.target.value);
                  }}
                />
                <div className="w-32 max-w-16 min-w-16 h-12 flex items-center rounded-r-sm bg-slate-700">
                  <Select
                    options={optionsUnits}
                    value={unitSelect}
                    onChangeSelection={onChangeSelectUnit}
                    filter={"Unit"}
                    slice={3}
                    placeholder={unitSelect}
                    backGround="bg-slate-700"
                    border={false}
                    todos={false}
                  ></Select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row space-x-1 px-5">
          <div className="flex-1 relative">
            <div className="absolute  right-0 text-green-300 z-40 hover:text-green-200 flex space-x-2">
              {errorToSave.active &&
                (errorToSave.type == "all" || errorToSave.type == "brand") && (
                  <div className="flex items-center">
                    <p className="text-red-200 text-xs">
                      {errorToSave.message}
                    </p>
                  </div>
                )}
              <button
                onClick={() => {
                  setAddBrandInput(true);
                }}
              >
                +
              </button>
            </div>
            <InputBrand
              style={estilosInput}
              articuloData={articuloDataState}
              setChangeData={setChangeData}
              brands={brands}
              brandError={errorToSave}
              value={articuloDataState.brand.label}
            />
          </div>
          <div className="flex-1 relative">
            <div className="absolute  right-0 text-green-300 z-40 hover:text-green-200 flex space-x-2">
              {errorToSave.active &&
                (errorToSave.type == "all" || "category") && (
                  <div className="flex items-center">
                    <p className="text-red-200 text-xs">
                      {errorToSave.message}
                    </p>
                  </div>
                )}
              <button
                onClick={() => {
                  setAddCategoryInput(true);
                }}
              >
                +
              </button>
            </div>
            <InputCategory
              style={estilosInput}
              articuloData={articuloDataState}
              setChangeData={setChangeData}
              categorys={categorys}
              categoryError={errorToSave}
              value={articuloDataState.category.label}
            />
          </div>
        </div>
        <div className="flex flex-row space-x-1 px-5">
          <div className="flex-1">
            <label htmlFor="costo">Costo</label>
            <input
              type="text"
              name="costo"
              className={estilosInput}
              value={articuloDataState.costo}
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
              value={articuloDataState.venta}
              onChange={(e) => {
                setChangeData("venta", e.target.value);
              }}
            />
          </div>
        </div>

        <div className="flex flex-row w-full">
          <button
            className="w-1/2 h-10 bg-red-400 rounded-bl-sm"
            onClick={() => {
              onChangeModal(false);
            }}
          >
            Cancelar
          </button>
          <button
            className="w-1/2 h-10 bg-green-400 rounded-br-sm"
            onClick={editArticle}
          >
            Editar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditArticleForm;
