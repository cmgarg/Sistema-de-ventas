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
      <div className="flex-2">
        <NavMain title="Ventas" setLoginUser={""}>
          <Export></Export>
          <Biñeta title={`Agregar Cuenta`}>
            <div
              className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-700 hover:bg-gray-600"
              onClick={() => {
                setEstadoAgregarCuenta(true);
              }}
            >
              <TfiPencilAlt size={19} color={"#fff"} />
            </div>
          </Biñeta>
          <Buscador
            searchIn={sales}
            functionReturn={getResultsSales}
          ></Buscador>
          <Agregar title="Venta" onChangeModal={onChangeModal}></Agregar>
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
