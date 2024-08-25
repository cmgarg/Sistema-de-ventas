import React, { useEffect, useState } from "react";
import { clientData } from "../../../../../../types/types";
import ButtonR from "../../buttons/ButtonR";
import { IoAdd } from "react-icons/io5";
import { FcCancel } from "react-icons/fc";
import { GiCancel } from "react-icons/gi";
import { MdCancel } from "react-icons/md";
import { TiCancel } from "react-icons/ti";

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
      <div className="w-2/4 bg-gradient-to-r bg-[#1C1C1C] p-2 font-mono text-zinc-950 space-y-5 rounded-md relative shadow-slate-950">
        <div className="flex flex-row space-x-1 p-2">
          <div className="flex-1 flex flex-col">
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              name="nombre"
              className={`w-full bg-zinc-400 text-white shadow-[0_2px_5px_rgba(0,0,0,0.50)] h-12 rounded-md outline-none pl-2`}
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
            className={`w-full bg-zinc-400 text-white shadow-[0_2px_5px_rgba(0,0,0,0.50)] h-12 rounded-md outline-none pl-2`}
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
            className={`w-full bg-zinc-400 text-white shadow-[0_2px_5px_rgba(0,0,0,0.50)] h-12 rounded-md outline-none pl-2`}
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
              className={`w-full bg-zinc-400 text-white shadow-[0_2px_5px_rgba(0,0,0,0.50)] h-12 rounded-md outline-none pl-2`}
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
              className={`w-full bg-zinc-400 text-white shadow-[0_2px_5px_rgba(0,0,0,0.50)] h-12 rounded-md outline-none pl-2`}
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
              className={`w-full bg-zinc-400 text-white shadow-[0_2px_5px_rgba(0,0,0,0.50)] h-12 rounded-md outline-none pl-2`}
              value={clienteData.DNI}
              onChange={(e) => {
                setChangeData("DNI", e.target.value);
              }}
            />
          </div>
        </div>
        <div className="flex flex-row w-full px-2 space-x-2 justify-end">
          <ButtonR
            textSize="text-lg"
            onClick={() => {
              onChangeModal(false);
            }}
            bgColor="bg-zinc-300 text-black"
            height="h-10"
            width="w-32"
            title="Cancelar"
          ></ButtonR>
          <ButtonR
            textSize="text-lg"
            onClick={() => {
              subirUsuario();
              onChangeModal(false);
            }}
            bgColor="bg-gradient-to-t from-yellow-500 via-yellow-400 to-yellow-500 text-black"
            height="h-10"
            width="w-32"
            title="Añadir"
          ></ButtonR>
        </div>
      </div>
    </div>
  );
};

export default AddClientresForm;
