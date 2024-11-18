import React from "react";
import InputBrand from "./Inputs/InputBrand";
import {
  Action,
  articleData,
  brandType,
  categoryType,
  storeType,
} from "../../../../../../../../types/types";
import InputCategory from "./Inputs/InputCategory";
import InputSubCategory from "./Inputs/InputSubCategory";
import { useSelector } from "react-redux";
import ButtonR from "../../../../buttons/ButtonR";
import { IoAdd } from "react-icons/io5";
import Biñeta from "../../../../Biñeta/Biñieta";
import Tooltip from "@mui/material/Tooltip";
import { Button, ButtonBase } from "@mui/material";
interface CategoryAndBrandProps {
  errorToSave: { active: boolean; type: string; message: string };
  setAddBrandInput: (e: boolean) => void;
  inputStyle: string;
  stateArticle: articleData;
  setAddCategoryInput: (e: boolean) => void;
  setAddSubCategoryInput: (e: boolean) => void;
  dispatch: React.Dispatch<Action>;
  errorIn: string[];
}
const CategoryAndBrand: React.FC<CategoryAndBrandProps> = ({
  errorToSave,
  setAddSubCategoryInput,
  errorIn,
  setAddCategoryInput,
  setAddBrandInput,
  inputStyle,
  stateArticle,
  dispatch,
}) => {
  const brands = useSelector((state: storeType) => state.brandState);
  const categorys = useSelector((state: storeType) => state.categoryState);
  const subCategorys = useSelector(
    (state: storeType) => state.subCategoryState
  );
  return (
    <div className="flex flex-1 items-center space-x-2 px-2 ">
      <div className="flex flex-col relative space-y-2">
        <div className="w-full z-40 hover:text-green-200 flex justify-between">
          {errorToSave.active &&
            (errorToSave.type == "all" || errorToSave.type == "brand") && (
              <div className="flex items-center">
                <p className="text-red-200 text-xs">{errorToSave.message}</p>
              </div>
            )}
          {/* <Biñeta title="Crear marca">
            
          </Biñeta> */}
          {/* <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <ButtonR
                  height="h-6"
                  onClick={() => {
                    setAddBrandInput(true);
                  }}
                  width="w-6"
                  textSize="text-xs"
                  bgIconColor="bg-gradient-to-l from-gray-700 via-gray-700 to-gray-500 text-[#fff8dcff]"
                >
                  <IoAdd size={20} className="text-[#ffd700ff] " />
                </ButtonR>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add to library</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider> */}
          <div>
            <p>Marca</p>
          </div>
          <Tooltip title="Crear marca">
            <button
              onClick={() => {
                setAddBrandInput(true);
              }}
              className="shadow-[0_2px_5px_rgba(0,0,0,0.50)] bg-gradient-to-l from-gray-700 via-gray-700 to-gray-500 text-[#fff8dcff] text-xs rounded-full h-6 w-6 flex justify-center items-center"
            >
              <IoAdd size={25} className="text-[#ffd700ff] " />
            </button>
          </Tooltip>
        </div>
        <div className="flex-1">
          <InputBrand
            errorIn={errorIn}
            stateArticle={stateArticle}
            style={inputStyle}
            dispatch={dispatch}
            brands={brands}
            brandError={errorToSave}
            value={stateArticle.brand.label}
          />
        </div>
      </div>
      <div className="flex flex-col relative space-y-2">
        <div className=" z-40 hover:text-green-200 flex space-x-2 w-full justify-between">
          {errorToSave.active && (errorToSave.type == "all" || "category") && (
            <div className="flex items-center">
              <p className="text-red-200 text-xs">{errorToSave.message}</p>
            </div>
          )}
          <div>
            <p>Categoria</p>
          </div>
          <Tooltip title="Crear categoria">
            <button
              onClick={() => {
                setAddCategoryInput(true);
              }}
              className="shadow-[0_2px_5px_rgba(0,0,0,0.50)] bg-gradient-to-l from-gray-700 via-gray-700 to-gray-500 text-[#fff8dcff] text-xs rounded-full h-6 w-6 flex justify-center items-center"
            >
              <IoAdd size={25} className="text-[#ffd700ff] " />
            </button>
          </Tooltip>
        </div>
        <InputCategory
          errorIn={errorIn}
          stateArticle={stateArticle}
          style={inputStyle}
          value={stateArticle.category.label}
          dispatch={dispatch}
          categorys={categorys}
          categoryError={errorToSave}
        />
      </div>
      <div className="flex flex-col relative space-y-2">
        <div className=" z-40 hover:text-green-200 flex space-x-2 w-full justify-between">
          {errorToSave.active && (errorToSave.type == "all" || "category") && (
            <div className="flex items-center">
              <p className="text-red-200 text-xs">{errorToSave.message}</p>
            </div>
          )}
          <div>
            <p>Sub categoria</p>
          </div>
          <Tooltip title="Crear sub categoria">
            <button
              onClick={() => {
                setAddSubCategoryInput(true);
              }}
              className="shadow-[0_2px_5px_rgba(0,0,0,0.50)] bg-gradient-to-l from-gray-700 via-gray-700 to-gray-500 text-[#fff8dcff] text-xs rounded-full h-6 w-6 flex justify-center items-center"
            >
              <IoAdd size={25} className="text-[#ffd700ff] " />
            </button>
          </Tooltip>
        </div>
        <InputSubCategory
          errorIn={errorIn}
          stateArticle={stateArticle}
          style={inputStyle}
          dispatch={dispatch}
          subCategorys={subCategorys}
          value={stateArticle.subCategory.label}
          categoryError={errorToSave}
        />
      </div>
    </div>
  );
};

export default CategoryAndBrand;
