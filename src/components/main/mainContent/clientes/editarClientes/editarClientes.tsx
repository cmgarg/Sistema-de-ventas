import React, { useEffect, useState } from "react";
import AgregarCliente from "../../buttons/Agregar";
import CheckSvg from "../../../../../assets/MAINSVGS/mainAsideSvg/editSVG/CheckSvg";
import ErrorSvg from "../../../../../assets/MAINSVGS/mainAsideSvg/editSVG/ErrorSvg";

interface EditarClienteProps {
  clienteAeditarOff: () => void;
}

const EditarClientes: React.FC<EditarClienteProps> = ({
  clienteAeditarOff,
}) => {
  const [clienteData, setClienteData] = useState({});
  const [mensajeTrueFalse, setmensajeTrueFalse] = useState({
    value: false,
    seGuardo: 0,
  });

  function setChangeData(data: string, value: string) {
    console.log("LLAMA LA FUNCION");
    const existingData = [
      "nombre",
      "apellido",
      "direccion",
      "telefono",
      "email",
      "dni",
    ];
    console.log(existingData.includes(data), "esto");
    if (existingData.includes(data)) {
      switch (data) {
        case "nombre":
          console.log("se cumple esrte");
          setClienteData({ ...clienteData, nombre: value });
          break;
        case "apellido":
          setClienteData({ ...clienteData, apellido: value });
          break;
        case "direccion":
          setClienteData({ ...clienteData, direccion: value });
          break;
        case "telefono":
          setClienteData({ ...clienteData, telefono: value });
          break;
        case "email":
          setClienteData({ ...clienteData, email: value });
          break;
        case "dni":
          setClienteData({ ...clienteData, dni: value });
          break;

        default:
          break;
      }
    } else {
      console.log("NO ESTA");
    }
  }
  function guardarClienteEditado() {
    window.api.enviarEvento("actualizar-cliente", clienteData);

    window.api.enviarEvento("obtener-clientes");
  }

  useEffect(() => {
    //SE GUARDA EL USUARIO ENCONTRADO EN SETCLIENTDATA PARA QUE APAREZCAN EN LOS INPUT CADA DATO, NOMBRE, APELLIDO, ETC.
    window.api.recibirEvento("cliente-encontradoById", (e) => {
      console.log("ME EJECUTO A LA PERFECCIONE QUERIDOOO", e);
      setClienteData(e[0]);
    });
    window.api.recibirEvento("respuesta-actualizar-cliente", (e) => {
      console.log(e);
      setmensajeTrueFalse({ value: true, seGuardo: e });
    });
  }, []);

  //ESTILOS INPUT
  const estilosInput =
    "outline-none h-9 w-full bg-slate-600 px-2 rounded-md text-slate-50";

  return (
    <div className="absolute bottom-0 top-0 right-0 left-0 flex justify-center items-center z-50">
      <div className="flex flex-col p-5 space-y-5 bg-slate-50 w-96 justify-center rounded-xl relative items-center">
        <div className="flex flex-row space-x-1">
          <div className="flex-1 w-full">
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              name="nombre"
              value={clienteData.nombre}
              onChange={(e) => {
                setChangeData("nombre", e.target.value);
              }}
              className={estilosInput}
            />
          </div>
          <div className="flex-1 w-full">
            <label htmlFor="apellido">Apellido</label>
            <input
              type="text"
              name="apellido"
              value={clienteData.apellido}
              onChange={(e) => {
                setChangeData("apellido", e.target.value);
              }}
              className={estilosInput}
            />
          </div>
        </div>

        <div className="w-full">
          <label htmlFor="direccion">Direccion</label>
          <input
            type="text"
            name="direccion"
            value={clienteData.direccion}
            onChange={(e) => {
              setChangeData("direccion", e.target.value);
            }}
            className={estilosInput}
          />
        </div>
        <div className="w-full">
          <label htmlFor="telefono">Telefono</label>
          <input
            type="text"
            name="telefono"
            value={clienteData.telefono}
            onChange={(e) => {
              setChangeData("telefono", e.target.value);
            }}
            className={estilosInput}
          />
        </div>
        <div className="w-full">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            value={clienteData.email}
            onChange={(e) => {
              setChangeData("email", e.target.value);
            }}
            className={estilosInput}
          />
        </div>
        <div className="w-full">
          <label htmlFor="dni">Dni</label>
          <input
            type="text"
            name="dni"
            value={clienteData.dni}
            onChange={(e) => {
              setChangeData("dni", e.target.value);
            }}
            className={estilosInput}
          />
        </div>
        <div className="flex flex-row space-x-5 w-full">
          <button
            className="w-52 h-10 bg-red-400 rounded-md text-slate-50"
            onClick={() => {
              clienteAeditarOff();
            }}
          >
            Cancelar
          </button>
          <button
            className="w-52 h-10 bg-green-400 rounded-md text-slate-50"
            onClick={() => {
              guardarClienteEditado();
            }}
          >
            Guardar
          </button>
        </div>

        {mensajeTrueFalse.seGuardo === 1 && mensajeTrueFalse.value ? (
          <div className="top-0 left-0 right-0 bottom-0 bg-slate-50 text-slate-950 absolute justify-center items-center flex rounded-xl flex-col">
            <div className="flex-1 flex justify-center items-end">
              <CheckSvg size={150} color="rgb(74 222 128)" />
            </div>
            <div className="flex-1 text-xl flex justify-center items-center">
              <p>Se guardo correctamente.</p>
            </div>
            <div className="bg-green-400 w-full flex justify-center rounded-b-xl text-slate-50">
              <button
                onClick={() => {
                  clienteAeditarOff();
                }}
                className="w-full"
              >
                Aceptar
              </button>
            </div>
          </div>
        ) : mensajeTrueFalse.value && mensajeTrueFalse.seGuardo !== 1 ? (
          <div className="top-0 left-0 right-0 bottom-0 bg-slate-50 text-slate-950 absolute justify-center items-center flex rounded-xl flex-col">
            <div className="flex-1 flex justify-center items-end">
              <ErrorSvg size={150} color="rgb(248 113 113)" />
            </div>
            <div className="flex-1 text-xl flex justify-center items-center">
              <p>Hubo un error.</p>
            </div>
            <div className="bg-red-400 w-full flex justify-center rounded-b-xl text-slate-50">
              <button
                onClick={() => {
                  clienteAeditarOff();
                }}
                className="w-full"
              >
                Aceptar
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default EditarClientes;
