import { Select } from "@/app/ui/select";
import { unitType } from "@/types";
import React, { useEffect, useState } from "react";
import SelectM from "../../../Select/Select";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import { RiErrorWarningFill } from "react-icons/ri";

interface EditUnitProps {
  // Define tus props aquí
  setEditUnitForm: (e: boolean) => void;
  unitToEdit: unitType;
}

const EditUnit: React.FC<EditUnitProps> = ({ unitToEdit, setEditUnitForm }) => {
  const [nameUnitToEdit, setNameUnitToEdit] = useState<string>("");
  const [abrevUnitToEdit, setAbrevUnitToEdit] = useState<string>("");
  const [showCorrectlytUpdate, setShowCorrectlytUpdate] =
    useState<boolean>(false);
  const [errorShow, setErrorShow] = useState<{
    message: string;
    active: boolean;
  }>();

  const onChangeNameUnitToEdit = (e: string) => {
    setNameUnitToEdit(e);
  };
  const onChangeAbrevUnit = (e: string) => {
    setAbrevUnitToEdit(e);
  };
  const editUnit = (unitToEdit: unitType) => {
    const idToUnit = unitToEdit._id;
    const unitEdit = {
      value: nameUnitToEdit,
      label:
        nameUnitToEdit.charAt(0).toUpperCase() +
        nameUnitToEdit.slice(1).toLowerCase(),
      abrevUnit: abrevUnitToEdit,
      _id: idToUnit,
    };
    window.api.enviarEvento("update-unitsArticleForm", unitEdit);
  };
  const onEditUnit = () => {
    editUnit(unitToEdit);
  };
  useEffect(() => {
    setNameUnitToEdit(unitToEdit.label);
    setAbrevUnitToEdit(unitToEdit.abrevUnit);
    window.api.recibirEvento("response-update-unitsArticleForm", (r) => {
      console.log(r);
      if (r.value === false) {
        setErrorShow({
          message: r.message,
          active: true,
        });
      } else {
        setShowCorrectlytUpdate(true);
        window.api.enviarEvento("get-unitsArticleForm");
      }
    });
  }, []);
  useEffect(() => {
    console.log(unitToEdit, "falopeado");
  }, [unitToEdit]);

  return (
    <div className="absolute backdrop-blur-sm top-0 left-0 right-0 bottom-0 flex justify-center items-center">
      <div className="absolute flex flex-col h-72 w-96 bg-slate-950 border text-white border-slate-500 z-50 rounded-lg ">
        {showCorrectlytUpdate && (
          <div className="absolute h-72 w-96 bg-slate-800 z-50 flex flex-col rounded-lg">
            <div className="flex-1 flex justify-center flex-col items-center p-2">
              <CheckCircledIcon
                width={150}
                height={150}
                className="text-lime-400 flex-1"
              />
              <div>
                <p className="text-xl text-lime-400">Unidad actualizada</p>
              </div>
            </div>
            <button
              onClick={() => {
                setEditUnitForm(false);
              }}
              className="h-10 w-full rounded-b-lg bg-green-700"
            >
              Aceptar
            </button>
          </div>
        )}
        {errorShow?.active && (
          <div className="absolute h-72 w-96 bg-slate-800 z-50 flex flex-col rounded-lg">
            <div className="flex-1 flex justify-center flex-col items-center p-2">
              <RiErrorWarningFill size={130} className="text-red-400 flex-1" />
              <div>
                <p className="text-xl text-red-400">{errorShow.message}</p>
              </div>
            </div>
            <button
              onClick={() => setErrorShow({ active: false, message: "" })}
              className="h-10 w-full rounded-b-lg bg-red-700"
            >
              Aceptar
            </button>
          </div>
        )}
        <div className="flex-1 p-5 flex flex-col justify-between">
          <label htmlFor="nameunittoedit">Nombre unidad a editar</label>
          <input
            name="nameunittoedit"
            type="text"
            onChange={(e) => onChangeNameUnitToEdit(e.target.value)}
            value={nameUnitToEdit}
            className="bg-slate-900 rounded-lg h-12 w-full outline-none border border-slate-800 pl-2"
          />
          <label htmlFor="abrevunit">Abreviado max 4 caracteres</label>

          <input
            name="abrevunittoedit"
            type="text"
            onChange={(e) => onChangeAbrevUnit(e.target.value)}
            className="bg-slate-900 rounded-lg h-12 w-full outline-none border border-slate-800 pl-2"
            value={abrevUnitToEdit}
          />
        </div>
        <div className="flex">
          <button
            onClick={() => setEditUnitForm(false)}
            className="w-1/2 h-12 flex-1 bg-red-800 hover:bg-red-900 rounded-bl-lg"
          >
            Cancelar
          </button>
          <button
            onClick={onEditUnit}
            className="w-1/2 h-12 flex-1 bg-green-800 hover:bg-green-900 rounded-br-lg"
          >
            Editar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUnit;
