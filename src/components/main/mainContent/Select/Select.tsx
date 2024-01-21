import React, { useEffect, useState } from "react";
import MoreIcon from "../../../../assets/MAINSVGS/mainAsideSvg/maincontent/MoreIcon";

interface SelectProps {
  options: { value: string; label: string }[];
  onChangeSelection: (value: string, f: string) => void;
  placeholder: string;
  filter: string;
  value: string;
  functionLastOption?: () => void;

  //PROPS
}

const Select: React.FC<SelectProps> = ({
  placeholder,
  options,
  onChangeSelection,
  filter,
  value,
  functionLastOption,
}) => {
  const [selected, setSelected] = useState(value);
  const [menu, setMenu] = useState(false);

  function onChangeMenu() {
    setMenu(!menu);
  }

  useEffect(() => {
    onChangeSelection(selected, filter);
  }, [selected]);

  return (
    <div className="flex flex-row select-none w-52 relative bg-slate-800 items-center cursor-pointer text-white border-x-2 border-slate-500 px-1">
      <div className="flex-1" onClick={onChangeMenu}>
        {selected || placeholder}
      </div>
      <div className="flex absolute right-0" onClick={onChangeMenu}>
        <MoreIcon color="#fff" size={15}></MoreIcon>
      </div>
      {menu && (
        <div className="flex flex-col z-50 bg-slate-800  absolute top-full left-0 right-0 ">
          <div
            onClick={() => {
              setSelected("");
              onChangeMenu();
            }}
            className="flex-1 h-10 hover:bg-slate-700"
          >
            <p>Cualquiera</p>
          </div>
          {options.map((e, i) => {
            return (
              <div
                key={i}
                className="flex-1 h-10 hover:bg-slate-700"
                onClick={() => {
                  setSelected(e.label);
                  onChangeMenu();
                }}
              >
                <p>{e.label}</p>
              </div>
            );
          })}
          {
            <div
              key={"functionLast"}
              className="flex-1 h-10 hover:bg-slate-700"
              onClick={() => {
                functionLastOption();
              }}
            >
              <p>{`Nueva ${placeholder.substring(
                placeholder.indexOf(" ") + 1
              )}`}</p>
            </div>
          }
        </div>
      )}
    </div>
  );
};

export default Select;
