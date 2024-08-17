import React, { useEffect, useState, MouseEvent } from "react";
import ModalIngresarCodigo from "./ModalIngresarCodigo";
import ModalCambiarContraseña from "./ModalCambiarContaseña";
import ModalCodigoIncorrecto from "./ModalCodigoIncorrecto";

interface ProgramabloqueadoProps {
  setBloqueoPrograma: (value: boolean) => void;
}

const Programabloqueado: React.FC<ProgramabloqueadoProps> = ({
  setBloqueoPrograma,
}) => {
  const [clickCount, setClickCount] = useState<number>(0);
  const [mostrarModalCodigo, setMostrarModalCodigo] = useState<boolean>(false);
  const [verificarCodigo, setVerificarCodigo] = useState<string | false>(false);
  const [autCambioContra, setautCAmbioContra] = useState<boolean>(false);
  const [modalCodigoIncorrecto, setModalCodigoIncorrecto] = useState<boolean>(false);

  useEffect(() => {
    if (verificarCodigo) {
      window.api.enviarEvento("verificar-codigo-desbloqueo", verificarCodigo);
    }

    const handleRespuestaVerificacion = (respuesta: { exito: boolean }) => {
      if (respuesta.exito) {
        setautCAmbioContra(true);
      } else {
        setModalCodigoIncorrecto(true);
      }
    };

    window.api.recibirEvento("respuesta-verificar-codigo", handleRespuestaVerificacion);

    return () => {
      window.api.removeAllListeners("respuesta-verificar-codigo");
    };
  }, [verificarCodigo]);

  const handleSVGClick = () => {
    setClickCount((prevCount) => prevCount + 1);
  };

  const handleOutsideClick = (event: MouseEvent<HTMLDivElement>) => {
    if (clickCount > 0 && !event.currentTarget.closest(".svg-container")) {
      setClickCount(0); // Resetea el contador si el clic es fuera del div del SVG
    }
  };

  // Verificar si se alcanzaron los 10 clics
  if (clickCount === 10) {
    setMostrarModalCodigo(true);
    setClickCount(0); // Resetea el contador
  }

  console.log(verificarCodigo, "codigo ingresado");

  return (
    <div
      className="flex flex-1 bg-gradient-to-b to-blue-950 from-slate-800 text-white"
      onClick={handleOutsideClick} // Manejador para clics fuera del SVG
    >
      {modalCodigoIncorrecto && (
        <ModalCodigoIncorrecto setModalCodigoIncorrecto={setModalCodigoIncorrecto} />
      )}
      {mostrarModalCodigo && (
        <ModalIngresarCodigo
          setVerificarCodigo={setVerificarCodigo}
          setMostrarModalCodigo={setMostrarModalCodigo}
        />
      )}
      {autCambioContra && <ModalCambiarContraseña setBloqueoPrograma={setBloqueoPrograma} />}
      <div className="flex flex-1 justify-around items-center flex-col">
        <h1 className="text-2xl">
          Por tu seguridad el programa está bloqueado
        </h1>
        <div
          className="svg-container flex w-96 h-80 select-none" // Clase para identificar el contenedor del SVG
          onClick={handleSVGClick} // Manejador solo para clics dentro del SVG
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 139.4 156.4"
            className="w-96 h-96"
          >
            <defs></defs>
            <g id="Capa_2" data-name="Capa 2">
              <g id="Capa_1-2" data-name="Capa 1">
                <path
                  className="fill-white"
                  d="M120.5,9.2V24.1l-8.7,6-.2-19.7L111.5,0H27.8V30.3l-8.9-6.1V9.2H0v97.2l18.9,14v-83l8.9,6.2v82.8l18.7,13.7v.2l23,16.1V144.3l-22.7-16V56.7L60,66l2.4,1.6L65,69.3l4.8,3.2L79.1,66h.1l41.3-28.6v83l18.9-14V9.2ZM69.6,59.3,46.8,43.5V10.4H92.6l.2,32.8Z"
                />
                <polyline
                  className="fill-white"
                  points="72 155.9 95 139.9 95 127.7 72 143.9"
                />
                <polygon
                  className="fill-white"
                  points="95 78.8 71.7 95 71.7 82.9 95 66.5 95 78.8"
                />
                <polygon
                  className="fill-white"
                  points="113.9 52.9 113.9 126 95 139.9 95.1 66.5 113.9 52.9"
                />
                <polygon
                  className="fill-white"
                  points="79.3 66 79.1 66 79.2 66 79.3 66"
                />
              </g>
            </g>
          </svg>
        </div>
        <div>
          <p>
            Por favor, ponte en contacto con el soporte técnico para más
            información.
          </p>
          <p>Email de soporte: CMG_DEV@hotmail.com</p>
          <p>Teléfono: +54 3446 630784</p>
        </div>
      </div>
    </div>
  );
}

export default Programabloqueado;
