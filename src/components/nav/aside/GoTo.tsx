import React, { ReactNode } from "react";
import Tooltip from "./Tooltip.jsx";
import { Link, useLocation } from "react-router-dom";

type Props = {
  goTo: string;
  children: ReactNode;
  title: string;
  isActive: boolean;
};

export default function GoTo({ goTo, children, title, isActive }: Props) {
  return (
    <div className={`${location.pathname == `${goTo}` ? "bg-cyan-600" : ""}`}>
      <div className=" flex items-center justify-center mt-3 mb-3 hover:bg-cyan-700 active:bg-gray-900  ">
        <Link to={goTo} className="flex items-center justify-center">
          {isActive ? (
            <div className=" flex items-center justify-evenly w-10 h-10 cursor-pointer select-none">
              {children}
            </div>
          ) : (
            <Tooltip content={`${title}`}>
              <div className=" flex items-center justify-evenly w-10 h-10 cursor-pointer select-none">
                {children}
              </div>
            </Tooltip>
          )}
          <div
            className={`${
              isActive ? " flex w-24 h-full  items-center  justify-start " : ""
            }`}
          >
            {isActive ? (
              <div className="text-sm ml-1 text-white cursor-pointer select-none">
                {title}
              </div>
            ) : null}
          </div>
        </Link>
      </div>
    </div>
  );
}
