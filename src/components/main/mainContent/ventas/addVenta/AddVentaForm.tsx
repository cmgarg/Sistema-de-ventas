import React, { useEffect, useRef, useState } from "react";
import MenuClientsForm from "../MenusInputs/MenuClientsForm";
import MenuArticlesForm from "../MenusInputs/MenuArticlesForm";

interface AddVentaForm {
  onChangeModal: (p: boolean) => void;
  addSales: (e: object) => void;
}

const AddVentaForm: React.FC<AddVentaForm> = ({ onChangeModal, addSales }) => {
  //DATOS USUARIOS
  const [clientes, setClientes] = useState([]);
  function obtenerClientes() {
    window.api.enviarEvento("obtener-clientes");
  }

  useEffect(() => {
    obtenerClientes();
    window.api.recibirEvento("respuesta-obtener-clientes", (e) => {
      console.log("ME EJECUTO A LA PERFECCIONE", e);
      const arrayClientes: any[] = [];
      e.map((e: any) => {
        arrayClientes.push({ nombre: e.nombre, idClient: e._id });
        console.log(e.nombre);
      });
      setClientes(arrayClientes);
    });
  }, []);
  //
  type VentaDataObject = {
    articulo: string;
    cantidad: string;
    comprador: { nombre: string; idClient: string };
  };

  const [VentaData, setVentaData] = useState<VentaDataObject>({
    articulo: "",
    cantidad: "",
    comprador: { nombre: "", idClient: "" },
  });

  function setChangeData(data: string, value: any) {
    const existingData = ["articulo", "cantidad", "comprador"];
    if (existingData.includes(data)) {
      switch (data) {
        case "articulo":
          console.log("se cumple esrte");
          setVentaData({ ...VentaData, articulo: value });
          break;
        case "cantidad":
          setVentaData({ ...VentaData, cantidad: value });
          break;
        case "comprador":
          setVentaData({ ...VentaData, comprador: value });
          break;

        default:
          break;
      }
    } else {
      console.log("NO ESTA");
    }
  }

  //SUBIR USUARIO A BASE DE DATOS LOCAL

  function subirVenta() {
    window.api.enviarEvento("sale-process", VentaData);

    window.api.enviarEvento("register-buy-client", {
      cliente: VentaData.comprador,
      compra: { articulo: VentaData.articulo, cantidad: VentaData.cantidad },
    });
    addSales(VentaData);
    setVentaData({
      articulo: "",
      cantidad: "",
      comprador: { nombre: "", idClient: "" },
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
          <MenuArticlesForm
            style={estilosInput}
            setChangeData={setChangeData}
          />
          <div className="flex-1">
            <label htmlFor="cantidad" className="text-slate-600">
              Cantidad
            </label>
            <input
              type="text"
              name="cantidad"
              className={estilosInput}
              value={VentaData.cantidad}
              onChange={(e) => {
                setChangeData("cantidad", e.target.value);
              }}
            />
          </div>
        </div>
        <MenuClientsForm
          style={estilosInput}
          clientes={clientes}
          setChangeData={setChangeData}
        />
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
              subirVenta();
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

export default AddVentaForm;
