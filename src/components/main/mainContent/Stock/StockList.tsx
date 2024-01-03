import React, { ReactNode } from "react";
import TableMain from "../../tablaMain/TableMain";
import TableHead from "../../tablaMain/TableHead";
import TableRow from "../../tablaMain/TableRow";
import MenuContextual2 from "../../../GMC/MenuContextual2";
import Diamong from "../../../../assets/MAINSVGS/mainAsideSvg/maincontent/Diamong";
import { Link } from "react-router-dom";
import OrdenarPor from "../buttons/OrdenarPor";

interface StockListProps {
  ventas: object[];
  setVentas: (e: object[]) => void;
}

const StockList: React.FC<StockListProps> = ({ ventas, setVentas }) => {
  //ORDENAR LISTA
  function sortList(e: string) {
    let salesToOrder = [...ventas];

    if (e === "ventas") {
      salesToOrder.sort((a: object, b: object) => b.cantidad - a.cantidad);

      setVentas([...salesToOrder]);
    }
  }
  function eliminarVenta(id: string) {
    console.log("hasda");
    window.api.enviarEvento("eliminar-venta", id);
    deleteSaleState(id);
  }
  //elimina venta del estado
  function deleteSaleState(idSale: string) {
    const sales = [...ventas];

    const i = sales.findIndex((obj) => obj._id === idSale);

    if (i !== -1) {
      sales.splice(i, 1);
    }
    setVentas([...sales]);
    return;
  }

  return (
    //PODER ORDENAR LAS LISTAS
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
        <div className="w-12 h-11 bg-gray-700 rounded-lg flex justify-center items-center select-none cursor-pointer absolute right-0">
          <OrdenarPor>
            <div
              className="w-full hover:bg-gray-600"
              onClick={() => {
                sortList("ventas");
              }}
            >
              <p>Ventas</p>
            </div>
            <div className="w-full hover:bg-gray-600">
              <p>Mas Activos</p>
            </div>
            <div className="w-full hover:bg-gray-600">
              <p>Inactivos</p>
            </div>
          </OrdenarPor>
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
              <Link
                to={`/articulo/${fila.articulo.idArticle}`}
                className="flex-1 text-center"
              >{`${fila.articulo.nombreArticulo}`}</Link>
            </div>
            <div className="flex justify-center items-center flex-1 pl-2">
              <p>{fila.cantidad}</p>
            </div>
            <div className="flex justify-center items-center flex-1 pl-2">
              <Link to={`/cliente/${fila.comprador.idClient}`}>
                {fila.comprador.nombre}
              </Link>
            </div>
          </TableRow>
        ))}
      </div>
    </TableMain>
  );
};

export default StockList;
