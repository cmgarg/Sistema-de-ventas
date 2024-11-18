import React, { useEffect, useReducer, useState } from "react";
import {
  articleData,
  categoryType,
  storeType,
  unitType,
} from "../../../../../../types/types";
import { useSelector } from "react-redux";
import { Check, ChevronsUpDown, RecycleIcon } from "lucide-react";

import { cn } from "../../../../../../lib/utils";
import { Button } from "../../../../../../components/app/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../../../../../../components/app/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../../../../components/app/ui/popover";
import { isEqual } from "lodash";
import Impuestos from "../ADDNEWARTICLE/ArticlePart/Impuestos";
import SaleAndCost from "../ADDNEWARTICLE/ArticlePart/SaleAndCost";
import CantidadPor from "../ADDNEWARTICLE/StockPart/StockUnitAndWeight/CantidadPor/CantidadPor";
import SelectUnitForm from "../ADDNEWARTICLE/StockPart/StockUnitAndWeight/Unit/SelectUnitForm";
import ButtonR from "../../buttons/ButtonR";
import { MdRestore } from "react-icons/md";
import UnitsForm from "../ADDNEWARTICLE/StockPart/StockUnitAndWeight/Unit/UnitsForm";
interface EditArticleFormProps {
  onChangeModal: (p: boolean) => void;
  categorys: any[];
  brands: any[];
  articles: articleData[];
  articleToEdit: {
    id: string;
    idArticle: string;
    code: string;
    barcode: string;
  };
}

