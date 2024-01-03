import React, { useEffect, useState } from "react";
import NavMain from "../../navmain/NavMain";
import Export from "../buttons/Export";
import Dolar from "../../../../assets/MAINSVGS/Caja SVG/DolarSignoSvg";
import PuntoSVG from "../../../../assets/MAINSVGS/Caja SVG/PuntoSVG";
import DolarBilleteSvg from "../../../../assets/MAINSVGS/Caja SVG/DolarBilleteSvg";
import TarjetaDebitoSvg from "../../../../assets/MAINSVGS/Caja SVG/TarjetaDebitoSvg";
import TarjetaCreditoSvg from "../../../../assets/MAINSVGS/Caja SVG/TarjetaCreditoSvg";
import ChequeSvg from "../../../../assets/MAINSVGS/Caja SVG/ChequeSvg";
import TransferenciaSvg from "../../../../assets/MAINSVGS/Caja SVG/TransferenciaSvg";
import SalesList from "./Complements/SalesList";

interface VentastProps {
  //PROPS
}

const Caja: React.FC<VentastProps> = (
  {
    /*PROPS*/
  }
) => {
  const [ventas, setVentas] = useState([]);
  const [totalCantidad, setTotalCantidad] = useState(0);

  function obtenerVentas() {
    window.api.enviarEvento("obtener-ventas");
    console.log("obtner ventas se llamo");
  }

  function ventasEchas() {
    return (
      <div className=" flex flex-1 bg-slate-800 pt-2 ">
        <div className=" w-10/12 space-y-2 flex-col">
          {ventas.map((e) => {
            return (
              <div
                key={e._id}
                className="flex flex-1 flex-row bg-slate-700 h-12 rounded-e-lg items-center p-2 "
              >
                <div className=" flex flex-1 flex-row items-center h-12 text-white text-lg">
                  <div className=" flex items-center p-2"></div>
                  {e.articulo.nombreArticulo}
                </div>
                <div className=" flex flex-1 flex-row items-center text-green-400 text-lg">
                  <div className=" flex items-center p-2">
                    +
                    <svg
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="bi bi-currency-dollar"
                      viewBox="0 0 16 16"
                    >
                      <path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718H4zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73l.348.086z" />
                    </svg>
                  </div>
                  <p className="">{e.cantidad}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  useEffect(() => {
    obtenerVentas();
    window.api.recibirEvento("respuesta-obtener-ventas", (e) => {
      console.log("ME EJECUTO A LA PERFECCIONE", e);

      const arrayVentas = e.map((venta) => {
        // Asegúrate de que cantidad sea un número, aquí se asume que es un entero
        return { ...venta, cantidad: parseInt(venta.sold) };
      });

      setVentas(arrayVentas);

      // Calcula el total después de establecer las ventas
      const total = arrayVentas.reduce(
        (acumulado, venta) => acumulado + venta.sold,
        0
      );
      setTotalCantidad(total);
    });
  }, []);

  //////////////total a fabor

  return (
    <div className="flex flex-col flex-1">
      <div className="flex-2 border-b-2 border-slate-100">
        <NavMain title="Caja">
          <Export></Export>
        </NavMain>
      </div>
      <div className="flex flex-grow bg-slate-800 p-5 space-x-8 relative">
        <div className=" flex flex-1 flex-col bg-red-400  border-4 border-black ">
          <div className=" flex flex-2 bg-slate-800 items-center border-b-2 justify-center h-16  ">
            <div className=" text-white text-2xl">Vendedor</div>
          </div>
          <div className=" flex flex-1 bg-slate-800 pt-2 ">
            <div className="flex flex-1 flex-row text-lg  text-white bg-slate-700 h-12 items-center pl-5 ">
              <div className=" flex flex-1 flex-row items-center space-x-2 ">
                <PuntoSVG /> <p>Claudio Carles</p>
              </div>
              <div className=" flex flex-1 flex-row items-center space-x-2 ">
                <Dolar /> <p>1.200.300</p>
              </div>
            </div>
          </div>
        </div>
        <div className=" flex flex-1 flex-col h-full space-y-10">
          <div className=" flex flex-1 flex-col h-1/2 bg-slate-800 space-y-3 border-4 border-black ">
            <div
              className=" flex flex-2 bg-slate-800 items-center justify-center h-16 border-b-2 border-white
          border-x-slate-800"
            >
              <div className=" text-white text-2xl">Formas De Pago</div>
            </div>
            <div className=" flex flex-1 flex-col bg-slate-800 items-center">
              <div className=" w-full space-y-6 flex flex-col ">
                <div className="flex flex-1 flex-row bg-slate-700  items-center ">
                  <div className=" flex flex-1 flex-row items-center pl-4  h-12 text-white text-lg">
                    <DolarBilleteSvg /> <p className="pl-2">Efectivo</p>
                  </div>
                  <div className=" flex flex-1 flex-row items-center h-12 text-white text-lg">
                    <Dolar width="25" height="25" />{" "}
                    <p className="pl-2">1.200.300</p>
                  </div>
                </div>

                <div className="flex flex-1 flex-row bg-slate-700 h-12  items-center p-2 ">
                  <div className="flex flex-1 flex-row items-center text-white text-lg pl-2">
                    <TarjetaDebitoSvg /> <p className="pl-2">Tarjeta Debito</p>
                  </div>
                  <div className="flex flex-1 flex-row items-center text-white text-lg pl-2">
                    <Dolar width="25" height="25" />{" "}
                    <p className="pl-2">1.200.300</p>
                  </div>
                </div>

                <div className="flex flex-1 flex-row bg-slate-700 h-12 items-center p-2 ">
                  <div className="flex flex-1 flex-row items-center text-white text-lg pl-2">
                    <TarjetaCreditoSvg />
                    <p className="pl-2">Tarjeta Credito</p>
                  </div>
                  <div className="flex flex-1 flex-row items-center text-white text-lg pl-2">
                    <Dolar width="25" height="25" />{" "}
                    <p className="pl-2">1.200.300</p>
                  </div>
                </div>

                <div className="flex flex-1 flex-row bg-slate-700 h-12 items-center p-2 ">
                  <div className="flex flex-1 flex-row items-center text-white text-lg pl-2">
                    <ChequeSvg />
                    <p className="pl-2">Cheque</p>
                  </div>
                  <div className="flex flex-1 flex-row items-center text-white text-lg pl-2">
                    <Dolar width="25" height="25" />{" "}
                    <p className="pl-2">1.200.300</p>
                  </div>
                </div>

                <div className="flex flex-1 flex-row bg-slate-700 h-12 items-center p-2 ">
                  <div className="flex flex-1 flex-row items-center text-white text-lg pl-2">
                    <TransferenciaSvg />
                    <p className="pl-2">Transferencias</p>
                  </div>
                  <div className="flex flex-1 flex-row items-center text-white text-lg pl-2">
                    <Dolar width="25" height="25" />{" "}
                    <p className="pl-2">1.200.300</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className=" flex flex-1 flex-col h-1/2 bg-red-900  border-4 border-black">
            <div className=" flex flex-2 bg-slate-800 items-center border-b-2 justify-center h-16">
              <div className=" text-white text-2xl">Cuentas</div>
            </div>
            <div className=" flex flex-1 bg-slate-800 p-3 ">
              <div className=" w-full space-y-2 flex-col">
                <div className="flex flex-1 flex-row bg-slate-700 h-12 rounded-lg items-center p-2 ">
                  <div className="flex flex-1 flex-row items-center text-white text-lg pl-2">
                    <DolarBilleteSvg />
                    <p className="pl-2">Nafta</p>
                  </div>
                  <div className="flex flex-1 flex-row items-center text-white text-lg pl-2">
                    <Dolar width="25" height="25" />{" "}
                    <p className="pl-2">-1.200.300</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className=" flex flex-1 flex-col bg-red-100 border-4 border-black">
          <div className=" flex flex-2 bg-slate-800 border-b-2 items-center justify-center h-16">
            <div className=" text-white text-2xl">Transacciones</div>
          </div>
          <SalesList ventas={ventas} />
          <div className=" bg-slate-800 h-1/5 w-full flex flex-col border-t-4 border-black border-opacity-50">
            <div className="flex-1 flex flex-row pr-4 ">
              <div className="flex-1 flex text-red-600 justify-end">
                <div className="text-2xl pr-2">-</div>
                <div className="text-2xl">1.200.300</div>
              </div>
            </div>
            <div className="flex-1 flex flex-row pr-4">
              <div className="flex-1 flex text-lime-500 justify-end">
                <div className="text-2xl pr-2">+</div>
                <div className="text-2xl ">{totalCantidad}</div>
              </div>
            </div>
            <div className="flex-1 flex flex-row border-t-4 border-black border-opacity-50">
              <div className="flex-1 flex flex-row text-white ">
                <div className=" flex-1 flex text-2xl pr-2 justify-end">
                  Total Caja
                </div>
                <div className=" flex-1 flex text-2xl justify-end pr-4">
                  1.200.300
                </div>
              </div>
            </div>
            <div className="flex-1 flex bg-sky-500 text-2xl items-center justify-center hover:bg-sky-600 active:bg-sky-800">
              <div>Abrir Caja</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Caja;
