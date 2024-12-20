import React from "react";
import { FcFeedback } from "react-icons/fc";
import NotifGeneral from "./Componentes-Notificaciones/NotifGeneral";
import NotifCliente from "./Componentes-Notificaciones/NotifCliente";
import NotifArticulos from "./Componentes-Notificaciones/NotifArticulos";
import NotifVentas from "./Componentes-Notificaciones/NotifVentas";
import NotifStock from "./Componentes-Notificaciones/NotifStock";
import NotifCuentas from "./Componentes-Notificaciones/NotifCuentas";
import NotifCaja from "./Componentes-Notificaciones/NotifCaja";
import NotifEstadisticas from "./Componentes-Notificaciones/NotifEstadisticas";
import NotifConfiguracion from "./Componentes-Notificaciones/NotifConfiguracion";

export default function Notificaciones() {
  return (
    <div className="flex flex-1 text-white rounded-lg  h-full shadow-[0_2px_5px_rgba(0,0,0,0.50)]  overflow-auto bg-[#2f2f2fff]">
      <div className="flex flex-1 flex-col m-6">
        <div className="flex text-2xl border-gray-700 border-b-2 ">
          <div className="flex flex-1 flex-col">
            <div className="text-xl">Notificaciones</div>
            <div className="pt-5 text-2xl">
              Elige cuándo y cómo quieres que se te notifique
            </div>
            <div className="pt-5 text-sm text-gray-400">
              Selecciona las notificaciones push y de correo electrónico que
              deseas recibir
            </div>
          </div>
          <div className="flex justify-start w-1/3">
            <FcFeedback size={120} />
          </div>
        </div>

        <div>
          <NotifGeneral />
        </div>
        <div>
          <NotifCliente />
        </div>
        <div>
          <NotifArticulos />
        </div>
        <div>
          <NotifVentas />
        </div>
        <div>
          <NotifStock />
        </div>
        <div>
          <NotifCaja />
        </div>
        <div>
          <NotifCuentas />
        </div>
        <div>
          <NotifEstadisticas />
        </div>
        <div>
          <NotifConfiguracion />
        </div>
      </div>
    </div>
  );
}
