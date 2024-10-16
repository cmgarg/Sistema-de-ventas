import React from "react";
import Notificaciones from "./navmain/Notificaciones";
import UsuarioIniciado from "./navmain/UsuarioIniciado";

export default function () {
  return (
    <div className="flex w-full justify-end relative z-30">
      <div className="flex items-center absolute pr-5">
        <Notificaciones />
        <UsuarioIniciado
          setLoginUser={function (value: React.SetStateAction<boolean>): void {
            throw new Error("Function not implemented.");
          }}
        />
      </div>
    </div>
  );
}
