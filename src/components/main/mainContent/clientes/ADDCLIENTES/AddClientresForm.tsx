import React, { useEffect, useState } from "react";
import AgregarCliente from "../../buttons/Agregar";
import { clientData } from "@/types";

interface AddClientresFormProps {
  onChangeModal: (p: boolean) => void;
}

const AddClientresForm: React.FC<AddClientresFormProps> = ({
  onChangeModal,
}) => {
  const [clienteData, setClienteData] = useState<clientData>({
    name: "",
    address: "",
    phone: 0,
    email: "",
    birthdate: "",
    DNI: 0,
    shopping: [],
  });

  function setChangeData(data: string, value: any) {
    console.log("LLAMA LA FUNCION");
    const existingData = [
      "name",
      "address",
      "phone",
      "email",
      "birthdate",
      "DNI",
    ];
    console.log(existingData.includes(data), "esto");
    if (existingData.includes(data)) {
      switch (data) {
        case "name":
          console.log("se cumple esrte");
          setClienteData({ ...clienteData, name: value });
          break;
        case "address":
          setClienteData({ ...clienteData, address: value });
          break;
        case "phone":
          setClienteData({ ...clienteData, phone: parseInt(value) });
          break;
        case "email":
          setClienteData({ ...clienteData, email: value });
          break;
        case "birthdate":
          setClienteData({ ...clienteData, birthdate: value });
          break;
        case "DNI":
          setClienteData({ ...clienteData, DNI: value });
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
    window.api.enviarEvento("save-client", clienteData);

    setClienteData({
      name: "",
      address: "",
      phone: 0,
      email: "",
      birthdate: "",
      DNI: 0,
      shopping: [],
      _id: "",
    });
  }
  //ESTILOS INPUT
  const estilosInput = "outline-none h-9 w-full bg-slate-600 px-2 rounded-md";

  return (
    <div className="absolute bottom-0 top-0 right-0 left-0 flex justify-center items-center z-50">
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
              value={clienteData.name}
              onChange={(e) => {
                setChangeData("name", e.target.value);
              }}
            />
          </div>
        </div>
        <div>
          <label htmlFor="address" className="text-slate-600">
            Direccion
          </label>
          <input
            type="text"
            name="address"
            className={estilosInput}
            value={clienteData.address}
            onChange={(e) => {
              setChangeData("address", e.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="telefono" className="text-slate-600">
            Telefono
          </label>
          <input
            type="text"
            name="phone"
            className={estilosInput}
            value={clienteData.phone}
            onChange={(e) => {
              setChangeData("phone", e.target.value);
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
          <label htmlFor="fechaNacimiento" className="text-slate-600">
            Fecha de Nacimiento
          </label>
          <input
            type="date"
            name="fechaNacimiento"
            className={estilosInput}
            value={clienteData.birthdate}
            onChange={(e) => {
              setChangeData("birthdate", e.target.value);
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
            value={clienteData.DNI}
            onChange={(e) => {
              setChangeData("DNI", e.target.value);
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
            onClick={() => {
              subirUsuario();
              onChangeModal(false);
            }}
          >
            Añadir
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddClientresForm;
