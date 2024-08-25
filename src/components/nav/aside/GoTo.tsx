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
            ? "h-14 bg-gradient-to-t from-yellow-500 via-yellow-400 to-yellow-500 border-y-2"
            : " h-12"
        } flex items-center justify-center w-full border-black hover:bg-yellow-600`;
      }}
    >
      <Tooltip content={`${title}`}>
        <div
          className={`flex justify-evenly cursor-pointer select-none ${
            isActiveState ? "text-yellow-950" : "text-white"
          }`}
        >
          {children}
        </div>
      </Tooltip>
      {expand ? (
        <div
          className={`absolute left-10 right-0 pl-2  flex justify-start hover:text-yellow-300  items-center ${
            isActiveState
              ? "bg-gradient-to-t from-yellow-500 text-black border-black via-yellow-400 to-yellow-500 h-14 border-r-2 border-b-2 border-t-2"
              : "h-10 text-white"
          }`}
        >
          <p>{title}</p>
        </div>
      ) : null}
    </NavLink>
  );
}
