import React, { useEffect, useState } from "react";
import PuntoSVG from "/src/assets/MAINSVGS/Caja SVG/PuntoSVG";
import UsuarioSVG from "/src/assets/MAINSVGS/Caja SVG/UsuarioSVG";

function VendedoresList() {
  const [ventas, setVentas] = useState([]);

  useEffect(() => {
    ipcRenderer.send("get-sales");

    ipcRenderer.on("response-get-sales", (event, response) => {
      // Crear un objeto para acumular las ventas por vendedor
      const ventasPorVendedor = response.reduce((acc, venta) => {
        if (acc[venta.comprador.nombre]) {
          acc[venta.comprador.nombre].sold += venta.sold;
        } else {
          acc[venta.comprador.nombre] = { ...venta };
        }
        return acc;
      }, {});

      // Convertir el objeto a un array para poder mapearlo en el render
      const ventasArray = Object.values(ventasPorVendedor);
      setVentas(ventasArray);
    });

    return () => {
      ipcRenderer.removeAllListeners("response-get-sales");
    };
  }, []);

  return (
    <div className="flex flex-1 flex-col">
      {ventas.map((venta, index) => (
        <div
          key={index}
          className="flex flex-row text-lg text-white h-12 pl-5 border-b-1 border-gray-600"
        >
          <div className="flex flex-1 flex-row items-center space-x-2">
            <UsuarioSVG /> <p>{venta.comprador.nombre}</p>
          </div>

          <div className="flex flex-1 flex-row items-center space-x-2">
            <p>${venta.sold}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default VendedoresList;
