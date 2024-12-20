import React, { ReactNode, useState } from "react";
import Tooltip from "./Tooltip.js";
import { Link, NavLink, useLocation } from "react-router-dom";

type Props = {
  goTo: string;
  children: ReactNode;
  expand: boolean;
  title: string;
};

export default function GoTo({ goTo, children, title, expand }: Props) {
  const [isActiveState, setIsActiveState] = useState<boolean>(false);
  const isActiveStateFunction = (e: boolean) => {
    setIsActiveState(e);
  };
  return (
    <NavLink
      to={goTo}
      className={({ isActive }) => {
        isActiveStateFunction(isActive);
        return `${
          isActive
            ? "h-10 bg-gradient-to-l from-yellow-500 via-yellow-300 to-yellow-200"
            : " h-10"
        } flex items-center justify-center w-full`;
      }}
    >{expand?
      <div
        className={`flex justify-evenly cursor-pointer select-none ${
          isActiveState ? "text-yellow-950" : "text-white"
        }`}
      >
        {children}
      </div>
    :      <Tooltip content={`${title}`}>
        <div
          className={`flex justify-evenly cursor-pointer select-none ${
            isActiveState ? "text-yellow-950" : "text-white"
          }`}
        >
          {children}
        </div>
      </Tooltip>
    }
    </NavLink>
  );
}
