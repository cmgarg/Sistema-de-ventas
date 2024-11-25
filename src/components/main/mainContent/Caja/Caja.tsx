import React, { useEffect, useState } from "react";
import NavMain from "../../navmain/NavMain";
import SalesList from "./Complements/SalesList";
import VendedoresList from "./Complements/VendedoresList";
import { FaMoneyBillWave } from "react-icons/fa";
import { IoCard } from "react-icons/io5";
import { FaCreditCard } from "react-icons/fa";
import { FaMoneyCheckDollar, FaMoneyBillTransfer } from "react-icons/fa6";
import { BsQrCodeScan } from "react-icons/bs";

interface Cuenta {
  _id: string;
  descripcion: string;
  pay: number;
}

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
  const [cuentasP, setCuentasP] = useState<Cuenta[]>([]);

  useEffect(() => {
    obtenerVentas();
  }, []);

  function obtenerVentas() {
    window.api.enviarEvento("get-sales");
    window.api.recibirEvento("response-get-sales", (ventasRecividas) => {
      setVentas(ventasRecividas);
    });
  }

  const [fecha, setFecha] = useState(() => {
    const fechaActual = new Date();
    const offset = fechaActual.getTimezoneOffset() * 60000; // Diferencia en milisegundos entre UTC y la zona horaria local
    const fechaLocal = new Date(fechaActual.getTime() - offset);
    return fechaLocal.toISOString().split("T")[0];
  });

  const handleFechaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFecha = e.target.value;
    const parsedFecha = new Date(newFecha);
    if (newFecha && !isNaN(parsedFecha.getTime())) {
      setFecha(newFecha);
    } else {
      console.error("Fecha inválida ingresada:", newFecha);
    }
  };

  function sumaTotal() {
    return totalCantidad - totalCuentas;
  }

  return (
    <div className="flex flex-col flex-1 h-full">
      <div className="absolute top-0 right-[339px] left-44 h-10 z-30 app-region-drag">
        <NavMain title="Caja" setLoginUser={""}>
          <input
            className="text-xs text-white bg-inherit border border-gray-600 rounded-lg app-region-no-drag p-1 fecha-input fecha-input:focus mr-10 text-center hover:bg-gray-600"
            type="date"
            value={fecha}
            onChange={handleFechaChange}
            required
          />
        </NavMain>
      </div>
      <div className="flex h-full w-full space-x-5 relative p-2">
        <div className="flex flex-1 flex-col border border-gray-600 rounded-md bg-black bg-opacity-30">
          <div className="flex border-b-1 border-gray-600 items-center justify-center h-11">
            <p className="text-white">Vendedor</p>
          </div>
          <div className="flex flex-1 overflow-auto">
            <VendedoresList fecha={fecha} />
          </div>
        </div>
        <div className="flex flex-1 flex-col space-y-3">
          <div className="flex flex-1 flex-col rounded-lg border bg-black bg-opacity-30 border-gray-600">
            <div className="flex items-center justify-center h-11 border-b-1 border-gray-600">
              <div className="text-white">Formas De Pago</div>
            </div>
            <div className="flex flex-1 flex-col">
              <div className="text-gray-400 w-full border-b border-gray-700 flex justify-around text-[10px]">
                <p>Forma</p>
                <p>Monto</p>
              </div>
              <div className="flex flex-row h-11 items-center justify-around  border-b-1 border-gray-600">
                <div className="flex flex-1 flex-row items-center text-white pl-2">
                  <FaMoneyBillWave size={30} />
                  <p className="pl-2">Efectivo</p>
                </div>
                <div className="flex flex-1 flex-row items-center text-white">
                  $<p className="pl-2">1,200,300</p>
                </div>
              </div>
              <div className="flex flex-row h-11 items-center  border-b-1 border-gray-600">
                <div className="flex flex-1 flex-row items-center text-white pl-2">
                  <IoCard size={30} />
                  <p className="pl-2">Tarjeta Débito</p>
                </div>
                <div className="flex flex-1 flex-row items-center text-white pl-2">
                  $<p className="pl-2">1,200,300</p>
                </div>
              </div>
              <div className="flex flex-row h-11 items-center  border-b-1 border-gray-600 ">
                <div className="flex flex-1 flex-row items-center text-white pl-2">
                  <FaCreditCard size={30} />
                  <p className="pl-2">Tarjeta Crédito</p>
                </div>
                <div className="flex flex-1 flex-row items-center text-white pl-2">
                  $<p className="pl-2">1,200,300</p>
                </div>
              </div>
              <div className="flex flex-row h-11 items-center  border-b-1 border-gray-600">
                <div className="flex flex-1 flex-row items-center text-white pl-2">
                  <FaMoneyCheckDollar size={30} />
                  <p className="pl-2">Cheque</p>
                </div>
                <div className="flex flex-1 flex-row items-center text-white pl-2">
                  $<p className="pl-2">1,200,300</p>
                </div>
              </div>
              <div className="flex flex-row h-11 items-center  border-b-1 border-gray-600">
                <div className="flex flex-1 flex-row items-center text-white pl-2">
                  <FaMoneyBillTransfer size={30} />
                  <p className="pl-2">Transferencias</p>
                </div>
                <div className="flex flex-1 flex-row items-center text-white pl-2">
                  $<p className="pl-2">1,200,300</p>
                </div>
              </div>
              <div className="flex flex-row h-11 items-center  border-b-1 border-gray-600">
                <div className="flex flex-1 flex-row items-center text-white pl-2">
                  <BsQrCodeScan size={30} />
                  <p className="pl-2">QR</p>
                </div>
                <div className="flex flex-1 flex-row items-center text-white pl-2">
                  $<p className="pl-2">1,200,300</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-1 flex-col rounded-lg border border-gray-600 pb-2 bg-black bg-opacity-30">
            <div className="flex items-center border-b border-gray-600 justify-center h-11">
              <div className="text-white">Cuentas</div>
            </div>
            <div className="flex flex-1 space-y-2 flex-col overflow-auto">
              <div className="text-gray-400 w-full border-b border-gray-700 flex justify-around text-[10px]">
                <p>Descripcion</p>
                <p>Monto</p>
              </div>
              {cuentasP.map((cuenta) => {
                return (
                  <div
                    key={cuenta._id}
                    className="flex flex-row h-11 items-center border-b border-gray-600 justify-evenly"
                  >
                    <div className="flex flex-row items-center text-white text-lg pl-2">
                      <p className="pl-2">{cuenta.descripcion}</p>
                    </div>
                    <div className="flex flex-row items-center text-white text-lg pl-2">
                      <p className="pl-2">
                        ${" "}
                        {Number(cuenta.pay).toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="flex flex-1 flex-col rounded-md border border-gray-600 bg-black bg-opacity-30">
          <div className="flex border-b-1 border-gray-600 items-center justify-center h-11">
            <p className="text-white">Transacciones</p>
          </div>
          <div className="flex overflow-auto w-full  flex-1">
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
                <div className="text-2xl p-1">
                  $
                  {Number(totalCantidad).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </div>
              </div>
            </div>
            <div className="flex-1 flex flex-row pr-4 items-end ">
              <div className="flex-1 flex text-red-600 justify-end">
                <div className="text-2xl p-1">
                  $
                  {Number(totalCuentas).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </div>
              </div>
            </div>
            <div className="flex-1 flex flex-row border-t-1 border-gray-600 border-opacity-50">
              <div className="flex-1 flex flex-row text-white items-center">
                <div className="flex text-2xl pl-5">Total Caja</div>
                <div className="flex-1 flex text-2xl justify-end p-4">
                  ${" "}
                  {Number(sumaTotal()).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
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
