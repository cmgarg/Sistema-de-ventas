import React, { useState, useEffect, useRef } from "react";
import { format, addMonths, subMonths, getMonth, getYear } from "date-fns";
import { es } from "date-fns/locale";
import EditarCuenta from "./EditarCuenta";
import Swal from "sweetalert2";
import { MdCheckCircleOutline } from "react-icons/md";
import { LuCalendarDays } from "react-icons/lu";
import InformacionCuentas from "./InformacionCuentas";

interface Cuenta {
  [x: string]: any;
  meses: number;
  tipodegasto: { value: string; label: string };
  date: string;
  pay: number;
  descripcion: string;
  _id: string;
  pagado: boolean;
  pagado2?: string;
  pagado3?: string;
}

interface ListCuentaProps {
  cuentas: Cuenta[];
  filtroActivo: string;
  orden: "asc" | "desc";
  getAccountsToPay: () => void;
  idcuenta: string;
}

const ListCuenta: React.FC<ListCuentaProps> = ({
  cuentas,
  filtroActivo,
  orden,
  getAccountsToPay,
  idcuenta,
}) => {
  const [fechaActual, setFechaActual] = useState<Date>(new Date());
  const [divExpandido, setDivExpandido] = useState<string>("");
  const [tieneAmbosTiposDeGasto, setTieneAmbosTiposDeGasto] = useState<
    boolean[]
  >([false, false, false]);
  const [totales, setTotales] = useState<number[]>([0, 0, 0]);
  const [estadosPagados, setEstadosPagados] = useState<{
    [id: string]: boolean;
  }>({});
  const [cuentasActualizadas, setCuentasActualizadas] = useState<Cuenta[]>([]);
  const [cuentaSeleccionada, setCuentaSeleccionada] = useState<Cuenta | null>(
    null
  );
  const [mostrarOpciones, setMostrarOpciones] = useState<boolean>(false);
  const [posicionMenu, setPosicionMenu] = useState<{ x: number; y: number }>({
    x: 0,
    y: 1000,
  });
  const [editar, setEditar] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const divRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [inforamcionCuentas, setInforamcionCuentas] = useState(false);

  // Estado para la animación de resaltado de la cuenta
  const [highlightedCuenta, setHighlightedCuenta] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (idcuenta) {
      setHighlightedCuenta(idcuenta);

      // Remover el resaltado después de 5 segundos
      const timer = setTimeout(() => {
        setHighlightedCuenta(null);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [idcuenta]);

  useEffect(() => {
    setCuentasActualizadas(cuentas);
  }, [cuentas]);

  const formatNumber = (num: number | string) => {
    const number = typeof num === "number" ? num : parseFloat(num);
    if (isNaN(number)) {
      return "0.00";
    }
    return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
  };

  const sumaTotalDeCuentas = (cuentas: Cuenta[]) => {
    return cuentas.reduce((acumulador, cuenta) => {
      const monto = cuenta.pay || 0;
      return acumulador + monto;
    }, 0);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const userTimezoneOffset = date.getTimezoneOffset() * 60000;
    const localDate = new Date(date.getTime() + userTimezoneOffset);
    return format(localDate, "dd/MM/yyyy", { locale: es });
  };

  useEffect(() => {
    const actualizarTotales = () => {
      const cuentasPorFecha = [
        fechaActual,
        addMonths(fechaActual, 1),
        addMonths(fechaActual, 2),
      ];
      const nuevosTotales = cuentasPorFecha.map((fecha) =>
        sumaTotalDeCuentas(filtrarCuentasPorFecha(fecha))
      );
      setTotales(nuevosTotales);
    };

    const verificarTiposDeGasto = () => {
      const cuentasPorFecha = [
        fechaActual,
        addMonths(fechaActual, 1),
        addMonths(fechaActual, 2),
      ];
      const nuevosEstados = cuentasPorFecha.map((fecha) => {
        const cuentasFiltradas = filtrarCuentasPorFecha(fecha);
        return (
          cuentasFiltradas.some(
            (cuenta) => cuenta.tipodegasto.value === "vencimiento-mensual"
          ) &&
          cuentasFiltradas.some(
            (cuenta) => cuenta.tipodegasto.value === "gasto-diario"
          )
        );
      });
      setTieneAmbosTiposDeGasto(nuevosEstados);
    };

    actualizarTotales();
    verificarTiposDeGasto();
  }, [cuentasActualizadas, fechaActual]);

  useEffect(() => {
    window.api.enviarEvento("solicitar-estado-pagado-inicial");

    const manejarEstadoPagadoInicial = ({
      exitoso,
      estados,
    }: {
      exitoso: boolean;
      estados: { [id: string]: boolean };
    }) => {
      if (exitoso) {
        const inicialEstadosPagados = cuentas.reduce((acc, cuenta) => {
          acc[cuenta._id] = cuenta.pagado;
          return acc;
        }, {} as { [id: string]: boolean });
        setEstadosPagados(inicialEstadosPagados);
      } else {
        console.error("Error al cargar el estado pagado inicial");
      }
    };

    window.api.recibirEvento(
      "estado-pagado-inicial",
      manejarEstadoPagadoInicial
    );

    return () => {
      window.api.removeListener(
        "estado-pagado-inicial",
        manejarEstadoPagadoInicial
      );
    };
  }, [cuentas]);

  const filtrarCuentasPorFecha = (fecha: Date) => {
    const mesReferencia = getMonth(fecha) + 1;
    const anioReferencia = getYear(fecha);
    return cuentasActualizadas.filter((cuenta) => {
      const [anioCuenta, mesCuenta] = cuenta.date.split("-").map(Number);
      return anioCuenta === anioReferencia && mesCuenta === mesReferencia;
    });
  };

  useEffect(() => {
    const manejarEstadoPagadoActualizado = ({
      exitoso,
      idCuenta,
      estadoPagado,
    }: {
      exitoso: boolean;
      idCuenta: string;
      estadoPagado: { pagado: boolean; pagado2: string; pagado3: string };
    }) => {
      if (exitoso) {
        setCuentasActualizadas((prevCuentas) =>
          prevCuentas.map((cuenta) =>
            cuenta._id === idCuenta
              ? {
                  ...cuenta,
                  pagado: estadoPagado.pagado,
                  pagado2: estadoPagado.pagado2,
                  pagado3: estadoPagado.pagado3,
                }
              : cuenta
          )
        );
      } else {
        console.error("Error al actualizar el estado pagado");
      }
    };

    window.api.recibirEvento(
      "estado-pagado-actualizado",
      manejarEstadoPagadoActualizado
    );

    return () => {
      window.api.removeListener(
        "estado-pagado-actualizado",
        manejarEstadoPagadoActualizado
      );
    };
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", manejarClicFuera);
    return () => {
      document.removeEventListener("mousedown", manejarClicFuera);
    };
  }, [mostrarOpciones]);

  const manejarClicFuera = (event: MouseEvent) => {
    if (
      mostrarOpciones &&
      menuRef.current &&
      !menuRef.current.contains(event.target as Node)
    ) {
      setMostrarOpciones(false);
    }
  };

  const handleWheel = (event: React.WheelEvent) => {
    setFechaActual((fechaAnterior) =>
      event.deltaY < 0
        ? subMonths(fechaAnterior, 1)
        : addMonths(fechaAnterior, 1)
    );
  };

  const expandirDiv = (divId: string) => {
    setDivExpandido(divExpandido === divId ? "" : divId);
  };

  const esDivVisible = (divId: string) =>
    divExpandido === "" || divExpandido === divId;

  const ordenarCuentas = (
    cuentas: Cuenta[],
    tipo: string,
    orden: "asc" | "desc"
  ) => {
    const sortedCuentas = [...cuentas];
    switch (tipo) {
      case "tipodegasto":
        const tipoOrden = orden === "asc" ? 1 : -1;
        return sortedCuentas.sort(
          (a, b) =>
            tipoOrden * a.tipodegasto.value.localeCompare(b.tipodegasto.value)
        );
      case "descripcion":
        return sortedCuentas.sort((a, b) => {
          const regex = /^\d/;
          const aIsNumber = regex.test(a.descripcion);
          const bIsNumber = regex.test(b.descripcion);
          if (aIsNumber && !bIsNumber) return orden === "asc" ? -1 : 1;
          if (!aIsNumber && bIsNumber) return orden === "asc" ? 1 : -1;
          return orden === "asc"
            ? a.descripcion.localeCompare(b.descripcion)
            : b.descripcion.localeCompare(a.descripcion);
        });
      case "fechafiltrada":
        return sortedCuentas.sort((a, b) => {
          const fechaA = new Date(`${a.date}T${a.time}`).getTime();
          const fechaB = new Date(`${b.date}T${b.time}`).getTime();
          return orden === "asc" ? fechaA - fechaB : fechaB - fechaA;
        });
      case "monto":
        return sortedCuentas.sort((a, b) =>
          orden === "asc" ? a.pay - b.pay : b.pay - a.pay
        );
      case "pagado":
        return sortedCuentas.sort((a, b) => {
          if (orden === "asc") {
            return a.pagado === b.pagado ? 0 : a.pagado ? 1 : -1;
          } else {
            return a.pagado === b.pagado ? 0 : a.pagado ? -1 : 1;
          }
        });
      default:
        return cuentas;
    }
  };

  const togglePagado = (id: string) => {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const fecha = `${year}-${month}-${day}`;

    const hora = now.toTimeString().split(" ")[0];

    setEstadosPagados((prevEstados) => {
      const updatedEstados = { ...prevEstados, [id]: !prevEstados[id] };
      window.api.enviarEvento("actualizar-estado-pagado", {
        idCuenta: id,
        estadoPagado: updatedEstados[id],
        pagado2: updatedEstados[id] ? fecha : "",
        pagado3: updatedEstados[id] ? hora : "",
      });

      setCuentasActualizadas((prevCuentas) =>
        prevCuentas.map((cuenta) =>
          cuenta._id === id
            ? {
                ...cuenta,
                pagado: updatedEstados[id],
                pagado2: updatedEstados[id] ? fecha : "",
                pagado3: updatedEstados[id] ? hora : "",
              }
            : cuenta
        )
      );

      return updatedEstados;
    });
  };

  const deleteAccount = (id: string) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, borrar cuenta",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        window.api.enviarEvento("eliminar-cuenta", { id });
        window.api.recibirEvento("cuenta-eliminada", ({ exitoso }) => {
          if (exitoso) {
            getAccountsToPay();
            Swal.fire("Eliminado", "La cuenta ha sido eliminada.", "success");
          } else {
            console.error("Error al eliminar la cuenta");
          }
        });
      }
    });
  };

  const manejarClicDerecho = (
    cuenta: Cuenta,
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();
    setCuentaSeleccionada(cuenta);
    setMostrarOpciones(true);
    const offsetX = 0;
    const offsetY = -40;
    setPosicionMenu({ x: event.pageX + offsetX, y: event.pageY + offsetY });
  };

  const cuentasPorFecha = [
    fechaActual,
    addMonths(fechaActual, 1),
    addMonths(fechaActual, 2),
  ];
  const cuentasFiltradas = cuentasPorFecha.map((fecha) =>
    filtrarCuentasPorFecha(fecha)
  );

  const cuentasOrdenadas = cuentasFiltradas.map((cuentasMes) =>
    ordenarCuentas(cuentasMes, filtroActivo, orden)
  );

  const getMes = (fecha: Date) =>
    format(fecha, "MMMM yyyy", { locale: es }).charAt(0).toUpperCase() +
    format(fecha, "MMMM yyyy", { locale: es }).slice(1);

  useEffect(() => {
    // Definir la función listener para el evento
    const manejarAccountsUpdated = (updatedAccounts) => {
      setCuentasActualizadas(updatedAccounts); // Actualizar el estado con las cuentas nuevas
    };

    // Escuchar el evento
    window.api.recibirEvento("accounts-updated", manejarAccountsUpdated);

    // Limpiar el listener cuando se desmonte el componente
    return () => {
      window.api.removeListener("accounts-updated", manejarAccountsUpdated);
    };
  }, []);

  const toggleInformacionCuentas = () => {
    setInforamcionCuentas((prevState) => !prevState);
  };

  // Función para sumar el total de cuentas pagadas
  const sumaCuentasPagadas = (cuentas: Cuenta[]) => {
    return cuentas
      .filter((cuenta) => cuenta.pagado === true) // Filtrar cuentas pagadas
      .reduce((acumulador, cuenta) => acumulador + cuenta.pay, 0); // Sumar el valor de pay
  };

  // Función para sumar el total de cuentas no pagadas
  const sumaCuentasNoPagadas = (cuentas: Cuenta[]) => {
    return cuentas
      .filter((cuenta) => cuenta.pagado === false) // Filtrar cuentas no pagadas
      .reduce((acumulador, cuenta) => acumulador + cuenta.pay, 0); // Sumar el valor de pay
  };

  return (
    <div
      onWheel={inforamcionCuentas ? null : handleWheel}
      className="flex flex-col flex-1"
    >
      {editar && cuentaSeleccionada && (
        <EditarCuenta
          onChangeModal={setEditar}
          cuentaSeleccionada={cuentaSeleccionada}
          getAccountsToPay={getAccountsToPay}
        />
      )}
      {inforamcionCuentas ? (
        <InformacionCuentas
          cierre={toggleInformacionCuentas}
          idCuenta={cuentaSeleccionada._id}
          cuentas={cuentasActualizadas}
        />
      ) : null}

      {mostrarOpciones && cuentaSeleccionada && (
        <div
          ref={menuRef}
          className="w-1/6 h-2/2 bg-gray-600 relative justify-start text-white border-gray-400 border flex flex-col z-50 overflow-hidden"
          style={{
            position: "absolute",
            left: `${posicionMenu.x}px`,
            top: `${posicionMenu.y}px`,
            backgroundColor: "rgba(30, 41, 59)",
          }}
        >
          <button
            className="p-2 border-b-1 border-gray-600 hover:bg-gray-700"
            onClick={() => {
              toggleInformacionCuentas();
              setMostrarOpciones(false);
            }}
          >
            Informacion
          </button>
          <button
            className="p-2 border-b-1 border-gray-600 hover:bg-gray-700"
            onClick={() => {
              setEditar(true);
              setMostrarOpciones(false);
            }}
          >
            Editar Cuenta
          </button>
          <button
            className="p-2 border-b-1 border-gray-600 hover:bg-gray-700"
            onClick={() => {
              deleteAccount(cuentaSeleccionada._id);
              setMostrarOpciones(false);
            }}
          >
            Borrar Cuenta
          </button>
        </div>
      )}

      <div className="flex flex-col h-full medidas">
        {cuentasOrdenadas.map((cuentasMes, index) => (
          <div
            key={index}
            className={`flex relative flex-row flex-1 border rounded-lg border-gray-600 overflow-auto mb-1 ${
              esDivVisible(`div${index + 1}`) ? "flex" : "hidden"
            }`}
          >
            <div
              className="flex w-52 text-white justify-center items-center flex-col border-r-2 border-gray-600 rounded-lg hover:bg-gray-900"
              onClick={() => expandirDiv(`div${index + 1}`)}
            >
              <LuCalendarDays className="w-[8rem] h-[8rem]" color="white" />
              <div className="pt-1">
                {getMes(addMonths(fechaActual, index))}
              </div>
              <div className="flex flex-col items-center justify-center">
                <div className="text-green-600 font-bold">
                  ${formatNumber(sumaCuentasPagadas(cuentasMes))}
                </div>
                <div className="text-red-600">
                  ${formatNumber(sumaCuentasNoPagadas(cuentasMes))}
                </div>

                <div>Total:</div>
                <div>${formatNumber(totales[index])}</div>
              </div>
            </div>
            <div
              className={`flex-1 relative ${
                divExpandido === `div${index + 1}` ? "mi-altura" : ""
              } overflow-y-scroll`}
            >
              <div
                ref={(el) => (divRefs.current[index] = el)}
                className={
                  tieneAmbosTiposDeGasto[index]
                    ? "flex flex-col justify-start"
                    : "flex flex-col-reverse justify-start"
                }
              >
                {cuentasMes.map((cuenta) => (
                  <div
                    key={cuenta._id}
                    className={`flex h-[3rem] flex-row ${
                      highlightedCuenta === cuenta._id
                        ? "bg-highlight blink-animation"
                        : ""
                    }`}
                    onContextMenu={(event) => manejarClicDerecho(cuenta, event)}
                  >
                    <div className="flex h-[3rem] w-full text-white items-center border-b-1 border-gray-600 pl-6">
                      {cuenta.tipodegasto.value}
                    </div>
                    <div className="flex h-[3rem] w-full text-white items-center border-b-1 border-gray-600 pl-6">
                      {cuenta.descripcion}
                    </div>
                    <div className="flex h-[3rem] w-full text-white items-center border-b-1 border-gray-600 pl-6">
                      <div className="flex justify-center pr-3">
                        {formatDate(cuenta.date)}
                      </div>
                    </div>
                    <div className="flex h-[3rem] w-full  text-white items-center border-b-1 border-gray-600 pl-6">
                      $ {formatNumber(cuenta.pay)}
                    </div>
                    <div className="flex h-[3rem] w-full text-white justify-center items-center border-b-1 border-gray-600 pl-6">
                      <div className="flex justify-center w-full flex-col">
                        <div className="flex flex-col border-r-2 border-gray-600 ">
                          <div
                            className={`flex  items-center pr-1 ${
                              cuenta.pagado2
                                ? "h-full w-full"
                                : "h-[3rem] w-[5rem]"
                            }`}
                          >
                            {cuenta.pagado2
                              ? formatDate(cuenta.pagado2)
                              : "Pago pendiente"}
                          </div>
                          <div className="pl-1">{cuenta.pagado3}</div>
                        </div>
                      </div>
                      <div
                        onClick={() => togglePagado(cuenta._id)}
                        className="flex w-full items-center justify-center "
                      >
                        <div className="">
                          <MdCheckCircleOutline
                            size={30}
                            fill={
                              estadosPagados[cuenta._id] ? "#34EB17" : "#4B5563"
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListCuenta;
