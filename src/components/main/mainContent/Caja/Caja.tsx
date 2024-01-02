import React, { useEffect, useState } from "react";
import NavMain from "../../navmain/NavMain";
import Export from "../buttons/Export";
import Dolar from "./SVG/DolarSvg";

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
        return { ...venta, cantidad: parseInt(venta.cantidad) };
      });

      setVentas(arrayVentas);

      // Calcula el total después de establecer las ventas
      const total = arrayVentas.reduce(
        (acumulado, venta) => acumulado + venta.cantidad,
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
            <div className="flex flex-1 flex-row bg-slate-700 h-12 items-center p-2 ">
              <div className=" flex flex-1 text-white text-lg">
                <div className=" flex items-center p-2">
                  <svg
                    width="10"
                    height="10"
                    fill="currentColor"
                    className="bi bi-circle-fill"
                    viewBox="0 0 16 16"
                  >
                    <circle cx="8" cy="8" r="8" />
                  </svg>
                </div>
                Claudio Carles
              </div>
              <div className=" flex flex-1 flex-row items-center text-white text-lg">
                <div className=" flex items-center p-2">
                  <Dolar></Dolar>
                </div>
                1.200.300
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
              <div className=" w-full space-y-3 flex flex-col ">
                <div className="flex flex-1 flex-row bg-slate-700  items-center ">
                  <div className=" flex flex-1 flex-row items-center h-12 text-white text-lg">
                    <div className=" flex items-center pl-4 pr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="currentColor"
                        className="bi bi-cash"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4" />
                        <path d="M0 4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V6a2 2 0 0 1-2-2z" />
                      </svg>
                    </div>
                    Efectivo
                  </div>
                  <div className=" flex flex-1 flex-row items-center text-white text-lg">
                    <div className=" flex items-center p-2">
                      <svg
                        width="25"
                        height="25"
                        fill="currentColor"
                        className="bi bi-currency-dollar"
                        viewBox="0 0 16 16"
                      >
                        <path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718H4zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73l.348.086z" />
                      </svg>
                    </div>
                    1.200.300
                  </div>
                </div>
                <div className="flex flex-1 flex-row bg-slate-700 h-12  items-center p-2 ">
                  <div className=" flex flex-1 flex-row items-center text-white text-lg">
                    <div className=" flex items-center p-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="currentColor"
                        className="bi bi-credit-card"
                        viewBox="0 0 16 16"
                      >
                        <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z" />
                        <path d="M2 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z" />
                      </svg>
                    </div>
                    Tarjeta Debito
                  </div>
                  <div className=" flex flex-1 flex-row items-center text-white text-lg">
                    <div className=" flex items-center p-2">
                      <svg
                        width="25"
                        height="25"
                        fill="currentColor"
                        className="bi bi-currency-dollar"
                        viewBox="0 0 16 16"
                      >
                        <path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718H4zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73l.348.086z" />
                      </svg>
                    </div>
                    1.200.300
                  </div>
                </div>
                <div className="flex flex-1 flex-row bg-slate-700 h-12 items-center p-2 ">
                  <div className=" flex flex-1 flex-row items-center text-white text-lg">
                    <div className=" flex items-center p-2">
                      <svg
                        width="25"
                        height="25"
                        fill="currentColor"
                        className="bi bi-credit-card-2-back"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5z" />
                        <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm13 2v5H1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1m-1 9H2a1 1 0 0 1-1-1v-1h14v1a1 1 0 0 1-1 1" />
                      </svg>
                    </div>
                    Tarjeta Credito
                  </div>
                  <div className=" flex flex-1 flex-row items-center text-white text-lg">
                    <div className=" flex items-center p-2">
                      <svg
                        width="25"
                        height="25"
                        fill="currentColor"
                        className="bi bi-currency-dollar"
                        viewBox="0 0 16 16"
                      >
                        <path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718H4zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73l.348.086z" />
                      </svg>
                    </div>
                    1.200.300
                  </div>
                </div>
                <div className="flex flex-1 flex-row bg-slate-700 h-12 items-center p-2 ">
                  <div className=" flex flex-1 flex-row items-center text-white text-lg">
                    <div className=" flex items-center p-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="currentColor"
                        className="bi bi-card-checklist"
                        viewBox="0 0 16 16"
                      >
                        <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z" />
                        <path d="M7 5.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0M7 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0" />
                      </svg>
                    </div>
                    Cheque
                  </div>
                  <div className=" flex flex-1 flex-row items-center text-white text-lg">
                    <div className=" flex items-center p-2">
                      <svg
                        width="25"
                        height="25"
                        fill="currentColor"
                        className="bi bi-currency-dollar"
                        viewBox="0 0 16 16"
                      >
                        <path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718H4zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73l.348.086z" />
                      </svg>
                    </div>
                    1.200.300
                  </div>
                </div>
                <div className="flex flex-1 flex-row bg-slate-700 h-12 items-center p-2 ">
                  <div className=" flex flex-1 flex-row items-center text-white text-lg">
                    <div className=" flex items-center p-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="currentColor"
                        className="bi bi-shuffle"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M0 3.5A.5.5 0 0 1 .5 3H1c2.202 0 3.827 1.24 4.874 2.418.49.552.865 1.102 1.126 1.532.26-.43.636-.98 1.126-1.532C9.173 4.24 10.798 3 13 3v1c-1.798 0-3.173 1.01-4.126 2.082A9.624 9.624 0 0 0 7.556 8a9.624 9.624 0 0 0 1.317 1.918C9.828 10.99 11.204 12 13 12v1c-2.202 0-3.827-1.24-4.874-2.418A10.595 10.595 0 0 1 7 9.05c-.26.43-.636.98-1.126 1.532C4.827 11.76 3.202 13 1 13H.5a.5.5 0 0 1 0-1H1c1.798 0 3.173-1.01 4.126-2.082A9.624 9.624 0 0 0 6.444 8a9.624 9.624 0 0 0-1.317-1.918C4.172 5.01 2.796 4 1 4H.5a.5.5 0 0 1-.5-.5"
                        />
                        <path d="M13 5.466V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192zm0 9v-3.932a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192z" />
                      </svg>
                    </div>
                    Transferencias
                  </div>
                  <div className=" flex flex-1 flex-row items-center text-white text-lg">
                    <div className=" flex items-center p-2">
                      <svg
                        width="25"
                        height="25"
                        fill="currentColor"
                        className="bi bi-currency-dollar"
                        viewBox="0 0 16 16"
                      >
                        <path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718H4zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73l.348.086z" />
                      </svg>
                    </div>
                    1.200.300
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
                  <div className=" flex flex-1 flex-row items-center h-12 text-white text-lg">
                    <div className=" flex items-center p-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="currentColor"
                        className="bi bi-cash"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4" />
                        <path d="M0 4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V6a2 2 0 0 1-2-2z" />
                      </svg>
                    </div>
                    Nafta
                  </div>
                  <div className=" flex flex-1 flex-row items-center text-white text-lg">
                    <div className=" flex items-center p-2">
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
                    -1.200.300
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
          {ventasEchas()}
          <div className=" bg-slate-800 h-1/5 w-full flex flex-col border-t-4 border-black">
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
            <div className="flex-1 flex flex-row border-t-4 border-black">
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
