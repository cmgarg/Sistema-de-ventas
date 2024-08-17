import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdNotificationsActive } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { FaUserCog } from "react-icons/fa";
import { RootState } from "../../../../redux/store";

interface MenuConfigProps {
  estado: string;
  setEstado: (estado: string) => void;
}

const MenuConfig: React.FC<MenuConfigProps> = ({ estado, setEstado }) => {
  const userType = useSelector(
    (state: RootState) => state.estadoTipoDeUser.userType
  );
  const dispatch = useDispatch();

  return (
    <div className="flex flex-1 flex-col bg-gray-900 rounded-lg shadow-xl shadow-black">
      <div className="flex flex-1 flex-col">
        <div
          className={`flex w-full h-16 text-white relative hover:bg-black hover:bg-opacity-10 ${
            estado === "general-1" &&
            "border-b-2 border-l-4 border-white bg-black bg-opacity-25 rounded-tl-2xl rounded-bl-2xl"
          }`}
          onClick={() => setEstado("general-1")}
        >
          <div className="flex h-full w-20 items-center justify-center">
            <FaUserCog size={25} />
          </div>
          <div className="flex items-center text-base">
            <div className="select-none">General</div>
          </div>
        </div>
        {(userType === "ventas" || userType === "admin" || userType === "gerente") && (
          <div
            className={`flex w-full h-16 text-white relative hover:bg-black hover:bg-opacity-20 ${
              estado === "general-2"
                ? "border-b-2 border-l-4 border-white bg-black bg-opacity-25 rounded-tl-2xl rounded-bl-2xl"
                : ""
            }`}
            onClick={() => setEstado("general-2")}
          >
            <div className="flex h-full w-20 items-center justify-center">
              <FaUsers size={25} />
            </div>
            <div className="flex items-center text-base">
              <div className="select-none">Administrar Cuentas</div>
            </div>
          </div>
        )}
        <div
          className={`flex w-full h-16 text-white relative hover:bg-black hover:bg-opacity-20 ${
            estado === "general-3" &&
            "border-b-2 border-l-4 border-white bg-black bg-opacity-25 rounded-tl-2xl rounded-bl-2xl"
          }`}
          onClick={() => setEstado("general-3")}
        >
          <div className="flex h-full w-20 items-center justify-center">
            <MdNotificationsActive size={25} />
          </div>
          <div className="flex items-center text-base">
            <div className="select-none">Notificaciones</div>
          </div>
        </div>
      </div>

      <div
        className={`h-20 flex flex-col hover:bg-gray-800 ${
          estado === "general-6" ? "border-l-8 bg-black bg-opacity-25" : null
        }`}
        onClick={() => setEstado("general-6")}
      >
        <div className="flex items-center justify-center">
          <div className="h-0.5 w-full mr-5 ml-5 bg-gray-600"></div>
        </div>
        <div className="flex">
          <div className="flex w-20 h-20 items-center justify-center flex-row">
            <div className="flex w-10 h-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 139.4 156.4"
                className="w-10 h-10"
              >
                <defs></defs>
                <title>Recurso 2</title>
                <g id="Capa_2" data-name="Capa 2">
                  <g id="Capa_1-2" data-name="Capa 1">
                    <path
                      className="fill-white"
                      d="M120.5,9.2V24.1l-8.7,6-.2-19.7L111.5,0H27.8V30.3l-8.9-6.1V9.2H0v97.2l18.9,14v-83l8.9,6.2v82.8l18.7,13.7v.2l23,16.1V144.3l-22.7-16V56.7L60,66l2.4,1.6L65,69.3l4.8,3.2L79.1,66h.1l41.3-28.6v83l18.9-14V9.2ZM69.6,59.3,46.8,43.5V10.4H92.6l.2,32.8Z"
                    />
                    <polyline
                      className="fill-white"
                      points="72 155.9 95 139.9 95 127.7 72 143.9"
                    />
                    <polygon
                      className="fill-white"
                      points="95 78.8 71.7 95 71.7 82.9 95 66.5 95 78.8"
                    />
                    <polygon
                      className="fill-white"
                      points="113.9 52.9 113.9 126 95 139.9 95.1 66.5 113.9 52.9"
                    />
                    <polygon
                      className="fill-white"
                      points="79.3 66 79.1 66 79.2 66 79.3 66"
                    />
                  </g>
                </g>
              </svg>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="flex flex-1 text-white text-lg flex-col">
              Acerca de Punto de venta.
              <p className="text-xs">Version Beta 1.00.00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuConfig;
