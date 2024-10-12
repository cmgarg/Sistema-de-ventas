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
  const estilosInput = "outline-none h-10 bg-slate-600 px-2 rounded-md ";

  return (
    <div className="absolute bottom-0 top-0 right-0 left-0 flex justify-center items-center text-lg z-50 backdrop-brightness-50">
      <div className="w-2/5 bg-[#2f2f2fff] p-2 space-y-5 rounded-md relative text-sm">
        <div className="flex space-x-2">
          <div className="flex-1 flex flex-col">
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              name="nombre"
              className={`w-full bg-[#707070ff] text-white shadow-[0_2px_5px_rgba(0,0,0,0.50)] h-10 rounded-md outline-none pl-2 focus:bg-[#909090ff]`}
              value={clienteData.name}
              onChange={(e) => {
                setChangeData("name", e.target.value);
              }}
            />
          </div>
          <div className="flex flex-1 flex-col">
            <label htmlFor="address">Direccion</label>
            <input
              type="text"
              name="address"
              className={`w-full bg-[#707070ff] text-white shadow-[0_2px_5px_rgba(0,0,0,0.50)] h-10 rounded-md outline-none pl-2 focus:bg-[#909090ff]`}
              value={clienteData.address}
              onChange={(e) => {
                setChangeData("address", e.target.value);
              }}
            />
          </div>
        </div>

        <div className="flex flex-1 space-x-2">
          <div className="flex flex-1 flex-col">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              className={`w-full bg-[#707070ff] text-white shadow-[0_2px_5px_rgba(0,0,0,0.50)] h-10 rounded-md outline-none pl-2 focus:bg-[#909090ff]`}
              value={clienteData.email}
              onChange={(e) => {
                setChangeData("email", e.target.value);
              }}
            />
          </div>
          <div className="flex flex-1 flex-col">
            <label htmlFor="fechaNacimiento">Nacimiento</label>
            <input
              type="date"
              name="fechaNacimiento"
              className={`w-full bg-[#707070ff] text-white shadow-[0_2px_5px_rgba(0,0,0,0.50)] h-10 rounded-md outline-none pl-2 focus:bg-[#909090ff]`}
              value={clienteData.birthdate}
              onChange={(e) => {
                setChangeData("birthdate", e.target.value);
              }}
            />
          </div>
        </div>
        <div className="flex w-full space-x-2">
          <div className="flex flex-1 flex-col">
            <label htmlFor="telefono">Telefono</label>
            <input
              type="text"
              name="phone"
              className={`w-full bg-[#707070ff] text-white shadow-[0_2px_5px_rgba(0,0,0,0.50)] h-10 rounded-md outline-none pl-2 focus:bg-[#909090ff]`}
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
              className={`w-full bg-[#707070ff] text-white shadow-[0_2px_5px_rgba(0,0,0,0.50)] h-10 rounded-md outline-none pl-2 focus:bg-[#909090ff] `}
              value={clienteData.DNI}
              onChange={(e) => {
                setChangeData("DNI", e.target.value);
              }}
            />
          </div>
        </div>
        <div className="flex flex-row w-full px-2 space-x-2 justify-end text-xs">
          <ButtonR
            textSize="text-lg"
            onClick={() => {
              onChangeModal(false);
            }}
            bgColor="bg-gradient-to-l from-gray-700 via-gray-700 to-gray-500 text-[#fff8dcff] text-sm"
            height="h-7"
            width="w-24"
            title="Cancelar"
          ></ButtonR>
          <ButtonR
            textSize="text-lg"
            onClick={() => {
              subirUsuario();
              onChangeModal(false);
            }}
            bgColor="bg-gradient-to-l from-yellow-800 via-yellow-700 to-yellow-500 text-[#fff8dcff] text-sm"
            height="h-7"
            width="w-32"
            title="Añadir"
          ></ButtonR>
        </div>
      </div>
    </div>
  );
};

export default AddClientresForm;
