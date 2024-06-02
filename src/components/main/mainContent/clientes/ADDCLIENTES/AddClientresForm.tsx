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
          setClienteData({ ...clienteData, phone: value });
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
  const estilosInput = "outline-none h-12 bg-slate-600 px-2 rounded-md ";

  return (
    <div className="absolute bottom-0 top-0 right-0 left-0 flex justify-center items-center text-lg z-50 bg-slate-950 bg-opacity-30 backdrop-blur-xl">
      <div className="w-1/3 bg-slate-950 text-slate-50 rounded-md relative shadow-lg shadow-slate-950">
        <div className="flex flex-row space-x-1 p-2">
          <div className="flex-1 flex flex-col">
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              name="nombre"
              className={`w-full bg-slate-900 border border-slate-800 h-12 rounded-md outline-none`}
              value={clienteData.name}
              onChange={(e) => {
                setChangeData("name", e.target.value);
              }}
            />
          </div>
        </div>
        <div className="flex flex-col p-2">
          <label htmlFor="address">Direccion</label>
          <input
            type="text"
            name="address"
            className={`w-full bg-slate-900 border border-slate-800 h-12 rounded-md outline-none`}
            value={clienteData.address}
            onChange={(e) => {
              setChangeData("address", e.target.value);
            }}
          />
        </div>

        <div className="flex flex-col p-2">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            className={`w-full bg-slate-900 border border-slate-800 h-12 rounded-md outline-none`}
            value={clienteData.email}
            onChange={(e) => {
              setChangeData("email", e.target.value);
            }}
          />
        </div>
        <div className="flex w-full space-x-1 p-2">
          <div className="flex flex-1 flex-col">
            <label htmlFor="fechaNacimiento">Nacimiento</label>
            <input
              type="date"
              name="fechaNacimiento"
              className={`w-full bg-slate-900 border border-slate-800 h-12 rounded-md outline-none`}
              value={clienteData.birthdate}
              onChange={(e) => {
                setChangeData("birthdate", e.target.value);
              }}
            />
          </div>
          <div className="flex flex-1 flex-col">
            <label htmlFor="telefono">Telefono</label>
            <input
              type="text"
              name="phone"
              className={`w-full bg-slate-900 border border-slate-800 h-12 rounded-md outline-none`}
              value={clienteData.phone}
              onChange={(e) => {
                setChangeData("phone", e.target.value);
              }}
            />
          </div>
          <div className="flex flex-1 flex-col">
            <label htmlFor="dni">DNI</label>
            <input
              type="text"
              name="dni"
              className={`w-full bg-slate-900 border border-slate-800 h-12 rounded-md outline-none`}
              value={clienteData.DNI}
              onChange={(e) => {
                setChangeData("DNI", e.target.value);
              }}
            />
          </div>
        </div>
        <div className="flex flex-row w-full">
          <button
            className="flex-1 h-10 bg-red-900 rounded-bl-md hover:bg-red-800"
            onClick={() => {
              onChangeModal(false);
            }}
          >
            Cancelar
          </button>
          <button
            className="flex-1 h-10 bg-green-900 rounded-br-md hover:bg-green-800"
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
