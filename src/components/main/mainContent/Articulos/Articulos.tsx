import React, { useEffect, useState } from "react";
import NavMain from "../../navmain/NavMain";
import AgregarCliente from "../clientes/buttons/AgregarCliente";
import Buscador from "../../../buscador/Buscador";
import AsideMain from "../../asidemain/AsideMain";
import TableHead from "../../tablaMain/TableHead";
import TableMain from "../../tablaMain/TableMain";
import TableRow from "../../tablaMain/TableRow";
import MenuContextual from "../../MenuContextual/MenuContextual";
import AddArticuloForm from "./ADDARTICULO/AddArticuloForm";

interface ArticulosProps {}

const Articulos: React.FC<ArticulosProps> = ({}) => {
  const [activeModal, setActiveModal] = useState(false);

  const [articulos, setArticulos] = useState([]);

  function onChangeModal(p: boolean) {
    setActiveModal(p);
  }
  function obtenerArticulos() {
    window.api.enviarEvento("obtener-articulos");
  }

  /////LISTA DE ARTICULSO
  function listaDeItems() {
    console.log("ME EJECUTO JJIJI", articulos);
    return (
      <TableMain>
        <TableHead>
          <div className="bg-slate-600 flex-1 pl-2 rounded-tl-lg flex items-center justify-center">
            <p className="text-center">Nombre</p>
          </div>
          <div className="bg-slate-600 flex-1 pl-2 rounded-tr-lg flex items-center justify-center">
            <p className="text-center">DNI</p>
          </div>
          <div className="bg-slate-600 flex-1 pl-2 flex items-center justify-center">
            <p className="text-center">Email</p>
          </div>
          <div className="bg-slate-600 flex-1 pl-2 flex items-center justify-center">
            <p className="text-center">Direccion</p>
          </div>
          <div className="bg-slate-600 flex-1 pl-2 flex items-center justify-center">
            <p className="text-center">Telefono</p>
          </div>
        </TableHead>
        <div className="first:bg-white">
          {articulos.map((fila) => (
            <TableRow key={fila._id}>
              <div className="flex items-center flex-1 pl-2 space-x-2">
                <MenuContextual
                  onDelete={() => {
                    eliminarArticulo(fila._id);
                  }}
                  onEdit={() => {}}
                ></MenuContextual>
                <p className="flex-1 text-center">{fila.nombre}</p>
                <p className="flex-1 text-center">{fila.apellido}</p>
              </div>
              <div className="flex justify-center items-center flex-1 pl-2">
                <p>{fila.email}</p>
              </div>
              <div className="flex justify-center items-center flex-1 pl-2">
                <p>{fila.dni}</p>
              </div>
              <div className="flex justify-center items-center flex-1 pl-2">
                <p>{fila.direccion}</p>
              </div>
              <div className="flex justify-center items-center flex-1 pl-2">
                <p>{fila.telefono}</p>
              </div>
            </TableRow>
          ))}
        </div>
      </TableMain>
    );
  }
  function eliminarArticulo(id: string) {
    console.log("hasda");
    window.api.enviarEvento("eliminar-articulo", id);
    obtenerArticulos();
  }
  ///carga de articulos
  useEffect(() => {
    obtenerArticulos();
    window.api.recibirEvento("respuesta-obtener-articulos", (e) => {
      console.log("ME EJECUTO A LA PERFECCIONE", e);
      const arrayArticulos = [];
      e.map((e) => {
        arrayArticulos.push(e);
      });
      setArticulos(arrayArticulos);
    });
  }, []);
  //////////////////////////////
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
            <AddArticuloForm onChangeModal={onChangeModal}></AddArticuloForm>
          )}
          {listaDeItems()}
        </div>
      </div>
    </div>
  );
};

export default Articulos;
