import React, { ReactNode, useEffect } from "react";
import UsuarioIniciado from "./UsuarioIniciado";
import Notificaciones from "./Notificaciones";
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
    <div className="flex-1 flex flex-row h-[3rem] items-center justify-between relative">
      <div className="flex-1 pl-5">
        <div className=" text-slate-50 flex justify-start items-center">
          <p className="text-4xl">{title}</p>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="flex flex-row space-x-5">{children}</div>
      </div>
      <div className=" flex-1 flex">
        <div className="flex justify-center items-center">
            <button onClick={()=> sendNotification("sopa","Sopa",2,"actualizacion")} >
                <AiFillAlert size={30} color="white"/>
            </button>
          </div>
      </div>
    </div>
  );
};

export default NavMain;
