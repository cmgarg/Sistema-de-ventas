import React, { useEffect, useRef, useState } from "react";
interface MenuClientsForm {
  style: string;
  clientes: any[];
  setChangeData: (data: string, value: any) => void;
}

const MenuClientsForm: React.FC<MenuClientsForm> = ({
  style,
  clientes,
  setChangeData,
}) => {
  const [menuActived, setMenuActived] = useState(true);
  const [clientesEncontrados, setclientesEncontrados] = useState([]);
  const [inputValue, setInputValue] = useState({ nombre: "", idClient: "" });

  const inputRef = useRef();

  function listaClientes() {
    console.log("PUIITO", clientesEncontrados);
    return (
      <div className="absolute w-full bg-gray-700 z-50 shadow-md shadow-black rounded-b-lg flex flex-col top-full">
        {clientesEncontrados.map((cliente) => (
          <button
            onClick={() => {
              setInputValue({
                nombre: cliente.nombre,
                idClient: cliente.idClient,
              });
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
        {clientesEncontrados.length > 0 && menuActived && listaClientes()}
      </div>
    </div>
  );
};

export default MenuClientsForm;
