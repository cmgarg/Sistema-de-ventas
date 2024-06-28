import React, { useState } from "react";

interface CategoryAndBrandFormProps {
  addCategoryInput: boolean;
  addSubCategoryInput: boolean;
  addBrandInput: boolean;
  setAddCategoryInput: (p: boolean) => void;
  setAddSubCategoryInput: (p: boolean) => void;
  setAddBrandInput: (p: boolean) => void;
}

const CategoryAndBrandForm: React.FC<CategoryAndBrandFormProps> = ({
  addCategoryInput,
  addSubCategoryInput,
  addBrandInput,
  setAddCategoryInput,
  setAddSubCategoryInput,
  setAddBrandInput,
}) => {
  const [newBrand, setNewBrand] = useState<string>("");
  const [newCategory, setNewCategory] = useState<string>("");
  const [newSubCategory, setNewSubCategory] = useState<string>("");

  //MODIFICADORES DE ESTADO
  const onChangeCategory = (e: string) => {
    setNewCategory(e);
  };
  const onChangeSubCategory = (e: string) => {
    setNewSubCategory(e);
  };
  const onChangeBrand = (e: string) => {
    setNewBrand(e);
  };
  //GUARDAN LO NUEVO EN BASE DE DATOS
  const saveNewCategory = (newCategory: string) => {
    window.api.enviarEvento("save-category", newCategory);

    setAddCategoryInput(false);
  };
  const saveNewSubCategory = (newSubCategory: string) => {
    window.api.enviarEvento("save-subcategory", newSubCategory);

    setAddSubCategoryInput(false);
  };
  const saveNewBrand = (newBrand: string) => {
    window.api.enviarEvento("save-brand", newBrand);

    setAddBrandInput(false);
  };
  return (
    <div className="absolute top-0 bottom-0 right-0 left-0 z-50 flex justify-center items-center">
      {addCategoryInput && (
        <div className="w-96 z-50 flex items-center justify-center flex-col">
          <div className="w-full flex justify-center items-center flex-col rounded-md border h-36 bg-slate-950">
            <div className="w-full px-5 flex-1 flex flex-col justify-evenly">
              <label
                htmlFor="newcategory"
                className="flex justify-start w-80 font-bold text-slate-50 select-none"
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
                className="h-10 w-1/2 font-bold bg-red-600 rounded-bl-sm select-none"
                onClick={() => setAddCategoryInput(false)}
              >
                Cancelar
              </button>
              <button
                className="h-10 w-1/2 font-bold bg-green-600 rounded-br-sm select-none"
                onClick={() => saveNewCategory(newCategory)}
              >
                Crear Categoria
              </button>
            </div>
          </div>
        </div>
      )}
      {addSubCategoryInput && (
        <div className="w-96 z-50 flex items-center justify-center flex-col">
          <div className="w-full flex justify-center items-center flex-col rounded-md border h-36 bg-slate-950">
            <div className="w-full px-5 flex-1 flex flex-col justify-evenly">
              <label
                htmlFor="newcategory"
                className="flex justify-start w-80 font-bold text-slate-50 select-none"
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
                className="h-10 w-1/2 font-bold bg-red-600 rounded-bl-sm select-none"
                onClick={() => setAddSubCategoryInput(false)}
              >
                Cancelar
              </button>
              <button
                className="h-10 w-1/2 font-bold bg-green-600 rounded-br-sm select-none"
                onClick={() => saveNewSubCategory(newSubCategory)}
              >
                Crear Sub Categoria
              </button>
            </div>
          </div>
        </div>
      )}
      {/*AÑADIR NUEVA MARCA*/}
      {addBrandInput && (
        <div className="w-96 h-96 z-50 flex items-center justify-center flex-col">
          <div className="w-full flex justify-center items-center flex-col rounded-md border h-36 bg-slate-950">
            <div className="w-full px-5 flex-1 flex flex-col justify-evenly">
              <label
                htmlFor="newbrand"
                className="flex justify-start w-80 font-bold text-slate-50 select-none"
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
                className="h-10 w-1/2 font-bold bg-red-600 rounded-bl-sm select-none"
                onClick={() => setAddBrandInput(false)}
              >
                Cancelar
              </button>
              <button
                className="h-10 w-1/2 font-bold bg-green-600 rounded-br-sm select-none"
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
