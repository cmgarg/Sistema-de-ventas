import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../../../../app/ui/select";
import { AnyARecord, AnyCnameRecord } from "node:dns";
import { AnyAction } from "@reduxjs/toolkit";
interface SelectProps {
  options: any[];
  onChangeSelection: (value: any, f?: string) => void;
  abreviationUnit?: (v: string, u?: string) => string;
  placeholder: string;
  slice: number;
  backGround?: string;
  backGround2?: string;
  className?: string;
  classNameDeploy?: string;
  value: any;
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
  classNameDeploy,
  filter,
  value,
  slice,
  abreviationUnit,
  todos,
  backGround2,
  className,
  functionLastOption,
  border,
  backGround,
  label,
}) => {
  const [selected, setSelected] = useState<any>(value);
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
    <div className="z-40 max-w-full min-w-full">
      <Select
        onValueChange={(e) => {
          if (e === "todos") {
            setSelected("");
          } else {
            setSelected((abreviationUnit && abreviationUnit(e)) || e);
          }
        }}
      >
        <SelectTrigger
          className={
            className
              ? className
              : `${backGround || `bg-slate-950`} max-w-full  min-w-full ${
                  border ? "border border-red-600" : "border-none"
                }`
          }
        >
          <div>
            {(slice && value) || (
              <SelectValue placeholder={placeholder}>
                <p>
                  {selected.abrevUnit || selected.label || "Objeto pijiado"}
                </p>
              </SelectValue>
            )}
          </div>
        </SelectTrigger>
        <SelectContent
          className={`${
            classNameDeploy
              ? classNameDeploy
              : `${backGround2 || "bg-slate-950"} text-white border-slate-800`
          } max-w-full min-w-full border-l border-r border-b`}
        >
          <SelectGroup>
            {label && <SelectLabel className="font-bold">Por</SelectLabel>}
            {options.map((e, i) => {
              return (
                <SelectItem
                  value={e}
                  className="flex-1 h-10 hover:bg-slate-700"
                >
                  <p>{e.label || "poronga"}</p>
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
