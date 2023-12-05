import React from "react";

export default function Ventas({ menuState, size, color }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{
        width: size,
        height: size,
        fill: (menuState.value === "ventas" && "#fff") || "none",
      }}
      viewBox="0 0 114.62 244.57"
    >
      <g id="Capa_2" data-name="Capa 2">
        <g id="Capa_1-2" data-name="Capa 1">
          <path
            className="border border-r-green-800"
            stroke="#fff"
            stroke-width="10"
            d="M47.64,242.07V212.6C30.71,212.3,13.2,207.05,3,199.76l7-19.55a77.83,77.83,0,0,0,42,12.54c20.72,0,34.73-12,34.73-28.59,0-16-11.38-26-33-34.73C24,117.76,5.62,104.34,5.62,79c0-24.22,17.21-42.6,44.06-47V2.5H67.77V30.8c17.51.59,29.47,5.26,37.93,10.22L98.41,60.28a70.46,70.46,0,0,0-36.77-9.92c-22.47,0-30.93,13.42-30.93,25.09,0,15.17,10.8,22.76,36.18,33.27C97,121,112.12,136.14,112.12,162.11c0,23.06-16.05,44.65-46.1,49.61v30.35Z"
          />
        </g>
      </g>
    </svg>
  );
}
