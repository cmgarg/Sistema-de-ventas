import React, { useEffect, useState } from "react";
import ButtonR from "../../buttons/ButtonR";
import { IoClose } from "react-icons/io5";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export default function InformacionCuentas({ cierre, idCuenta, cuentas }) {
  const [historial, setHistorial] = useState([]); // Estado para almacenar el historial de la cuenta

  // Función para formatear la fecha en formato DD/MM/YYYY
  function formatearFecha(fecha) {
    const [anio, mes, dia] = fecha.split("-");
    return `${dia}/${mes}/${anio}`;
  }

  // Obtener el historial de la cuenta desde el backend al montar el componente
  useEffect(() => {
    const obtenerHistorialCuenta = async () => {
      try {
        // Enviamos el evento con el id de la cuenta
        window.api.enviarEvento("get-historial-cuenta", idCuenta);

        // Recibimos la respuesta con el historial
        window.api.recibirEvento("respuesta-historial-cuenta", (respuesta) => {
          setHistorial(respuesta); // Guardar el historial en el estado
        });
      } catch (error) {
        console.error("Error al obtener el historial:", error);
      }
    };

    obtenerHistorialCuenta();

    // Cleanup para remover el listener
    return () => {
      window.api.removeListener("respuesta-historial-cuenta", (respuesta) => {
        setHistorial(respuesta);
      });
    };
  }, [idCuenta]);

  // Escuchar por la tecla "Escape" y cerrar el modal
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Escape") {
        cierre();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [cierre]);

  // Función para comparar fechas y horas
  const compararFechaYHora = (a, b) => {
    const fechaA = new Date(`${a.fecha_edicion}T${a.fecha_edicionHora}`).getTime();
    const fechaB = new Date(`${b.fecha_edicion}T${b.fecha_edicionHora}`).getTime();
    return fechaA - fechaB;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const userTimezoneOffset = date.getTimezoneOffset() * 60000;
    const localDate = new Date(date.getTime() + userTimezoneOffset);
    return format(localDate, "dd/MM/yyyy", { locale: es });
  };
  

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div className="flex flex-col bg-[#2f2f2fff] rounded-lg w-1/2 h-1/2 overflow-hidden text-white">
        <div className="flex w-full h-12 bg-[#252525] justify-between items-center border-b-2 border-gray-600">
          <div className="text-2xl p-4 flex">
            <div>Historial Cuenta</div>
            <div className="text-white font-bold pl-4">
              "{cuentas.find((cuenta) => cuenta._id === idCuenta)?.descripcion}"
            </div>
          </div>
          <div className="pr-2">
            <ButtonR
              onClick={cierre}
              height="h-7"
              width="w-10"
              bgIconColor="bg-gradient-to-l from-gray-700 via-gray-700 to-gray-500 text-[#fff8dcff]"
            >
              <IoClose size={30} className="text-red-400" />
            </ButtonR>
          </div>
        </div>
        <div className="flex flex-col w-full h-full p-3">
          <div className="w-full h-full border-2 border-gray-600 rounded-lg mt-4">
            <div className="flex items-center w-full h-10 border-b-2 border-gray-600 pl-4">
              Actualizaciones
            </div>
            <div className="flex flex-col w-full h-[25.4rem] p-2 overflow-auto">
              {historial.length > 0 ? (
                historial
                  // Ordenar el historial por fecha y hora antes de mapearlo
                  .sort(compararFechaYHora)
                  .map((registro, index) => (
                    <div
                      key={index}
                      className="flex h-28 w-full flex-col mt-2 mb-2 bg-gray-700 p-2"
                    >
                      <div>
                        {index === 0 ? "La cuenta fue creada:" : "Editado:"}
                        {formatearFecha(registro.fecha_edicion)}{" "}
                        {registro.fecha_edicionHora}
                      </div>
                      <div className="flex flex-col">
                        <div className="w-full flex justify-between items-center pt-2 pb-3 border-b-2 border-gray-600">
                          <div className="w-full h-full text-center">
                            Descripcion
                          </div>
                          <div className="w-full h-full text-center">
                            Tipo de Gasto
                          </div>
                          <div className="w-full h-full text-center">Fecha</div>
                          <div className="w-full h-full text-center">
                            Se notificara por Venc.
                          </div>
                          <div className="w-full h-full text-center">Monto</div>
                        </div>
                        <div className="w-full flex justify-between items-center">
                          <div className="w-full h-full text-center">
                            {registro.cuenta.descripcion}
                          </div>
                          <div className="w-full h-full text-center">
                            {registro.cuenta.tipodegasto}
                          </div>
                          <div className="w-full h-full text-center">
                          {formatDate(registro.cuenta.date)}
                          </div>
                          <div className="w-full h-full text-center">
                            {registro.cuenta.notifiacion ? "Sí" : "No"}
                          </div>
                          <div className="w-full h-full text-center">
                            {registro.cuenta.pay}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
              ) : (
                <div>No se encontraron actualizaciones para esta cuenta.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
