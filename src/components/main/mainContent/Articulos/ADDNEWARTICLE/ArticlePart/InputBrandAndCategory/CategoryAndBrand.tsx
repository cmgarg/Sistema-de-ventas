import React from "react";
import InputBrand from "./Inputs/InputBrand";
import {
  articleData,
  brandType,
  categoryType,
  storeType,
} from "../../../../../../../../types";
import InputCategory from "./Inputs/InputCategory";
import InputSubCategory from "./Inputs/InputSubCategory";
import { useSelector } from "react-redux";

interface CategoryAndBrandProps {
  errorToSave: { active: boolean; type: string; message: string };
  setAddBrandInput: (e: boolean) => void;
  inputStyle: string;
  articuloDataState: articleData;
  setChangeData: (e: string, f: any) => void;
  setAddCategoryInput: (e: boolean) => void;
  setAddSubCategoryInput: (e: boolean) => void;
}
const CategoryAndBrand: React.FC<CategoryAndBrandProps> = ({
  errorToSave,
  setAddSubCategoryInput,
  setAddCategoryInput,
  setAddBrandInput,
  inputStyle,
  articuloDataState,
  setChangeData,
}) => {
  const brands = useSelector((state: storeType) => state.brandState);
  const categorys = useSelector((state: storeType) => state.categoryState);
  const subCategorys = useSelector(
    (state: storeType) => state.subCategoryState
  );
  return (
    <div className="flex w-full items-start space-x-2">
      <div className="flex flex-col flex-1 w-full relative ">
        <div className="absolute  right-0 text-green-300 z-40 hover:text-green-200 flex space-x-2">
          {errorToSave.active &&
            (errorToSave.type == "all" || errorToSave.type == "brand") && (
              <div className="flex items-center">
                <p className="text-red-200 text-xs">{errorToSave.message}</p>
              </div>
            )}
          <button
            onClick={() => {
              setAddBrandInput(true);
            }}
            className="select-none"
          >
            +
          </button>
        </div>
        <InputBrand
          style={inputStyle}
          articuloData={articuloDataState}
          setChangeData={setChangeData}
          brands={brands}
          brandError={errorToSave}
        />
      </div>
      <div className="flex-1 relative w-full">
        <div className="absolute  right-0 text-green-300 z-40 hover:text-green-200 flex space-x-2">
          {errorToSave.active && (errorToSave.type == "all" || "category") && (
            <div className="flex items-center">
              <p className="text-red-200 text-xs">{errorToSave.message}</p>
            </div>
          )}
          <button
            onClick={() => {
              setAddCategoryInput(true);
            }}
            className="select-none"
          >
            +
          </button>
        </div>
        <InputCategory
          style={inputStyle}
          articuloData={articuloDataState}
          setChangeData={setChangeData}
          categorys={categorys}
          categoryError={errorToSave}
        />
      </div>
      <div className="flex-1 relative w-full">
        <div className="absolute  right-0 text-green-300 z-40 hover:text-green-200 flex space-x-2">
          {errorToSave.active && (errorToSave.type == "all" || "category") && (
            <div className="flex items-center">
              <p className="text-red-200 text-xs">{errorToSave.message}</p>
            </div>
          )}
          <button
            onClick={() => {
              setAddSubCategoryInput(true);
            }}
            className="select-none"
          >
            +
          </button>
        </div>
        <InputSubCategory
          style={inputStyle}
          articuloData={articuloDataState}
          setChangeData={setChangeData}
          subCategorys={subCategorys}
          categoryError={errorToSave}
        />
      </div>
    </div>
  );
};

export default CategoryAndBrand;
