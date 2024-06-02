import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Brush,
} from "recharts";
import { VictoryPie } from "victory";
import { addDays, format } from "date-fns";
import { saleData } from "../../../../../types";

const generarDatos = (startDate, endDate) => {
  const data = [];
  let currentDate = startDate;

  while (currentDate <= endDate) {
    const ventas = Math.floor(Math.random() * (1000 - 100 + 1)) + 100; // Ventas diarias entre 100 y 1000
    const gastos = Math.floor(Math.random() * (500 - 50 + 1)) + 50; // Gastos diarios entre 50 y 500
    data.push({
      fecha: format(currentDate, "yyyy-MM-dd"),
      ventas,
      gastos,
      ganancia: ventas - gastos,
    });
    currentDate = addDays(currentDate, 1);
  }

  return data;
};
const data = [
  { name: "01", ventas: 99900 },
  { name: "02", ventas: 1398 },
  { name: "03", ventas: 9800 },
  { name: "04", ventas: 3908 },
  { name: "05", ventas: 4800 },
  { name: "06", ventas: 3800 },
  { name: "07", ventas: 4300 },
  { name: "08", ventas: 2400 },
  { name: "09", ventas: 2400 },
  { name: "10", ventas: 2400 },
  { name: "11", ventas: 2400 },
  { name: "12", ventas: 1398 },
  { name: "13", ventas: 9800 },
  { name: "14", ventas: 3908 },
  { name: "15", ventas: 4800 },
  { name: "16", ventas: 3800 },
  { name: "17", ventas: 4300 },
  { name: "18", ventas: 2400 },
  { name: "19", ventas: 2400 },
  { name: "20", ventas: 2400 },
  { name: "21", ventas: 2400 },
  { name: "22", ventas: 1398 },
  { name: "23", ventas: 9800 },
  { name: "24", ventas: 3908 },
  { name: "25", ventas: 4800 },
  { name: "26", ventas: 3800 },
  { name: "27", ventas: 4300 },
  { name: "28", ventas: 2400 },
  { name: "29", ventas: 2400 },
  { name: "30", ventas: 2400 },
];
const data01 = [
  {
    name: "Group A",
    value: 400,
  },
  {
    name: "Group B",
    value: 300,
  },
  {
    name: "Group C",
    value: 300,
  },
  {
    name: "Group D",
    value: 200,
  },
  {
    name: "Group E",
    value: 278,
  },
  {
    name: "Group F",
    value: 189,
  },
];
type GraphicsProps = {
  // Define tus props aquí
};

const Graphics: React.FC<GraphicsProps> = ({}) => {
  const [datos, setDatos] = useState([]);
  const [datosxMes, setDatosxMes] = useState([]);

  const filtrarDatosPor = () => {
    const xmes = [];
    datos.map((d) => {
      const año = new Date(d.fecha).getFullYear();
      const mes = new Date(d.fecha).getMonth() + 1;
      const fecha = `${mes}-${año}`;

      if (!xmes.includes(fecha)) {
        xmes[fecha] = [];
      }
    });
    console.log(xmes);

    datos.map((d) => {
      const año = new Date(d.fecha).getFullYear();
      const mess = new Date(d.fecha).getMonth() + 1;
      const fecha = `${mess}-${año}`;
      if (!xmes.includes(fecha)) {
        console.log("QUE PASA");
        xmes[fecha].push(d);
      }
    });
    console.log(xmes);

    xmes.map((d) => {
      console.log("FLOPEADITO ESTAS", d);
      const año = new Date(d.fecha).getFullYear();
      const mess = new Date(d.fecha).getMonth() + 1;
      const fecha = `${mess}-${año}`;
      const sumaVentasXMes = d.reduce((a, b) => {
        return a.ventas + b.ventas;
      });

      xmes[fecha].total = sumaVentasXMes;
    });

    console.log(xmes, "averloco");
    setDatosxMes(xmes);
  };

  useEffect(() => {
    // Generar datos al montar el componente
    const datosSimulados = generarDatos(
      new Date(2023, 0, 1),
      new Date(2023, 11, 31)
    );
    setDatos(datosSimulados);
  }, []);
  useEffect(() => {
    console.log(datos);
  }, [datos]);

  return (
    <div className="w-full flex flex-col space-y-2">
      <div>
        <h1 className="text-7xl text-slate-100">Ventas</h1>
      </div>
      <div className="flex flex-col w-full bg-slate-950 rounded-lg">
        <ul className="flex bg-slate-950 h-12 rounded-t-lg text-slate-100 w-full text-3xl">
          <button className="flex-1 flex justify-center items-center hover:bg-slate-900">
            Dia
          </button>
          <button className="flex-1 border-x flex justify-center items-center border-slate-800 hover:bg-slate-900">
            Mes
          </button>
          <button className="flex-1 flex justify-center items-center border-r border-slate-800 hover:bg-slate-900">
            Año
          </button>
          <button className="flex-1 flex justify-center items-center hover:bg-slate-900">
            Establecer periodo
          </button>
        </ul>
        <div className="flex flex-col w-full h-96 bg-slate-950 rounded-lg">
          <ResponsiveContainer width={"100%"} height={"100%"}>
            <BarChart data={datosxMes}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis dataKey="ventas" />
              <Tooltip />
              <Legend />
              <Bar dataKey="ventas" className="fill-slate-50 rounded-xl" />
              <Bar dataKey="gastos" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="h-72 w-96 bg-slate-950 rounded-lg">
        <ResponsiveContainer width={"100%"} height={"100%"}>
          <PieChart width={730} height={250}>
            <Pie
              data={data01}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={50}
              fill="#8884d8"
            />
            <Pie
              data={data01}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#82ca9d"
              label
            />
          </PieChart>
        </ResponsiveContainer>
        <button onClick={filtrarDatosPor}>LACALACA</button>
      </div>
    </div>
  );
};

export default Graphics;
