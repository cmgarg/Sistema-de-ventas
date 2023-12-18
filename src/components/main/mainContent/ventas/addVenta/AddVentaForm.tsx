import React, { useEffect, useRef, useState } from "react";

interface AddVentaForm {
  onChangeModal: (p: boolean) => void;
}

const AddVentaForm: React.FC<AddVentaForm> = ({ onChangeModal }) => {
  function obtenerVentas() {
    window.api.enviarEvento("obtener-ventas");
  }
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
        arrayClientes.push({ nombre: e.nombre, id: e._id });
        console.log(e.nombre);
      });
      setClientes(arrayClientes);
    });
  }, []);
  //
  type VentaDataObject = {
    articulo: string;
    cantidad: string;
    comprador: { nombre: string; id: string };
  };

  const [VentaData, setVentaData] = useState<VentaDataObject>({
    articulo: "",
    cantidad: "",
    comprador: { nombre: "", id: "" },
  });

  function setChangeData(data: string, value: any) {
    console.log("LLAMA LA FUNCION");
    const existingData = ["articulo", "cantidad", "comprador"];
    console.log(existingData.includes(data), "esto");
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
  useEffect(() => {
    console.log(VentaData);
  }, [VentaData]);

  //SUBIR USUARIO A BASE DE DATOS LOCAL

  function subirVenta() {
    window.api.enviarEvento("guardar-venta", VentaData);

    window.api.enviarEvento("register-buy-client", {
      cliente: VentaData.comprador,
      compra: { articulo: VentaData.articulo, cantidad: VentaData.cantidad },
    });

    obtenerVentas();

    setVentaData({
      articulo: "",
      cantidad: "",
      comprador: { nombre: "", id: "" },
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
            <label htmlFor="articulo" className="text-slate-600">
              Articulo
            </label>
            <input
              type="text"
              name="articulo"
              className={estilosInput}
              value={VentaData.articulo}
              onChange={(e) => {
                setChangeData("articulo", e.target.value);
              }}
            />
          </div>
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
        <MenuClientes
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

interface MenuClientesForm {
  style: string;
  clientes: any[];
  setChangeData: (data: string, value: any) => void;
}

const MenuClientes: React.FC<MenuClientesForm> = ({
  style,
  clientes,
  setChangeData,
}) => {
  const [client, setClient] = useState("");
  const [menuActived, setMenuActived] = useState(true);
  const [clientesEncontrados, setclientesEncontrados] = useState([]);
  const [inputValue, setInputValue] = useState({ nombre: "", id: "" });

  const inputRef = useRef();

  function listaClientes() {
    console.log("PUIITO", clientesEncontrados);
    return (
      <div className="absolute w-full bg-gray-700 z-50 shadow-md shadow-black rounded-b-lg flex flex-col top-full">
        {clientesEncontrados.map((cliente) => (
          <button
            onClick={() => {
              setInputValue({ nombre: cliente.nombre, id: cliente.id });
              console.log("que onda");
              setMenuActived(false);
            }}
            className="hover:bg-gray-800"
          >
            {cliente.nombre}
          </button>
        ))}
      </div>
    );
  }
  function buscarEnClientes(busca: string) {
    console.log("me ejecuto locococococ", clientesEncontrados);
    const arrayEncontrados = clientes.filter((cliente) => {
      console.log(cliente, "acac");
      console.log(
        "SI INCLUYE  ",
        busca,
        cliente.nombre.toLocaleLowerCase().includes(busca)
      );

      return cliente.nombre
        .toLocaleLowerCase()
        .includes(busca !== "" ? busca.toLocaleLowerCase() : "|||");
    });
    console.log(clientes, "encontrados");
    setclientesEncontrados(arrayEncontrados);
  }

  useEffect(() => {
    setChangeData("comprador", inputValue);
    console.log(inputValue);
  }, [inputValue]);

  return (
    <div
      onClick={() => {
        setMenuActived(true);
      }}
      onBlur={(e) => {
        setTimeout(() => setMenuActived(false), 200);
      }}
    >
      <label htmlFor="comprador" className="text-slate-600">
        Comprador
      </label>
      <div className="flex flex-row relative">
        <input
          ref={inputRef}
          className={style}
          type="text"
          name="comprador"
          value={inputValue.nombre}
          onChange={(e) => {
            buscarEnClientes(e.target.value);
            setInputValue(e.target.value);
          }}
        />
        <button
          className="absolute right-0 h-full"
          onClick={() => {
            setMenuActived(!menuActived);
          }}
        >
          V
        </button>
        {clientesEncontrados.length > 0 && menuActived && listaClientes()}
      </div>
    </div>
  );
};

export default AddVentaForm;
