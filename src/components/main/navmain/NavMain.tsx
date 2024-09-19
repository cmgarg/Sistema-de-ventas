import React, { ReactNode } from "react";
import { AiFillAlert } from "react-icons/ai";
import { sendNotification } from "../Main";

interface MainContentProps {
  children: ReactNode;
  title?: string;
  setLoginUser: string;
}

const NavMain: React.FC<MainContentProps> = ({
  children,
  title,
  setLoginUser,
}) => {
  return (
    <div className="flex-1 text-white flex flex-row h-[3rem] items-center justify-between relative">
      <div className="ml-5 w-52 border-b-4 border-gray-500 italic flex pl-2 rounded-r-full">
        <div className=" flex justify-start items-center">
          <p className="text-4xl">{title}</p>
        </div>
      </div>
      <div className="flex justify-center flex-1">
        <div className="flex flex-row space-x-5">{children}</div>
      </div>
      <div className="flex">
        <div className="flex justify-center items-center">
          <button
            onClick={() => sendNotification("sopa", "Sopa", 2, "actualizacion")}
          >
            <AiFillAlert size={30} color="white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavMain;
