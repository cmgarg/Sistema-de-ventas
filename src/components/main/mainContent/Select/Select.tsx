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
  filter: string;
  value: string;
  functionLastOption?: () => void;
  label?: string;

  //PROPS
}

const SelectM: React.FC<SelectProps> = ({
  placeholder,
  options,
  onChangeSelection,
  filter,
  value,
  functionLastOption,
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
    <div className="z-50 text-slate-50">
      <Select
        onValueChange={(e) => {
          if (e === "todos") {
            setSelected("");
          } else {
            setSelected(e);
          }
        }}
      >
        <SelectTrigger className="w-[180px] bg-slate-950">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="bg-slate-900 text-white border border-gray-600">
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
            <SelectItem
              value={"todos"}
              className="flex-1 h-10 hover:bg-slate-700"
            >
              <p>Todos</p>
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectM;
