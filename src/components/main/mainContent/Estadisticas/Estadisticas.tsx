import React, { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
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
import SalesTop from "./SalesTop";

interface EstadisticastProps {
  //PROPS
}
const Estadisticas: React.FC<EstadisticastProps> = (
  {
    /*PROPS*/
  }
) => {
  const [salesData, setSalesData] = useState<object[]>([]);

  const [salesForDate, setSalesForDate] = useState<object[]>([]);

  const [forMoth, setForMoth] = useState<object[]>([]);
  const [forWeek, setForWeek] = useState<object[]>([]);
  const [forYear, setForYear] = useState<object[]>([]);

  const [forWhat, setForWhat] = useState("");

  function getSalesData() {
    window.api.enviarEvento("get-sales-stats");
  }
  const porDia = (ventas) => {
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
        date,
        amount,
      })
    );

    const objectFinal = arraySumadoVentas.map((e) => {
      return {
        date: e.date,
        amount: e.amount.amount,
        vendido: e.amount.sold,
      };
    });
    objectFinal.sort((a, b) => {
      let fechaA = a.date.split("-").reverse().join("-");
      let fechaB = b.date.split("-").reverse().join("-");

      return new Date(fechaA) - new Date(fechaB);
    });
    setSalesForDate(objectFinal);
  };
  function getISOWeekNumber(d) {
    const date = new Date(d.getTime());
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));

    const week1 = new Date(date.getFullYear(), 0, 4);

    return (
      1 +
      Math.round(
        ((date.getTime() - week1.getTime()) / 86400000 -
          3 +
          ((week1.getDay() + 6) % 7)) /
          7
      )
    );
  }
  function porSemana() {
    const salesDate = [...salesForDate];

    salesDate.map((e) => {
      let fecha = e.date.split("-");
      let fechaDate = new Date(
        Number(fecha[2]),
        Number(fecha[1]) - 1,
        Number(fecha[0])
      );
      let numberWeek = getISOWeekNumber(fechaDate);

      e.date = numberWeek;
    });

    salesDate.sort((a, b) => a.date - b.date);

    let groupWeek = {};

    salesDate.forEach((e) => {
      if (!groupWeek[e.date]) {
        groupWeek[e.date] = {
          amount: 0,
          sold: 0,
        };
      }
      groupWeek[e.date].amount += Number(e.amount);
      groupWeek[e.date].sold += Number(e.vendido);
    });
    const arraySumadoVentas = Object.entries(groupWeek).map(
      ([date, amount]) => ({
        date,
        amount,
      })
    );
    const objectFinal = arraySumadoVentas.map((e) => {
      return {
        date: e.date,
        amount: e.amount.amount,
        vendido: e.amount.sold,
      };
    });
    setForWeek(objectFinal);
  }
  function porMes() {
    let porMes = {};
    salesForDate.forEach((e) => {
      let { vendido, amount } = e;
      let [dia, mes, año] = e.date.split("-");
      if (!porMes[mes]) {
        porMes[mes] = {
          amount: 0,
          sold: 0,
        };
      }
      porMes[mes].amount += Number(amount);
      porMes[mes].sold += Number(vendido);
    });
    const arraySumadoVentas = Object.entries(porMes).map(([date, amount]) => ({
      date,
      amount,
    }));
    const objectFinal = arraySumadoVentas.map((e) => {
      return {
        date: e.date,
        amount: e.amount.amount,
        vendido: e.amount.sold,
      };
    });
    setForMoth(objectFinal);
  }
  function porAño() {
    let porAño = {};
    salesData.forEach((e) => {
      const { date, amount, sold } = e;

      console.log(e, "FALOPAAAAAAAAAAAAAAA");

      const [dia, mes, año] = date.split("-");

      if (!porAño[año]) {
        porAño[año] = {
          amount: 0,
          sold: 0,
        };
      }
      console.log(salesForDate);
      porAño[año].amount += Number(amount);
      porAño[año].sold += Number(sold);
    });
    console.log(porAño, "FECHA POR AÑO");
    ///////POR AÑO AHORA
    const arraySumadoVentas = Object.entries(porAño).map(([date, amount]) => ({
      date,
      amount,
    }));
    const objectFinal = arraySumadoVentas.map((e) => {
      return {
        date: e.date,
        amount: e.amount.amount,
        vendido: e.amount.sold,
      };
    });
    console.log(arraySumadoVentas, "FECHA PORaño");
    console.log(objectFinal, "FECHA PORañoo");

    setForYear(objectFinal);
  }
  useEffect(() => {
    getSalesData();
    window.api.recibirEvento("response-get-sales-stats", (salesDate) => {
      setSalesData(salesDate);
    });
  }, []); //JUNTAR CANTIDADES CON LAS MISMAS FECHAS DE GENERACION PAPANATAS

  useEffect(() => {
    console.log(salesForDate, "SASUKE");
    porDia(salesData);
    porMes();
    porSemana();
    porAño();
  }, [salesData]);

  return (
    <div className="flex flex-row flex-1 bg-slate-600">
      <div className="flex flex-col flex-1">
        <div className="flex-1 flex flex-col">
          <div className="h-2/5 w-full bg-slate-400 flex-row flex">
            <div className="w-full h-full bg-slate-950">
              <div className="bg-slate-800 flex flex-row space-x-1 h-5 text-sm">
                <div
                  className="flex-1 bg-slate-200 flex justify-center"
                  onClick={() => {
                    setForWhat("dia");
                  }}
                >
                  <p>Dia</p>
                </div>
                <div
                  className="flex-1 bg-slate-200 flex justify-center"
                  onClick={() => {
                    setForWhat("semana");
                  }}
                >
                  <p>Semana</p>
                </div>
                <div
                  className="flex-1 bg-slate-200 flex justify-center"
                  onClick={() => {
                    setForWhat("mes");
                  }}
                >
                  <p>Mes</p>
                </div>
                <div
                  className="flex-1 bg-slate-200 flex justify-center"
                  onClick={() => {
                    setForWhat("año");
                  }}
                >
                  <p>Año</p>
                </div>
              </div>
              <ResponsiveContainer width={"100%"} height={"97%"}>
                <AreaChart
                  width={150}
                  height={40}
                  data={
                    (forWhat === "mes" && forMoth) ||
                    (forWhat === "semana" && forWeek) ||
                    (forWhat === "año" && forYear) ||
                    salesForDate
                  }
                >
                  <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="amount"
                    stroke="#8884d8"
                    fillOpacity={1}
                    fill="url(#colorUv)"
                  />
                  <Area
                    type="monotone"
                    dataKey="amount"
                    stroke="#82ca9d"
                    fillOpacity={1}
                    fill="url(#colorPv)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="flex-1 h-1/2">
            <p>GONZA</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Estadisticas;

const TooltipContent = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-800 rounded-lg border-2 border-blue-800 text-slate-200 p-2 flex flex-col">
        <p className="desc">
          Vendido:{" "}
          <span className="text-green-300">${payload[0].payload.vendido}</span>
        </p>
        <p>
          Cantidad:
          <span className="text-green-300">{payload[0].payload.amount} </span>
        </p>
      </div>
    );
  }

  return null;
};

const CustomizedAxisTick = ({ x, y, stroke, payload }) => {
  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={16} textAnchor="middle" fill="#fff">
        {(payload.value === "01" && "Enero") || payload.value}
      </text>
    </g>
  );
};

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
  payload,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  const lala = payload;
  const content = lala.payload;

  console.log(content);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      fontSize={10}
      style={{ display: "flex", flexDirection: "column" }}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
