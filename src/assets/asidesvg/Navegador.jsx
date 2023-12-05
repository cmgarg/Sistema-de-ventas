import React from "react";

export default function Navegador({ menuState, size }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 213 213"
      width={size}
      height={size}
    >
      <g id="Capa_2" data-name="Capa 2">
        <g id="Capa_1-2" data-name="Capa 1">
          <circle
            class="cls-1"
            cx="106.5"
            cy="106.5"
            r="104"
            fill={(menuState.value === "navegador" && "#fff") || "none"}
            stroke="#fff"
            stroke-width={"9"}
          />
          <polyline
            class="cls-2"
            stroke={(menuState.value === "navegador" && "#000") || "#fff"}
            stroke-width={"9"}
            points="210.5 106.5 157.78 106.5 55.2 106.5 3.5 106.5"
          />
          <polyline
            stroke={(menuState.value === "navegador" && "#000") || "#fff"}
            stroke-width={"9"}
            class="cls-2"
            points="8.5 71.5 53.7 71.5 158.08 71.5 204.5 71.5"
          />
          <polyline
            stroke={(menuState.value === "navegador" && "#000") || "#fff"}
            stroke-width={"9"}
            class="cls-2"
            points="23 42.5 61.74 42.5 151.21 42.5 191 42.5"
          />
          <polyline
            stroke={(menuState.value === "navegador" && "#000") || "#fff"}
            stroke-width={"9"}
            class="cls-2"
            points="8.5 141.5 54.6 141.5 156.5 141.5 204.5 141.5"
          />
          <polyline
            stroke={(menuState.value === "navegador" && "#000") || "#fff"}
            stroke-width={"9"}
            class="cls-2"
            points="26 171.5 64.1 171.5 148.33 171.5 188 171.5"
          />
          <ellipse
            fill="none"
            stroke={(menuState.value === "navegador" && "#000") || "#fff"}
            stroke-width={"9"}
            class="cls-2"
            cx="107.5"
            cy="106.5"
            rx="69"
            ry="104"
          />
          <line
            stroke={(menuState.value === "navegador" && "#000") || "#fff"}
            stroke-width={"9"}
            class="cls-2"
            x1="106.5"
            y1="2.5"
            x2="106.5"
            y2="210.5"
          />
        </g>
      </g>
    </svg>
  );
}
