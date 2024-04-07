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

  const [listProduct, setListProduct] = useState<object[]>([]);
  const [cost, setCost] = useState<number>();
  const [editClient, setEditClient] = useState(true);

  const addProduct = (e: object) => {
    const arr = [...listProduct];
    arr.push(e);
    setListProduct(arr);
  };
  const sumCost = () => {
    const arr = listProduct.map((product) => product.costoArticle);
    let suma = 0;
    arr.map((a) => {
      suma += parseInt(a);
    });
    setCost(suma);
  };

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
    articulos: object[];
    comprador: { nombre: string; idClient: string };
  };

  const [VentaData, setVentaData] = useState<VentaDataObject>({
    articulos: [],
    comprador: { nombre: "", idClient: "" },
  });

  const deleteOfList = (id: number) => {
    const arr = [...listProduct];

    arr.splice(id, 1);

    setListProduct(arr);
  };

  function setChangeData(data: string, value: any) {
    const existingData = ["articulo", "cantidad", "comprador"];
    if (existingData.includes(data)) {
      switch (data) {
        case "articulo":
          console.log("se cumple esrte");
          setListProduct([...listProduct, value]);
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

  //
  useEffect(() => {
    sumCost();
    console.log(listProduct);
  }, [listProduct]);

  //ESTILOS INPUT
  const estilosInput = "outline-none h-9 w-full bg-slate-700 px-2";

  return (
    <div className="absolute bottom-0 top-0 right-0 left-0 flex justify-center items-center z-50">
      <div className="w-5/6 h-5/6 border border-gray-50 bg-slate-800 bg-opacity-95 space-y-5 p-2 text-slate-50 rounded-md relative grid grid-cols-6 grid-rows-6">
        <div className="col-span-4 row-span-full border border-gray-600 rounded-md pt-1 space-y-1 flex flex-col">
          <div className="flex-1">
            {listProduct.map((e, i) => (
              <div className="w-full border-y border-gray-600 flex flex-row pl-1">
                <div className="flex-1 pl-1">{e.nombreArticulo}</div>
                <div className="flex-1 pl-1">{e.amount}</div>

                <div className="flex-1 pl-1 text-cyan-300 flex justify-center">
                  $ {e.costoArticle}
                </div>
                <div onClick={() => deleteOfList(i)}>
                  <p>Borrar</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex-2 border-t border-gray-600 flex justify-evenly">
            <p className="text-green-300" onClick={sumCost}>
              Total
            </p>
            <p>$ {cost}</p>
          </div>
        </div>
        <div className="flex flex-col col-span-2 row-span-full p-2">
          <div className="flex-1 space-y-5 w-full">
            <MenuArticlesForm
              style={estilosInput}
              setChangeData={setChangeData}
              addProduct={addProduct}
            />
            {(VentaData.comprador.nombre !== "" && !editClient && (
              <div className="flex justify-between flex-col">
                <div className="flex justify-between">
                  Comprador{" "}
                  <button
                    className="bg-green-200 w-5"
                    onClick={() => {
                      setEditClient(true);
                    }}
                  >
                    E
                  </button>
                </div>
                <div className="text-cyan-600 w-52 flex flex-wrap">
                  <p>{VentaData.comprador.nombre}</p>
                </div>
              </div>
            )) || (
                <MenuClientsForm
                  style={estilosInput}
                  clientes={clientes}
                  setChangeData={setChangeData}
                  setEditClient={setEditClient}
                />
              ) ||
              (editClient && (
                <MenuClientsForm
                  style={estilosInput}
                  clientes={clientes}
                  setChangeData={setChangeData}
                  setEditClient={setEditClient}
                />
              ))}
          </div>
          <div className="flex flex-row space-x-5">
            <button
              className="w-1/2 h-10 bg-red-400 rounded-md"
              onClick={() => {
                onChangeModal(false);
              }}
            >
              Cancelar
            </button>
            <button
              className="w-1/2 h-10 bg-green-400 rounded-md"
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
    </div>
  );
};

export default AddVentaForm;
