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
    <div className="flex w-full items-start space-x-2 px-2">
      <div className="flex flex-col flex-1 w-full relative ">
        <div className="absolute -top-2 right-0 text-green-300 z-40 hover:text-green-200 flex space-x-2">
          {errorToSave.active &&
            (errorToSave.type == "all" || errorToSave.type == "brand") && (
              <div className="flex items-center">
                <p className="text-red-200 text-xs">{errorToSave.message}</p>
              </div>
            )}
          <Biñeta title="Crear marca">
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
          </Biñeta>
        </div>
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
      <div className="flex-1 relative w-full">
        <div className="absolute -top-2 right-0 text-green-300 z-40 hover:text-green-200 flex space-x-2">
          {errorToSave.active && (errorToSave.type == "all" || "category") && (
            <div className="flex items-center">
              <p className="text-red-200 text-xs">{errorToSave.message}</p>
            </div>
          )}
          <Biñeta title="Crear categoria">
            <ButtonR
              height="h-6"
              onClick={() => {
                setAddCategoryInput(true);
              }}
              width="w-6"
              textSize="text-xs"
              bgIconColor="bg-gradient-to-l from-gray-700 via-gray-700 to-gray-500 text-[#fff8dcff]"
            >
              <IoAdd size={20} className="text-[#ffd700ff] " />
            </ButtonR>
          </Biñeta>
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
      <div className="flex-1 relative w-full">
        <div className="absolute -top-2 right-0 text-green-300 z-40 hover:text-green-200 flex space-x-2">
          {errorToSave.active && (errorToSave.type == "all" || "category") && (
            <div className="flex items-center">
              <p className="text-red-200 text-xs">{errorToSave.message}</p>
            </div>
          )}
          <Biñeta title="Crear sub categoria">
            <ButtonR
              height="h-6"
              onClick={() => {
                setAddSubCategoryInput(true);
              }}
              width="w-6"
              textSize="text-xs"
              bgIconColor="bg-gradient-to-l  from-gray-700 via-gray-700 to-gray-500 text-[#fff8dcff]"
            >
              <IoAdd size={20} className="text-[#ffd700ff] " />
            </ButtonR>
          </Biñeta>
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
