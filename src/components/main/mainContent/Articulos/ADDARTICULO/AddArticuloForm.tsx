import React, { useEffect, useState } from "react";
import InputBrand from "./InputBrandAndCategory/InputBrand";
import InputCategory from "./InputBrandAndCategory/InputCategory";
import {
  articleData,
  brandType,
  categoryType,
  subCategoryType,
  unitType,
} from "../../../../../../types";
import { useDispatch } from "react-redux";
import StockArticleForm from "./StockAndWeight/StockArticleForm";
import Impuestos from "./Impuestos";
import ButtonCheck from "./ButtonCheck";
import CategoryAndBrand from "./InputBrandAndCategory/CategoryAndBrand";
import CategoryAndBrandForm from "./InputBrandAndCategory/CategoryAndBrandForm";
import { NumericFormat } from "react-number-format";
import CreateUnit from "./StockAndWeight/CreateUnit";

interface AddArticulosFormProps {
  onChangeModal: (p: boolean) => void;
  categorys: categoryType[];
  brands: brandType[];
  subCategorys: subCategoryType[];
  formatMony: (n: number) => number;
}

const AddArticuloForm: React.FC<AddArticulosFormProps> = ({
  onChangeModal,
  categorys,
  subCategorys,
  brands,
  formatMony,
}) => {
  //DATOS USUARIOS
  const dispatch = useDispatch();
  const [articuloDataState, setarticuloData] = useState<articleData>({
    article: {
      name: "",
      costo: 0,
      venta: 0,
      stock: { amount: 0, unit: "kg", minStock: 0 },
      wApp: false,
      wlApp: false,
      grossWeight: 0,
      percentajeToSale: 0,
      liquidWeight: 0,
      description: "",
    },
    brand: { value: "", label: "" },
    category: { value: "", label: "" },
    subCategory: { value: "", label: "" },
    code: "",
    dateToRegister: "",
    sales: [],
    taxes: [],
  });

  const [errorToSave, setErrorToSave] = useState({
    message: "",
    type: "",
    active: false,
  });

  //CREAR UNIDAD COSAS
  const [createUnitForm, setCreateUnitForm] = useState(false);
  const [unitsArticleForm, setUnitsArticleForm] = useState<unitType[]>([]);

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
  //SUB CATEGORY
  const [newSubCategory, setNewSubCategory] = useState<string>("");

  const [addSubCategoryInput, setAddSubCategoryInput] = useState(false);
  const onChangeSubCategory = (e: string) => {
    setNewSubCategory(e);
  };
  const saveNewSubCategory = (newSubCategory: string) => {
    window.api.enviarEvento("save-subcategory", newSubCategory);

    setAddSubCategoryInput(false);
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

  function setChangeData(data: string, value: any) {
    let valueUpper = "";
    let valueLower = "";
    if (data === "category" || data === "brand") {
      valueUpper = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
      valueLower = value.toLowerCase();
    }
    const existingData = [
      "article",
      "brand",
      "costo",
      "venta",
      "stock",
      "stock-unit",
      "min-stock",
      "category",
      "subcategory",
      "description",
      "newTax",
      "deleteTax",
      "wApp",
      "wlApp",
      "grossWeight",
      "liquidWeight",
      "percentajeToSale",
    ];
    console.log(existingData.includes(data), "esto");
    if (existingData.includes(data)) {
      switch (data) {
        case "article":
          if (/^[a-zA-Z\s]*$/.test(value)) {
            setarticuloData({
              ...articuloDataState,
              article: { ...articuloDataState.article, name: value },
            });
          }
          break;
        case "brand":
          setarticuloData({
            ...articuloDataState,
            brand: { value: valueLower, label: valueUpper },
          });

          break;
        case "description":
          setarticuloData({
            ...articuloDataState,
            article: { ...articuloDataState.article, description: value },
          });

          break;
        case "costo":
          if (/^[0-9.]*$/.test(value)) {
            setarticuloData({
              ...articuloDataState,
              article: {
                ...articuloDataState.article,
                costo: value,
              },
            });
          }
          break;
        case "venta":
          if (/^[0-9.]*$/.test(value)) {
            setarticuloData({
              ...articuloDataState,
              article: { ...articuloDataState.article, venta: value },
            });
          }
          break;
        case "stock":
          if (/^[0-9.]*$/.test(value)) {
            setarticuloData({
              ...articuloDataState,
              article: {
                ...articuloDataState.article,
                stock: { ...articuloDataState.article.stock, amount: value },
              },
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
        case "min-stock":
          setarticuloData({
            ...articuloDataState,
            article: {
              ...articuloDataState.article,
              stock: { ...articuloDataState.article.stock, minStock: value },
            },
          });
          break;
        case "category":
          setarticuloData({
            ...articuloDataState,
            category: { value: valueLower, label: valueUpper },
          });
          break;
        case "subcategory":
          setarticuloData({
            ...articuloDataState,
            subCategory: { value: valueLower, label: valueUpper },
          });
          break;
        case "wApp":
          setarticuloData({
            ...articuloDataState,
            article: { ...articuloDataState.article, wApp: value },
          });
          break;
        case "grossWeight":
          setarticuloData({
            ...articuloDataState,
            article: { ...articuloDataState.article, grossWeight: value },
          });
          break;
        case "liquidWeight":
          setarticuloData({
            ...articuloDataState,
            article: { ...articuloDataState.article, liquidWeight: value },
          });
          break;
        case "newTax":
          setarticuloData({
            ...articuloDataState,
            taxes: [...articuloDataState.taxes, value],
          });
          break;
        case "percentajeToSale":
          setarticuloData({
            ...articuloDataState,
            article: { ...articuloDataState.article, percentajeToSale: value },
          });
          break;
        case "wlApp":
          setarticuloData({
            ...articuloDataState,
            taxes: [...articuloDataState.taxes, value],
          });
          break;
        case "deleteTax":
          const taxes = [...articuloDataState.taxes];
          taxes.splice(value, 1);
          setarticuloData({
            ...articuloDataState,
            taxes: [...taxes],
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
  const inputStyle =
    "outline-none h-12 w-full text-slate-50 bg-slate-900 px-2 rounded-md border border-slate-800";

  useEffect(() => {
    window.api.recibirEvento("error-save-article", (error) => {
      console.log("GONZALO FIJATE ACA", error);
      if (!error.active) {
        console.log("LLEGA A CA", articuloDataState);
        onChangeModal(false);
      }
      setErrorToSave({ ...error });
    });
    console.log(formatMony(articuloDataState.article.costo));

    window.api.enviarEvento("get-unitsArticleForm");

    window.api.recibirEvento("response-get-unitsArticleForm", (units) => {
      setUnitsArticleForm(units);
    });
  }, []);
  useEffect(() => {
    console.log(articuloDataState);
  }, [articuloDataState]);
  const applyPercentaje = (value: string, porcentaje: string) => {
    const aumento = Number(value) * (Number(porcentaje) / 100);

    return formatMony(Number(value) + aumento);
  };
  return (
    <div className="absolute bottom-0 top-0 right-0 left-0 flex justify-center items-center z-50 text-base bg-slate-950 bg-opacity-30 backdrop-blur-xl">
      {/* CREAR UNIDAD */}
      {createUnitForm && <CreateUnit setCreateUnitForm={setCreateUnitForm} />}
      {/*AÑADIR NUEVA CATEGORIA*/}
      <div
        className={`w-5/6 h-5/6 border border-gray-500 text-teal-200 bg-slate-950 bg-opacity-95 space-y-5 rounded-md relative flex flex-col ${
          (addCategoryInput || addBrandInput) && "opacity-50"
        }`}
      >
        <CategoryAndBrandForm
          setAddBrandInput={setAddBrandInput}
          setAddCategoryInput={setAddCategoryInput}
          addSubCategoryInput={addSubCategoryInput}
          onChangeSubCategory={onChangeSubCategory}
          newSubCategory={newSubCategory}
          addBrandInput={addBrandInput}
          addCategoryInput={addCategoryInput}
          newBrand={newBrand}
          newCategory={newCategory}
          onChangeBrand={onChangeBrand}
          onChangeCategory={onChangeCategory}
          saveNewBrand={saveNewBrand}
          saveNewCategory={saveNewCategory}
          saveNewSubCategory={saveNewSubCategory}
          setAddSubCategoryInput={setAddSubCategoryInput}
        />
        <div className="flex flex-col flex-1 items-center px-5 pt-5 border-b border-slate-800 rounded-b-2xl">
          <div className="flex w-full space-x-5 flex-1">
            <div className="flex-1">
              <label htmlFor="articulo" className="select-none">
                Articulo
              </label>
              <input
                type="text"
                name="articulo"
                className={inputStyle}
                value={articuloDataState.article.name}
                onChange={(e) => {
                  setChangeData("article", e.target.value);
                }}
              />
            </div>
            <div className="flex-1">
              <label htmlFor="articulo" className="select-none">
                Código
              </label>
              <input
                type="text"
                name="articulo"
                className={inputStyle}
                value={articuloDataState.article.name}
                onChange={(e) => {
                  setChangeData("article", e.target.value);
                }}
              />
            </div>
          </div>
          {/** CODIGO DEL ARTICULO */}
          <div className="flex flex-1  w-full space-x-5">
            <CategoryAndBrand
              articuloDataState={articuloDataState}
              brands={brands}
              categorys={categorys}
              subCategorys={subCategorys}
              errorToSave={errorToSave}
              inputStyle={inputStyle}
              setAddBrandInput={setAddBrandInput}
              setAddCategoryInput={setAddCategoryInput}
              setChangeData={setChangeData}
              setAddSubCategoryInput={setAddSubCategoryInput}
            />
            <StockArticleForm
              articuloDataState={articuloDataState}
              inputStyle={inputStyle}
              setCreateUnitForm={setCreateUnitForm}
              setChangeData={setChangeData}
              unitsArticleForm={unitsArticleForm}
            />
          </div>
        </div>
        <div className="flex space-x-5 px-5 items-center">
          <div className="flex-1">
            <label htmlFor="proveedor">Proveedor</label>
            <input
              type="text"
              name="proveedor"
              className={inputStyle}
              onChange={(e) => {
                setChangeData("proveedor", e.target.value);
              }}
            />
          </div>
          <div className="flex-1 flex h-full">
            <div className="flex-1">
              <label htmlFor="costo" className="select-none">
                Costo
              </label>
              <NumericFormat
                thousandSeparator={true}
                prefix={"$"}
                decimalScale={2}
                fixedDecimalScale={true}
                allowNegative={false}
                valueIsNumericString={true}
                onValueChange={(values) => {
                  const { formattedValue, value } = values;
                  setChangeData("costo", value);
                }}
                className={inputStyle}
              />
            </div>
            <div className="flex-1">
              <label htmlFor="venta" className="select-none">
                Porcentaje de Venta
              </label>
              <NumericFormat
                thousandSeparator={true}
                suffix="%"
                fixedDecimalScale={true}
                allowNegative={false}
                valueIsNumericString={true}
                onValueChange={(values) => {
                  const { formattedValue, value } = values;
                  setChangeData("percentajeToSale", value);
                }}
                className={inputStyle}
                value={articuloDataState.article.percentajeToSale}
              />
            </div>
            <div className="flex-1">
              <label htmlFor="venta" className="select-none">
                Precio final
              </label>
              <input
                type="text"
                name="venta"
                className={inputStyle}
                value={applyPercentaje(
                  `${articuloDataState.article.costo}`,
                  `${articuloDataState.article.percentajeToSale}`
                )}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-row flex-1 items-center space-x-5 px-5 border-t rounded-t-lg border-slate-800">
          <div className="flex-1 flex flex-col h-full border-r border-slate-800 pr-2 relative">
            <div className="absolute right-0 bottom-0 h-10 w-10"></div>
            <p className="select-none">Descripción</p>
            <textarea
              value={articuloDataState.article.description}
              onChange={(e) => {
                setChangeData("description", e.target.value);
              }}
              className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-2 pt-1 outline-none text-sm"
            />
          </div>
          <Impuestos
            articleData={articuloDataState}
            setChangeData={setChangeData}
          />
        </div>

        <div className="flex flex-row w-full select-none">
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