const EditArticleForm: React.FC<EditArticleFormProps> = ({
  articleToEdit,
  onChangeModal,
}) => {
  //estados
  const categorys = useSelector((state: storeType) => state.categoryState);
  const brands = useSelector((state: storeType) => state.brandState);
  const subCategorys = useSelector(
    (state: storeType) => state.subCategoryState
  );
  const [errorIn, setErrorIn] = useState([]);
  const [unitSelect, setUnitSelect] = useState("Kg");
  const [unitsArticleForm, setUnitsArticleForm] = useState<unitType[]>([]);
  const [optionsUnits, setOptionsUnits] = useState<unitType[]>([
    { value: "cajas", label: "Cajas", abrevUnit: "Caj" },
    { value: "paquetes", label: "Paquetes", abrevUnit: "Paq" },
    { value: "unidades", label: "Unidades", abrevUnit: "Ud" },
    { value: "litros", label: "Litros", abrevUnit: "L" },
    { value: "kilogramos", label: "Kilogramos", abrevUnit: "Kg" },
  ]);
  const [open, setOpen] = React.useState(false);
  const [openBrands, setOpenBrands] = React.useState(false);
  const [openSubCategorys, setOpenSubCategorys] = React.useState(false);
  const [unitForm, setUnitForm] = useState(false);
  const [value, setValue] = React.useState("");
  const [initialArticle, setInitialArticle] = useState<articleData>();
  const initialState: articleData = {
    article: {
      name: "",
      costo: 0,
      venta: 0,
      profit: 0,
      stock: {
        amount: 0,
        unit: {
          label: "Kilogramos",
          value: "kilogramos",
          abrevUnit: "KG",
        },
        minStock: 0,
      },
      grossWeight: { value: 0, approx: false },
      liquidWeight: { value: 0, approx: false },
      forBulk: {
        active: false,
        value: 0,
      },
      pallet: {
        active: false,
        value: 0,
      },
      quantityperunit: {
        active: false,
        value: 0,
      },
      description: "",
    },
    batches: [],
    brand: { value: "", label: "" },
    code: "",
    category: { value: "", label: "" },
    subCategory: { value: "", label: "" },
    barcode: "",
    dateToRegister: "",
    sales: [],
    supplier: {
      name: "",
      phoneNumber: "",
      address: "",
      email: "",
    },
    taxes: [],
  };
  const [isChange, setIsChange] = useState<boolean>(false);
  type Action =
    | { type: "LOAD_ARTICLE"; payload: articleData }
    | { type: "SET_NAME"; payload: string }
    | { type: "SET_BARCODE"; payload: string }
    | { type: "SET_BRAND"; payload: { value: string; label: string } }
    | { type: "SET_CATEGORY"; payload: { value: string; label: string } }
    | { type: "SET_SUBCATEGORY"; payload: { value: string; label: string } }
    | { type: "SET_COST"; payload: number }
    | { type: "SET_PROFIT"; payload: number }
    | { type: "SET_FINAL_PRICE"; payload: number }
    | { type: "SET_STOCK"; payload: number }
    | { type: "SET_STOCK_UNIT"; payload: unitType }
    | { type: "SET_MIN_STOCK"; payload: number }
    | { type: "SET_GROSS_WEIGHT"; payload: number }
    | { type: "SET_GROSS_WEIGHT_APP"; payload: boolean }
    | { type: "SET_LIQUID_WEIGHT"; payload: number }
    | { type: "SET_LIQUID_WEIGHT_APP"; payload: boolean }
    | { type: "SET_NEW_TAX"; payload: any }
    | { type: "DELETE_TAX"; payload: number }
    | { type: "SET_DESCRIPTION"; payload: string }
    | { type: "SET_PALETTEVALUE"; payload: any }
    | { type: "SET_PALETTEACTIVE"; payload: boolean }
    | { type: "SET_BULKVALUE"; payload: any }
    | { type: "SET_BULKACTIVE"; payload: boolean };

  const articleReducer = (state: articleData, action: Action): articleData => {
    switch (action.type) {
      case "LOAD_ARTICLE":
        return { ...action.payload };
      case "SET_NAME":
        return {
          ...state,
          article: { ...state.article, name: action.payload },
        };
      case "SET_BARCODE":
        return { ...state, barcode: action.payload };
      case "SET_BRAND":
        return { ...state, brand: action.payload };
      case "SET_CATEGORY":
        return { ...state, category: action.payload };
      case "SET_SUBCATEGORY":
        return { ...state, subCategory: action.payload };
      case "SET_COST":
        return {
          ...state,
          article: { ...state.article, costo: action.payload },
        };
      case "SET_PROFIT":
        return {
          ...state,
          article: { ...state.article, profit: action.payload },
        };
      case "SET_FINAL_PRICE":
        return {
          ...state,
          article: { ...state.article, venta: action.payload },
        };
      case "SET_STOCK":
        return {
          ...state,
          article: {
            ...state.article,
            stock: { ...state.article.stock, amount: action.payload },
          },
        };
      case "SET_STOCK_UNIT":
        return {
          ...state,
          article: {
            ...state.article,
            stock: { ...state.article.stock, unit: action.payload },
          },
        };
        break;
      case "SET_MIN_STOCK":
        return {
          ...state,
          article: {
            ...state.article,
            stock: { ...state.article.stock, minStock: action.payload },
          },
        };
      case "SET_GROSS_WEIGHT":
        return {
          ...state,
          article: {
            ...state.article,
            grossWeight: {
              ...state.article.grossWeight,
              value: action.payload,
            },
          },
        };

      case "SET_GROSS_WEIGHT_APP":
        return {
          ...state,
          article: {
            ...state.article,
            grossWeight: {
              ...state.article.grossWeight,
              approx: action.payload,
            },
          },
        };
      case "SET_LIQUID_WEIGHT":
        return {
          ...state,
          article: {
            ...state.article,
            liquidWeight: {
              ...state.article.liquidWeight,
              value: action.payload,
            },
          },
        };
      case "SET_LIQUID_WEIGHT_APP":
        return {
          ...state,
          article: {
            ...state.article,
            liquidWeight: {
              ...state.article.liquidWeight,
              approx: action.payload,
            },
          },
        };
      case "SET_NEW_TAX":
        return {
          ...state,
          taxes: [...state.taxes, action.payload],
        };
      case "DELETE_TAX":
        const taxes = [...state.taxes];
        taxes.splice(action.payload, 1);
        return {
          ...state,
          taxes: [...taxes],
        };
      case "SET_DESCRIPTION":
        return {
          ...state,
          article: { ...state.article, description: action.payload },
        };
      case "SET_PALETTEVALUE":
        return {
          ...state,
          article: {
            ...state.article,
            pallet: {
              ...state.article.pallet,
              value: action.payload,
            },
          },
        };
      case "SET_PALETTEACTIVE":
        return {
          ...state,
          article: {
            ...state.article,
            pallet: {
              value: 0,
              active: action.payload,
            },
          },
        };
      case "SET_BULKVALUE":
        return {
          ...state,
          article: {
            ...state.article,
            forBulk: {
              ...state.article.forBulk,
              value: action.payload,
            },
          },
        };
      case "SET_BULKACTIVE":
        return {
          ...state,
          article: {
            ...state.article,
            forBulk: {
              value: 0,
              active: action.payload,
            },
          },
        };
      default:
        return state;
    }
  };

  const [stateArticle, dispatch] = useReducer(articleReducer, initialState);
  const restoreChange = () => {
    dispatch({ type: "LOAD_ARTICLE", payload: initialArticle });
  };
  function onChangeSelectUnit(unit: string) {
    let abrevUnit = "";
    const unitObject = optionsUnits.filter((o) => {
      if (o.value === unit) {
        abrevUnit = o.abrevUnit;

        return true;
      }
    });
    dispatch({ type: "SET_STOCK_UNIT", payload: unitObject[0] });
    setUnitSelect(abrevUnit);
  }
  const loadUnits = () => {
    const allUnits = [
      { value: "cajas", label: "Cajas", abrevUnit: "Caj" },
      { value: "paquetes", label: "Paquetes", abrevUnit: "Paq" },
      { value: "unidades", label: "Unidades", abrevUnit: "Ud" },
      { value: "litros", label: "Litros", abrevUnit: "L" },
      { value: "kilogramos", label: "Kilogramos", abrevUnit: "Kg" },
      ...unitsArticleForm,
    ];

    setOptionsUnits(allUnits);
  };
  const updateArticle = () => {
    window.api.enviarEvento("update-article", stateArticle);
  };
  const onUnitForm = () => {
    setUnitForm(!unitForm);
  };
  useEffect(() => {
    window.api.recibirEvento("response-update-article", (res) => {
      console.log(res);
      if (res) {
        window.api.enviarEvento("get-articles");
        onChangeModal(false);
      }
    });
    window.api.enviarEvento("get-unitsArticleForm");

    window.api.recibirEvento("response-get-unitsArticleForm", (units) => {
      const unitsAll = [...units];
      setUnitsArticleForm(unitsAll);
      loadUnits();
    });
  }, []);

  useEffect(() => {
    loadUnits();
  }, [unitsArticleForm]);
  useEffect(() => {
    window.api.enviarEvento("get-articleByCode", articleToEdit.code);

    window.api.recibirEvento(
      "response-get-articleByCode",
      (res: articleData) => {
        dispatch({ type: "LOAD_ARTICLE", payload: res });
        setInitialArticle(res);
      }
    );

    return () => {
      window.api.removeAllListeners("response-get-articleByCode");
    };
  }, [articleToEdit.code]);

  useEffect(() => {
    console.log("CAMBIO EL ARTICULO", stateArticle);
    setIsChange(isEqual(stateArticle, initialArticle));
  }, [stateArticle]);

  const inputStyle =
    "outline-none bg-[#707070ff] h-10 w-full rounded-lg pl-2 border border-gray-600 shadow-[0_2px_5px_rgba(0,0,0,0.50)] focus:bg-[#909090ff]";

  return (
    <div
      className={`absolute top-0 right-0 left-0 bottom-0 z-40 flex justify-center  items-center ${
        stateArticle.article ? "backdrop-brightness-50" : ""
      }`}
    >
      {unitForm && (
        <UnitsForm onUnitForm={onUnitForm} units={unitsArticleForm} />
      )}
      <div className="w-11/12 h-5/6  bg-[#2f2f2fff] flex overflow-auto rounded-lg border border-gray-600">
        {stateArticle ? (
          <div className="flex-1 max-h-full overflow-auto custom-scrollbar flex flex-col space-y-5">
            <div className="w-full flex flex-col flex-1 px-2">
              <div className="flex flex-1  space-x-2">
                <div className="flex flex-1 flex-col">
                  <label htmlFor="nameArticle">Nombre</label>
                  <input
                    type="text"
                    value={stateArticle.article.name}
                    className={`${inputStyle} w-full`}
                    onChange={(e) =>
                      dispatch({ type: "SET_NAME", payload: e.target.value })
                    }
                  />
                </div>
                <div className="flex flex-1 flex-col">
                  <label htmlFor="nameArticle">Descripcion</label>
                  <div className="relative flex-1 h-full">
                    <div className="absolute right-0 bottom-0 h-5 w-5"></div>
                    <textarea
                      value={stateArticle.article.description}
                      className={`${inputStyle} w-full h-full`}
                      onChange={(e) =>
                        dispatch({
                          type: "SET_DESCRIPTION",
                          payload: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-1 w-full justify-center">
                <SaleAndCost
                  dispatch={dispatch}
                  stateArticle={stateArticle}
                  inputStyle={inputStyle}
                  errorIn={[]}
                />
              </div>
              <div className="flex-1 flex">
                <div className="flex flex-1">
                  <div className="flex flex-1 flex-col">
                    <label htmlFor="nameArticle">Marca</label>
                    <Popover open={openBrands} onOpenChange={setOpenBrands}>
                      <PopoverTrigger
                        asChild
                        className="bg-gradient-to-l from-gray-800 via-gray-800 to-gray-700 border border-gray-600 hover:text-yellow-500 shadow-[0_1px_5px_rgba(0,0,0,0.50)]"
                      >
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={openBrands}
                          className="w-32 justify-between"
                        >
                          {stateArticle.brand.label
                            ? brands.find(
                                (framework) =>
                                  framework.value === stateArticle.brand.value
                              )?.label
                            : stateArticle.brand.label}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0  border border-gray-600 bg-black ">
                        <Command className="bg-gray-800 text-white ">
                          <CommandInput placeholder="Search framework..." />
                          <CommandList className="bg-slate-950 ">
                            <CommandEmpty>No framework found.</CommandEmpty>
                            <CommandGroup>
                              {brands.map((framework) => (
                                <CommandItem
                                  key={framework.value}
                                  value={framework.value}
                                  className={`${
                                    framework.value === stateArticle.brand.value
                                      ? "bg-yellow-400"
                                      : "text-white font-semibold"
                                  }  
                              `}
                                  onSelect={(currentValue) => {
                                    dispatch({
                                      type: "SET_BRAND",
                                      payload: isEqual(
                                        framework,
                                        stateArticle.brand
                                      )
                                        ? { label: "", value: "" }
                                        : framework,
                                    });
                                    setOpenBrands(false);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4 text-black",
                                      stateArticle.brand.value ===
                                        framework.value
                                        ? "opacity-100 text-white"
                                        : "opacity-0"
                                    )}
                                  />
                                  {framework.label}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="flex flex-1 flex-col">
                    <label htmlFor="nameArticle">Categoria</label>
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger
                        asChild
                        className="bg-gradient-to-l  from-gray-800 via-gray-800 to-gray-700 border border-gray-600 hover:text-yellow-500 shadow-[0_1px_5px_rgba(0,0,0,0.50)]"
                      >
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={open}
                          className="w-32 justify-between"
                        >
                          {stateArticle.category.label
                            ? categorys.find(
                                (framework) =>
                                  framework.value ===
                                  stateArticle.category.value
                              )?.label
                            : stateArticle.category.label}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0  border border-gray-600 bg-black">
                        <Command className="bg-gray-800 text-white">
                          <CommandInput placeholder="Search framework..." />
                          <CommandList className="bg-slate-950">
                            <CommandEmpty>No framework found.</CommandEmpty>
                            <CommandGroup>
                              {categorys.map((framework) => (
                                <CommandItem
                                  key={framework.value}
                                  value={framework.value}
                                  className={`${
                                    framework.value ===
                                    stateArticle.category.value
                                      ? "bg-yellow-400"
                                      : "text-white font-semibold"
                                  }  
                              `}
                                  onSelect={(currentValue) => {
                                    dispatch({
                                      type: "SET_CATEGORY",
                                      payload: isEqual(
                                        framework,
                                        stateArticle.category
                                      )
                                        ? { label: "", value: "" }
                                        : framework,
                                    });
                                    setOpen(false);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4 text-black",
                                      stateArticle.category.value ===
                                        framework.value
                                        ? "opacity-100 text-white"
                                        : "opacity-0"
                                    )}
                                  />
                                  {framework.label}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="flex flex-1 flex-col">
                    <label htmlFor="nameArticle">Sub categoria</label>
                    <Popover
                      open={openSubCategorys}
                      onOpenChange={setOpenSubCategorys}
                    >
                      <PopoverTrigger
                        asChild
                        className="bg-gradient-to-l  from-gray-800 via-gray-800 to-gray-700 border border-gray-600 hover:text-yellow-500 shadow-[0_1px_5px_rgba(0,0,0,0.50)]"
                      >
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={openSubCategorys}
                          className="w-32 justify-between"
                        >
                          {stateArticle.subCategory.label
                            ? subCategorys.find(
                                (framework) =>
                                  framework.value ===
                                  stateArticle.subCategory.value
                              )?.label
                            : stateArticle.subCategory.label}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0  border border-gray-600 bg-black">
                        <Command className="bg-gray-800 text-white ">
                          <CommandInput placeholder="Search framework..." />
                          <CommandList className="bg-slate-950">
                            <CommandEmpty>No framework found.</CommandEmpty>
                            <CommandGroup>
                              {subCategorys.map((framework) => (
                                <CommandItem
                                  key={framework.value}
                                  value={framework.value}
                                  className={`${
                                    framework.value ===
                                    stateArticle.subCategory.value
                                      ? "bg-yellow-400"
                                      : "text-white font-semibold"
                                  }  
                              `}
                                  onSelect={(currentValue) => {
                                    dispatch({
                                      type: "SET_SUBCATEGORY",
                                      payload: isEqual(
                                        framework,
                                        stateArticle.subCategory
                                      )
                                        ? { label: "", value: "" }
                                        : framework,
                                    });
                                    setOpenBrands(false);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4 text-black",
                                      stateArticle.subCategory.value ===
                                        framework.value
                                        ? "opacity-100 text-white"
                                        : "opacity-0"
                                    )}
                                  />
                                  {framework.label}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                <div className="flex flex-1 space-x-5">
                  <div className="flex flex-1 flex-col">
                    <div className="text-[10px]">
                      <p>Cantidad</p>
                    </div>
                    <CantidadPor
                      stateArticle={stateArticle}
                      dispatch={dispatch}
                      errorIn={[]}
                    />
                  </div>
                  <div className="flex flex-1 space-x-2">
                    <div className="flex flex-col w-32">
                      <div className="text-[10px] opacity-0">
                        <p>Cantidad</p>
                      </div>
                      <label
                        htmlFor="minstock"
                        className="select-none flex relative"
                      >
                        <p>Stock</p>
                        <p className="text-xs flex h-full items-end">.Min</p>
                      </label>
                      <input
                        type="text"
                        name="minstock"
                        className={`${inputStyle} ${
                          errorIn.includes("MINSTOCK")
                            ? "overline outline-red-500 outline-2"
                            : ""
                        }`}
                        value={stateArticle.article.stock.minStock}
                        onChange={(e) => {
                          dispatch({
                            type: "SET_MIN_STOCK",
                            payload: Number(e.target.value),
                          });
                        }}
                      />
                    </div>
                    <div className="flex flex-col h-full w-24">
                      <div className="text-[10px] opacity-0">
                        <p>Cantidad</p>
                      </div>
                      <p className="w-full flex justify-start select-none">
                        Unidad
                      </p>
                      <div className="w-full h-10 flex items-center bg-slate-900 rounded-lg shadow-[0_2px_5px_rgba(0,0,0,0.50)] ">
                        <SelectUnitForm
                          options={optionsUnits}
                          value={unitSelect}
                          onChangeSelection={onChangeSelectUnit}
                          filter={"Unit"}
                          slice={3}
                          placeholder={unitSelect}
                          backGround="bg-slate-900"
                          backGround2="bg-zinc-950"
                          border={false}
                          todos={false}
                          setUnitForm={setUnitForm}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex w-full h-12 items-center justify-end space-x-2 px-2">
              <ButtonR
                title="Cancelar"
                height="h-8"
                width="w-32"
                bgColor={`bg-gradient-to-l from-gray-800 via-gray-700 to-gray-500`}
                onClick={() => onChangeModal(false)}
              ></ButtonR>

              <div className="relative flex">
                {isChange ? (
                  <div className="absolute top-0 left-0 bottom-0 right-0 z-50"></div>
                ) : null}
                <ButtonR
                  title="Restablecer"
                  height={`h-8 bg-gradient-to-l from-gray-800 via-gray-700 to-gray-500 mr-2 text-sm ${
                    isChange && "opacity-50"
                  }`}
                  width="w-32"
                  bgColor={`bg-gradient-to-l from-gray-800 via-gray-700 to-gray-500 text-sm`}
                  bgIconColor="bg-black"
                  onClick={() => restoreChange()}
                >
                  <MdRestore size={15} />
                </ButtonR>
                <ButtonR
                  title="Guardar"
                  height="h-8"
                  width="w-32"
                  bgColor={`bg-gradient-to-l from-yellow-800 via-yellow-700 to-yellow-500 text-sm ${
                    isChange && "opacity-50"
                  }`}
                  onClick={updateArticle}
                ></ButtonR>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default EditArticleForm;
