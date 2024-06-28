import React, { useEffect } from "react";
import {
  MdError,
  MdErrorOutline,
  MdOutlineWifiTetheringErrorRounded,
} from "react-icons/md";
import { BiSolidError } from "react-icons/bi";

type ModalsProps = {
  errorToSave: {
    message: string;
    type: string;
    active: boolean;
  }; // Define tus props aquí
  setErrorToSave: (e: {
    message: string;
    type: string;
    active: boolean;
  }) => void;
};

const Modals: React.FC<ModalsProps> = ({ errorToSave, setErrorToSave }) => {
  const offModalError = () => {
    setErrorToSave({ ...errorToSave, active: false });
  };

  return (
    <div className="absolute flex justify-center items-center left-0 right-0 top-0 bottom-0 z-50">
      {errorToSave.active ? (
        <div className="w-80 h-80 bg-slate-950 border border-slate-800 flex flex-col rounded-3xl">
          <div className="flex-1 flex-col text-red-500 flex justify-center items-center">
            <BiSolidError size={150} />
            <p>{errorToSave.message}</p>
          </div>
          <button
            onClick={offModalError}
            className="h-12 bg-red-500 rounded-b-3xl"
          >
            <p>Aceptar</p>
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default Modals;
