import React from "react";

export default function Stock({ menuState, size }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 213 245.95"
      width={size}
      height={size}
    >
      <g id="Capa_2" data-name="Capa 2">
        <g id="Capa_1-2" data-name="Capa 1">
          <polygon
            class="cls-1"
            points="2.5 62.93 2.5 183.02 106.5 243.06 210.5 183.02 210.5 62.93 106.5 2.89 2.5 62.93"
            fill={(menuState.value === "stock" && "#fff") || "none"}
            stroke={"#fff"}
            strokeWidth={"9"}
          />
          <line
            class="cls-2"
            x1="2.5"
            y1="62.98"
            x2="106.5"
            y2="122.98"
            stroke={(menuState.value === "stock" && "#000") || "#fff"}
            strokeWidth={"9"}
          />
          <line
            class="cls-3"
            x1="2.5"
            y1="62.98"
            x2="106.5"
            y2="122.98"
            stroke={(menuState.value === "stock" && "#000") || "#fff"}
            strokeWidth={"9"}
          />
          <line
            class="cls-1"
            x1="210.5"
            y1="62.98"
            x2="106.5"
            y2="122.98"
            stroke={(menuState.value === "stock" && "#000") || "#fff"}
            strokeWidth={"9"}
          />
          <line
            class="cls-1"
            x1="106.5"
            y1="242.98"
            x2="106.5"
            y2="122.98"
            stroke={(menuState.value === "stock" && "#000") || "#fff"}
            strokeWidth={"9"}
          />
          <line
            class="cls-1"
            x1="54.5"
            y1="92.98"
            x2="158.5"
            y2="32.98"
            stroke={(menuState.value === "stock" && "#000") || "#fff"}
            strokeWidth={"9"}
          />
        </g>
      </g>
    </svg>
  );
}
