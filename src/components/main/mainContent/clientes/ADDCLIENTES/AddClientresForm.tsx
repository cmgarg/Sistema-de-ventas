import React, { useEffect, useState } from "react";
import { clientData } from "../../../../../../types/types";
import ButtonR from "../../buttons/ButtonR";

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
    clientType: "",
    CUIT_CUIL: "",
    nationality: "",
    payMethod: "",
    conditionIVA: "",
    rubro: "",
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
      "CUIT_CUIL",
      "CLIENT_TYPE",
      "NATIONALITY",
      "PAY_METHOD",
      "CONDITION_IVA",
      "RUBRO",
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
        case "CUIT_CUIL":
          setClienteData({ ...clienteData, CUIT_CUIL: value });
          break;
        case "CLIENT_TYPE":
          setClienteData({ ...clienteData, clientType: value });
          break;
        case "NATIONALITY":
          setClienteData({ ...clienteData, nationality: value });
          break;
        case "PAY_METHOD":
          setClienteData({ ...clienteData, payMethod: value });
          break;
        case "RUBRO":
          setClienteData({ ...clienteData, rubro: value });
          break;
        case "CONDITION_IVA":
          setClienteData({ ...clienteData, conditionIVA: value });
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
      name: "JOSE LACARA",
      address: "",
      phone: 0,
      email: "",
      birthdate: "",
      DNI: 0,
      clientType: "",
      CUIT_CUIL: "",
      nationality: "",
      payMethod: "",
      rubro: "",
      conditionIVA: "",
      shopping: [],
    });
  }

  const autoClientlacraputa = () => {
    window.api.enviarEvento("save-client", {
      name: "JOSE LACARA",
      address: "Calle Falsa 123, Buenos Aires",
      phone: 1145678910,
      email: "jose.lacara@example.com",
      birthdate: "1985-06-15",
      DNI: 12345678,
      clientType: "Frecuente",
      CUIT_CUIL: "20-12345678-9",
      nationality: "Argentina",
      payMethod: "Tarjeta de Crédito",
      rubro: "Comercio Minorista",
      conditionIVA: "Responsable Inscripto",
      shopping: [],
    });
  };
  //ESTILOS INPUT
  const estilosInput = "outline-none h-10 bg-slate-600 px-2 rounded-md ";

  return (
    <div className="absolute bottom-0 top-0 right-0 left-0 flex justify-center items-center text-lg z-50 bg-[rgb(0,0,0,0.5)]">
      <div
        className="abolute right-52 top-52 bg-red-500"
        onClick={autoClientlacraputa}
      >
        {" "}
        locasaasasa
      </div>
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
        <div className="flex w-full space-x-2">
          <div className="flex flex-1 flex-col">
            <label htmlFor="telefono">CUIL/CUIT</label>
            <input
              type="text"
              name="cuitcuil"
              className={`w-full bg-[#707070ff] text-white shadow-[0_2px_5px_rgba(0,0,0,0.50)] h-10 rounded-md outline-none pl-2 focus:bg-[#909090ff]`}
              value={clienteData.CUIT_CUIL}
              onChange={(e) => {
                setChangeData("CUIT_CUIL", e.target.value);
              }}
            />
          </div>
          <div className="flex flex-1 flex-col">
            <label htmlFor="dni">Condicion de IVA</label>
            <input
              type="text"
              name="conditioniva"
              className={`w-full bg-[#707070ff] text-white shadow-[0_2px_5px_rgba(0,0,0,0.50)] h-10 rounded-md outline-none pl-2 focus:bg-[#909090ff] `}
              value={clienteData.conditionIVA}
              onChange={(e) => {
                setChangeData("CONDITION_IVA", e.target.value);
              }}
            />
          </div>
        </div>
        <div className="flex w-full space-x-2">
          <div className="flex flex-1 flex-col">
            <label htmlFor="telefono">Rubro</label>
            <input
              type="text"
              name="rubro"
              className={`w-full bg-[#707070ff] text-white shadow-[0_2px_5px_rgba(0,0,0,0.50)] h-10 rounded-md outline-none pl-2 focus:bg-[#909090ff]`}
              value={clienteData.rubro}
              onChange={(e) => {
                setChangeData("RUBRO", e.target.value);
              }}
            />
          </div>
          <div className="flex flex-1 flex-col">
            <label htmlFor="dni">Nacionalidad</label>
            <input
              type="text"
              name="nationality"
              className={`w-full bg-[#707070ff] text-white shadow-[0_2px_5px_rgba(0,0,0,0.50)] h-10 rounded-md outline-none pl-2 focus:bg-[#909090ff] `}
              value={clienteData.nationality}
              onChange={(e) => {
                setChangeData("NATIONALITY", e.target.value);
              }}
            />
          </div>
          <div className="flex flex-1 flex-col">
            <label htmlFor="dni">Metodo de pago</label>
            <input
              type="text"
              name="paymethod"
              className={`w-full bg-[#707070ff] text-white shadow-[0_2px_5px_rgba(0,0,0,0.50)] h-10 rounded-md outline-none pl-2 focus:bg-[#909090ff] `}
              value={clienteData.payMethod}
              onChange={(e) => {
                setChangeData("PAY_METHOD", e.target.value);
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
