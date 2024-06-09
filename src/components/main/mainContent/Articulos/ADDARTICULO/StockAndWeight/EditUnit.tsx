import { Select } from "@/app/ui/select";
import React, { useState } from "react";

interface EditUnitProps {
  // Define tus props aquí
}

const EditUnit: React.FC<EditUnitProps> = (props) => {
  const [nameUnitToEdit, setNameUnitToEdit] = useState<string>("");
  const [abrevUnitToEdit, setAbrevUnitToEdit] = useState<string>("");

  const onChangeNameUnitToEdit = (e: string) => {
    setNameUnitToEdit(e);
  };
  const onChangeAbrevUnit = (e: string) => {
    setAbrevUnitToEdit(e);
  };

  return (
    <div className="absolute flex flex-col h-72 w-96 bg-slate-950 border text-white border-slate-500 z-50 rounded-lg ">
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
          onClick={() => setEditUnitForm(false)}
          className="w-1/2 h-12 flex-1 bg-green-800 hover:bg-green-900 rounded-br-lg"
        >
          Crear
        </button>
      </div>
    </div>
  );
};

export default EditUnit;
