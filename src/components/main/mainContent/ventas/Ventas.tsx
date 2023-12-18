import React, { useEffect, useState } from "react";
import AsideMain from "../../asidemain/AsideMain";
import NavMain from "../../navmain/NavMain";
import Buscador from "../../../buscador/Buscador";
import Export from "../buttons/Export";
import Imprimir from "../buttons/Imprimir";
import Agregar from "../buttons/Agregar";
import AddVentaForm from "./addVenta/AddVentaForm";
import MenuContextual2 from "../../../GMC/MenuContextual2";
import Diamong from "../../../../assets/MAINSVGS/mainAsideSvg/maincontent/Diamong";
import TableRow from "../../tablaMain/TableRow";
import TableHead from "../../tablaMain/TableHead";
import TableMain from "../../tablaMain/TableMain";

interface VentastProps {
  //PROPS
}

const Ventas: React.FC<VentastProps> = (
  {
    /*PROPS*/
  }
) => {
  const [activeModal, setActiveModal] = useState(false);

  const [ventas, setVentas] = useState([]);

  function onChangeModal(p: boolean) {
    setActiveModal(p);
  }
  function obtenerVentas() {
    window.api.enviarEvento("obtener-ventas");
  }

  /////LISTA DE ARTICULSO
  function listaDeItems() {
    console.log(ventas);
    return (
      <TableMain>
        <TableHead>
          <div className="bg-slate-600 flex-1 pl-2 rounded-tl-lg flex items-center justify-center">
            <p className="text-center">Articulo</p>
          </div>
          <div className="bg-slate-600 flex-1 pl-2 rounded-tr-lg flex items-center justify-center">
            <p className="text-center">Cantidad</p>
          </div>
          <div className="bg-slate-600 flex-1 pl-2 flex items-center justify-center">
            <p className="text-center">Comprador</p>
          </div>
        </TableHead>
        <div className="first:bg-white">
          {ventas.map((fila) => (
            <TableRow key={fila._id}>
              <div className="flex justify-center items-center absolute top-0 left-0 bottom-0">
                <MenuContextual2 title={<Diamong color="#fff" size="20" />}>
                  <div
                    onClick={() => {
                      eliminarVenta(fila._id);
                    }}
                    className="w-full hover:bg-gray-600 pl-2"
                  >
                    <p>Eliminar</p>
                  </div>
                  <div className="w-full hover:bg-gray-600 pl-2">
                    <p>Editar</p>
                  </div>
                </MenuContextual2>
              </div>
              <div className="flex items-center flex-1 pl-2 space-x-1">
                <p className="flex-1 text-center">{`${fila.articulo}`}</p>
              </div>
              <div className="flex justify-center items-center flex-1 pl-2">
                <p>{fila.cantidad}</p>
              </div>
              <div className="flex justify-center items-center flex-1 pl-2">
                <p>{fila.comprador.nombre}</p>
              </div>
            </TableRow>
          ))}
        </div>
      </TableMain>
    );
  }
  function eliminarVenta(id: string) {
    console.log("hasda");
    window.api.enviarEvento("eliminar-venta", id);
    obtenerVentas();
  }
  ///carga de ventas
  useEffect(() => {
    obtenerVentas();
    window.api.recibirEvento("respuesta-obtener-ventas", (e) => {
      console.log("ME EJECUTO A LA PERFECCIONE", e);
      const arrayVentas = [];
      e.map((e) => {
        arrayVentas.push(e);
      });
      setVentas(arrayVentas);
    });
  }, []);
  //////////////////////////////

  return (
    <div className="flex flex-col flex-1">
      <div className="flex-2 border-b-2 border-slate-100">
        <NavMain title="Ventas">
          <Buscador></Buscador>
          <Export></Export>
          <Agregar title="Venta" onChangeModal={onChangeModal}></Agregar>
        </NavMain>
      </div>
      <div className="flex flex-row flex-1">
        <AsideMain isActive={false}></AsideMain>
        <div className="flex-1 bg-slate-700 p-5 relative">
          {activeModal && (
            <AddVentaForm onChangeModal={onChangeModal}></AddVentaForm>
          )}
          {listaDeItems()}
        </div>
      </div>
    </div>
  );
};

export default Ventas;
