import React from "react";
import ReactECharts from "echarts-for-react";

const CustomPieChart = ({ data }) => {
  // Función para personalizar la etiqueta en cada segmento
  const options = {
    tooltip: {
      trigger: "item",
    },
    legend: {
      top: "5%",
      left: "center",
      textStyle: {
        fontSize: 10,
        color: "#fff",
      },
    },
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: ["30%", "70%"],
        avoidLabelOverlap: false,
        padAngle: 3,
        itemStyle: {
          borderRadius: 6,
        },
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 15,
            fontWeight: "bold",
            color: "#fff",
          },
        },
        labelLine: {
          show: false,
        },
        data: data,
      },
    ],
  };

  return (
    <ReactECharts option={options} style={{ height: 250, width: "100%" }} />
  );
};

export default CustomPieChart;
