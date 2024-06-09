import React from "react";

interface CategoryAndBrandFormProps {
  addCategoryInput: boolean;
  addSubCategoryInput: boolean;
  setAddCategoryInput: (p: boolean) => void;
  newCategory: string;
  newSubCategory: string;
  onChangeCategory: (p: string) => void;
  onChangeSubCategory: (p: string) => void;
  saveNewCategory: (p: string) => void;
  setAddSubCategoryInput: (p: boolean) => void;
  addBrandInput: boolean;
  setAddBrandInput: (p: boolean) => void;
  newBrand: string;
  onChangeBrand: (p: string) => void;
  saveNewBrand: (p: string) => void;
  saveNewSubCategory: (p: string) => void;
}

const CategoryAndBrandForm: React.FC<CategoryAndBrandFormProps> = ({
  addCategoryInput,
  addSubCategoryInput,
  onChangeSubCategory,
  saveNewBrand,
  saveNewCategory,
  setAddCategoryInput,
  setAddSubCategoryInput,
  setAddBrandInput,
  saveNewSubCategory,
  addBrandInput,
  newBrand,
  newCategory,
  newSubCategory,
  onChangeBrand,
  onChangeCategory,
}) => {
  return (
    <div>
      {addCategoryInput && (
        <div className="absolute w-96 z-50 flex items-center justify-center flex-col">
          <div className="w-full flex justify-center items-center flex-col rounded-md border h-36 bg-slate-950">
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
                className="bg-slate-900 h-12 w-full rounded-sm outline-none text-slate-50 px-2"
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
      {addSubCategoryInput && (
        <div className="absolute w-96 z-50 flex items-center justify-center flex-col">
          <div className="w-full flex justify-center items-center flex-col rounded-md border h-36 bg-slate-950">
            <div className="w-full px-5 flex-1 flex flex-col justify-evenly">
              <label
                htmlFor="newcategory"
                className="flex justify-start w-80 text-slate-50"
              >
                <p>Nueva Sub Categoria</p>
              </label>
              <input
                name="newcategory"
                type="text"
                value={newSubCategory}
                onChange={(e) => {
                  onChangeSubCategory(e.target.value);
                }}
                className="bg-slate-900 h-12 w-full rounded-sm outline-none text-slate-50 px-2"
              />
            </div>
            <div className="w-full flex justify-between">
              <button
                className="h-10 w-1/2 bg-red-400 rounded-bl-sm"
                onClick={() => setAddSubCategoryInput(false)}
              >
                Cancelar
              </button>
              <button
                className="h-10 w-1/2 bg-green-300 rounded-br-sm"
                onClick={() => saveNewSubCategory(newSubCategory)}
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
          <div className="w-full flex justify-center items-center flex-col rounded-md border h-36 bg-slate-950">
            <div className="w-full px-5 flex-1 flex flex-col justify-evenly">
              <label
                htmlFor="newbrand"
                className="flex justify-start w-80 text-slate-50 select-none"
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
                className="bg-slate-900 h-12 w-full rounded-sm outline-none text-slate-50 px-2"
              />
            </div>
            <div className="w-full flex justify-between">
              <button
                className="h-10 w-1/2 bg-red-400 rounded-bl-sm select-none"
                onClick={() => setAddBrandInput(false)}
              >
                Cancelar
              </button>
              <button
                className="h-10 w-1/2 bg-green-300 rounded-br-sm select-none"
                onClick={() => saveNewBrand(newBrand)}
              >
                Crear Marca
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryAndBrandForm;
