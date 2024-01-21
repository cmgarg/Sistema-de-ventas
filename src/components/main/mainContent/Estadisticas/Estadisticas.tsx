import React, { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface EstadisticastProps {
  //PROPS
}
const data = [
  { name: "Group A", value: 2400 },
  { name: "Group B", value: 4567 },
  { name: "Group C", value: 1398 },
  { name: "Group D", value: 9800 },
  { name: "Group E", value: 3908 },
  { name: "Group F", value: 4800 },
];

const COLORS = [
  "#ce93d8",
  "#5c6bc0",
  "#b39ddb",
  "#4dd0e1",
  "#f48fb1",
  "#d500f9",
]; // HACER QUE DESDE NEDB DEVUELVAN UN ARRAY CON LOS DATOS A USAR EN LAS ESTADISTICAS
const Estadisticas: React.FC<EstadisticastProps> = (
  {
    /*PROPS*/
  }
) => {
  const [salesData, setSalesData] = useState<object[]>([]);

  const [salesForDate, setSalesForDate] = useState<object[]>([]);

  function getSalesData() {
    window.api.enviarEvento("get-sales-stats");
  }
  const sumarVentasPorFecha = (ventas) => {
    let totalPorFecha = {};

    ventas.forEach((venta) => {
      const { date, amount, sold } = venta;
      console.log(totalPorFecha);
      if (!totalPorFecha[date]) {
        totalPorFecha[date] = { amount: 0, sold: 0 };
      }
      totalPorFecha[date].amount += Number(amount);
      totalPorFecha[date].sold += sold;
    });

    const arraySumadoVentas = Object.entries(totalPorFecha).map(
      ([date, amount]) => ({
        date, //////////////////////APRENDER ESTO EL INTERNET ANDA PARA LA NALGA
        amount,
      })
    );
    console.log(arraySumadoVentas, "karinaaaaaaaa");
    const objectFinal = arraySumadoVentas.map((e) => {
      return {
        date: e.date,
        amount: e.amount.amount,
        vendido: e.amount.sold,
      };
    });
    console.log(objectFinal, "FONAAAAAAAAAAA");
    setSalesForDate(objectFinal);
  };

  function forWeek() {
    const groupForDay = [...salesForDate];
  }

  useEffect(() => {
    getSalesData();
    window.api.recibirEvento("response-get-sales-stats", (salesDate) => {
      setSalesData(salesDate);
    });
  }, []); //JUNTAR CANTIDADES CON LAS MISMAS FECHAS DE GENERACION PAPANATAS

  useEffect(() => {
    console.log(salesForDate, "SASUKE");
    console.log(salesForDate[0].date.split("-"), "Separados por ----");
    sumarVentasPorFecha(salesData);
  }, [salesData]);

  return (
    <div className="flex flex-row flex-1 bg-slate-600">
      <div className="flex flex-col flex-1">
        <div className="flex-3 bg-slate-800 flex flex-row text-2xl space-x-1">
          <div className="flex-1 bg-slate-200 flex justify-center">
            <p>Dia</p>
          </div>
          <div className="flex-1 bg-slate-200 flex justify-center">
            <p>Semana</p>
          </div>
          <div className="flex-1 bg-slate-200 flex justify-center">
            <p>Mes</p>
          </div>
          <div className="flex-1 bg-slate-200 flex justify-center">
            <p>Año</p>
          </div>
        </div>

        <div className="flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart width={150} height={40} data={salesForDate}>
              <CartesianGrid strokeDasharray="4 1 2" />
              <XAxis
                textRendering={"faalopa"}
                dataKey="date"
                tick={{ fill: "#fff" }}
              />
              <Tooltip content={<TooltipContent />} />
              <Legend />
              <YAxis tick={{ fill: "#fff" }} />
              <Bar dataKey="vendido" fill="rgb(100 200 100)" />
              <Rectangle color="#ffffff" fill="#fff" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Estadisticas;

const TooltipContent = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-700 text-slate-200 p-2 flex flex-col">
        <p className="desc">
          Vendido: <span className="text-green-300">${payload[0].value}</span>
        </p>
        <p>
          Cantidad:
          <span className="text-green-300"> {payload[0].payload.amount}</span>
        </p>
      </div>
    );
  }

  return null;
};
