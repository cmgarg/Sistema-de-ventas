import { Select } from "@radix-ui/react-select";
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
import { SelectDemo } from "./SelectDemo";

type params = {
  salesData: object[];
};

export function Graphic({ salesData }: params) {
  type saleType = {
    articulo: string;
    amount: string;
    sold: number;
    date: string;
  };

  const [salesForDate, setSalesForDate] = useState<saleType[]>([]);

  const [forMoth, setForMoth] = useState<object[]>([]);
  const [forWeek, setForWeek] = useState<object[]>([]);
  const [forYear, setForYear] = useState<object[]>([]);

  const [forWhat, setForWhat] = useState("");

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
        date: e.date.split("-").reverse().join("-").slice(0, 5),
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
    console.log(salesData, "zoro");
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
    const meses = {
      "01": "Enero",
      "02": "Febrero",
      "03": "Marzo",
      "04": "Abril",
      "05": "Mayo",
      "06": "Junio",
      "07": "Julio",
      "08": "Agosto",
      "09": "Septiembre",
      "10": "Octubre",
      "11": "Noviembre",
      "12": "Diciembre",
    };
    const objectFinal = arraySumadoVentas.map((e) => {
      return {
        date: meses[e.date],
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
  } //JUNTAR CANTIDADES CON LAS MISMAS FECHAS DE GENERACION PAPANATAS
  useEffect(() => {
    console.log(salesForDate, "SASUKE");
    porDia(salesData);
    porMes();
    porSemana();
    porAño();
  }, [salesData]);

  return (
    <div className="grid col-span-7 row-span-5 row-start-2 border border-gray-600 rounded-xl p-2 relative">
      <SelectDemo setForWhat={setForWhat}></SelectDemo>
      <ResponsiveContainer width={"100%"} height={"100%"}>
        <BarChart
          width={150}
          height={40}
          data={
            (forWhat === "mes" && forMoth) ||
            (forWhat === "semana" && forWeek) ||
            (forWhat === "año" && forYear) ||
            salesForDate
          }
        >
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip content={<TooltipContent />} />
          <Legend />
          <Bar dataKey="amount" fill="#00f0f0" barSize={100} radius={20} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

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
