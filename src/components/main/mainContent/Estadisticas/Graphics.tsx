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
} from "recharts";
import { addDays, format } from "date-fns";

interface DataPoint {
  fecha: string;
  ventas: number;
  gastos: number;
  ganancia: number;
}

interface DataPie {
  name: string;
  value: number;
}

interface MonthlyData {
  [key: string]: {
    total: number;
    data: DataPoint[];
  };
}

type GraphicsProps = {
  // Define tus props aquí si hay alguna, actualmente no hay props en uso
};

const generarDatos = (startDate: Date, endDate: Date): DataPoint[] => {
  const data: DataPoint[] = [];
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

const data01: DataPie[] = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
  { name: "Group E", value: 278 },
  { name: "Group F", value: 189 },
];

const Graphics: React.FC<GraphicsProps> = ({}) => {
  const [datos, setDatos] = useState<DataPoint[]>([]);
  const [datosxMes, setDatosxMes] = useState<MonthlyData>({});

  const filtrarDatosPor = () => {
    const xmes: MonthlyData = {};

    datos.forEach((d) => {
      const año = new Date(d.fecha).getFullYear();
      const mes = new Date(d.fecha).getMonth() + 1;
      const fecha = `${mes}-${año}`;

      if (!xmes[fecha]) {
        xmes[fecha] = { total: 0, data: [] };
      }

      xmes[fecha].data.push(d);
      xmes[fecha].total += d.ventas;
    });

    setDatosxMes(xmes);
  };

  useEffect(() => {
    // Generar datos al montar el componente
    const datosSimulados = generarDatos(new Date(2023, 0, 1), new Date(2023, 11, 31));
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
          <button className="flex-1 flex justify-center items-center hover:bg-slate-900">Dia</button>
          <button className="flex-1 border-x flex justify-center items-center border-slate-800 hover:bg-slate-900">Mes</button>
          <button className="flex-1 flex justify-center items-center border-r border-slate-800 hover:bg-slate-900">Año</button>
          <button className="flex-1 flex justify-center items-center hover:bg-slate-900">Establecer periodo</button>
        </ul>
        <div className="flex flex-col w-full h-96 bg-slate-950 rounded-lg">
          <ResponsiveContainer width={"100%"} height={"100%"}>
            <BarChart data={datos}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="fecha" />
              <YAxis />
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
            <Pie data={datos} dataKey="ventas" nameKey="fecha" cx="50%" cy="50%" outerRadius={50} fill="#8884d8" />
            <Pie data={data01} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#82ca9d" label />
          </PieChart>
        </ResponsiveContainer>
        <button onClick={filtrarDatosPor}>LACALACA</button>
      </div>
    </div>
  );
};

export default Graphics;
