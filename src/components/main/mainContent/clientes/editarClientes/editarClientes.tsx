import React, { useEffect, useState } from "react";
import { clientData } from "../../../../../../types/types";
import { editClient } from "../../../../../../src/redux/estados/clientesState";

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
          setClienteData({ ...clientData, phone: parseInt(value) });
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

  //ESTILOS INPUT
  const estilosInput =
    "outline-none h-9 w-full bg-slate-600 px-2 rounded-md text-slate-50";

  return (
    <div className="absolute bottom-0 top-0 right-0 left-0 flex justify-center items-center z-50">
      <div className="flex flex-col p-5 space-y-5 bg-slate-50 w-96 justify-center rounded-xl relative items-center">
        <div className="flex flex-row space-x-1 w-full">
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
        </div>

        <div className="w-full">
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
        <div className="w-full">
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
        <div className="w-full">
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
        <div className="w-full">
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
              saveClientEdit();
            }}
          >
            Guardar
          </button>
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
