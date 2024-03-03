import React, { useEffect, useState } from "react";

interface SalesListProps {
  ventas: any[];
  fecha: string;
  setTotalCantidad: (cantidad: number) => void;
  setTotalCuentas: (cantidad: number) => void;
  setCuentasP: (cantidad: number) => void;
}

const SalesList: React.FC<SalesListProps> = ({ ventas, fecha, setTotalCantidad, setTotalCuentas, setCuentasP }) => {
  const [cuentas, setCuentas] = useState<object[]>([]);

  // Función para filtrar las ventas según la fecha
  const filtrarVentasPorFecha = (ventas: any[], fecha: string) => {
    // Convertir la fecha de entrada al formato de dateOfRegister
    const fechaFormateada = fecha.split("-").reverse().join("-");
    return ventas.filter((venta) => venta.dateOfRegister === fechaFormateada);
  };
  

  // Filtrar las ventas antes de mapearlas
  const ventasFiltradas = filtrarVentasPorFecha(ventas, fecha);

  console.log(ventas,"estas son las ventas filtradas")

  // Calcular el total de ventas filtradas
  const totalVentas = ventasFiltradas.reduce((acumulado, venta) => acumulado + venta.sold, 0);

  // Actualizar el total de cantidad usando la función setTotalCantidad
  setTotalCantidad(totalVentas);

//////Obtener cuentas

useEffect(() => {
  // Solicitar las cuentas a pagar al backend
  window.api.enviarEvento("get-accountToPay");

  // Escuchar la respuesta del backend
  window.api.recibirEvento("response-get-accountToPay", (accounts) => {
    setCuentas(accounts);
  });
}, []);

const filtrarCuentasPorFecha = (cuentas: any[], fecha: string) => {
  // Asegurarse de que la fecha de entrada esté en el formato YYYY-MM-DD
  const fechaFormateada = fecha.split("-").join("-");
  return cuentas.filter((cuenta) => cuenta.date === fechaFormateada);
};

const cuentasFiltrada = filtrarCuentasPorFecha(cuentas, fecha);
useEffect(() => {
  setCuentasP(cuentasFiltrada);
}, [cuentasFiltrada]);

  // Calcular el total de ventas filtradas
  const totalcuentas = cuentasFiltrada.reduce((acumulado, cuenta) => {
    const pagoNumerico = parseFloat(cuenta.pay.replace(/[^0-9.-]+/g, ""));
    return acumulado + pagoNumerico;
  }, 0);
  
  // Actualizar el total de cantidad usando la función setTotalCantidad
  setTotalCuentas(totalcuentas);

 
  return (
    <div className=" flex flex-1  pt-2 flex-col">
      <div className=" flex flex-col">
        <div className="w-2/3">
        {ventasFiltradas.map((e) => {
          return (
            <div
              key={e._id}
              className="flex flex-1 flex-row h-12 rounded-e-lg items-center p-2 border border-gray-600 mb-2"
            >
              <div className=" flex flex-1 flex-row items-center h-12 text-white text-lg">
                <div className=" flex items-center p-2"></div>
                {e.articulo.nombreArticulo}
              </div>
              <div className=" flex flex-1 flex-row items-center text-green-400 text-lg">
                <div className=" flex items-center p-2">$</div>
                <p className="">{e.cantidad}</p>
              </div>
            </div>
          );
        })}
        </div>
        </div>
      <div className=" flex flex-col items-end">
        <div className="w-2/3">
        {cuentasFiltrada.map((e) => {
          return (
            <div
              key={e._id}
              className="flex flex-1 flex-row h-12 rounded-s-lg items-center p-2 border border-gray-600 mb-2">
              <div className=" flex flex-1 flex-row items-center text-red-400 text-lg justify-end">
                <p className="">$ {e.pay}</p>
              </div>
              <div className=" flex flex-1 flex-row items-center h-12 text-white text-lg justify-end pr-3">
                {e.descripcion}
              </div>
            </div>
          );
        })}
        </div>
      </div>
    </div>
  );
};

export default SalesList;
