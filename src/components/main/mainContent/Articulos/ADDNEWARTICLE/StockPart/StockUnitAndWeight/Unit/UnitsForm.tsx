import { unitType } from "../../../../../../../../../types/types";
import React, { useEffect, useState } from "react";
import EditUnit from "./EditUnit";
import CreateUnit from "./CreateUnit";
import { IoAdd, IoClose, IoCreate } from "react-icons/io5";
import { BiEdit, BiTrash } from "react-icons/bi";
import ButtonR from "../../../../../buttons/ButtonR";
import { CgClose } from "react-icons/cg";

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
    <div className="absolute backdrop-brightness-50 top-0 bottom-0 left-0 right-0 flex justify-center items-center z-50">
      <div className="flex flex-col h-2/3 w-3/4 bg-[#2f2f2fff] border text-white border-gray-600 rounded-lg ">
        {editUnitForm && (
          <EditUnit setEditUnitForm={setEditUnitForm} unitToEdit={unitToEdit} />
        )}
        {createUnitForm && <CreateUnit setCreateUnitForm={setCreateUnitForm} />}
        <div className="text-2xl flex justify-between rounded-lg h-10 pl-2 items-end font-bold">
          <p>UNIDADES DE USUARIO</p>
          <div className="flex space-x-5 h-full items-center pr-2">
            <ButtonR
              onClick={() => {
                setCreateUnitForm(true);
              }}
              height="h-7"
              width="w-32"
              bgColor="bg-gradient-to-l from-yellow-700 via-yellow-700 to-yellow-500"
              textSize="text-xs"
              title="Crean unidad"
            >
              <IoAdd size={20} className=" text-gray-200" />
            </ButtonR>
            <ButtonR
              onClick={() => {
                onUnitForm(false);
              }}
              height="h-7"
              width="w-8"
              bgColor="bg-gradient-to-l from-gray-700 via-gray-700 to-gray-500"
              textSize="text-xs"
              bgIconColor="bg-gray-700"
            >
              <CgClose size={20} />
            </ButtonR>
          </div>
        </div>
        <div className="w-full justify-start flex flex-col flex-1 overflow-auto space-y bg-[#2f2f2fff]">
          <div className="w-full flex h-10 justify-between items-center border-b border-gray-600">
            <div className="flex-1 flex justify-start pl-2">
              <p>Unidad</p>
            </div>
            <div className="flex-1 flex justify-center">
              <p>Abreviado</p>
            </div>
          </div>
          <div className="flex-1 w-full overflow-auto">
            {units.map((unit) => {
              return (
                unit._id && (
                  <div className="flex h-10 justify-between items-center border-y border-slate-800 relative z-10">
                    <div className="flex-1 text-slate-50 h-full bg-[#425461ff] flex justify-around pl-2">
                      <p className="flex-1 text-center flex items-center h-full">
                        {unit.label}
                      </p>
                      <p className="flex-1 text-center flex items-center justify-center h-full">
                        {unit.abrevUnit}
                      </p>
                    </div>
                    <div className="absolute right-0 flex h-full items-center space-x-2 pr-2">
                      <ButtonR
                        onClick={() => {
                          onEditUnit(unit);
                        }}
                        bgIconColor="bg-gradient-to-l from-teal-700 via-teal-700 to-teal-500"
                        width="w-7"
                        height="h-7"
                      >
                        <BiEdit size={15} />
                      </ButtonR>
                      <ButtonR
                        onClick={() => {
                          onUnitDelete(unit);
                        }}
                        bgIconColor="bg-gradient-to-l from-rose-700 via-rose-700 to-rose-500"
                        width="w-7"
                        height="h-7"
                      >
                        <BiTrash size={15} className="text-teal-50" />
                      </ButtonR>
                    </div>
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
