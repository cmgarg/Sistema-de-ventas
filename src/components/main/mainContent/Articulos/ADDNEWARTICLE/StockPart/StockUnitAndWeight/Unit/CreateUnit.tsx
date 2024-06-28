import { CheckCircledIcon } from "@radix-ui/react-icons";
import React, { useEffect, useState } from "react";

type CreateUnitProps = {
  setCreateUnitForm: (e: boolean) => void;
};

const CreateUnit: React.FC<CreateUnitProps> = ({ setCreateUnitForm }) => {
  const [nameUnit, setNameUnit] = useState<string>("");
  const [abrevUnit, setAbrevUnit] = useState<string>("");
  const [errorShow, setErrorShow] = useState<{
    message: string;
    active: boolean;
  }>({
    message: "",
    active: false,
  });
  const [showCorrectlytUpdate, setShowCorrectlytUpdate] =
    useState<boolean>(false);

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
      if (!r.value) {
        setErrorShow({
          message: r.message,
          active: true,
        });
      } else {
        window.api.enviarEvento("get-unitsArticleForm");
        console.log("FALOPEADAA");
        setShowCorrectlytUpdate(true);
        setCreateUnitForm(false);
      }
    });
  }, []);

  return (
    <div className="absolute backdrop-blur-sm top-0 left-0 right-0 bottom-0 flex justify-center items-center">
      <div className="flex flex-col h-72 w-96 bg-slate-950 border text-white border-slate-500 z-50 rounded-lg ">
        {showCorrectlytUpdate && (
          <div className="absolute h-72 w-96 bg-slate-800 z-50 flex flex-col rounded-lg">
            <div className="flex-1 flex justify-center flex-col items-center p-2">
              <CheckCircledIcon
                width={150}
                height={150}
                className="text-lime-400 flex-1"
              />
              <div>
                <p className="text-xl text-lime-400">Unidad Creada</p>
              </div>
            </div>
            <button
              onClick={() => {
                setCreateUnitForm(false);
              }}
              className="h-10 w-full rounded-b-lg bg-green-700"
            >
              Aceptar
            </button>
          </div>
        )}
        <div className="flex-1 p-6 flex flex-col justify-between relative">
          <div className="absolute h-5 w-full text-xs text-red-500 left-1 top-1">
            <p>{errorShow.active ? errorShow.message : ""}</p>
          </div>
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
    </div>
  );
};

export default CreateUnit;
