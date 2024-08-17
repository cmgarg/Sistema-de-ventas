import React, { useState, useEffect } from "react";

interface ModalIntentoDeOpcionesProps {
  mostrarModalEspera: boolean;
  setMostrarModalEspera: (value: boolean) => void;
  datosUsuario: {
    recuperacioncuenta: number;
  };
  setEstadoRecuperacionCuenta: (value: boolean) => void;
}

const ModalIntentoDeOpciones: React.FC<ModalIntentoDeOpcionesProps> = ({
  mostrarModalEspera,
  setMostrarModalEspera,
  datosUsuario,
  setEstadoRecuperacionCuenta,
}) => {
  const [contador, setContador] = useState<number>(30);
  const [botonActivo, setBotonActivo] = useState<boolean>(false);
  const [cantidadIntentos, setCantidadIntentos] = useState<number>(
    datosUsuario.recuperacioncuenta
  );

  useEffect(() => {
    const handleActualizacionRecuperacioncuenta = (nuevaCantidadIntentos: number) => {
      setCantidadIntentos(nuevaCantidadIntentos);
    };

    window.api.recibirEvento(
      'actualizacion-recuperacioncuenta',
      handleActualizacionRecuperacioncuenta
    );

    return () => {
      window.api.removeAllListeners('actualizacion-recuperacioncuenta');
    };
  }, [cantidadIntentos]);

  useEffect(() => {
    if (mostrarModalEspera) {
      setBotonActivo(false);
      setContador(30); // Reinicia el contador cada vez que se muestra el modal
      const intervalo = setInterval(() => {
        setContador((prevContador) => prevContador - 1);
      }, 1000);

      const timeout = setTimeout(() => {
        clearInterval(intervalo);
        setBotonActivo(true);
      }, 30000); // Desactiva el botón después de 30 segundos

      return () => {
        clearInterval(intervalo);
        clearTimeout(timeout);
      };
    }
  }, [mostrarModalEspera]);

  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
      <div className="bg-gradient-to-b to-blue-950 from-slate-800 text-white rounded-lg flex items-center justify-center flex-col p-14">
        <h1 className="text-xl p-8 whitespace-nowrap">
          Por favor, espera {contador} segundos para volver a intentarlo.
        </h1>
        <p className="p-2">
          Solo tienes 3 intentos para responder correctamente
        </p>
        <p className="p-8">Te quedan </p>
        <h2 className="text-lg">{cantidadIntentos}</h2>
        <button
          className={`mt-10 ${
            !botonActivo ? "bg-gray-500" : "bg-green-700"
          } p-2 rounded-md`}
          onClick={() => {
            setMostrarModalEspera(false);
            setEstadoRecuperacionCuenta(true); // Ahora pasando un valor booleano
          }}
          disabled={!botonActivo}
        >
          Intentar de nuevo
        </button>
      </div>
    </div>
  );
};

export default ModalIntentoDeOpciones;
