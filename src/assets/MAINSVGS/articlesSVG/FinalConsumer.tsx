import React from "react";

interface FinalConsumerProps {
  size: number;
  color?: string;
}

const FinalConsumer: React.FC<FinalConsumerProps> = ({ size }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 -28 250 400"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs />
      <g>
        <g>
          <ellipse
            style={{ fill: "#f8f8f8", fillOpacity: 1, strokeWidth: 0.347545 }}
            cx="122.54374"
            cy="40.302605"
            rx="68.109985"
            ry="68.323044"
          />
          <rect
            style={{ fill: "#f8f8f8", fillOpacity: 1, strokeWidth: 0.260981 }}
            width="103.11909"
            height="144.397"
            x="71.057632"
            y="115.05021"
            ry="19.175035"
            rx="19.175035"
          />
          <rect
            style={{ fill: "#f8f8f8", fillOpacity: 1, strokeWidth: 0.239857 }}
            width="138.06029"
            height="37.502934"
            x="166.33784"
            y="-113.62537"
            rx="19.175034"
            ry="11.505019"
            transform="rotate(68.31404)"
          />
          <rect
            style={{ fill: "#f8f8f8", fillOpacity: 1, strokeWidth: 0.239857 }}
            width="138.06029"
            height="37.502934"
            x="74.297607"
            y="114.36715"
            rx="19.175034"
            ry="11.505019"
            transform="matrix(-0.36951907,0.92922315,0.92922315,0.36951907,0,0)"
          />
          <rect
            style={{ fill: "#f8f8f8", fillOpacity: 1, strokeWidth: 0.262745 }}
            width="46.872311"
            height="129.53802"
            x="71.16069"
            y="214.33427"
            rx="19.175032"
            ry="11.505018"
          />
          <rect
            style={{ fill: "#f8f8f8", fillOpacity: 1, strokeWidth: 0.265123 }}
            width="47.724537"
            height="129.53802"
            x="126.55523"
            y="213.7912"
            rx="19.175032"
            ry="11.505018"
          />
          <g>
            <path
              style={{ fill: "#f4bb3a", fillOpacity: 1, strokeWidth: 0.500727 }}
              d="M 69.868114,248.70132 101.40975,366.41618 H -29.071655 L 7.9232105,249.56167 Z"
            />
            <rect
              style={{
                fill: "#f8f8f8",
                fillOpacity: 0,
                stroke: "#000000",
                strokeWidth: 5.19505,
              }}
              width="51.95126"
              height="38.18573"
              x="12.920042"
              y="224.89058"
              ry="8.5222378"
              rx="8.5222378"
            />
            <rect
              style={{
                fill: "#000000",
                fillOpacity: 0.97166,
                stroke: "#000000",
                strokeWidth: 2.99224,
              }}
              width="52.481094"
              height="14.625878"
              x="13.08526"
              y="254.72372"
              rx="8.5222378"
              ry="7.2439022"
            />
          </g>
          <path
            style={{ fill: "#81d0d3", fillOpacity: 1, strokeWidth: 0.500727 }}
            d="m 237.39459,248.70132 31.54164,117.71486 H 138.45482 l 36.99487,-116.85451 z"
          />
          <rect
            style={{
              fill: "#f8f8f8",
              fillOpacity: 0,
              stroke: "#000000",
              strokeWidth: 5.19505,
            }}
            width="51.95126"
            height="38.18573"
            x="180.44652"
            y="224.89058"
            ry="8.5222378"
            rx="8.5222378"
          />
          <rect
            style={{
              fill: "#000000",
              fillOpacity: 0.97166,
              stroke: "#000000",
              strokeWidth: 2.99224,
            }}
            width="52.481094"
            height="14.625878"
            x="180.61174"
            y="254.72372"
            rx="8.5222378"
            ry="7.2439022"
          />
          <path
            style={{ fill: "#d6562b", fillOpacity: 1, strokeWidth: 0.500727 }}
            d="m 153.02874,261.95881 31.54164,117.71486 H 54.088975 L 91.08384,262.81916 Z"
          />
          <rect
            style={{
              fill: "#f8f8f8",
              fillOpacity: 0,
              stroke: "#000000",
              strokeWidth: 5.19505,
            }}
            width="51.95126"
            height="38.18573"
            x="96.080673"
            y="238.14807"
            ry="8.5222378"
            rx="8.5222378"
          />
          <rect
            style={{
              fill: "#000000",
              fillOpacity: 0.97166,
              stroke: "#000000",
              strokeWidth: 2.99224,
            }}
            width="52.481094"
            height="14.625878"
            x="96.245888"
            y="267.9812"
            rx="8.5222378"
            ry="7.2439022"
          />
        </g>
      </g>
    </svg>
  );
};

export default FinalConsumer;
