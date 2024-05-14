import React from "react";

interface ClientSvgProps {
  size: number;
  color: string;
}

const ClientSvg: React.FC<ClientSvgProps> = ({ size, color }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 210 297"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs />
      <g>
        <g transform="matrix(0.7573252,0,0,0.7573252,21.990914,-47.829404)">
          <rect
            style={{ fill: "#f8f8f8", fillOpacity: 1 }}
            width="103.11909"
            height="144.397"
            x="58.061226"
            y="217.9599"
            ry="25.319422"
            rx="25.319422"
          />
          <rect
            style={{ fill: "#f8f8f8", fillOpacity: 1 }}
            width="138.06029"
            height="37.502934"
            x="257.1615"
            y="-63.521717"
            rx="25.319418"
            ry="15.191649"
            transform="rotate(68.31404)"
          />
          <rect
            style={{ fill: "#f8f8f8", fillOpacity: 1 }}
            width="138.06029"
            height="37.502934"
            x="174.72609"
            y="140.31769"
            rx="25.319418"
            ry="15.191649"
            transform="matrix(-0.36951907,0.92922315,0.92922315,0.36951907,0,0)"
          />
          <rect
            style={{ fill: "#f8f8f8", fillOpacity: 1 }}
            width="46.872311"
            height="129.53802"
            x="58.164284"
            y="317.24396"
            rx="25.319416"
            ry="15.191648"
          />
          <rect
            style={{ fill: "#f8f8f8", fillOpacity: 1 }}
            width="47.724537"
            height="129.53802"
            x="113.55882"
            y="316.7009"
            rx="25.319416"
            ry="15.191648"
          />
          <ellipse
            style={{ fill: "#f8f8f8", fillOpacity: 1 }}
            cx="107.11827"
            cy="142.21674"
            rx="68.109985"
            ry="68.323044"
          />
          <path
            style={{
              fill: "#442f01",
              fillOpacity: 1,
            }}
            d="m 89.624368,74.523128 -5.78399,50.250992 c 1.802532,14.3379 33.725812,13.12994 45.789942,26.13058 8.94415,6.92307 16.82532,14.95437 29.40196,18.09039 l 7.712,6.53265 C 192.93761,132.64899 160.42153,61.196159 89.624368,74.523128 Z"
          />
          <path
            style={{
              fill: "#442f01",
              fillOpacity: 1,
            }}
            d="m 101.5906,73.844736 1.92879,35.833204 c -1.80328,14.00567 -7.218837,27.5517 -19.287997,40.25108 -8.947877,6.76266 -16.832321,14.60788 -29.414205,17.67122 l -7.715199,6.38127 C 26.075786,139.29367 44.043824,77.597409 101.5906,73.844736 Z"
          />
          <path
            style={{
              fill: "#000000",
              fillOpacity: 1,
            }}
            d="m 104.32702,218.11197 -11.317238,76.94467 16.167488,12.93399 13.74236,-12.12561 -10.2969,-77.77642 z"
          />
        </g>
      </g>
    </svg>
  );
};

export default ClientSvg;
