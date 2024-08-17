import React, { useEffect, useState } from "react";
import ModalIngresarCodigo from "./ModalIngresarCodigo";
import ModalCambiarContraseña from "./ModalCambiarContaseña";
import ModalCodigoIncorrecto from "./ModalCodigoIncorrecto";
import ModalIntentoDeOpciones from "./ModalIntentoDeOpciones";
import ModalCambioContraRespCorrect from "./ModalCambioContraRespCorrect";

interface PasswordRecoveryProps {
  onClose: () => void;
  username: string;
  setEstadoRecuperacionCuenta: (value: boolean) => void;
}

interface DatosUsuario {
  username: string;
  email: string;
  direccion: string;
  codigopostal: string;  // Mantener como string si es necesario para el backend
  recuperacioncuenta: number;
  _id: string;
}

const PasswordRecovery: React.FC<PasswordRecoveryProps> = ({
  onClose,
  username,
  setEstadoRecuperacionCuenta,
}) => {
  const [answers, setAnswers] = useState({
    question1: "",
    question2: "",
    question3: "",
    question4: "",
  });
  const [datosUsuario, setDatosUsuario] = useState<DatosUsuario | null>(null);
  const [nombreUsuario, setNombreUsuario] = useState<boolean | null>(null);
  const [opciones, setOpciones] = useState<string[]>([]);
  const [opciones2, setOpciones2] = useState<string[]>([]);
  const [opciones3, setOpciones3] = useState<string[]>([]);
  const [opciones4, setOpciones4] = useState<string[]>([]);
  const [respuestasCorrectas, setRespuestasCorrectas] = useState<boolean>(false);
  const [mostrarModalEspera, setMostrarModalEspera] = useState<boolean>(false);
  const [idUser, setIdUser] = useState<string>("");
  const [cambiarContraseña, setCambiarContraseña] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setAnswers({ ...answers, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      opciones[parseInt(answers.question1.replace("opcion", "")) - 1] ===
        datosUsuario?.username &&
      opciones2[parseInt(answers.question2.replace("opcion", "")) - 1] ===
        datosUsuario?.email &&
      opciones3[parseInt(answers.question3.replace("opcion", "")) - 1] ===
        datosUsuario?.direccion &&
      opciones4[parseInt(answers.question4.replace("opcion", "")) - 1] ===
        datosUsuario?.codigopostal
    ) {
      setRespuestasCorrectas(true);
      // Reiniciar el contador de recuperación en la base de datos
      if (datosUsuario) {
        window.api.enviarEvento("reiniciar-recuperacioncuenta", datosUsuario._id);
      }
      setCambiarContraseña(true);
    } else {
      setRespuestasCorrectas(false);
      setMostrarModalEspera(true); // Muestra el modal de espera
      // Restar 1 al contador de recuperación en la base de datos
      if (datosUsuario) {
        window.api.enviarEvento("restar-recuperacioncuenta", datosUsuario._id);
      }
    }
  };

  useEffect(() => {
    window.api.enviarEvento("obtener-admin");

    const handleDatosAdminObtenidos = (respuesta: { exito: boolean; admin: DatosUsuario; error?: string }) => {
      if (respuesta.exito) {
        setDatosUsuario(respuesta.admin);
        setNombreUsuario(respuesta.admin.username === username);
      } else {
        console.error(
          "Error al obtener los datos del administrador:",
          respuesta.error
        );
      }
    };

    window.api.recibirEvento("respuesta-obtener-admin", handleDatosAdminObtenidos);

    return () => {
      window.api.removeAllListeners("respuesta-obtener-admin");
    };
  }, [username]);

  const shuffleOptions = (options: string[]) => {
    return options.sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    if (datosUsuario) {
      const opcionesMezcladas = shuffleOptions([
        datosUsuario.username,
        datosUsuario.username + "225",
        datosUsuario.username + "10",
      ]);
      setOpciones(opcionesMezcladas);
    }
  }, [datosUsuario]);

  useEffect(() => {
    if (datosUsuario) {
      if (datosUsuario.recuperacioncuenta === 0)
        setEstadoRecuperacionCuenta(true); // Esto activará el useEffect en App
    }
  }, [datosUsuario, setEstadoRecuperacionCuenta]);

  const shuffleOptions2 = (options: string[]) => {
    return options.sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    if (datosUsuario) {
      const opcionesMezcladas2 = shuffleOptions2([
        datosUsuario.email,
        datosUsuario.username + "220@hotmail.com",
        datosUsuario.username + "_200@hotmail.com",
      ]);
      setOpciones2(opcionesMezcladas2);
    }
  }, [datosUsuario]);

  const shuffleOptions3 = (options: string[]) => {
    return options.sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    if (datosUsuario) {
      const opcionesMezcladas3 = shuffleOptions3([
        datosUsuario.direccion,
        datosUsuario.direccion + "12",
        datosUsuario.direccion + "3",
      ]);
      setOpciones3(opcionesMezcladas3);
    }
  }, [datosUsuario]);

  const shuffleOptions4 = (options: string[]) => {
    return options.sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    if (datosUsuario) {
      const opcionesMezcladas4 = shuffleOptions4([
        datosUsuario.codigopostal,
        datosUsuario.codigopostal + "-2312",
        (parseInt(datosUsuario.codigopostal) - 113).toString(),
      ]);
      setOpciones4(opcionesMezcladas4);
    }
  }, [datosUsuario]);

  return (
    <>
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-gradient-to-b to-blue-950 from-slate-800 text-white p-5 rounded-lg relative">

          {cambiarContraseña && (
            <ModalCambioContraRespCorrect setCambiarContraseña={setCambiarContraseña} onClose={onClose} />
          )}

          {mostrarModalEspera && datosUsuario && (
            <ModalIntentoDeOpciones
              mostrarModalEspera={mostrarModalEspera}
              setMostrarModalEspera={setMostrarModalEspera}
              datosUsuario={datosUsuario}
              setEstadoRecuperacionCuenta={setEstadoRecuperacionCuenta}
            />
          )}

          {nombreUsuario ? (
            <>
              <button
                className="flex absolute top-0 right-0 p-2 hover:bg-red-700 "
                onClick={onClose}
              >
                X
              </button>
              <h2 className="text-xl mb-4">Recuperar Contraseña</h2>
              <p className=" p-2">
                Responde correctamente y cambia tu contraseña o recupera tu
                contraseña
              </p>
              <form onSubmit={handleSubmit} className="flex flex-col">
                <div className="m-3 flex ">
                  <label className=" flex w-1/4" htmlFor="question1">
                    Nombre Usuario:
                  </label>
                  <select
                    className=" flex w-1/2 border border-gray-600 bg-slate-800 focus:outline-none"
                    name="question1"
                    value={answers.question1}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Seleccione una opción</option>
                    {opciones.map((opcion, index) => (
                      <option key={index} value={`opcion${index + 1}`}>
                        {opcion}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="m-3 flex">
                  <label className=" flex w-1/4" htmlFor="question2">
                    Email:
                  </label>
                  <select
                    className=" flex w-1/2 border border-gray-600 bg-slate-800 focus:outline-none"
                    name="question2"
                    value={answers.question2}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Seleccione una opción</option>
                    {opciones2.map((opcion, index) => (
                      <option key={index} value={`opcion${index + 1}`}>
                        {opcion}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="m-3 flex ">
                  <label className=" flex w-1/4" htmlFor="question3">
                    Dirección:
                  </label>
                  <select
                    className=" flex w-1/2 border border-gray-600 bg-slate-800 focus:outline-none"
                    name="question3"
                    value={answers.question3}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Seleccione una opción</option>
                    {opciones3.map((opcion, index) => (
                      <option key={index} value={`opcion${index + 1}`}>
                        {opcion}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="m-3 flex ">
                  <label className=" flex w-1/4" htmlFor="question4">
                    Código postal:
                  </label>
                  <select
                    className=" flex w-1/2 border border-gray-600 bg-slate-800 focus:outline-none"
                    name="question4"
                    value={answers.question4}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Seleccione una opción</option>
                    {opciones4.map((opcion, index) => (
                      <option key={index} value={`opcion${index + 1}`}>
                        {opcion}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  type="submit"
                  className="bg-blue-600 p-2 rounded-md mt-4"
                >
                  Verificar
                </button>
              </form>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <h2 className="text-xl mb-4 p-5">El Usuario</h2>
              <h2 className="text-xl mb-4 p-2">{username}</h2>
              <h2 className="text-xl mb-4 p-2">No existe</h2>
              <p className="p-10">Intente nuevamente</p>
              <button className="bg-blue-600 p-2 rounded-md" onClick={onClose}>
                Aceptar
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default PasswordRecovery;
