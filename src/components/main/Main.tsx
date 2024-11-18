import React, { useEffect, useState } from "react";
import ClientesContent from "./mainContent/clientes/Clientes";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Articulos from "./mainContent/Articulos/Articulos";
import Caja from "./mainContent/Caja/Caja";
import ClienteInfo from "./mainContent/ApartadoCliente/ClienteInfo";
import Ventas from "./mainContent/ventas/Ventas";
import ArticuloInfo from "./mainContent/ApartadoArticulos/ArticuloInfo";
import Cuentas from "./mainContent/Cuentas/Cuentas";
import Stock from "./mainContent/Stock/Stock";
import Estadisticas from "./mainContent/Estadisticas/Estadisticas";
import { useDispatch, useSelector } from "react-redux";
import { chargeArticles } from "../../redux/estados/articlesState";
import { chargeClients } from "../../redux/estados/clientesState";
import { chargeSales } from "../../redux/estados/salesState";
import Configuracion from "./mainContent/Configuracion/Configuracion";
import { loadBrands } from "../../redux/estados/brandState";
import { loadCategorys } from "../../redux/estados/categoryState";
import { loadSubCategorys } from "../../redux/estados/subCategoryState";
import PanelUsuario from "./PanelUsuario";
import { RootState } from "../../redux/store";

interface MainContentProps {}

const MainContent: React.FC<MainContentProps> = ({}) => {
  const userType = useSelector(
    (state: RootState) => state.estadoTipoDeUser.userType
  );
  const dispatch = useDispatch();
  const [inicioPrograma, setInicioPrograma] = useState<string | null>(null);
  const navigate = useNavigate();

  //////// configuracion de apartado q inician los usuarios segun el rango de usuario
  useEffect(() => {
    if (inicioPrograma) {
      navigate(inicioPrograma);
    }
  }, [inicioPrograma]);

  useEffect(() => {
    if (userType === "stock") {
      setInicioPrograma("/stock");
    } else if (
      userType === "gerente" ||
      userType === "logistica" ||
      userType === "ventas" ||
      userType === "admin"
    ) {
      setInicioPrograma("/");
    }
  }, [userType]);

  function loadCategoryAndBrands(data: {
    categorys: {}[];
    brands: {}[];
    subCategorys: {}[];
  }) {
    const { categorys, brands, subCategorys } = data;

    dispatch(loadBrands(brands));
    dispatch(loadCategorys(categorys));
    dispatch(loadSubCategorys(subCategorys));
  }
  const imprimirPrueba = () => {
    const data = [
      {
        type: "text",
        value: "MARTIN CHUPA PIJA",
        style: `text-align:center;`,
        css: { "font-weight": "700", "font-size": "18px" },
      },
    ];
    window.ipcRenderer.invoke("print");
  };
  useEffect(() => {
    window.api.enviarEvento("get-articles");
    window.api.enviarEvento("get-clients");
    window.api.enviarEvento("get-sales");
    window.api.enviarEvento("get-brand");
    window.api.enviarEvento("get-categoryAndBrand");
  }, []);

  useEffect(() => {
    //ARTICULOS
    window.api.recibirEvento("response-get-articles", (articles) => {
      console.log(articles);
      dispatch(chargeArticles(articles));
    });
    //CLIENTES
    window.api.recibirEvento("response-get-clients", (clients) => {
      console.log("cargandosss BUENOO", clients);

      dispatch(chargeClients(clients));
    });
    //VENTAS
    window.api.recibirEvento("response-get-sales", (sales) => {
      console.log(sales);
      dispatch(chargeSales(sales));
    });
    //CATEGORIA Y MARCAS
    window.api.recibirEvento("response-get-categoryAndBrand", (data) => {
      loadCategoryAndBrands(data);
    });
  }, []);

  // SEGUIR CON LOS ESTADOS.
  return (
    <div className="h-full w-full flex flex-col">
      <PanelUsuario />
      <Routes>
        <Route path="/" element={<ClientesContent />} />
        <Route path="/articulos" element={<Articulos />} />
        <Route path="/ventas" element={<Ventas />} />
        <Route path="/caja" element={<Caja />} />
        <Route path="/Cuentas" element={<Cuentas />} />
        <Route path="/stock" element={<Stock />} />
        <Route path="/estadisticas" element={<Estadisticas />} />
        <Route path="/cliente/:id" element={<ClienteInfo />} />
        <Route path="/configuracion" element={<Configuracion />} />
        <Route path="/articulo/:code" element={<ArticuloInfo />} />
      </Routes>
    </div>
  );
};

export default MainContent;

/////////notifiaciones
// Función para enviar la notificación
export const sendNotification = (
  titulo: string,
  nota: string,
  icono: number,
  tipo: string,
  idcuenta: string
) => {
  const notificationData = {
    titulo: titulo,
    nota: nota,
    icono: icono, // Aquí puedes usar el nombre del icono que deseas
    tipo: tipo, //////// stock, actualizacion, caja,
    idcuenta: idcuenta,
    fechaHora: new Date().toISOString(),
    visto: false,
    ocualta: false,
  };
  window.api.enviarEvento("send-notification", notificationData);
};
