import React, { useEffect, useState } from "react";

interface AddCategoryProps {
  onChangeModal: () => void;
  addOptionCategory: (option: CategoryDataObject) => void;
}

type CategoryDataObject = {
  value: string;
  label: string;
  typeFilter: string;
};

const AddCategory: React.FC<AddCategoryProps> = ({ onChangeModal, addOptionCategory }) => {
  const [categoryData, setCategoryData] = useState<CategoryDataObject>({
    value: "",
    label: "",
    typeFilter: "",
  });

  function setChangeData(data: string, value: string) {
    console.log("LLAMA LA FUNCION");
    const existingData = ["category"];
    console.log(existingData.includes(data), "esto");
    if (existingData.includes(data)) {
      switch (data) {
        case "category":
          console.log("se cumple esrte");
          setCategoryData({
            value: value.toLowerCase(),
            label: value,
            typeFilter: "category",
          });
          break;

        default:
          break;
      }
    } else {
      console.log("NO ESTA");
    }
  }

  useEffect(() => {
    console.log(categoryData);
  }, [categoryData]);

  function subirArticulo() {
    window.api.enviarEvento("save-category", categoryData);
    addOptionCategory(categoryData);
    setCategoryData({
      value: "",
      label: "",
      typeFilter: "",
    });
    onChangeModal();
  }

  const estilosInput = "outline-none h-9 w-full bg-slate-600 px-2 rounded-md";

  return (
    <div className="fixed flex-col bottom-0 top-0 right-0 left-0 flex justify-center items-center z-50">
      <div className="flex flex-col bg-white space-y-5 p-2 text-white rounded-md relative">
        <button
          className="bg-red-500 h-10 w-10 rounded-full absolute -right-2 -top-2"
          onClick={onChangeModal}
        >
          X
        </button>
        <div className="flex flex-col space-y-2">
          <div className="flex-1">
            <label htmlFor="category" className="text-slate-600">
              Categoria
            </label>
            <input
              type="text"
              name="category"
              className={estilosInput}
              value={categoryData.label}
              onChange={(e) => {
                setChangeData("category", e.target.value);
              }}
            />
          </div>
          <div className="flex flex-1 flex-row space-x-5">
            <button
              className="w-52 h-10 bg-red-400 rounded-md"
              onClick={onChangeModal}
            >
              Cancelar
            </button>
            <button
              className="w-52 h-10 bg-green-400 rounded-md"
              onClick={subirArticulo}
            >
              Añadir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
