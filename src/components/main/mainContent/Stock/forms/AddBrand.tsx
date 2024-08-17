import React, { useEffect, useState } from "react";

interface AddbrandProps {
  onChangeModal: () => void;
  addOptionBrand: (option: brandDataObject) => void;
}

type brandDataObject = {
  value: string;
  label: string;
  typeFilter: string;
};

const Addbrand: React.FC<AddbrandProps> = ({ onChangeModal, addOptionBrand }) => {
  const [brandData, setBrandData] = useState<brandDataObject>({
    value: "",
    label: "",
    typeFilter: "",
  });

  function setChangeData(data: string, value: string) {
    console.log("LLAMA LA FUNCION");
    const existingData = ["brand"];
    console.log(existingData.includes(data), "esto");
    if (existingData.includes(data)) {
      switch (data) {
        case "brand":
          console.log("se cumple esrte");
          setBrandData({
            value: value.toLowerCase(),
            label: value,
            typeFilter: "brand",
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
    console.log(brandData);
  }, [brandData]);

  function subirArticulo() {
    window.api.enviarEvento("save-brand", brandData);
    addOptionBrand(brandData);
    setBrandData({
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
          onClick={() => {
            onChangeModal();
          }}
        >
          X
        </button>
        <div className="flex flex-col space-y-1">
          <div className="flex-1">
            <label htmlFor="brand" className="text-slate-600">
              Marca
            </label>
            <input
              type="text"
              name="brand"
              className={estilosInput}
              value={brandData.label}
              onChange={(e) => {
                setChangeData("brand", e.target.value);
              }}
            />
          </div>
          <div className="flex flex-1 flex-row space-x-5">
            <button
              className="w-52 h-10 bg-red-400 rounded-md"
              onClick={() => {
                onChangeModal();
              }}
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

export default Addbrand;
