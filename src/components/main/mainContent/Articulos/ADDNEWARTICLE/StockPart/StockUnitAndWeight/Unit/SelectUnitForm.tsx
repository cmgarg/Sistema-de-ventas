import React, { useEffect, useRef, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../../../../../../../../app/ui/select";
import { IoCreateSharp } from "react-icons/io5";
import { unitType } from "../../../../../../../../../types/types";
import UnitsForm from "./UnitsForm";

interface SelectProps {
  options: unitType[];
  onChangeSelection: (value: string) => void;
  placeholder: string;
  slice: number;
  backGround?: string;
  backGround2?: string;
  value: string;
  filter?: string;
  functionLastOption?: () => void;
  label?: string;
  border?: boolean;
  todos: boolean;
  setUnitForm: (e: boolean) => void;

  //PROPS
}

const SelectUnitForm: React.FC<SelectProps> = ({
  placeholder,
  options,
  onChangeSelection,
  filter,
  value,
  slice,
  setUnitForm,
  todos,
  backGround2,
  functionLastOption,
  border,
  backGround,
  label,
}) => {
  const [selected, setSelected] = useState(value);
  const [menu, setMenu] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const onUnitForm = () => {
    setUnitForm(true);
    setMenu(false);
  };

  function onChangeMenu() {
    setMenu(!menu);
  }
  const onSelected = (e: string) => {
    let abrevUnit = "";
    options.map((o) => {
      if (o.value === e) {
        abrevUnit = o.abrevUnit;
      }
    });
    setSelected(abrevUnit);

    onChangeSelection(e);
  };
  return (
    <div className="text-slate-50 max-w-full min-w-full">
      <Select
        onValueChange={(e) => {
          console.log(e, "ESTO PASA EN EL ONvALUECHANGE");
          onChangeMenu();
          onSelected(e);
        }}
      >
        <SelectTrigger
          className={`${backGround || `bg-slate-950`} max-w-full min-w-full ${
            border ? "border border-red-600" : "border-none"
          }`}
          onClick={onChangeMenu}
        >
          <div>
            {(slice && selected) || (
              <SelectValue placeholder={placeholder}></SelectValue>
            )}
          </div>
        </SelectTrigger>
        <SelectContent
          className={`${
            backGround2 || "bg-slate-950"
          } text-gray-200   max-w-full min-w-full border-l border-r border-b border-gray-600`}
        >
          <li className="flex-1 z-50 h-5 text-xs rounded-t-lg justify-between  list-none flex mb-2 text-white">
            <button
              onClick={onUnitForm}
              className="flex-1 w-5 justify-center hover:bg-slate-900 hover:text-yellow-500 flex items-center"
            >
              <IoCreateSharp size={15} />
            </button>
          </li>
          <SelectGroup>
            {label && <SelectLabel className="font-bold">Por</SelectLabel>}
            {options.map((e, i) => {
              return (
                <SelectItem
                  value={e.value}
                  className="flex-1 w-full h-10 font-bold hover:bg-slate-900"
                >
                  <p className="flex-1">{e.label}</p>
                </SelectItem>
              );
            })}
            {todos && (
              <SelectItem
                value={"todos"}
                className="flex-1 h-10 hover:bg-slate-700"
              >
                <p>Todos</p>
              </SelectItem>
            )}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectUnitForm;
