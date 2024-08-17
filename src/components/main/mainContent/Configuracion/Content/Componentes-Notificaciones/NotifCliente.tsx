import React from "react";
import SwitchComponent from "../../../buttons/SwitchComponent";

const NotifCliente: React.FC = () => {
  const handleSwitchChange = (checked: boolean) => {
    console.log("Switch in NotifCliente changed to:", checked);
  };

  return (
    <div className="flex flex-col pt-5 border-b-2 border-gray-700 pb-10">
      <div>
        <div className="text-xl">Clientes</div>
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
          <div className="text-lg">Actualizacion cliente</div>
          <div className="text-sm text-gray-400">
            Notificarme sobre Actualizaciones datos del cliente.
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotifCliente;
