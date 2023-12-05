import React, { useEffect, useState } from "react";
import AgregarCliente from "../../buttons/Agregar";

interface AddClientresFormProps {
  onChangeModal: (p: boolean) => void;
}

const AddClientresForm: React.FC<AddClientresFormProps> = ({
  onChangeModal,
}) => {
  function obtenerClientes() {
    window.api.enviarEvento("obtener-clientes");
  }
  //DATOS USUARIOS

  type ClienteDataObject = {
    nombre: string;
    apellido: string;
    direccion: string;
    telefono: string;
    email: string;
    dni: string;
  };

  const [clienteData, setClienteData] = useState<ClienteDataObject>({
    nombre: "",
    apellido: "",
    direccion: "",
    telefono: "",
    email: "",
    dni: "",
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
  useEffect(() => {
    console.log(clienteData);
  }, [clienteData]);

  //SUBIR USUARIO A BASE DE DATOS LOCAL

  function subirUsuario() {
    window.api.enviarEvento("guardar-usuario", clienteData);

    obtenerClientes();

    setClienteData({
      nombre: "",
      apellido: "",
      direccion: "",
      telefono: "",
      email: "",
      dni: "",
    });
  }
  //ESTILOS INPUT
  const estilosInput = "outline-none h-9 w-full bg-slate-600 px-2 rounded-md";

  return (
    <div className="absolute bottom-0 top-0 right-0 left-0 flex justify-center items-center">
      <div className="w-96 bg-slate-50 space-y-5 p-2 text-slate-50 rounded-md relative">
        <button
          className="bg-red-500 h-10 w-10 rounded-full absolute -right-2 -top-2"
          onClick={() => {
            onChangeModal(false);
          }}
        >
          X
        </button>
        <div className="flex flex-row space-x-1">
          <div className="flex-1">
            <label htmlFor="nombre" className="text-slate-600">
              Nombre
            </label>
            <input
              type="text"
              name="nombre"
              className={estilosInput}
              value={clienteData.nombre}
              onChange={(e) => {
                setChangeData("nombre", e.target.value);
              }}
            />
          </div>
          <div className="flex-1">
            <label htmlFor="apellido" className="text-slate-600">
              Apellido
            </label>
            <input
              type="text"
              name="apellido"
              className={estilosInput}
              value={clienteData.apellido}
              onChange={(e) => {
                setChangeData("apellido", e.target.value);
              }}
            />
          </div>
        </div>
        <div>
          <label htmlFor="direccion" className="text-slate-600">
            Direccion
          </label>
          <input
            type="text"
            name="direccion"
            className={estilosInput}
            value={clienteData.direccion}
            onChange={(e) => {
              setChangeData("direccion", e.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="telefono" className="text-slate-600">
            Telefono
          </label>
          <input
            type="text"
            name="telefono"
            className={estilosInput}
            value={clienteData.telefono}
            onChange={(e) => {
              setChangeData("telefono", e.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="email" className="text-slate-600">
            Email
          </label>
          <input
            type="text"
            name="email"
            className={estilosInput}
            value={clienteData.email}
            onChange={(e) => {
              setChangeData("email", e.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="dni" className="text-slate-600">
            DNI
          </label>
          <input
            type="text"
            name="dni"
            className={estilosInput}
            value={clienteData.dni}
            onChange={(e) => {
              setChangeData("dni", e.target.value);
            }}
          />
        </div>
        <div className="flex flex-row space-x-5">
          <button
            className="w-52 h-10 bg-red-400 rounded-md"
            onClick={() => {
              onChangeModal(false);
            }}
          >
            Cancelar
          </button>
          <button
            className="w-52 h-10 bg-green-400 rounded-md"
            onClick={subirUsuario}
          >
            Añadir
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddClientresForm;
