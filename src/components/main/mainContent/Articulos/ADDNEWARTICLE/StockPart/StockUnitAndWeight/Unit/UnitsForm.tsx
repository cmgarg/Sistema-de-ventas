import { unitType } from "@/types";
import React, { useEffect, useState } from "react";
import EditUnit from "./EditUnit";
import CreateUnit from "./CreateUnit";
import { MdMore, MdOutlineCreate } from "react-icons/md";
import { IoAdd, IoAddCircle, IoClose, IoCreate } from "react-icons/io5";

type UnitsFormProps = {
  units: unitType[];
  onUnitForm: (e: boolean) => void;
};

const UnitsForm: React.FC<UnitsFormProps> = ({ units, onUnitForm }) => {
  const [editUnitForm, setEditUnitForm] = useState(false);
  const [createUnitForm, setCreateUnitForm] = useState<boolean>(false);
  const [unitToEdit, setUnitToEdit] = useState<unitType>({
    label: "",
    value: "",
    abrevUnit: "",
    _id: "",
  });

  const onEditUnit = (unit: unitType) => {
    setUnitToEdit(unit);

    setEditUnitForm(true);
  };
  const onUnitDelete = (unit: unitType) => {
    if (unit._id) {
      console.log("QUEEEEE");
      window.api.enviarEvento("remove-unitsArticleForm", unit._id);
    }
  };
  useEffect(() => {
    window.api.recibirEvento("response-remove-unitsArticleForm", (res) => {
      console.log(res, "LA RESPUESTA AL ELIMINAR UYNA UNIDAD ES...");
      window.api.enviarEvento("get-unitsArticleForm");
    });
  }, []);
  return (
    <div className="absolute bg-red-500 backdrop-brightness-50 top-0 bottom-0 left-0 right-0 flex justify-center items-center z-50">
      <div className="flex flex-col h-full w-full bg-slate-950 border text-white border-slate-500 rounded-lg ">
        {editUnitForm && (
          <EditUnit setEditUnitForm={setEditUnitForm} unitToEdit={unitToEdit} />
        )}
        {createUnitForm && <CreateUnit setCreateUnitForm={setCreateUnitForm} />}
        <div className="text-3xl flex justify-between rounded-lg h-10 pl-2 font-bold">
          <p>UNIDADES</p>

          <div className="flex space-x-5">
            <button
              onClick={() => {
                setCreateUnitForm(true);
              }}
              className="text-green-50 bg-green-500 rounded-full w-10 flex items-center justify-center"
            >
              <IoAdd size={30} />
            </button>
            <button
              onClick={() => {
                onUnitForm(false);
              }}
              className="h-10 text-red-50 relative"
            >
              <div className="relative right-1 bg-red-500 rounded-full w-10 justify-center h-full flex items-center">
                <IoClose />
              </div>
            </button>
          </div>
        </div>
        <div className="w-full justify-start flex flex-col flex-1 overflow-auto space-y">
          <div className="w-full flex h-10 justify-between items-center border-y border-slate-800">
            <div className="flex-1 flex justify-start pl-2">
              <p>Unidad</p>
            </div>
            <div className="flex-1 flex justify-center">
              <p>Abreviado</p>
            </div>
            <div className="w-32 h-full"></div>
            <div className="w-32 h-full"></div>
          </div>
          <div className="flex-1 w-full overflow-auto">
            {units.map((unit) => {
              return (
                unit._id && (
                  <div className="flex h-10 justify-between items-center border-y border-slate-800">
                    <div className="flex-1 text-slate-50 h-full bg-indigo-950 flex justify-around pl-2">
                      <p className="flex-1 text-center flex items-center h-full">
                        {unit.label}
                      </p>
                      <p className="flex-1 text-center flex items-center justify-center h-full">
                        {unit.abrevUnit}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        onEditUnit(unit);
                      }}
                      className="text-teal-950 bg-teal-500 w-32 h-full"
                    >
                      Editar
                    </button>

                    <button
                      onClick={() => {
                        onUnitDelete(unit);
                      }}
                      className="text-teal-950 bg-red-500 w-32 h-full"
                    >
                      Borrar
                    </button>
                  </div>
                )
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnitsForm;
