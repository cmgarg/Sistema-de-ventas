import React, { useEffect, useState } from "react";
import AsideMain from "../../asidemain/AsideMain.js";
import NavMain from "../../navmain/NavMain.js";
import Buscador from "../../../buscador/Buscador.js";
import Export from "../buttons/Export.js";
import Agregar from "../buttons/Agregar.js";
import AddVentaForm from "./addVenta/AddVentaForm.js";
import ItemList from "./ItemList.js";
import { useDispatch, useSelector } from "react-redux";
import { saleData, storeType } from "../../../../../types/types.js";
import { addSale } from "../../../../../src/redux/estados/salesState";
import Afip from "../../../../../node_modules/@afipsdk/afip.js";
import AddAccountToPay2 from "./AgregarCuenta/AddAccountToPay2.js";
import { TfiPencilAlt } from "react-icons/tfi";
import Biñeta from "../Biñeta/Biñieta.js";
import ButtonR from "../buttons/ButtonR.js";
import { MdAdd } from "react-icons/md";

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
  const [estadoAgregarCuenta, setEstadoAgregarCuenta] = useState(false);
  const [cerrarModal, setCerrarModal] = useState(false); // Nuevo estado para controlar el cierre del modal
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
  const formatMony = (n: number | string) => {
    console.log("FORMATIEANDO", formatterCurrency.format(Number(n)));
    return formatterCurrency.format(Number(n));
  };
  ///carga de ventas

  //////////////////////////////
  console.log(sales, "estas son las ventas");

  useEffect(() => {
    console.log(estadoAgregarCuenta, "este es el estado del use efect");
  }, [estadoAgregarCuenta]);

  return (
    <div className="h-full w-full grid-cmg-program">
      <div className="absolute top-0 right-[339px] left-44 h-10 z-30 app-region-drag">
        <NavMain title={`Ventas (${sales.length})`} setLoginUser={""}>
          <Export></Export>

          <Buscador
            searchIn={sales}
            functionReturn={getResultsSales}
          ></Buscador>
          <ButtonR
            borderSize="border-x border-gray-600"
            textSize="text-sm"
            bgIconColor="bg-gray-700 text-[#fff8dcff]"
            bgColor="bg-yellow-700"
            height="h-8"
            width="w-44"
            onClick={onChangeModal}
            title="Agregar venta"
          >
            <MdAdd size={25} color="white" />
          </ButtonR>
        </NavMain>
      </div>
      <div className="flex flex-row pb-5 row-start-2 row-end-7">
        <AsideMain isActive={false}></AsideMain>
        {estadoAgregarCuenta ? (
          <AddAccountToPay2
            setEstadoAgregarCuenta={setEstadoAgregarCuenta}
            estadoAgregarCuenta={estadoAgregarCuenta}
            setCerrarModal={setCerrarModal}
          />
        ) : null}
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
        </div>
      </div>
    </div>
  );
};

export default Ventas;
