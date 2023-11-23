import React, { useEffect, useState } from "react";
import CerrarIcon from "../../assets/headersvg/cerraricon.jsx";
import Minimize from "../../assets/headersvg/Minimize.jsx";
import Maximize from "../../assets/headersvg/Maximize.jsx";
import Guion from "../../assets/headersvg/Guion.jsx";
function Header() {
  const closeWindow = () => {
    window.api.enviarEvento("close-window");
    
  };

  const maximizeWindow = () => {
    window.api.enviarEvento("maximize-window");
  };

  const unmaximizedWindow = () => {
    window.api.enviarEvento("unmaximize-window");
  };
  const minimizeWindow = () => {
    window.api.enviarEvento("minimize-window");
  };

  const [isMaximized, setIsMaximized] = useState(false);

  useEffect(() => {
    window.ipcRenderer.on("window-state", (event, state) => {
      setIsMaximized(state === "maximized");
    });

    // Limpiar el listener cuando el componente se desmonta
    return () => {
      window.ipcRenderer.removeAllListeners("window-state");
    };
  }, []);

  return (
    <div className="bg-gray-800 app-region-drag flex-2 flex justify-end h-8 items-center border-b-2 border-zinc-950">
      <div className=" w-full flex-1 justify-between items-baseline">
        <div className=" h-8 w-full flex justify-start items-center ">
          <div className=" flex justify-center items-center w-4 h-4 ml-3 mr-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 139.4 156.4"
              className=" w-4"
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
          <div className=" text-white">Ventas CMG</div>
        </div>
      </div>
      <button
        className="app-region-no-drag flex items-center hover:bg-gray-700 h-full w-10 justify-center"
        onClick={() => {
          minimizeWindow();
        }}
      >
        <Guion color={"#fff"} size={20} />
      </button>
      <button
        className="app-region-no-drag flex items-center hover:bg-gray-700 h-full w-10 justify-center"
        onClick={() => {
          if (!isMaximized) {
            maximizeWindow();
          } else {
            unmaximizedWindow();
          }
        }}
      >
        {isMaximized ? (
          <Minimize color={"#fff"} size={16} />
        ) : (
          <Maximize color={"#fff"} size={10} />
        )}
      </button>
      <button
        className="app-region-no-drag items-center flex hover:bg-red-700 h-full w-10 justify-center"
        onClick={() => {
          closeWindow();
        }}
      >
        <CerrarIcon color={"#fff"} size={16} />
      </button>
    </div>
  );
}

export default Header;
