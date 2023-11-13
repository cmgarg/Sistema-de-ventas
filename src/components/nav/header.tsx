import React, { useEffect, useState } from "react";
import CerrarIcon from "../../assets/headersvg/cerraricon.jsx";
import Minimize from "../../assets/headersvg/Minimize.jsx";
import Maximize from "../../assets/headersvg/Maximize.jsx";
import Guion from "../../assets/headersvg/Guion.jsx";
function Header() {
  const closeWindow = () => {
    window.ipcRenderer.send("close-window");
  };

  const maximizeWindow = () => {
    window.ipcRenderer.send("maximize-window");
  };

  const unmaximizedWindow = () => {
    window.ipcRenderer.send("unmaximized-window");
  };
  const minimizeWindow = () => {
    window.ipcRenderer.send("minimize-window");
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
    <div className="bg-gray-800 app-region-drag flex justify-end h-8 items-center">
      <div>
        <p>HOLA LOCO</p>
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
