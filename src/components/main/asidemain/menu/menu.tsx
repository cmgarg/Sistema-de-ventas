import React, { ReactNode, useState } from "react";
import ArrowMenu from "./ArrowMenu.js";

interface MenuAsideContentProps {
  children: ReactNode;
  title: string;
}

const MenuAside: React.FC<MenuAsideContentProps> = ({ children, title }) => {
  const [isActiveChange, setIsActiveChange] = useState(false);

  const onChangeIsActive = () => {
    setIsActiveChange(!isActiveChange);
  };

  return (
    <div className={"flex flex-col flex-1 cursor-pointer select-none"}>
      <div className="flex-1 select-none">
        <div
          className="flex-1 flex flex-row hover:text-slate-400 select-none"
          onClick={onChangeIsActive}
        >
          <ArrowMenu isActive={isActiveChange}></ArrowMenu>
          <p>{title}</p>
        </div>
        {isActiveChange && <div className="flex pl-5 flex-col select-none">{children}</div>}
      </div>
    </div>
  );
};

export default MenuAside;
