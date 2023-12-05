import React, { useEffect, useState } from "react";
import NavMain from "../../navmain/NavMain";
import AsideMain from "../../asidemain/AsideMain";
import Buscador from "../../../buscador/Buscador";
import Agregar from "../buttons/Agregar";
import AddClientresForm from "./ADDCLIENTES/AddClientresForm";
import TableMain from "../../tablaMain/TableMain";
import TableHead from "../../tablaMain/TableHead";
import TableRow from "../../tablaMain/TableRow";
import Diamong from "../../../../assets/MAINSVGS/mainAsideSvg/maincontent/Diamong";
import EditarClientes from "./editarClientes/editarClientes";
import MenuContextual2 from "../../../GMC/MenuContextual2";
import Export from "../buttons/Export";
import Biñeta from "../Biñeta/Biñieta";
interface ClientesContentProps {
  searchIn?: string;
}

const ClientesContent: React.FC<ClientesContentProps> = ({ searchIn }) => {
  const [activeModalForm, setActiveModal] = useState(false);
  const [clienteAeditar, setClienteAeditar] = useState({
    active: false,
    id: "",
  });
  function clienteAeditarOff() {
    console.log(clienteAeditar);
    setClienteAeditar({ active: false, id: "" });
  }
  const [clientes, setClientes] = useState([]);

  function onChangeModal(p: boolean) {
    setActiveModal(p);
  }
  ////ACTIVAR A EDITAR CLIENTES
  function editClient(clienteid: string) {
    window.api.enviarEvento("obtener-clienteById", clienteid);

    setClienteAeditar({ active: true, id: clienteid });
  }
  /////////////////////////////
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
              <div className="flex justify-center items-center absolute top-0 left-0 bottom-0">
                <MenuContextual2
                  title={
                    <Biñeta title="opciones">
                      <Diamong color="#fff" size="20" />
                    </Biñeta>
                  }
                >
                  <div
                    onClick={() => {
                      eliminarCliente(fila._id);
                    }}
                    className="w-full hover:bg-gray-600 pl-2"
                  >
                    <p>Eliminar</p>
                  </div>
                  <div
                    onClick={() => {
                      editClient(fila._id);
                    }}
                    className="w-full hover:bg-gray-600 pl-2"
                  >
                    <p>Editar</p>
                  </div>
                </MenuContextual2>
              </div>
              <div className="flex items-center flex-1 pl-2 space-x-2">
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
        <NavMain title="Clientes">
          <Buscador></Buscador>
          <Export></Export>
          <Agregar onChangeModal={onChangeModal}></Agregar>
        </NavMain>
      </div>
      <div className="flex flex-row flex-1">
        <AsideMain isActive={false}></AsideMain>
        <div className="flex-1 bg-slate-700 p-5 relative">
          {activeModalForm && (
            <AddClientresForm onChangeModal={onChangeModal}></AddClientresForm>
          )}
          {listaDeItems()}
          {clienteAeditar.active && (
            <EditarClientes clienteAeditarOff={clienteAeditarOff} />
          )}
        </div>
      </div>
    </div>
  );
};
export default ClientesContent;
