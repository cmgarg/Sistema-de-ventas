import React, { useEffect, useRef, useState } from "react";

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
      <div className="w-64 flex flex-col h-52 bg-slate-900 rounded-lg overflow-hidden border border-slate-700">
        <div className="w-full flex-1 p-2 flex flex-col">
          <label htmlFor="pmName" className="font-semibold">
            Nombre
          </label>
          <input
            ref={inputNamePm}
            type="text"
            value={pmName}
            onChange={onChangeValue}
            className="h-12 w-full bg-slate-950 pl-5 rounded-lg border border-slate-700 outline-none"
          />
        </div>
        <div className="w-full h-8 flex space-x-2 p-1">
          <button
            onClick={() => onCreatePm(false)}
            className="flex-1 h-full bg-red-500 flex justify-center items-center text-xl rounded-lg"
          >
            <p>Cancelar</p>
          </button>
          <button
            onClick={addNewPm}
            className="flex-1 h-full bg-green-500 flex justify-center items-center text-xl rounded-lg"
          >
            <p>Crear</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePayMethod;
