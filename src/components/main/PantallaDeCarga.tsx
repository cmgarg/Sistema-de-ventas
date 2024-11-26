import React from "react";

export default function PantallaDeCarga() {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 139.4 156.4"
          className="w-80 h-80 animate-pulse"
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

      <div className="animate-spin rounded-full h-[30rem] w-[30rem] border-t-4 border-b-4 border-blue-500 absolute"></div>
    </div>
  );
}
