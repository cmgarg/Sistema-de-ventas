import React, { useEffect, useState } from "react";
import { CiCircleCheck } from "react-icons/ci";

export default function InfoCmg() {
  const [estado, setEstado] = useState(false);
  const [estadoAct, setestadoAct] = useState(false);

  // Función para manejar el clic en el div
  const handleClick = () => {
    if (!estado) {
      // Solo procede si estado es false
      setEstado(true);
      setTimeout(() => {
        setEstado(false);
      }, 2500); // Cambia el estado a false después de 2 segundos
    }
  };

  return (
    <div className="flex flex-1 text-white rounded-lg shadow-[0_2px_5px_rgba(0,0,0,0.50)]  bg-[#2f2f2fff]">
      <div className="flex flex-1 flex-col">
        <div
          className="flex h-36 w-full  items-center pl-6 border-b border-gray-600"
          onClick={() => handleClick()}
        >
          <div className={`${estado ? "animate-bounce" : null}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 139.4 156.4"
              className="w-20 h-20"
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
          <div className=" text-4xl pl-5 font-light select-none green">
            CMG Company
          </div>
        </div>
        <div className="flex h-28 w-full items-center pl-6 border-b border-gray-600">
          {estadoAct === true ? (
          <CiCircleCheck size={40} color="#34EB17" />
          ) : (
            <div role="status">
              <svg
                aria-hidden="true"
                className="w-8 h-8 text-black animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
            </div>
          )}
          <div className="flex flex-1">
            <div className="flex flex-col pl-5 w-full ">
              <div>
                {estadoAct
                  ? "Actualizado correctamente (No hay actualizaciones disponibles)"
                  : "Buscando actualizacion..."}
              </div>
              <div className="text-slate-400">
                Versión 1.65.126 Chromium: 124.0.6367.118 (Build oficial) (64
                bits)
              </div>
            </div>
            <div className="flex w-1/3">
              <div className="flex bg-blue-700 p-3 rounded-sm hover:bg-blue-900"
              onClick={()=> setestadoAct(!estadoAct)}>
                Actualizar
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full items-center pl-6 border-b border-gray-600 flex-col">
          <div className="flex p-5 w-full ">
            CMG Company <br />
            Copyright © 2024 Los autores de CMG Company. Todos los derechos
            reservados.
          </div>
          <div className="flex pl-5 w-full pb-5">
            CMG Company es accesible gracias a la versión 2.0 (MPL, por sus
            siglas en inglés). Además, es compatible con el software de código
            abierto de una gran variedad de otras licencias. Lee las
            instrucciones sobre cómo descargar y crear por ti mismo el código
            abierto específico utilizado para crear esta copia.
          </div>
        </div>
      </div>
    </div>
  );
}
