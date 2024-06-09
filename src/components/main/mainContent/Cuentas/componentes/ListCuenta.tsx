import React, { useState, useEffect, useRef } from "react";
import CalendarioSGV from "../../../../../assets/MAINSVGS/Cuentas SVG/CalendarioSGV";
import { format, addMonths, subMonths, getMonth, getYear } from "date-fns";
import { es } from "date-fns/locale";
import EditarCuenta from "./EditarCuenta";
import Swal from "sweetalert2";
import { MdCheckCircleOutline } from "react-icons/md";

interface ListCuentaProps {
  cuentas: any[];
  filtroBoton: boolean;
  filtroBoton2: boolean;
  filtroBoton3: boolean;
  filtroBoton4: boolean;
  getAccountsToPay: () => void;
}

interface Cuenta {
  tipodegasto: string;
  date: string;
  pay: number;
  descripcion: string;
  _id: string;
}

const ListCuenta: React.FC<ListCuentaProps> = ({
  cuentas,
  filtroBoton,
  filtroBoton2,
  filtroBoton3,
  filtroBoton4,
  getAccountsToPay,
}) => {
  const [fechaActual, setFechaActual] = useState(new Date());

  const colores = [""];

  const [divExpandido, setDivExpandido] = useState<string>("");
  const [filtroActivo, setFiltroActivo] = useState<
    "tipodegasto" | "descripcion" | "ninguno" | "fechafiltrada" | "monto"
  >("ninguno");

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  const sumaTotalDeCuentas = (cuentas) => {
    return cuentas.reduce((acumulador, cuenta) => {
      const monto = parseFloat(cuenta.pay) || 0;
      return acumulador + monto;
    }, 0);
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

  //////// Funcion para poder expandir los div y ocultar los otros 2

  const expandirDiv = (divId: string) => {
    if (divExpandido === divId) {
      setDivExpandido("");
    } else {
      setDivExpandido(divId);
    }
  };

  const esDivVisible = (divId: string) => {
    return divExpandido === "" || divExpandido === divId;
  };

  /////Funcion q filtra cuantas varias
  // Suponiendo que 'cuenta.date' es una cadena en formato "YYYY-MM-DD"

  const filtrarCuentasPorFecha = (fecha: Date) => {
    const mesReferencia = getMonth(fecha) + 1; // Ajustando mes a base 1
    const anioReferencia = getYear(fecha);

    console.log(cuentas, "pedaso de pelotudo");
    return cuentas.filter((cuenta) => {
      const [anioCuenta, mesCuenta] = cuenta.date.split("-").map(Number);
      return anioCuenta === anioReferencia && mesCuenta === mesReferencia;
    });
  };

  ///////// Ordenar las cuentas vencimiento mensual y despues gastos diarios.

  const ordenarCuentasPorTipo = (cuentas: Cuenta[]) => {
    // Separar las cuentas por tipo de gasto
    const cuentasVencimientoMensual = cuentas.filter(
      (cuenta) => cuenta.tipodegasto === "Vencimiento Mensual"
    );
    const cuentasGastoDiario = cuentas.filter(
      (cuenta) => cuenta.tipodegasto === "Gasto Diario"
    );
    // Combinar las listas manteniendo el orden de "Vencimiento Mensual" primero
    return [...cuentasVencimientoMensual, ...cuentasGastoDiario];
  };

  // Cuentas para los meses específicos
  const cuentasMesActual = ordenarCuentasPorTipo(
    filtrarCuentasPorFecha(fechaActual)
  );
  const cuentasProximoMes = ordenarCuentasPorTipo(
    filtrarCuentasPorFecha(addMonths(fechaActual, 1))
  );
  const cuentasMesSiguiente = ordenarCuentasPorTipo(
    filtrarCuentasPorFecha(addMonths(fechaActual, 2))
  );

  //// filtro q contenga los 2 tiposdegasto para q no applique el reverse al p2

  const [tieneAmbosTiposDeGasto, setTieneAmbosTiposDeGasto] = useState(false);
  const [tieneAmbosTiposDeGasto2, setTieneAmbosTiposDeGasto2] = useState(false);
  const [tieneAmbosTiposDeGasto3, setTieneAmbosTiposDeGasto3] = useState(false);

  useEffect(() => {
    console.log(
      tieneAmbosTiposDeGasto,
      "este mes contiene ambos tipos de gastos"
    );
    // Filtrar cuentasMesActual para el mes actual
    const cuentasFiltradas = filtrarCuentasPorFecha(fechaActual);
    const cuentasFiltradas2 = filtrarCuentasPorFecha(addMonths(fechaActual, 1));
    const cuentasFiltradas3 = filtrarCuentasPorFecha(addMonths(fechaActual, 2));

    // Verificar si existen ambos tipos de gasto en cuentasFiltradas
    const tieneVencimientoMensual = cuentasFiltradas.some(
      (cuenta) => cuenta.tipodegasto === "Vencimiento Mensual"
    );
    const tieneGastoDiario = cuentasFiltradas.some(
      (cuenta) => cuenta.tipodegasto === "Gasto Diario"
    );
    const tieneVencimientoMensual2 = cuentasFiltradas2.some(
      (cuenta) => cuenta.tipodegasto === "Vencimiento Mensual"
    );
    const tieneGastoDiario2 = cuentasFiltradas2.some(
      (cuenta) => cuenta.tipodegasto === "Gasto Diario"
    );
    const tieneVencimientoMensual3 = cuentasFiltradas3.some(
      (cuenta) => cuenta.tipodegasto === "Vencimiento Mensual"
    );
    const tieneGastoDiario3 = cuentasFiltradas3.some(
      (cuenta) => cuenta.tipodegasto === "Gasto Diario"
    );

    // Actualizar el estado
    setTieneAmbosTiposDeGasto(tieneVencimientoMensual && tieneGastoDiario);
    setTieneAmbosTiposDeGasto2(tieneVencimientoMensual2 && tieneGastoDiario2);
    setTieneAmbosTiposDeGasto3(tieneVencimientoMensual3 && tieneGastoDiario3);
  }, [cuentas, fechaActual]);

  // Utiliza useEffect para calcular el total después de filtrar y ordenar las cuentas
  const [total1, settotal1] = useState();
  const [total2, settotal2] = useState();
  const [total3, settotal3] = useState();
  useEffect(() => {
    const cuentasFiltradas = filtrarCuentasPorFecha(fechaActual);
    const totalMesActual = sumaTotalDeCuentas(cuentasFiltradas);
    const cuentasFiltradas2 = filtrarCuentasPorFecha(addMonths(fechaActual, 1));
    const totalMesActual2 = sumaTotalDeCuentas(cuentasFiltradas2);
    const cuentasFiltradas3 = filtrarCuentasPorFecha(addMonths(fechaActual, 2));
    const totalMesActual3 = sumaTotalDeCuentas(cuentasFiltradas3);

    console.log(`Total para el mes actual: ${totalMesActual}`);
    // Opcionalmente actualiza un estado con este total
    settotal1(totalMesActual);
    settotal2(totalMesActual2);
    settotal3(totalMesActual3);
  }, [cuentas, fechaActual]);

  ///evitar el scroll en los div hijos
  // Referencias para cada div
  const divRef1 = useRef<HTMLDivElement>(null);
  const divRef2 = useRef<HTMLDivElement>(null);
  const divRef3 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Función para manejar el evento onWheel
    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
    };

    // Agregar event listener a cada div 1200   bulto 6 x 200  pelet x30 =  6.66
    const div1 = divRef1.current;
    const div2 = divRef2.current;
    const div3 = divRef3.current;

    div1?.addEventListener("wheel", handleWheel, { passive: false });
    div2?.addEventListener("wheel", handleWheel, { passive: false });
    div3?.addEventListener("wheel", handleWheel, { passive: false });

    // Limpieza de event listeners al desmontar
    return () => {
      div1?.removeEventListener("wheel", handleWheel);
      div2?.removeEventListener("wheel", handleWheel);
      div3?.removeEventListener("wheel", handleWheel);
    };
  }, []);

  //////filtro alfabetico

  const ordenarCuentasAlfabeticamente = (cuentas: Cuenta[]) => {
    return cuentas.sort((a, b) => a.descripcion.localeCompare(b.descripcion));
  };
  const OrdenadaAlfabet = ordenarCuentasAlfabeticamente(
    filtrarCuentasPorFecha(fechaActual)
  );
  const OrdenadaAlfabet2 = ordenarCuentasAlfabeticamente(
    filtrarCuentasPorFecha(addMonths(fechaActual, 1))
  );
  const OrdenadaAlfabet3 = ordenarCuentasAlfabeticamente(
    filtrarCuentasPorFecha(addMonths(fechaActual, 2))
  );

  // Función de comparación para ordenar las cuentas por el campo "day"
  const compararPorDay = (a, b) => {
    // Convertir las fechas de las cuentas a objetos Date
    const fechaA = new Date(a.date);
    const fechaB = new Date(b.date);

    // Comparar los objetos Date directamente
    return fechaA - fechaB;
  };

  // Ordenar las cuentasMesActual por "day"
  const cuentasMesActualOrdenadas =
    filtrarCuentasPorFecha(fechaActual).sort(compararPorDay);

  const cuentasProximoMesOrdenadas = filtrarCuentasPorFecha(
    addMonths(fechaActual, 1)
  ).sort(compararPorDay);

  const cuentasMesSiguienteOrdenadas = filtrarCuentasPorFecha(
    addMonths(fechaActual, 2)
  ).sort(compararPorDay);

  /////cuentas ordenadas por plata

  const ordenarCuentasPorPayDescendente = (cuentas) => {
    return cuentas.sort((a, b) => {
      // Convierte las propiedades 'pay' a números antes de comparar
      const payA = parseFloat(a.pay) || 0;
      const payB = parseFloat(b.pay) || 0;
      return payB - payA; // Ordena de mayor a menor
    });
  };

  const cuentasFiltradas = filtrarCuentasPorFecha(fechaActual);
  const cuentasFiltradas2 = filtrarCuentasPorFecha(addMonths(fechaActual, 1));
  const cuentasFiltradas3 = filtrarCuentasPorFecha(addMonths(fechaActual, 2));
  const cuentasOrdenadas = ordenarCuentasPorPayDescendente(cuentasFiltradas);
  const cuentasOrdenadas2 = ordenarCuentasPorPayDescendente(cuentasFiltradas2);
  const cuentasOrdenadas3 = ordenarCuentasPorPayDescendente(cuentasFiltradas3);

  useEffect(() => {
    console.log("el boton fuynciona opucto");
  }, [filtroBoton, filtroBoton2, filtroBoton4]);

  useEffect(() => {
    setFiltroActivo("tipodegasto");
  }, [filtroBoton]);

  useEffect(() => {
    setFiltroActivo("descripcion");
  }, [filtroBoton2]);

  useEffect(() => {
    setFiltroActivo("fechafiltrada");
  }, [filtroBoton3]);

  useEffect(() => {
    setFiltroActivo("monto");
  }, [filtroBoton4]);

  let cuentasAMostrar = [];
  let cuentasAMostrar2 = [];
  let cuentasAMostrar3 = [];

  if (filtroActivo === "tipodegasto") {
    cuentasAMostrar = cuentasMesActual; // Tus cuentas filtradas por tipo de gasto
    cuentasAMostrar2 = cuentasProximoMes;
    cuentasAMostrar3 = cuentasMesSiguiente;
  } else if (filtroActivo === "descripcion") {
    cuentasAMostrar = OrdenadaAlfabet; // Tus cuentas ordenadas alfabéticamente
    cuentasAMostrar2 = OrdenadaAlfabet2;
    cuentasAMostrar3 = OrdenadaAlfabet3;
  } else if (filtroActivo === "fechafiltrada") {
    cuentasAMostrar = cuentasMesActualOrdenadas; // Tus cuentas ordenadas alfabéticamente
    cuentasAMostrar2 = cuentasProximoMesOrdenadas;
    cuentasAMostrar3 = cuentasMesSiguienteOrdenadas;
  } else if (filtroActivo === "monto") {
    cuentasAMostrar = cuentasOrdenadas; // Tus cuentas ordenadas alfabéticamente
    cuentasAMostrar2 = cuentasOrdenadas2;
    cuentasAMostrar3 = cuentasOrdenadas3;
  } else {
    // Aquí puedes definir qué mostrar si no hay filtro activo
    cuentasAMostrar = cuentasMesActual; // O el conjunto de datos predeterminado
    cuentasAMostrar2 = cuentasProximoMes;
    cuentasAMostrar3 = cuentasMesSiguiente;
  }

  // Función auxiliar para determinar la clase correcta para que interprete si tien los 2 tipos de gastos y para poder usar el reverse

  const determinarClase = () => {
    if (filtroActivo === "tipodegasto" && filtroBoton) {
      return tieneAmbosTiposDeGasto
        ? "flex flex-col justify-start"
        : "flex flex-col-reverse justify-start";
    } else if (filtroActivo === "descripcion" && filtroBoton2) {
      return "flex flex-col justify-start";
    } else if (filtroActivo === "fechafiltrada" && filtroBoton3) {
      // Estilo para filtroBoton3 cuando está activo
      return "flex flex-col justify-start";
    } else if (filtroActivo === "monto" && filtroBoton4) {
      // Estilo para filtroBoton4 cuando está activo (nuevo filtro "monto")
      return "flex flex-col justify-start";
    } else {
      return "flex flex-col-reverse justify-start";
    }
  };

  const determinarClase2 = () => {
    if (filtroActivo === "tipodegasto" && filtroBoton) {
      return tieneAmbosTiposDeGasto
        ? "flex flex-col justify-start"
        : "flex flex-col-reverse justify-start";
    } else if (filtroActivo === "descripcion" && filtroBoton2) {
      return "flex flex-col justify-start";
    } else if (filtroActivo === "fechafiltrada" && filtroBoton3) {
      // Estilo para filtroBoton3 cuando está activo
      return "flex flex-col justify-start";
    } else if (filtroActivo === "monto" && filtroBoton4) {
      // Estilo para filtroBoton4 cuando está activo (nuevo filtro "monto")
      return "flex flex-col justify-start";
    } else {
      return "flex flex-col-reverse justify-start";
    }
  };

  const determinarClase3 = () => {
    if (filtroActivo === "tipodegasto" && filtroBoton) {
      return tieneAmbosTiposDeGasto
        ? "flex flex-col justify-start"
        : "flex flex-col-reverse justify-start";
    } else if (filtroActivo === "descripcion" && filtroBoton2) {
      return "flex flex-col justify-start";
    } else if (filtroActivo === "fechafiltrada" && filtroBoton3) {
      // Estilo para filtroBoton3 cuando está activo
      return "flex flex-col justify-start";
    } else if (filtroActivo === "monto" && filtroBoton4) {
      // Estilo para filtroBoton4 cuando está activo (nuevo filtro "monto")
      return "flex flex-col justify-start";
    } else {
      return "flex flex-col-reverse justify-start";
    }
  };

  ////funciones pagados
  const [estadosPagados, setEstadosPagados] = useState<{
    [id: string]: boolean;
  }>({});

  // Definición de cambiarEstadoPagado
  const cambiarEstadoPagado = (idCuenta, estadoPagado) => {
    // Llama a la API de Electron para enviar el evento al proceso principal

    ipcRenderer.send("actualizar-estado-pagado", {
      idCuenta: idCuenta,
      estadoPagado: estadoPagado,
    });
  };

  // Esta función envía un mensaje al proceso principal para actualizar el estado de "pagado"
  // Definición de togglePagado
  const togglePagado = (id:any) => {
    setEstadosPagados((prevEstados) => {
      const updatedEstados = { ...prevEstados };
      updatedEstados[id] = !updatedEstados[id];
      cambiarEstadoPagado(id, updatedEstados[id]);
      console.log("Estados pagados actualizados:", updatedEstados); // Agregar esta línea
      return updatedEstados;
    });
  };

  useEffect(() => {
    const manejarActualizacionPagado = (
      event,
      { exitoso, idCuenta, estadoPagado }
    ) => {
      if (exitoso) {
        setEstadosPagados((prevEstados) => ({
          ...prevEstados,
          [idCuenta]: estadoPagado,
        }));
      }
    };

    ipcRenderer.on("estado-pagado-actualizado", manejarActualizacionPagado);

    // Limpiar al desmontar
    return () => {
      ipcRenderer.removeListener(
        "estado-pagado-actualizado",
        manejarActualizacionPagado
      );
    };
  }, [togglePagado]);

  useEffect(() => {
    ipcRenderer.send("solicitar-estado-pagado-inicial");

    const manejarEstadoPagadoInicial = (event, { exitoso, estados }) => {
      if (exitoso) {
        setEstadosPagados(estados);
      } else {
        console.error("Error al cargar el estado pagado inicial");
      }
    };

    ipcRenderer.on("estado-pagado-inicial", manejarEstadoPagadoInicial);

    return () => {
      ipcRenderer.removeListener(
        "estado-pagado-inicial",
        manejarEstadoPagadoInicial
      );
    };
  }, []);

  ////////////////editar y borrar cuentas

  const [cuentaSeleccionada, setCuentaSeleccionada] = useState<Cuenta | null>(
    null
  );
  const [mostrarOpciones, setMostrarOpciones] = useState(false);

  const [posicionMenu, setPosicionMenu] = useState({ x: 0, y: 0 });
  const menuRef = useRef<HTMLDivElement>(null);

  const manejarClicDerecho = (
    cuenta: Cuenta,
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();
    setCuentaSeleccionada(cuenta);
    setMostrarOpciones(true);
    setPosicionMenu({ x: event.clientX + 2, y: event.clientY - 82 });
  };

  const manejarClicFuera = (event: MouseEvent) => {
    if (
      mostrarOpciones &&
      menuRef.current &&
      !menuRef.current.contains(event.target as Node)
    ) {
      setMostrarOpciones(false);
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        mostrarOpciones &&
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setMostrarOpciones(false);
      }
    };

    // Agregar el listener solo si el menú está visible
    if (mostrarOpciones) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    // Limpiar el listener cuando el menú se cierra o el componente se desmonta
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [mostrarOpciones, menuRef]);

  const mostrando = () => {
    const idCuentas = cuentaSeleccionada._id;

    console.log(idCuentas);
  };
  const [editar, setEditar] = useState(false);

  const updateAccount = (id, updatedAccount) => {
    // Aquí enviarías la cuenta actualizada al backend usando IPC
    ipcRenderer.send("actualizar-cuenta", { id, updatedAccount });
    console.log(
      id,
      updatedAccount,
      "esto le estoy pasando al backend usando IPC"
    );
  };

  ////////// Borrar cuenta

  const deleteAccount = (id) => {
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
        ipcRenderer.send("eliminar-cuenta", { id });
        // Escuchar la respuesta del proceso principal
        ipcRenderer.once("cuenta-eliminada", (event, { exitoso }) => {
          if (exitoso) {
            // Actualizar el estado local para reflejar la eliminación de la cuenta
            getAccountsToPay(); // Llamar a getAccountsToPay solo después de confirmar la eliminación
            Swal.fire("Eliminado", "La cuenta ha sido eliminada.", "success");
          } else {
            console.error("Error al eliminar la cuenta");
          }
        });
      }
    });
  };

  return (
    <div onWheel={handleWheel} className="flex flex-col h-full ">
      {editar && cuentaSeleccionada && (
        <EditarCuenta
          onChangeModal={setEditar}
          cuentaSeleccionada={cuentaSeleccionada}
          updateAccount={updateAccount}
          getAccountsToPay={getAccountsToPay}
        />
      )}

      {mostrarOpciones && cuentaSeleccionada && (
        <div
          ref={menuRef}
          className=" bg-gray-900 text-white flex flex-col z-50"
          style={{
            position: "absolute",
            left: `${posicionMenu.x}px`,
            top: `${posicionMenu.y}px`,
          }}
        >
          <button
            className=" p-2 border-b-1 border-gray-600 hover:bg-gray-700"
            onClick={() => {
              setEditar(true);
              setMostrarOpciones(false);
            }}
          >
            Editar Cuenta
          </button>
          <button
            className=" p-2 border-b-1 border-gray-600 hover:bg-gray-700 "
            onClick={() => {
              deleteAccount(cuentaSeleccionada._id);
              setMostrarOpciones(false); // Opcional: Cerrar el menú de opciones después de borrar
            }}
          >
            Borrar Cuenta
          </button>
        </div>
      )}
      <div className="flex flex-col h-full medidas">
        <div
          className={`flex flex-row flex-1 border relative rounded-lg border-gray-600 overflow-auto mb-1${
            divExpandido === "div1" ? "h-full overflow-auto" : ""
          }
        ${esDivVisible("div1") ? "flex" : "hidden"}`}
        >
          <div
            className="flex w-44 text-white justify-center items-center flex-col  border-r-1 border-gray-600 rounded-lg hover:bg-gray-900"
            onClick={() => {
              expandirDiv("div1");
            }}
          >
            <CalendarioSGV fill=" white" height="80" width="80" />
            <div className=" pt-3">{getMes(fechaActual)}</div>
            <div className="pt-16 flex flex-col items-center justify-center">
              <div>Total:</div> <div>{total1}</div>
            </div>
          </div>

          <div
            className={`flex-1 relative${
              divExpandido === "div1" ? "mi-altura" : ""
            } overflow-y-scroll `}
          >
            <div ref={divRef1} className={determinarClase()}>
              {cuentasAMostrar
                .filter((cuenta) => cuenta) // Esto asegura que cada cuenta exista
                .map((cuenta, index) => (
                  // Tu código para renderizar cada cuenta

                  <div
                    className={`flex h-12 flex-row ${
                      colores[index % colores.length]
                    }`}
                    key={index}
                    onContextMenu={(event) => manejarClicDerecho(cuenta, event)}
                  >
                    <div className="flex-1 flex h-12  text-white justify-center items-center border-b-1 border-gray-600">
                      {cuenta.tipodegasto}
                    </div>
                    <div className="flex-1 flex h-12  text-white justify-center items-center border-b-1 border-gray-600">
                      {cuenta.descripcion}
                    </div>
                    <div className="flex-1 flex h-12  text-white justify-center items-center border-b-1 border-gray-600">
                      {cuenta.date}
                    </div>
                    <div className="flex-1 flex h-12 text-white  justify-center items-center border-b-1 border-gray-600">
                      $ {cuenta.pay}
                    </div>
                    <div className="flex-1 relative flex h-12  text-white justify-center items-center border-b-1 border-gray-600">
                      <div
                        onClick={() => togglePagado(cuenta._id)}
                        className=" flex justify-center items-center"
                      >
                        <div className=" absolute">
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

        <div
          className={`flex relative flex-row w-full flex-1 border rounded-lg border-gray-600 overflow-auto mb-1 ${
            esDivVisible("div2") ? "flex" : "hidden"
          }`}
        >
          <div
            className="flex w-44 text-white justify-center items-center flex-col border-r-1 border-gray-600 rounded-lg hover:bg-gray-900"
            onClick={() => {
              expandirDiv("div1");
            }}
          >
            <CalendarioSGV fill=" white" height="80" width="80" />
            <div className=" pt-3">{getMes(addMonths(fechaActual, 1))}</div>
            <div className="pt-16 flex flex-col items-center justify-center">
              <div>Total:</div> <div>{total2}</div>
            </div>
          </div>
          <div className="flex-1 flex flex-col text-white overflow-y-scroll">
            <div ref={divRef2} className={determinarClase2()}>
              {cuentasAMostrar2.length > 0 ? (
                cuentasAMostrar2.map((cuenta, index) => (
                  <div
                    className={`flex h-12 flex-row ${
                      colores[index % colores.length]
                    }`}
                    key={index}
                    onContextMenu={(event) => manejarClicDerecho(cuenta, event)}
                  >
                    <div className="flex-1 flex h-12 text-white justify-center items-center border-b-1 border-gray-600">
                      {cuenta.tipodegasto}
                    </div>
                    <div className="flex-1 flex h-12 text-white justify-center items-center border-b-1 border-gray-600">
                      {cuenta.descripcion}
                    </div>
                    <div className="flex-1 flex h-12 text-white justify-center items-center border-b-1 border-gray-600">
                      {cuenta.date}
                    </div>
                    <div className="flex-1 flex h-12 text-white  justify-center items-center border-b-1 border-gray-600">
                      $ {cuenta.pay}
                    </div>
                    <div className="flex-1 flex h-12 text-white justify-center items-center border-b-1 border-gray-600">
                      <div className="flex-1 relative flex h-12  text-white justify-center items-center">
                        <div
                          onClick={() => togglePagado(cuenta._id)}
                          className=" flex justify-center items-center"
                        >
                          <div className=" absolute">
                            <MdCheckCircleOutline
                              size={30}
                              fill={
                                estadosPagados[cuenta._id]
                                  ? "#34EB17"
                                  : "#4B5563"
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>

        <div
          className={`flex relative flex-row w-full flex-1 border rounded-lg border-gray-600 overflow-auto ${
            esDivVisible("div3") ? "flex" : "hidden"
          }`}
        >
          <div
            className="flex w-44 text-white justify-center items-center flex-col border-r-1 border-gray-600 rounded-lg hover:bg-gray-900"
            onClick={() => {
              expandirDiv("div1");
            }}
          >
            <CalendarioSGV fill=" white" height="80" width="80" />
            <div className=" pt-3">{getMes(addMonths(fechaActual, 2))}</div>
            <div className="pt-16 flex flex-col items-center justify-center">
              <div>Total:</div> <div>{total3}</div>
            </div>
          </div>
          <div className="flex-1 flex flex-col text-white overflow-y-scroll">
            <div ref={divRef3} className={determinarClase3()}>
              {cuentasAMostrar3.length > 0 ? (
                cuentasAMostrar3.map((cuenta, index) => (
                  <div
                    className={`flex h-12 flex-row ${
                      colores[index % colores.length]
                    }`}
                    key={index}
                    onContextMenu={(event) => manejarClicDerecho(cuenta, event)}
                  >
                    <div className="flex-1 flex h-12 text-white justify-center items-center border-b-1 border-gray-600">
                      {cuenta.tipodegasto}
                    </div>
                    <div className="flex-1 flex h-12 text-white justify-center items-center border-b-1 border-gray-600">
                      {cuenta.descripcion}
                    </div>
                    <div className="flex-1 flex h-12 text-white justify-center items-center border-b-1 border-gray-600">
                      {cuenta.date}
                    </div>
                    <div className="flex-1 flex h-12 text-white  justify-center items-center border-b-1 border-gray-600">
                      $ {cuenta.pay}
                    </div>
                    <div className="flex-1 relative flex h-12  text-white justify-center items-center border-b-1 border-gray-600">
                      <div
                        onClick={() => togglePagado(cuenta._id)}
                        className=" flex justify-center items-center"
                      >
                        <div className=" absolute">
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
                ))
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListCuenta;
