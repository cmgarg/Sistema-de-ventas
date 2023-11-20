import React, { useEffect, useState } from "react";
import NavMain from "../../navmain/NavMain";
import AsideMain from "../../asidemain/AsideMain";
import Buscador from "../../../buscador/Buscador";
import AgregarCliente from "./buttons/AgregarCliente";
import AddClientresForm from "./ADDCLIENTES/AddClientresForm";
import TableMain from "../../tablaMain/TableMain";
import TableHead from "../../tablaMain/TableHead";
import TableRow from "../../tablaMain/TableRow";
interface ClientesContentProps {
  searchIn?: string;
}

const ClientesContent: React.FC<ClientesContentProps> = ({ searchIn }) => {
  const [activeModal, setActiveModal] = useState(false);

  const [clientes, setClientes] = useState([]);

  function onChangeModal(p: boolean) {
    setActiveModal(p);
  }
  //////////QUEDASTE EN CREAR BUTTONS PARA AGREGAR CLIENTES
  function obtenerClientes() {
    window.api.enviarEvento("obtener-clientes");
  }
  //OBTENER CLIENTES
  function listaDeItems() {
    console.log("ME EJECUTO JJIJI");
    return (
      <TableMain>
        <TableHead>
          <p className="bg-slate-400 flex-1 pl-2 text-center">Hola</p>
          <p className="bg-slate-400 flex-1 pl-2 text-center">Hola</p>
          <p className="bg-slate-400 flex-1 pl-2 text-center">Hola</p>
        </TableHead>
        {clientes.map((fila) => (
          <TableRow key={fila.id}>
            <div className="bg-slate-300 flex justify-start items-center flex-1 pl-2">
              <p>{fila.nombre}</p>
            </div>
            <div className="bg-slate-300 flex justify-start items-center flex-1 pl-2">
              <p>{fila.direccion}</p>
            </div>
            <div className="bg-slate-300 flex justify-start items-center flex-1 pl-2">
              <p>{fila.telefono}</p>
            </div>
          </TableRow>
        ))}
      </TableMain>
    );
  }

  useEffect(() => {
    obtenerClientes();
    window.api.recibirEvento("respuesta-obtener-clientes", (e) => {
      console.log("ME EJECUTO A LA PERFECCIONE");
      const arrayClientes = [];
      e.map((e) => {
        arrayClientes.push(e);
      });
      setClientes(arrayClientes);
    });
  }, []);
  return (
    <div className="flex flex-col flex-1">
      <div className="flex-2 border-b-2 border-slate-100">
        <NavMain>
          <AgregarCliente onChangeModal={onChangeModal}></AgregarCliente>
          <Buscador></Buscador>
        </NavMain>
      </div>
      <div className="flex flex-row flex-1">
        <AsideMain isActive={false}></AsideMain>
        <div className="flex-1 bg-slate-700 p-5 relative">
          {activeModal && (
            <AddClientresForm onChangeModal={onChangeModal}></AddClientresForm>
          )}
          {listaDeItems()}
        </div>
      </div>
    </div>
  );
};

export default ClientesContent;
