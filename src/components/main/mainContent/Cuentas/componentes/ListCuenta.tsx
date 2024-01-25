import React, { useState, useEffect } from "react";
import CalendarioSGV from "../../../../../assets/MAINSVGS/Cuentas SVG/CalendarioSGV";
import {
  isAfter,
  isEqual,
  format,
  addMonths,
  subMonths,
  getMonth,
  getYear,
  startOfMonth,
} from "date-fns";
import { es } from "date-fns/locale";
import MenuSGV from "../../../../../assets/MAINSVGS/Cuentas SVG/MenuSVG";

interface ListCuentaProps {
  Cuentas: any[];
}

const ListCuenta: React.FC<ListCuentaProps> = ({ Cuentas }) => {
  const [fechaActual, setFechaActual] = useState(new Date());

  const colores = ["bg-slate-600", "bg-slate-900"];

  const [divExpandido, setDivExpandido] = useState<string>("");

  useEffect(() => {
    console.log(Cuentas);
  }, [Cuentas]);

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const getMes = (fecha: Date) => {
    return capitalizeFirstLetter(format(fecha, "MMMM yyyy", { locale: es }));
  };

  const handleWheel = (event: React.WheelEvent) => {
    if (event.deltaY < 0) {
      // Scroll hacia arriba - Mostrar meses anteriores
      setFechaActual((fechaAnterior) => subMonths(fechaAnterior, 1));
    } else if (event.deltaY > 0) {
      // Scroll hacia abajo - Mostrar meses siguientes
      setFechaActual((fechaAnterior) => addMonths(fechaAnterior, 1));
    }
  };

  /////Funcion q filtra cuantas varias

  const filtrarCuentasPorFecha = (fecha: Date) => {
    const mes = getMonth(fecha);
    const anio = getYear(fecha);

    const cuentasRegularesMesActual = Cuentas.filter((cuenta) => {
      const fechaCuenta = new Date(cuenta.date);
      return getMonth(fechaCuenta) === mes && getYear(fechaCuenta) === anio;
    });

    return [...cuentasRegularesMesActual];
  };

  // Cuentas para los meses específicos
  const cuentasMesActual = filtrarCuentasPorFecha(fechaActual);
  const cuentasProximoMes = filtrarCuentasPorFecha(addMonths(fechaActual, 1));
  const cuentasMesSiguiente = filtrarCuentasPorFecha(addMonths(fechaActual, 2));

  /////Funcion q filtra cuantas vencimiento mensual

  const obtenerCuentasVencimientoMensual = (fecha: Date) => {
    const mes = getMonth(fecha);
    const anio = getYear(fecha);

    return Cuentas.filter(
      (cuenta) => cuenta.tipodegasto === "Vencimiento Mensual"
    )
      .map((cuenta) => {
        const dia = parseInt(cuenta.date); // Asume que cuenta.date es un string con el número del día
        const fechaAjustada = new Date(anio, mes, dia);
        return { ...cuenta, date: format(fechaAjustada, "yyyy-MM-dd") };
      })
      .filter((cuenta) => {
        const fechaCuenta = new Date(cuenta.date);
        // Compara si la fecha de la cuenta es igual o posterior al primer día del mes actual
        return (
          isAfter(fechaCuenta, startOfMonth(new Date())) ||
          isEqual(fechaCuenta, startOfMonth(new Date()))
        );
      });
  };

  // Cuentas de vencimiento mensual para el mes actual, el próximo mes y el mes siguiente
  const cuentasVencimientoMesActual =
    obtenerCuentasVencimientoMensual(fechaActual);

  const cuentasVencimientoProximoMes = obtenerCuentasVencimientoMensual(
    addMonths(fechaActual, 1)
  );
  const cuentasVencimientoMesSiguiente = obtenerCuentasVencimientoMensual(
    addMonths(fechaActual, 2)
  );

  /////////sumas de la cantidad de cuenta mensual
  const sumaVencimientoMesActual = cuentasVencimientoMesActual.reduce(
    (suma, cuenta) => suma + parseFloat(cuenta.pay || 0),
    0
  );
  const sumaMesActual = cuentasMesActual.reduce(
    (suma, cuenta) => suma + parseFloat(cuenta.pay || 0),
    0
  );
  const sumaTotal = sumaVencimientoMesActual + sumaMesActual;

  const sumaVencimientoMesActual2 = cuentasVencimientoProximoMes.reduce(
    (suma, cuenta) => suma + parseFloat(cuenta.pay || 0),
    0
  );
  const sumaMesActual2 = cuentasProximoMes.reduce(
    (suma, cuenta) => suma + parseFloat(cuenta.pay || 0),
    0
  );
  const sumaTotal2 = sumaVencimientoMesActual2 + sumaMesActual2;

  const sumaVencimientoMesActual3 = cuentasVencimientoMesSiguiente.reduce(
    (suma, cuenta) => suma + parseFloat(cuenta.pay || 0),
    0
  );
  const sumaMesActual3 = cuentasMesSiguiente.reduce(
    (suma, cuenta) => suma + parseFloat(cuenta.pay || 0),
    0
  );
  const sumaTotal3 = sumaVencimientoMesActual3 + sumaMesActual3;

  //////// Funcion para poder expandir los div y ocultar los otros 2

  const expandirDiv = (divId:string) => {
    if (divExpandido === divId) {
      setDivExpandido("");
    } else {
      setDivExpandido(divId);
    }
  };

  const esDivVisible = (divId:string) => {
    return divExpandido === "" || divExpandido === divId;
  };

  return (
    <div onWheel={handleWheel} className="flex flex-col space-y-1 ">

      <div
        className={`flex flex-row  border-t-2 border-gray-900 ${
          divExpandido === "div1" ? "h-full" : "h-72"
        }
        ${esDivVisible("div1") ? "flex" : "hidden"}`}
      >
        <div
          className="flex w-8 h-8 absolute  rounded-e-lg bg-slate-900 hover:bg-slate-600"
          onClick={() => {
            expandirDiv("div1"), console.log(divExpandido === "div1");
          }}
        >
          <div className="flex w-8 h-8 items-center justify-center">
            <MenuSGV fill="white" height="20" width="20" />
          </div>
        </div>

        <div className="flex w-44 bg-slate-700 text-white justify-center items-center flex-col">
          <CalendarioSGV fill=" white" height="80" width="80" />
          <div className=" pt-3">{getMes(fechaActual)}</div>
          <div className="pt-24">Total: {sumaTotal}</div>
        </div>

        <div
          className={`flex-1  flex flex-col  text-white ${
            divExpandido === "div1" ? "mi-altura bg-slate-900 overflow-auto" : "overflow-auto "
          } `}
        >
          {cuentasVencimientoMesActual.length > 0 ? (
            cuentasVencimientoMesActual.map((cuenta, index) => (
              <div
                className={`flex h-12 flex-row ${
                  colores[index % colores.length]
                }`}
                key={index}
              >
                <div className="flex-1 flex h-12  text-white justify-center items-center">
                  {cuenta.tipodegasto}
                </div>
                <div className="flex-1 flex h-12  text-white justify-center items-center">
                  {cuenta.descripcion}
                </div>
                <div className="flex-1 flex h-12  text-white justify-center items-center">
                  {cuenta.date}
                </div>
                <div className="flex-1 flex h-12  text-white justify-center items-center">
                  {cuenta.pay}
                </div>
                <div className="flex-1 flex h-12  text-white justify-center items-center"></div>
              </div>
            ))
          ) : (
            <></>
          )}

          {cuentasMesActual.length > 0 ? (
            cuentasMesActual.map((cuenta, index) => (
              <div
                className={`flex h-12 flex-row ${
                  colores[index % colores.length]
                }`}
                key={index}
              >
                <div className="flex-1 flex h-12 text-white justify-center items-center">
                  {cuenta.tipodegasto}
                </div>
                <div className="flex-1 flex h-12 text-white justify-center items-center">
                  {cuenta.descripcion}
                </div>
                <div className="flex-1 flex h-12 text-white justify-center items-center">
                  {cuenta.date}
                </div>
                <div className="flex-1 flex h-12 text-white justify-center items-center">
                  {cuenta.pay}
                </div>
                <div className="flex-1 flex h-12 text-white justify-center items-center"></div>
              </div>
            ))
          ) : (
            <></>
          )}
        </div>
      </div>

      <div
        className={`flex relative flex-row w-full h-72 border-t-2 border-gray-900 overflow-auto ${
          esDivVisible("div2") ? "flex" : "hidden"
        }`}
      >
        <div className="flex w-44 bg-slate-700 text-white justify-center items-center flex-col">
          <CalendarioSGV fill=" white" height="80" width="80" />
          <div className=" pt-3">{getMes(addMonths(fechaActual, 1))}</div>
          <div className="pt-24">Total: {sumaTotal2}</div>
        </div>
        <div className="flex-1 flex flex-col text-white">
          {cuentasVencimientoProximoMes.length > 0 ? (
            cuentasVencimientoProximoMes.map((cuenta, index) => (
              <div
                className={`flex h-12 flex-row ${
                  colores[index % colores.length]
                }`}
                key={index}
              >
                <div className="flex-1 flex h-12  text-white justify-center items-center">
                  {cuenta.tipodegasto}
                </div>
                <div className="flex-1 flex h-12  text-white justify-center items-center">
                  {cuenta.descripcion}
                </div>
                <div className="flex-1 flex h-12  text-white justify-center items-center">
                  {cuenta.date}
                </div>
                <div className="flex-1 flex h-12  text-white justify-center items-center">
                  {cuenta.pay}
                </div>
                <div className="flex-1 flex h-12  text-white justify-center items-center"></div>
              </div>
            ))
          ) : (
            <></>
          )}

          {cuentasProximoMes.length > 0 ? (
            cuentasProximoMes.map((cuenta, index) => (
              <div
                className={`flex h-12 flex-row ${
                  colores[index % colores.length]
                }`}
                key={index}
              >
                <div className="flex-1 flex h-12 text-white justify-center items-center">
                  {cuenta.tipodegasto}
                </div>
                <div className="flex-1 flex h-12 text-white justify-center items-center">
                  {cuenta.descripcion}
                </div>
                <div className="flex-1 flex h-12 text-white justify-center items-center">
                  {cuenta.date}
                </div>
                <div className="flex-1 flex h-12 text-white justify-center items-center">
                  {cuenta.pay}
                </div>
                <div className="flex-1 flex h-12 text-white justify-center items-center"></div>
              </div>
            ))
          ) : (
            <></>
          )}
        </div>
      </div>

      <div
        className={`flex relative flex-row w-full h-72 border-t-2 border-gray-900 overflow-auto ${
          esDivVisible("div3") ? "flex" : "hidden"
        }`}
      >
        <div className="flex w-44 bg-slate-700 text-white justify-center items-center flex-col">
          <CalendarioSGV fill=" white" height="80" width="80" />
          <div className=" pt-3">{getMes(addMonths(fechaActual, 2))}</div>
          <div className="pt-24">Total: {sumaTotal3}</div>
        </div>
        <div className="flex-1 flex flex-col text-white">
          {cuentasVencimientoMesSiguiente.length > 0 ? (
            cuentasVencimientoMesSiguiente.map((cuenta, index) => (
              <div
                className={`flex h-12 flex-row ${
                  colores[index % colores.length]
                }`}
                key={index}
              >
                <div className="flex-1 flex h-12  text-white justify-center items-center">
                  {cuenta.tipodegasto}
                </div>
                <div className="flex-1 flex h-12  text-white justify-center items-center">
                  {cuenta.descripcion}
                </div>
                <div className="flex-1 flex h-12  text-white justify-center items-center">
                  {cuenta.date}
                </div>
                <div className="flex-1 flex h-12  text-white justify-center items-center">
                  {cuenta.pay}
                </div>
                <div className="flex-1 flex h-12  text-white justify-center items-center"></div>
              </div>
            ))
          ) : (
            <></>
          )}

          {cuentasMesSiguiente.length > 0 ? (
            cuentasMesSiguiente.map((cuenta, index) => (
              <div
                className={`flex h-12 flex-row ${
                  colores[index % colores.length]
                }`}
                key={index}
              >
                <div className="flex-1 flex h-12 text-white justify-center items-center">
                  {cuenta.tipodegasto}
                </div>
                <div className="flex-1 flex h-12 text-white justify-center items-center">
                  {cuenta.descripcion}
                </div>
                <div className="flex-1 flex h-12 text-white justify-center items-center">
                  {cuenta.date}
                </div>
                <div className="flex-1 flex h-12 text-white justify-center items-center">
                  {cuenta.pay}
                </div>
                <div className="flex-1 flex h-12 text-white justify-center items-center"></div>
              </div>
            ))
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListCuenta;
