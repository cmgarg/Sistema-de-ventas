import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface SalesListProps {
  ventas: any[];
  fecha: string;
  setTotalCantidad: (cantidad: number) => void;
  setTotalCuentas: (cantidad: number) => void;
  setCuentasP: (cuentas: any[]) => void;
}

const SalesList: React.FC<SalesListProps> = ({
  ventas,
  fecha,
  setTotalCantidad,
  setTotalCuentas,
  setCuentasP,
}) => {
  const [cuentas, setCuentas] = useState<object[]>([]);
  const dispatch = useDispatch();
  const sales = useSelector((state: storeType) => state.saleState);
  const [ventasNuevas, setVentasNuevas] = useState([]);
  
  useEffect(() => {
    // Función para filtrar las ventas según la fecha
    const filtrarVentasPorFecha = (ventas: any[], fecha: string) => {
      const fechaFormateada = fecha.split("-").reverse().join("-");
      return ventas.filter((venta) => venta.dateOfRegister === fechaFormateada);
    };
    
    const filtrarCuentasPorFecha = (cuentas: any[], fecha: string) => {
      const fechaFormateada = fecha.split("-").join("-");
      return cuentas.filter((cuenta) => cuenta.date === fechaFormateada);
    };

    // Filtrar las ventas y las cuentas
    const ventasFiltradas = filtrarVentasPorFecha(sales, fecha);
    setVentasNuevas(ventasFiltradas);
    const totalVentas = ventasFiltradas.reduce((acumulado, venta) => {
      return acumulado + Number(venta.sold);
    }, 0);
    
    setTotalCantidad(totalVentas || 0);

    window.api.enviarEvento("get-accountToPay");

    const handleAccounts = (accounts: any[]) => {
      const cuentasFiltrada = filtrarCuentasPorFecha(accounts, fecha);
      setCuentas(cuentasFiltrada);
      setCuentasP(cuentasFiltrada);

      const totalcuentas = cuentasFiltrada.reduce((acumulado, cuenta) => {
        const pagoNumerico = parseFloat(cuenta.pay.replace(/[^0-9.-]+/g, ""));
        return acumulado + pagoNumerico;
      }, 0);
      setTotalCuentas(totalcuentas);
    };

    window.api.recibirEvento("response-get-accountToPay", handleAccounts);

    return () => {
      window.api.removeListener("response-get-accountToPay", handleAccounts);
    };
  }, [ventas, fecha, setTotalCantidad, setTotalCuentas, setCuentasP, sales]);

  return (
    <div className="flex flex-1 pt-2 flex-col">
      <div className="flex flex-col">
        <div className="w-[27rem]">
          {ventasNuevas.map((e) => (
            <div
              key={e._id}
              className="flex flex-1 flex-row h-12 rounded-e-lg items-center p-2 border border-gray-600 mb-2"
            >
              <div className="flex flex-1 flex-row items-center h-12 text-white text-lg">
                <div className="flex items-center p-2"></div>
                {e.seller.name}
              </div>
              <div className="flex flex-1 flex-row items-center text-green-400 text-lg">
                <div className="flex items-center p-2">$</div>
                <p className="">{Number(e.sold).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-end">
        <div className="min-w-[27rem] max-w-full w-full">
          {cuentas.map((e) => (
            <div
              key={e._id}
              className="flex flex-1 flex-row h-12 rounded-s-lg items-center p-2 border border-gray-600 mb-2"
            >
              <div className="flex flex-1 flex-row items-center h-12 text-white text-lg justify-end pr-3">
                {e.descripcion}
              </div>
              <div className="flex flex-1 flex-row items-center text-red-400 text-lg justify-end">
                <p className="">$ {Number(e.pay).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SalesList;
