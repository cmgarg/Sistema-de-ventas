import React from "react";
import Notificaciones from "./navmain/Notificaciones";
import UsuarioIniciado from "./navmain/UsuarioIniciado";

export default function () {
  return (
    <div className="flex w-52 justify-end absolute top-0 right-32 h-10 z-50 app-region-no-drag">
      <div className="flex items-center absolute h-full app-region-no-drag">
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
