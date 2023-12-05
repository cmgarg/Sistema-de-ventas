import React from "react";

export default function Caja({ menuState, size }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 197.5 195.9"
      width={size}
      height={size}
      fill={(menuState.value === "caja" && "#fff") || "none"}
      stroke={(menuState.value === "caja" && "#fff") || "#fff"}
      strokeWidth={"5"}
    >
      <g id="Capa_2" data-name="Capa 2">
        <g id="Capa_1-2" data-name="Capa 1">
          <rect
            class="cls-1"
            x="69.6"
            y="118.32"
            width="55.91"
            height="17.57"
            rx="5.5"
            fill={"#fff"}
          />
          <rect
            class="cls-2"
            x="3.3"
            y="2.5"
            width="191.7"
            height="121.41"
            rx="12"
            fill="none"
            stroke={(menuState.value === "caja" && "#fff") || "#fff"}
            strokeWidth={"5"}
          />
          <rect
            class="cls-2"
            x="2.5"
            y="135.89"
            width="191.7"
            height="57.51"
            rx="12"
            fill={(menuState.value === "caja" && "#fff") || "none"}
          />
          <rect
            x="24.57"
            y="148.37"
            width="107.63"
            height="6.99"
            fill={(menuState.value === "caja" && "#000") || "none"}
            stroke={(menuState.value === "caja" && "#000") || "#fff"}
            strokeWidth={"5"}
          />
          <path
            class="cls-3"
            d="M131.7,148.87v6H25.07v-6H131.7m1-1H24.07v8H132.7v-8Z"
            fill={(menuState.value === "caja" && "#000") || "none"}
            stroke={(menuState.value === "caja" && "#000") || "#fff"}
          />
          <rect
            x="24.57"
            y="165.95"
            width="58.11"
            height="8.58"
            fill={(menuState.value === "caja" && "#000") || "none"}
            stroke={(menuState.value === "caja" && "#000") || "#fff"}
          />
          <path
            class="cls-3"
            d="M82.17,166.45V174H25.07v-7.58h57.1m1-1H24.07V175h59.1v-9.58Z"
            fill={(menuState.value === "caja" && "#000") || "none"}
            stroke={(menuState.value === "caja" && "#000") || "#fff"}
          />
          <circle
            cx="169.44"
            cy="175.03"
            r="9.59"
            fill={(menuState.value === "caja" && "#000") || "#fff"}
            stroke={(menuState.value === "caja" && "#000") || "#fff"}
          />
        </g>
      </g>
    </svg>
  );
}
