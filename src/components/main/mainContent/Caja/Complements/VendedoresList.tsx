import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { storeType } from "../../../../../types"; // Ajusta la ruta según sea necesario
import { parse, format } from "date-fns";
import { FaUserTie } from "react-icons/fa";

interface VendedoresListProps {
  fecha: string;
}

const VendedoresList: React.FC<VendedoresListProps> = ({ fecha }) => {
  const sales = useSelector((state: storeType) => state.saleState);
  const [vendedores, setVendedores] = useState<
    { vendedor: string; totalVendido: number }[]
  >([]);

  useEffect(() => {
    const vendedoresMap: { [key: string]: number } = {};
    const parsedFecha = parse(fecha, "yyyy-MM-dd", new Date());

    // Agrupar ventas por vendedor y sumar el total vendido en la fecha seleccionada
    sales.forEach((venta) => {
      const ventaFecha = parse(venta.dateOfRegister, "dd-MM-yyyy", new Date());
      if (
        format(ventaFecha, "yyyy-MM-dd") === format(parsedFecha, "yyyy-MM-dd")
      ) {
        const vendedor = venta.seller.name;
        const totalVendido = Number(venta.sold); // Aseguramos que totalVendido es un número

        if (vendedoresMap[vendedor]) {
          vendedoresMap[vendedor] += totalVendido;
        } else {
          vendedoresMap[vendedor] = totalVendido;
        }
      }
    });

    // Convertir el objeto en un array de objetos { vendedor, totalVendido }
    const vendedoresArray = Object.keys(vendedoresMap).map((vendedor) => ({
      vendedor,
      totalVendido: vendedoresMap[vendedor],
    }));

    setVendedores(vendedoresArray);
  }, [sales, fecha]);

  return (
    <div className="flex flex-1 flex-col">
      {vendedores.map((vendedor, index) => (
        <div
          key={index}
          className="flex flex-row text-lg text-white h-12 border-b-1 border-gray-600"
        >
          <div className="flex flex-1 flex-row">
            <div className="flex flex-1">
              <div className="flex pr-5 pl-5 items-center">
                <FaUserTie size={30} />
              </div>
              <div className="flex flex-1 items-center text-xl">
                {vendedor.vendedor}
              </div>
            </div>
            <div className="flex flex-1 items-center text-xl">
              $ {vendedor.totalVendido.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VendedoresList;
