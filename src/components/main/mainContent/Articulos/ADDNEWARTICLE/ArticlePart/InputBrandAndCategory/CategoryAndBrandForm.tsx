import React, { useState } from "react";
import ButtonR from "../../../../buttons/ButtonR";

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
    console.log("GUARDANDO NUEVA CATEGORIA");
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
    <div className="absolute top-0 bottom-0 right-0 left-0 z-50 flex justify-center items-center backdrop-brightness-50 ">
      {addCategoryInput && (
        <div className="w-96 z-50 flex items-center justify-center flex-col">
          <div className="w-full flex justify-center items-center flex-col rounded-md p-2 space-y-2 bg-[#2f2f2fff]">
            <div className="w-full flex-1 flex flex-col justify-evenly">
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
                className=" h-10 w-full rounded-sm outline-none text-slate-50 px-2 bg-[#808080ff] shadow-[0_2px_5px_rgba(0,0,0,0.50)]"
              />
            </div>
            <div className="w-full flex justify-end space-x-2">
              <ButtonR
                bgColor="rounded-lg font-bold bg-gradient-to-l from-gray-700 via-gray-700 to-gray-500 text-[#fff8dcff] text-xs rounded-bl-sm select-none "
                height="h-7"
                width="w-24"
                title="Cancelar"
                onClick={() => setAddCategoryInput(false)}
              ></ButtonR>
              <ButtonR
                bgColor="rounded-lg font-bold bg-gradient-to-l from-yellow-800 via-yellow-700 to-yellow-500 text-[#fff8dcff] text-xs rounded-bl-sm select-none"
                height="h-7"
                width="w-32"
                title="Crear Categoria"
                onClick={() => saveNewCategory(newCategory)}
              ></ButtonR>
            </div>
          </div>
        </div>
      )}
      {addSubCategoryInput && (
        <div className="w-96 h-96 z-50 flex items-center justify-center flex-col">
          <div className="w-full flex justify-center items-center flex-col rounded-md p-2 space-y-2 bg-[#2f2f2fff]">
            <div className="w-full flex-1 flex flex-col justify-evenly">
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
                className="bg-[#808080ff] h-10 w-full rounded-sm outline-none text-slate-50 px-2 shadow-[0_2px_5px_rgba(0,0,0,0.50)]"
              />
            </div>
            <div className="w-full flex justify-end space-x-2">
              <ButtonR
                bgColor="rounded-lg font-bold bg-gradient-to-l from-gray-700 via-gray-700 to-gray-500 text-[#fff8dcff] text-xs rounded-bl-sm select-none "
                height="h-7"
                width="w-24"
                title="Cancelar"
                onClick={() => setAddSubCategoryInput(false)}
              ></ButtonR>
              <ButtonR
                bgColor="rounded-lg font-bold bg-gradient-to-l from-yellow-800 via-yellow-700 to-yellow-500 text-[#fff8dcff] text-xs rounded-bl-sm select-none"
                height="h-7"
                width="w-40"
                title="Crear Sub Categoria"
                onClick={() => saveNewSubCategory(newSubCategory)}
              ></ButtonR>
            </div>
          </div>
        </div>
      )}
      {/*AÑADIR NUEVA MARCA*/}
      {addBrandInput && (
        <div className="w-96 h-96 z-50 flex items-center justify-center flex-col ">
          <div className="w-full flex justify-center items-center flex-col rounded-md p-2 space-y-2 bg-[#2f2f2fff]">
            <div className="w-full flex-1 flex flex-col justify-evenly">
              <label
                htmlFor="newbrand"
                className="flex justify-start text-xl font-bold select-none"
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
                className="bg-[#808080ff] h-12 w-full rounded-sm outline-none text-slate-50 px-2 shadow-[0_2px_5px_rgba(0,0,0,0.50)]"
              />
            </div>
            <div className="w-full flex justify-end space-x-2">
              <ButtonR
                bgColor="rounded-lg font-bold bg-gradient-to-l from-gray-700 via-gray-700 to-gray-500 text-[#fff8dcff] text-xs rounded-bl-sm select-none "
                height="h-7"
                width="w-24"
                title="Cancelar"
                onClick={() => setAddBrandInput(false)}
              ></ButtonR>
              <ButtonR
                bgColor="rounded-lg font-bold bg-gradient-to-l from-yellow-800 via-yellow-700 to-yellow-500 text-[#fff8dcff] text-xs rounded-bl-sm select-none"
                height="h-7"
                width="w-24"
                title="Crear Marca"
                onClick={() => saveNewBrand(newBrand)}
              ></ButtonR>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryAndBrandForm;
