import React, { ReactNode, useState } from "react";
import ArrowDown from "../../../../assets/MAINSVGS/mainAsideSvg/ArrowDown.jsx";
import ArrowRight from "../../../../assets/MAINSVGS/mainAsideSvg/ArrowRight.jsx";

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
    <div
      className={"flex flex-col flex-1 cursor-pointer select-none"}
      onClick={onChangeIsActive}
    >
      <div className="flex-1">
        <div className="flex-1 flex flex-row">
          {(isActiveChange && (
            <div className="flex items-center">
              <ArrowDown size={15} color={"#fff"}></ArrowDown>
            </div>
          )) || (
            <div className="flex items-center">
              <ArrowRight size={15} color={"#fff"}></ArrowRight>
            </div>
          )}
          <p className="hover:text-slate-400">{title}</p>
        </div>
        {isActiveChange && (
          <div className="flex pl-10 flex-col">{children}</div>
        )}
      </div>
    </div>
  );
};

export default MenuAside;
