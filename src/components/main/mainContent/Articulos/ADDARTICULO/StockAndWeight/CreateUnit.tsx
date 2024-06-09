import React, { useEffect, useState } from "react";

type CreateUnitProps = {
  setCreateUnitForm: (e: boolean) => void;
};

const CreateUnit: React.FC<CreateUnitProps> = ({ setCreateUnitForm }) => {
  const [nameUnit, setNameUnit] = useState<string>("");
  const [abrevUnit, setAbrevUnit] = useState<string>("");

  const onChangeNameUnit = (e: string) => {
    setNameUnit(e);
  };
  const onChangeAbrevUnit = (e: string) => {
    setAbrevUnit(e);
  };

  const createNewUnit = () => {
    const unitObject = {
      value: nameUnit?.toLowerCase(),
      label: nameUnit.charAt(0).toUpperCase() + nameUnit.slice(1).toLowerCase(),
      abrevUnit: abrevUnit,
    };

    window.api.enviarEvento("save-unitsArticleForm", unitObject);
  };

  useEffect(() => {
    window.api.recibirEvento("response-save-unitsArticleForm", (r) => {
      console.log(r);
      window.api.enviarEvento("get-unitsArticleForm");
    });
  }, []);

  return (
    <div className="absolute flex flex-col h-72 w-96 bg-slate-950 border text-white border-slate-500 z-50 rounded-lg ">
      <div className="flex-1 p-5 flex flex-col justify-between">
        <label htmlFor="nameunit">Nombre unidad</label>
        <input
          name="nameunit"
          type="text"
          onChange={(e) => onChangeNameUnit(e.target.value)}
          value={nameUnit}
          className="bg-slate-900 rounded-lg h-12 w-full outline-none border border-slate-800 pl-2"
        />
        <label htmlFor="abrevunit">Abreviado max 4 caracteres</label>

        <input
          name="abrevunit"
          type="text"
          onChange={(e) => onChangeAbrevUnit(e.target.value)}
          className="bg-slate-900 rounded-lg h-12 w-full outline-none border border-slate-800 pl-2"
          value={abrevUnit}
        />
      </div>
      <div className="flex">
        <button
          onClick={() => setCreateUnitForm(false)}
          className="w-1/2 h-12 flex-1 bg-red-800 hover:bg-red-900 rounded-bl-lg"
        >
          Cancelar
        </button>
        <button
          onClick={createNewUnit}
          className="w-1/2 h-12 flex-1 bg-green-800 hover:bg-green-900 rounded-br-lg"
        >
          Crear
        </button>
      </div>
    </div>
  );
};

export default CreateUnit;
