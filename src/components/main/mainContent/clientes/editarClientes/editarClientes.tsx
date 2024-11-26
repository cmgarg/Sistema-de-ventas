import React, { useEffect, useState } from "react";
import { clientData } from "../../../../../../types/types";
import { editClient } from "../../../../../../src/redux/estados/clientesState";
import ButtonR from "../../buttons/ButtonR";

interface EditarClienteProps {
  clienteAeditarOff: () => void;
  dispatch: (e: any) => void;
  clientToEdit: clientData;
}

const EditarClientes: React.FC<EditarClienteProps> = ({
  clienteAeditarOff,
  dispatch,
  clientToEdit,
}) => {
  const [clientData, setClienteData] = useState<clientData>(clientToEdit);
  const [mensajeTrueFalse, setmensajeTrueFalse] = useState({
    value: false,
    seGuardo: 0,
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
          setClienteData({ ...clientData, name: value });
          break;
        case "address":
          setClienteData({ ...clientData, address: value });
          break;
        case "phone":
          setClienteData({ ...clientData, phone: value });
          break;
        case "email":
          setClienteData({ ...clientData, email: value });
          break;
        case "birthdate":
          setClienteData({ ...clientData, birthdate: value });
          break;
        case "DNI":
          setClienteData({ ...clientData, DNI: value });
          break;
        case "CUIT_CUIL":
          setClienteData({ ...clientData, CUIT_CUIL: value });
          break;
        case "CLIENT_TYPE":
          setClienteData({ ...clientData, clientType: value });
          break;
        case "NATIONALITY":
          setClienteData({ ...clientData, nationality: value });
          break;
        case "PAY_METHOD":
          setClienteData({ ...clientData, payMethod: value });
          break;
        case "RUBRO":
          setClienteData({ ...clientData, rubro: value });
          break;
        case "CONDITION_IVA":
          setClienteData({ ...clientData, conditionIVA: value });
          break;

        default:
          break;
      }
    } else {
      console.log("NO ESTA");
    }
  }
  function saveClientEdit() {
    window.api.enviarEvento("update-client", clientData);

    dispatch(editClient(clientData));
  }

  useEffect(() => {
    window.api.recibirEvento("response-update-client", (res) => {
      clienteAeditarOff();
    });
  }, []);

  //ESTILOS INPUT
  const estilosInput =
    "outline-none h-10 w-full px-2 rounded-md text-slate-50 bg-[#707070ff] focus:bg-[#909090ff] shadow-[0_2px_5px_rgba(0,0,0,0.50)] ";

  return (
    <div className="absolute bottom-0 top-0 right-0 left-0 flex justify-center items-center z-50 backdrop-brightness-50">
      <div className="flex flex-col p-5 space-y-5 bg-[#2f2f2fff] w-2/5 text-sm justify-center rounded-xl relative items-center border border-gray-600">
        <div className="flex flex-row space-x-2 w-full">
          <div className="flex-1 w-full">
            <label htmlFor="name">Nombre</label>
            <input
              type="text"
              name="name"
              value={clientData.name}
              onChange={(e) => {
                setChangeData("name", e.target.value);
              }}
              className={estilosInput}
            />
          </div>
          <div className="flex-1">
            <label htmlFor="address">Direccion</label>
            <input
              type="text"
              name="address"
              value={clientData.address}
              onChange={(e) => {
                setChangeData("address", e.target.value);
              }}
              className={estilosInput}
            />
          </div>
        </div>
        <div className="flex w-full flex-1 space-x-2">
          <div className="flex-1">
            <label htmlFor="phone">Telefono</label>
            <input
              type="text"
              name="phone"
              value={clientData.phone}
              onChange={(e) => {
                setChangeData("phone", e.target.value);
              }}
              className={estilosInput}
            />
          </div>

          <div className="flex flex-1 flex-col">
            <label htmlFor="fechaNacimiento">Nacimiento</label>
            <input
              type="date"
              name="fechaNacimiento"
              className={`w-full bg-[#707070ff] text-white shadow-[0_2px_5px_rgba(0,0,0,0.50)] h-10 rounded-md outline-none pl-2 focus:bg-[#909090ff]`}
              value={clientData.birthdate}
              onChange={(e) => {
                setChangeData("birthdate", e.target.value);
              }}
            />
          </div>
        </div>
        <div className="flex flex-1 w-full space-x-2">
          <div className="flex-1">
            <label htmlFor="dni">Dni</label>
            <input
              type="text"
              name="dni"
              value={clientData.DNI}
              onChange={(e) => {
                setChangeData("DNI", e.target.value);
              }}
              className={estilosInput}
            />
          </div>
          <div className="flex-1">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              value={clientData.email}
              onChange={(e) => {
                setChangeData("email", e.target.value);
              }}
              className={estilosInput}
            />
          </div>
          <div className="flex w-full space-x-2">
            <div className="flex flex-1 flex-col">
              <label htmlFor="telefono">CUIL/CUIT</label>
              <input
                type="text"
                name="cuitcuil"
                className={`w-full bg-[#707070ff] text-white shadow-[0_2px_5px_rgba(0,0,0,0.50)] h-10 rounded-md outline-none pl-2 focus:bg-[#909090ff]`}
                value={clientData.CUIT_CUIL}
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
                value={clientData.conditionIVA}
                onChange={(e) => {
                  setChangeData("CONDITION_IVA", e.target.value);
                }}
              />
            </div>
            <div className="flex flex-1 flex-col">
              <label htmlFor="telefono">Rubro</label>
              <input
                type="text"
                name="rubro"
                className={`w-full bg-[#707070ff] text-white shadow-[0_2px_5px_rgba(0,0,0,0.50)] h-10 rounded-md outline-none pl-2 focus:bg-[#909090ff]`}
                value={clientData.rubro}
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
                value={clientData.nationality}
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
                value={clientData.payMethod}
                onChange={(e) => {
                  setChangeData("PAY_METHOD", e.target.value);
                }}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-row space-x-5 w-full justify-end">
          <ButtonR
            width="w-24"
            height="h-7"
            bgColor="bg-gradient-to-l from-gray-700 via-gray-700 to-gray-500 text-[#fff8dcff] text-sm"
            title="Cancelar"
            onClick={() => {
              clienteAeditarOff();
            }}
          ></ButtonR>
          <ButtonR
            bgColor="bg-gradient-to-l from-yellow-700 via-yellow-700 to-yellow-500 text-[#fff8dcff] text-sm"
            width="w-32"
            height="h-7"
            onClick={() => {
              saveClientEdit();
            }}
            title="Guardar"
          ></ButtonR>
        </div>

        {mensajeTrueFalse.seGuardo === 1 && mensajeTrueFalse.value ? (
          <div className="top-0 left-0 right-0 bottom-0 bg-slate-50 text-slate-950 absolute justify-center items-center flex rounded-xl flex-col">
            <div className="flex-1 flex justify-center items-end">
              "icono check"
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
              "icono error"
            </div>
            <div className="flex-1 text-xl flex justify-center items-center">
              <p>Hubo un error.</p>
            </div>
            <div className="bg-red-400 w-full flex justify-center rounded-b-xl text-slate-50">
              <ButtonR
                onClick={() => {
                  clienteAeditarOff();
                }}
                width="w-full"
                height="h-10"
                title="Aceptar"
                bgColor="bg-gradient-to-l from-gray-700 via-gray-700 to-gray-500 text-[#fff8dcff]"
              ></ButtonR>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default EditarClientes;
