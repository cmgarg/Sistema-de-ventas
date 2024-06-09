import React, { useEffect, useState } from "react";
import AsideMain from "../../asidemain/AsideMain";
import NavMain from "../../navmain/NavMain";
import Buscador from "../../../buscador/Buscador";
import Export from "../buttons/Export";
import Agregar from "../buttons/Agregar";
import AddVentaForm from "./addVenta/AddVentaForm";
import ItemList from "./ItemList";
import { useDispatch, useSelector } from "react-redux";
import { saleData, storeType } from "../../../../../types";
import { addSale } from "../../../../../src/redux/estados/salesState";
import Afip from "../../../../../node_modules/@afipsdk/afip.js";

interface VentastProps {
  //PROPS
}

const Ventas: React.FC<VentastProps> = (
  {
    /*PROPS*/
  }
) => {
  const dispatch = useDispatch();
  const formatterCurrency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    currencyDisplay: "symbol",
  });
  const sales = useSelector((state: storeType) => state.saleState);
  const [activeModal, setActiveModal] = useState(false);
  const [searchActived, setSearchActived] = useState<{
    actived: boolean;
    results: object[];
  }>({
    actived: false,
    results: [],
  });
  function addNewSale(e: saleData) {
    dispatch(addSale(e));
  }
  function onChangeModal(p: boolean) {
    setActiveModal(p);
  }
  function getResultsSales(p: object[], e: boolean) {
    setSearchActived({ actived: e, results: p });
    console.log(p);
  }

  const pruenaAfipo = () => {
    window.api.enviarEvento("prueba-afipo");
  };

  /////LISTA DE ARTICULSO

  ///carga de ventas
  useEffect(() => {
    console.log(formatMony(4300));
  }, []);
  //////////////////////////////

  return (
    <div className="h-full w-full grid-cmg-program">
      <div className="flex-2">
        <NavMain title="Ventas">
          <Export></Export>
          <Buscador
            searchIn={sales}
            functionReturn={getResultsSales}
          ></Buscador>
          <Agregar title="Venta" onChangeModal={onChangeModal}></Agregar>
        </NavMain>
      </div>
      <div className="flex flex-row pb-5 row-start-2 row-end-7">
        <AsideMain isActive={false}></AsideMain>
        <div className="flex-1 p-5">
          {activeModal && (
            <AddVentaForm
              onChangeModal={onChangeModal}
              addSales={addNewSale}
              formatMony={formatMony}
            ></AddVentaForm>
          )}
          <ItemList
            sales={sales}
            searchActived={searchActived}
            formatMony={formatMony}
          />
          <button onClick={pruenaAfipo} className="w-52 h-96 bg-teal-500">
            PRUEBA AFIPO
          </button>
        </div>
      </div>
    </div>
  );
};

export default Ventas;
