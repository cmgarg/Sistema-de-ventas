import { CheckCircledIcon } from "@radix-ui/react-icons";
import React, { useEffect, useState } from "react";
import ButtonR from "../../../../../buttons/ButtonR";

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
    if (e.length < 5) {
      setAbrevUnit(e);
    }
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
    <div className="absolute backdrop-brightness-50 top-0 left-0 right-0 bottom-0 flex justify-center items-center z-50">
      <div className="flex flex-col h-52 bg-[#2f2f2fff] border border-gray-600 z-50 rounded-lg text-xs p-2">
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
        <div className="flex-1 px-2 flex flex-col justify-between relative w-full">
          <div className="absolute h-5 w-full text-[10px] text-red-500 justify-end flex pr-5">
            <p>{errorShow.active ? errorShow.message : ""}</p>
          </div>
          <div className="flex flex-1 flex-col">
            <label htmlFor="nameunit">Nombre unidad</label>
            <input
              name="nameunit"
              type="text"
              onChange={(e) => onChangeNameUnit(e.target.value)}
              value={nameUnit}
              className="bg-[#707070ff] rounded-lg h-10 w-52 outline-none border border-slate-800 pl-2 focus:bg-[#909090ff]"
            />
          </div>
          <div className="flex flex-1 flex-col">
            <label htmlFor="abrevunit" className="flex space-x-2">
              <p>Abreviado</p>{" "}
              <p className="text-[10px] h-full flex justify-start items-end text-gray-400">
                (max 4 caracteres)
              </p>
            </label>

            <input
              name="abrevunit"
              type="text"
              onChange={(e) => onChangeAbrevUnit(e.target.value)}
              className="bg-[#707070ff] rounded-lg h-10 w-32 outline-none border border-slate-800 pl-2 focus:bg-[#909090ff]"
              value={abrevUnit}
            />
          </div>
        </div>
        <div className="flex w-full justify-end space-x-2">
          <ButtonR
            title="Cancelar"
            onClick={() => setCreateUnitForm(false)}
            bgColor="bg-gradient-to-l from-gray-700 via-gray-700 to-gray-500 text-[#fff8dcff] text-xs"
            height="h-6"
            width=" w-20"
          />
          <ButtonR
            title="Crear"
            onClick={createNewUnit}
            bgColor="bg-gradient-to-l from-yellow-700 via-yellow-700 to-yellow-500 text-[#fff8dcff] text-xs"
            height="h-6"
            width="w-24"
          />
        </div>
      </div>
    </div>
  );
};

export default CreateUnit;
