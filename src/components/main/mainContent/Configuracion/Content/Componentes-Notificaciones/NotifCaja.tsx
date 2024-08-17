import React from "react";
import SwitchComponent from "../../../buttons/SwitchComponent";

const NotifCaja: React.FC = () => {
  const handleSwitchChange = (checked: boolean) => {
    console.log("Switch in NotifVentas changed to:", checked);
  };

  return (
    <div className="flex flex-col pt-5 border-b-2 border-gray-700 pb-10">
      <div>
        <div className="text-xl">Caja</div>
        <div className="pt-5 text-sm text-gray-400">
          Administra tus notificaciones móviles y de escritorio
        </div>
      </div>
      <div className="flex pt-8">
        <div className="pr-10 pt-2">
          <SwitchComponent
            initialChecked={true}
            onChange={handleSwitchChange}
          />
        </div>
        <div>
          <div className="text-lg">Actualizacion</div>
          <div className="text-sm text-gray-400">
            Notificarme sobre Actualizaciones del programa.
          </div>
        </div>
      </div>
      <div className="flex pt-8">
        <div className="pr-10 pt-2">
          <SwitchComponent
            initialChecked={true}
            onChange={handleSwitchChange}
          />
        </div>
        <div>
          <div className="text-lg">Actualizacion Caja</div>
          <div className="text-sm text-gray-400">
            Notificarme sobre Actualizaciones datos del caja.
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotifCaja;
