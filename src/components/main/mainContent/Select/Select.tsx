import React, { useEffect, useState } from "react";
import MoreIcon from "../../../../assets/MAINSVGS/mainAsideSvg/maincontent/MoreIcon";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../../../../app/ui/select";
interface SelectProps {
  options: { value: string; label: string }[];
  onChangeSelection: (value: string, f: string) => void;
  placeholder: string;
  slice: number;
  backGround?: string;
  value: string;
  filter?: string;
  functionLastOption?: () => void;
  label?: string;
  border?: boolean;
  todos: boolean;

  //PROPS
}

const SelectM: React.FC<SelectProps> = ({
  placeholder,
  options,
  onChangeSelection,
  filter,
  value,
  slice,
  todos,
  functionLastOption,
  border,
  backGround,
  label,
}) => {
  const [selected, setSelected] = useState(value);
  const [menu, setMenu] = useState(false);

  function onChangeMenu() {
    setMenu(!menu);
  }

  useEffect(() => {
    console.log(value, "hola");
    onChangeSelection(selected, filter);
  }, [selected]);
  useEffect(() => {
    console.log(options, "aveer");
  }, []);

  return (
    <div className="z-40 text-slate-50 max-w-full min-w-full">
      <Select
        onValueChange={(e) => {
          if (e === "todos") {
            setSelected("");
          } else {
            setSelected(e);
          }
        }}
      >
        <SelectTrigger
          className={`${backGround || `bg-slate-950`} max-w-full min-w-full ${
            border ? "border border-red-600" : "border-none"
          }`}
        >
          <div>
            {(slice && selected.slice(0, slice)) || (
              <SelectValue placeholder={placeholder}></SelectValue>
            )}
          </div>
        </SelectTrigger>
        <SelectContent
          className={`${
            backGround || "bg-slate-900"
          } text-white   max-w-full min-w-full`}
        >
          <SelectGroup>
            {label && <SelectLabel className="font-bold">Por</SelectLabel>}
            {options.map((e, i) => {
              return (
                <SelectItem
                  value={e.label}
                  className="flex-1 h-10 hover:bg-slate-700"
                >
                  <p>{e.label}</p>
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

export default SelectM;
