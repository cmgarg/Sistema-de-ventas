import React, { useEffect, useState } from "react";
import NavMain from "../../navmain/NavMain";
import SalesList from "./Complements/SalesList";
import VendedoresList from "./Complements/VendedoresList";
import { FaMoneyBillWave } from "react-icons/fa";
import { IoCard } from "react-icons/io5";
import { FaCreditCard } from "react-icons/fa";
import { FaMoneyCheckDollar, FaMoneyBillTransfer } from "react-icons/fa6";
import { BsQrCodeScan } from "react-icons/bs";

interface VentastProps {
  //PROPS
}

const Caja: React.FC<VentastProps> = (
  {
    //PROPS
  }
) => {
  const [ventas, setVentas] = useState([]);
  const [totalCantidad, setTotalCantidad] = useState(0);
  const [totalCuentas, setTotalCuentas] = useState(0);
  const [cuentasP, setCuentasP] = useState([]);

  useEffect(() => {
    obtenerVentas();
  }, []);

  function obtenerVentas() {
    window.api.enviarEvento("get-sales");
    console.log("obtener ventas se llamó");
  }

  const [fecha, setFecha] = useState(() => {
    const fechaActual = new Date();
    const offset = fechaActual.getTimezoneOffset() * 60000; // Diferencia en milisegundos entre UTC y la zona horaria local
    const fechaLocal = new Date(fechaActual.getTime() - offset);
    return fechaLocal.toISOString().split("T")[0];
  });

  function sumaTotal() {
    return totalCantidad - totalCuentas;
  }

  return (
    <div className="flex flex-col flex-1">
      <div className="flex-2 pt-3">
        <NavMain title="Caja">
          <input
            className="text-2xl text-white bg-inherit border border-gray-600 rounded-lg p-1 fecha-input fecha-input:focus mr-10 text-center"
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
        </NavMain>
      </div>
      <div className="flex flex-grow p-5 space-x-8 relative">
        <div className="flex flex-1 flex-col border border-gray-600 rounded-lg">
          <div className="flex flex-2 items-center border border-gray-600 justify-center h-16">
            <div className="text-white text-2xl">Vendedor</div>
          </div>
          <div className="flex flex-col pt-2 h-[55rem] overflow-auto">
            <VendedoresList fecha={fecha} />
          </div>
        </div>
        <div className="flex flex-1 flex-col h-full space-y-10">
          <div className="flex flex-1 flex-col h-1/2 space-y-3 rounded-lg border border-gray-600">
            <div className="flex flex-2 items-center justify-center h-16 border-b-1 border-gray-600">
              <div className="text-white text-2xl">Formas De Pago</div>
            </div>
            <div className="flex flex-1 flex-col items-center">
              <div className="w-full space-y-6 flex flex-col">

                <div className="flex flex-1 flex-row h-12 items-center  border-b-1 border-gray-600 pt-2 pb-2">
                  <div className="flex flex-1 flex-row items-center text-white text-lg pl-2">
                    <FaMoneyBillWave size={30}/>
                    <p className="pl-2">Efectivo</p>
                  </div>
                  <div className="flex flex-1 flex-row items-center text-white text-lg pl-2">
                    $<p className="pl-2">1,200,300</p>
                  </div>
                </div>

                <div className="flex flex-1 flex-row h-12 items-center  border-b-1 border-gray-600 pb-2">
                  <div className="flex flex-1 flex-row items-center text-white text-lg pl-2">
                    <IoCard size={30} />
                    <p className="pl-2">Tarjeta Débito</p>
                  </div>
                  <div className="flex flex-1 flex-row items-center text-white text-lg pl-2">
                    $<p className="pl-2">1,200,300</p>
                  </div>
                </div>

                <div className="flex flex-1 flex-row h-12 items-center  border-b-1 border-gray-600 pb-2">
                  <div className="flex flex-1 flex-row items-center text-white text-lg pl-2">
                    <FaCreditCard size={30} />
                    <p className="pl-2">Tarjeta Crédito</p>
                  </div>
                  <div className="flex flex-1 flex-row items-center text-white text-lg pl-2">
                    $<p className="pl-2">1,200,300</p>
                  </div>
                </div>

                <div className="flex flex-1 flex-row h-12 items-center  border-b-1 border-gray-600 pb-2">
                  <div className="flex flex-1 flex-row items-center text-white text-lg pl-2">
                    <FaMoneyCheckDollar size={30} />
                    <p className="pl-2">Cheque</p>
                  </div>
                  <div className="flex flex-1 flex-row items-center text-white text-lg pl-2">
                    $<p className="pl-2">1,200,300</p>
                  </div>
                </div>

                <div className="flex flex-1 flex-row h-12 items-center  border-b-1 border-gray-600 pb-2">
                  <div className="flex flex-1 flex-row items-center text-white text-lg pl-2">
                    <FaMoneyBillTransfer size={30} />
                    <p className="pl-2">Transferencias</p>
                  </div>
                  <div className="flex flex-1 flex-row items-center text-white text-lg pl-2">
                    $<p className="pl-2">1,200,300</p>
                  </div>
                </div>

                <div className="flex flex-1 flex-row h-12 items-center  border-b-1 border-gray-600 pb-2">
                  <div className="flex flex-1 flex-row items-center text-white text-lg pl-2">
                    
                      <BsQrCodeScan size={30} />
                    <p className="pl-2">QR</p>
                  </div>
                  <div className="flex flex-1 flex-row items-center text-white text-lg pl-2">
                    $<p className="pl-2">1,200,300</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-1 flex-col h-1/2 rounded-lg border border-gray-600 pb-2">
            <div className="flex flex-2 items-center border-b border-gray-600 justify-center h-16">
              <div className="text-white text-2xl">Cuentas</div>
            </div>
            <div className="flex h-[24.6rem] overflow-auto">
              <div className="w-full space-y-2 flex-col ">
                {cuentasP.map((e) => {
                  return (
                    <div
                      key={e._id}
                      className="flex flex-1 flex-row h-14 items-center p-2 border-b-2 border-gray-600"
                    >
                      <div className="flex flex-1 flex-row items-center text-white text-lg pl-2">
                        • <p className="pl-2">{e.descripcion}</p>
                      </div>
                      <div className="flex flex-1 flex-row items-center text-white text-lg pl-2">
                        <p className="pl-2">$ {Number(e.pay).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-1 flex-col">
          <div className="flex flex-1 flex-col rounded-lg border border-gray-600">
            <div className="flex flex-2 border-b-1 border-gray-600 items-center justify-center h-16">
              <div className="text-white text-2xl">Transacciones</div>
            </div>
            <div className="flex overflow-auto w-full h-[46rem]">
              <SalesList
                ventas={ventas}
                fecha={fecha}
                setTotalCantidad={setTotalCantidad}
                setTotalCuentas={setTotalCuentas}
                setCuentasP={setCuentasP}
              />
            </div>
            <div className=" w-full flex flex-col border-t-1 border-gray-600 border-opacity-50">
              <div className="flex-1 flex flex-row pr-4 items-end">
                <div className="flex-1 flex text-green-600 justify-end">
                  <div className="text-2xl p-1">${Number(totalCantidad).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                </div>
              </div>
              <div className="flex-1 flex flex-row pr-4 items-end ">
                <div className="flex-1 flex text-red-600 justify-end">
                  <div className="text-2xl p-1">${Number(totalCuentas).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                </div>
              </div>
              <div className="flex-1 flex flex-row border-t-1 border-gray-600 border-opacity-50">
                <div className="flex-1 flex flex-row text-white items-center">
                  <div className="flex text-2xl pl-5">Total Caja</div>
                  <div className="flex-1 flex text-2xl justify-end p-4">
                    $ {Number(sumaTotal()).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Caja;
