import React, { useState } from "react";
import { articleData } from "../../../../../../types/types";
import ButtonR from "../../buttons/ButtonR";

type CreateSectorProps = {
  addNewSector: (e: {
    name: string;
    sectorId: string;
    products: {
      article: articleData;
      amount: {
        value: number;
        saveCount: string;
      };
    }[];
  }) => void; // Define tus props aquí
};
//SEGUIR QUEDASTE EN CREAR UN NUEVO SECTOR
const CreateSector: React.FC<CreateSectorProps> = ({ addNewSector }) => {
  const [inputState, setInputState] = useState<string>("");

  //
  const onChangeInputState = (e: string) => {
    setInputState(e);
  };
  return (
    <div className="absolute right-0 top-0 bottom-0 left-0 backdrop-brightness-50 flex justify-center items-center">
      <div className="flex flex-col space-y-2 bg-[#2f2f2fff] p-2 text-white  rounded-lg">
        <label htmlFor="nameOfSector" className="text-sm">
          <p>Nombre de sector</p>
        </label>
        <input
          type="text"
          value={inputState}
          className="h-7 rounded-lg outline-none bg-[#707070ff] shadow-[0_2px_5px_rgba(0,0,0,0.50)] pl-2"
          onChange={(e) => onChangeInputState(e.target.value)}
        />
        <div className="flex flex-1 justify-end items-end">
          <ButtonR
            title="Crear"
            bgColor="bg-gradient-to-l from-yellow-800 via-yellow-700 to-yellow-500 text-xs"
            height="h-5"
            width="w-24"
            onClick={() =>
              addNewSector({
                name: inputState,
                sectorId: "",
                products: [],
              })
            }
          ></ButtonR>
        </div>
      </div>
    </div>
  );
};

export default CreateSector;
