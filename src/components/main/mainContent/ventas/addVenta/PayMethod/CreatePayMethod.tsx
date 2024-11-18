import React, { useEffect, useRef, useState } from "react";
import ButtonR from "../../../buttons/ButtonR";

type CreatePayMethodProps = {
  onCreatePm: (e: boolean) => void;
};

const CreatePayMethod: React.FC<CreatePayMethodProps> = ({ onCreatePm }) => {
  const [pmName, setPmName] = useState<string>("");
  const inputNamePm = useRef<HTMLInputElement>(null);

  const onChangeValue = () => {
    if (inputNamePm.current) {
      setPmName(inputNamePm.current.value);
    }
  };
  const addNewPm = () => {
    onCreatePm(false);
    window.api.enviarEvento("add-pay-method", pmName);
  };
  useEffect(() => {
    console.log(pmName, inputNamePm);
  }, [pmName]);

  return (
    <div className="absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center">
      <div className="w-64 flex flex-col h-36 bg-[#2f2f2fff] rounded-lg overflow-hidden border border-slate-600">
        <div className="w-full flex-1 p-2 flex flex-col">
          <label htmlFor="pmName" className="font-semibold">
            Nombre
          </label>
          <input
            ref={inputNamePm}
            type="text"
            value={pmName}
            onChange={onChangeValue}
            className="h-10 w-full bg-[#707070ff] pl-5 rounded-lg border border-slate-700 outline-none"
          />
        </div>
        <div className="w-full h-8 justify-end flex space-x-2 p-1">
          <ButtonR
            onClick={() => onCreatePm(false)}
            title="Cancelar"
            bgColor="bg-gradient-to-l from-gray-700 via-gray-700 to-gray-500 text-sm"
            height="h-6"
            width="w-20"
          ></ButtonR>
          <ButtonR
            height="h-6"
            width="w-24"
            bgColor="bg-gradient-to-l from-yellow-700 via-yellow-700 to-yellow-500 text-sm"
            onClick={addNewPm}
            title="Aceptar"
          ></ButtonR>
        </div>
      </div>
    </div>
  );
};

export default CreatePayMethod;
