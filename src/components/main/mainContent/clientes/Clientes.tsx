import React, { useEffect, useState } from "react";
import NavMain from "../../navmain/NavMain";
import AsideMain from "../../asidemain/AsideMain";
import Buscador from "../../../buscador/Buscador";
import Agregar from "../buttons/Agregar";
import AddClientresForm from "./ADDCLIENTES/AddClientresForm";
import EditarClientes from "./editarClientes/editarClientes";
import Export from "../buttons/Export";
import Imprimir from "../buttons/Imprimir";
import ListClient from "./ListClient";
import { ContextMenu } from "@radix-ui/react-context-menu";
import ContextMenuG from "../ContextMenu/ContextMenu";

interface ClientesContentProps {
  searchIn?: string;
}

const ClientesContent: React.FC<ClientesContentProps> = ({ searchIn }) => {
  const [activeModalForm, setActiveModalForm] = useState(false);
  const [clienteAeditar, setClienteAeditar] = useState<{
    active: boolean;
    id: string;
  }>({
    active: false,
    id: "",
  });
  const [searchActived, setSearchActived] = useState<{
    actived: boolean;
    results: object[];
  }>({
    actived: false,
    results: [],
  });
  const [clientes, setClientes] = useState([]);

  function onChangeModal(p: boolean) {
    setActiveModalForm(p);
  }
  function clienteAeditarOff() {
    setClienteAeditar({ active: false, id: "" });
  }
  function onChangeClient(data: object) {
    setClienteAeditar(data);
  }
  ////ACTIVAR A EDITAR CLIENTES
  /////////////////////////////
  //OBTENER RESULTADOS DE BUSQUEDAD
  function getResults(e: object[], actived: boolean) {
    console.log(clientes, "FORRRRRRRRRRRRRRROO");
    let object = { actived: actived, results: e };
    setSearchActived(object);
    console.log(object, "aca");
  }
  //
  function obtenerClientes() {
    window.api.enviarEvento("obtener-clientes");
  }
  //OBTENER CLIENTES
  useEffect(() => {
    obtenerClientes();
    window.api.recibirEvento("respuesta-obtener-clientes", (e) => {
      console.log("ME EJECUTO A LA PERFECCIONE", e);
      const arrayClientes = [];
      e.map((e) => {
        arrayClientes.push(e);
      });
      setClientes(arrayClientes);
    });
  }, []);
  return (
    <div className="flex flex-col flex-1">
      <div className="flex-2 pt-2">
        <NavMain title="Clientes">
          <Buscador searchIn={clientes} functionReturn={getResults}></Buscador>
          <Export></Export>
          <Imprimir></Imprimir>
          <Agregar title="cliente" onChangeModal={onChangeModal}></Agregar>
        </NavMain>
      </div>
      <div className="flex flex-row flex-1">
        <AsideMain isActive={false}></AsideMain>
        <div className="flex-1 p-5 relative">
          {activeModalForm && (
            <AddClientresForm onChangeModal={onChangeModal}></AddClientresForm>
          )}
          {clienteAeditar.active && (
            <EditarClientes clienteAeditarOff={clienteAeditarOff} />
          )}

          <ListClient
            clienteAeditar={clienteAeditar}
            searchActived={searchActived}
            setClienteAeditar={onChangeClient}
          />
        </div>
      </div>
    </div>
  );
};
export default ClientesContent;
