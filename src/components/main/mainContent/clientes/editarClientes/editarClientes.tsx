import React, { useEffect, useState } from "react";
import AgregarCliente from "../buttons/AgregarCliente";

interface EditarClienteProps {
  cliente: {
    nombre: string;
    apellido: string;
    direccion: string;
    telefono: string;
    email: string;
    dni: string;
    _id: string;
  };
}

const EditarClientes: React.FC<EditarClienteProps> = ({ cliente }) => {
  const [clienteData, setClienteData] = useState({ ...cliente });

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
  //ESTILOS INPUT
  const estilosInput = "outline-none h-9 w-full bg-slate-600 px-2 rounded-md";

  return (
    <div className="absolute bottom-0 top-0 right-0 left-0 flex justify-center items-center">
      <input
        type="text"
        name="nombre"
        value={clienteData.nombre}
        className={estilosInput}
      />
      <input
        type="text"
        name="nombre"
        value={clienteData.apellido}
        className={estilosInput}
      />
      <input
        type="text"
        name="nombre"
        value={clienteData.direccion}
        className={estilosInput}
      />
      <input
        type="text"
        name="nombre"
        value={clienteData.telefono}
        className={estilosInput}
      />
      <input
        type="text"
        name="nombre"
        value={clienteData.email}
        className={estilosInput}
      />
      <input
        type="text"
        name="nombre"
        value={clienteData.dni}
        className={estilosInput}
      />
    </div>
  );
};

export default EditarClientes;
