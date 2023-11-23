import React, { useEffect, useState } from "react";
import NavMain from "../../navmain/NavMain";
import AsideMain from "../../asidemain/AsideMain";
import Buscador from "../../../buscador/Buscador";
import AgregarCliente from "./buttons/AgregarCliente";
import AddClientresForm from "./ADDCLIENTES/AddClientresForm";
import TableMain from "../../tablaMain/TableMain";
import TableHead from "../../tablaMain/TableHead";
import TableRow from "../../tablaMain/TableRow";
import Diamong from "../../../../assets/MAINSVGS/mainAsideSvg/ClientesContentSVG/Diamong";
import MenuContextual from "../../MenuContextual/MenuContextual";
import EditarClientes from "./editarClientes/editarClientes";
interface ClientesContentProps {
  searchIn?: string;
}

const ClientesContent: React.FC<ClientesContentProps> = ({ searchIn }) => {
  const [activeModalForm, setActiveModal] = useState(false);

  const [clientes, setClientes] = useState([]);

  function onChangeModal(p: boolean) {
    setActiveModal(p);
  }
  //ELIMINAR CLIENTES
  function eliminarCliente(id: string) {
    console.log("hasda");
    window.api.enviarEvento("eliminar-cliente", id);
    obtenerClientes();
  }
  //
  function obtenerClientes() {
    window.api.enviarEvento("obtener-clientes");
  }
  //OBTENER CLIENTES
  function listaDeItems() {
    console.log("ME EJECUTO JJIJI");
    return (
      <TableMain>
        <TableHead>
          <div className="bg-slate-600 flex-1 pl-2 rounded-tl-lg flex items-center justify-center">
            <p className="text-center">Nombre</p>
          </div>
          <div className="bg-slate-600 flex-1 pl-2 flex items-center justify-center">
            <p className="text-center">Email</p>
          </div>
          <div className="bg-slate-600 flex-1 pl-2 flex items-center justify-center">
            <p className="text-center">Direccion</p>
          </div>
          <div className="bg-slate-600 flex-1 pl-2 rounded-tr-lg flex items-center justify-center">
            <p className="text-center">DNI</p>
          </div>
        </TableHead>
        <div className="first:bg-white">
          {clientes.map((fila) => (
            <TableRow key={fila._id}>
              <div className="flex items-center flex-1 pl-2 space-x-2">
                <MenuContextual
                  onDelete={() => {
                    eliminarCliente(fila._id);
                  }}
                  onEdit={() => {}}
                ></MenuContextual>
                <p className="flex-1 text-center">{fila.nombre}</p>
              </div>
              <div className="flex justify-center items-center flex-1 pl-2">
                <p>{fila._id}</p>
              </div>
              <div className="flex justify-center items-center flex-1 pl-2">
                <p>{fila.direccion}</p>
              </div>
              <div className="flex justify-center items-center flex-1 pl-2">
                <p>{fila.dni}</p>
              </div>
            </TableRow>
          ))}
        </div>
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
        <AsideMain isActive={true}></AsideMain>
        <div className="flex-1 bg-slate-700 p-5 relative">
          {activeModalForm && (
            <AddClientresForm onChangeModal={onChangeModal}></AddClientresForm>
          )}
          {listaDeItems()}
        </div>
      </div>
    </div>
  );
};
export default ClientesContent;
