import { ipcMain } from "electron";
import {
  accountToPay,
  actualizarCuenta,
  actualizarEstadoPagado,
  actualizarImagenUsuario,
  addBrand,
  addCategory,
  addSubCategory,
  deleteArticle,
  deleteClient,
  deleteSales,
  editArticle,
  findArticles,
  findClients,
  findSales,
  getArticleByCode,
  getCategoryAndBrand,
  getClientById,
  getStats,
  getUnits,
  getUser,
  guardarUsuario,
  iniciarSesion,
  obtenerAdmin,
  obtenerEstadoPagado,
  obtenerEstadosPagadosInicial,
  registerBuyClient,
  saleProcess,
  saveArticle,
  saveClient,
  saveNewUnits,
  updateClient,
  updateUnit,
  verificarAdminExistente,
} from "./databaseOperations";
import { verificarToken } from "./vFunctions";

const bcrypt = require("bcrypt");
const saltRounds = 10; // El coste del proceso de hashing

export const loadEvents = () => {
  //
  //ESCUCHAS DE EvENTOS DE GUARDADO DE CLIENTE
  //
  ipcMain.on("save-client", async (event, clientToSave) => {
    saveClient(clientToSave);

    const clients = await findClients();

    event.reply("response-get-clients", clients);
  });
  ipcMain.on("get-clients", async (event) => {
    const clients = await findClients();

    console.log("Se enviaron los clientes ", clients);
    event.reply("response-get-clients", clients); //TRATANDO QUE SE ACTUALICE CUANDO HAY UN CLIENTE NUEVO REGISTRADO
  });

  ipcMain.on("delete-client", async (event, clienteAEliminar) => {
    const result = await deleteClient(clienteAEliminar);

    event.reply("response-delete-client", result);
  });
  ipcMain.on("get-client-byId", async (event, clientId) => {
    console.log("AGUANTEEEEE BOCAA LOCOOO");
    const cliente = await getClientById(clientId);

    event.reply("response-get-client-byId", cliente);
  });
  ipcMain.on("update-client", async (event, clienteData) => {
    const mensajeAResponder = await updateClient(clienteData._id, clienteData);

    event.reply("response-update-client", mensajeAResponder);
  });

  ipcMain.on("register-buy-client", async (event, clienteData) => {
    console.log("ESTO LLEGO", clienteData);
    const mensajeAResponder = await registerBuyClient(clienteData);

    event.reply("response-register-buy-client", mensajeAResponder);
  });
  ///
  //ESCUCHAS DE EVENTOS DE GUARDADO DE ARTICULOS
  //

  ipcMain.on("save-article", async (event, articuloAGuardar) => {
    const categoryAndBrands = await getCategoryAndBrand();

    const { brand, category } = articuloAGuardar;

    const categorys = categoryAndBrands.categorys; //SEGUIR CONLAS VERIFICIA
    const brands = categoryAndBrands.brands;

    console.log("VERIFICANDO CATEGORIA", categorys);
    console.log("VERIFICANDO MARCA", brands);

    const categoryString = categorys.map((cat) => {
      return cat.value;
    });

    const brandString = brands.map((br) => {
      return br.value;
    });

    const categoryExist = categoryString.includes(category.value.toLowerCase());
    console.log("categoria", categoryString, categoryExist);

    const brandExist = brandString.includes(brand.value.toLowerCase());

    console.log("marca", brandString, brandExist);

    if (categoryExist && brandExist) {
      saveArticle(articuloAGuardar);
      const articles = await findArticles();

      console.log("Se enviaron los ARTICULOS desde save articles ", articles);
      event.reply("response-get-articles", articles);
      event.reply("error-save-article", {
        message: "",
        type: "",
        active: false,
      });
    } else if (!brandExist && !categoryExist) {
      event.reply("error-save-article", {
        message: "no registrada",
        type: "all",
        active: true,
      });
    } else if (!categoryExist) {
      event.reply("error-save-article", {
        message: " no registrada",
        type: "category",
        active: true,
      });
    } else if (!brandExist) {
      event.reply("error-save-article", {
        message: " no registrada",
        type: "brand",
        active: true,
      });
    }
  });
  ipcMain.on("get-articleByCode", async (event, articleCode) => {
    console.log("AGUANTEEEEE BOCAA LOCOOO");
    const article = await getArticleByCode(articleCode);
    console.log("SE RESPONDE CON , ", article);
    event.reply("response-get-articleByCode", article);
  });
  // ipcMain.on("get-articleByName", async (event, articleName) => {
  //   console.log("AGUANTEEEEE BOCAA LOCOOO");
  //   const article = await getArticleByName(articleName);

  //   event.reply("article-foundByName", article);
  // });
  ipcMain.on("get-articles", async (event) => {
    const articulos = await findArticles();

    console.log("Se enviaron los ARTICULOS", articulos);
    event.reply("response-get-articles", articulos); //TRATANDO QUE SE ACTUALICE CUANDO HAY UN CLIENTE NUEVO REGISTRADO
  });

  ipcMain.on("edit-article", async (e, articleEdit) => {
    const articleEditResult = await editArticle(articleEdit);

    e.reply("response-edit-article", articleEditResult);
  });

  ipcMain.on("delete-article", async (e, articuloAEliminar) => {
    const result = await deleteArticle(articuloAEliminar);

    e.reply("response-delete-article", result);
  });
  ///
  //ESCUCHAS DE EVENTOS DE GUARDADO DE VENTAS
  //

  ipcMain.on("get-sales-stats", async (event) => {
    const statsSales = await getStats();
    console.log(statsSales, "FALOPERO");
    event.reply("response-get-sales-stats", statsSales);
  });

  ipcMain.on("sale-process", async (event, venta) => {
    const res = await saleProcess(venta);

    event.reply("response-sale-process", res);
  });

  ipcMain.on("get-sales", async (event) => {
    const ventas = await findSales();

    console.log("Se enviaron las ventas", ventas);
    event.reply("response-get-sales", ventas); //TRATANDO QUE SE ACTUALICE CUANDO HAY UN CLIENTE NUEVO REGISTRADO
  });

  ipcMain.on("delete-sale", (e, ventaAEliminar) => {
    deleteSales(ventaAEliminar);
  });
  //CATEGORIA MARCA Y DEMAS

  ipcMain.on("save-category", async (event, category) => {
    // GUARDAR CATEGORIA EN FILTROS
    await addCategory(category);

    const categorysAndBrands = await getCategoryAndBrand();
    event.reply("response-get-categoryAndBrand", categorysAndBrands);
  });

  ipcMain.on("save-subcategory", async (event, subCategory) => {
    // GUARDAR CATEGORIA EN FILTROS
    await addSubCategory(subCategory);

    const categorysAndBrands = await getCategoryAndBrand();
    event.reply("response-get-categoryAndBrand", categorysAndBrands);
  });
  ipcMain.on("save-brand", async (event, brand) => {
    await addBrand(brand);

    const categorysAndBrands = await getCategoryAndBrand();
    event.reply("response-get-categoryAndBrand", categorysAndBrands);
  });
  ipcMain.on("get-categoryAndBrand", async (event) => {
    const categorysAndBrands = await getCategoryAndBrand();

    event.reply("response-get-categoryAndBrand", categorysAndBrands);
  });

  //UNIDADES EVENTOS
  //obtener unidades
  ipcMain.on("get-unitsArticleForm", async (event) => {
    const units = await getUnits();

    event.reply("response-get-unitsArticleForm", units);
  });
  //guardar nueva unidad
  ipcMain.on("save-unitsArticleForm", async (event, unit) => {
    const response = await saveNewUnits(unit);

    event.reply("response-save-unitsArticleForm", response);
  });
  //actualizar unidad
  ipcMain.on("update-unitsArticleForm", async (event, unit) => {
    const response = await updateUnit(unit, unit.id);

    event.reply("response-update-unitsArticleForm", response);
  });

  //martin////////////////////////////////////
  ipcMain.on("guardar-usuario-admin", async (event, usuarioAdmin) => {
    const response = guardarUsuario(usuarioAdmin);

    event.reply("respuesta-guardar-usuario-admin", response);
  });

  ipcMain.on("verificar-admin-existente", async (event) => {
    const response = verificarAdminExistente();

    event.reply("respuesta-verificar-admin", response);
  });

  ipcMain.on("iniciar-sesion", (event, credentials) => {
    const response = iniciarSesion(credentials);

    event.reply("respuesta-iniciar-sesion", response);
  });

  ipcMain.on("ruta-protegida", (event, token) => {
    const decoded = verificarToken(token);
    if (decoded) {
      // Token válido, maneja la solicitud
    } else {
      // Token inválido o expirado, envía un mensaje de error
      event.reply("respuesta-ruta-protegida", {
        exito: false,
        mensaje: "Token inválido o expirado",
      });
    }
  });

  // Backend
  ipcMain.on("obtener-datos-usuario", async (event, userId) => {
    try {
      const usuario = await getUser(userId);
      if (usuario) {
        // Asegúrate de que la función getUser devuelva la URL de la imagen del usuario
        event.reply("datos-usuario-obtenidos", {
          success: true,
          data: usuario,
        });
      } else {
        // Si el usuario no se encuentra, envía una respuesta de error
        event.reply("datos-usuario-obtenidos", {
          success: false,
          error: "Usuario no encontrado",
        });
      }
    } catch (error) {
      console.error("Error al obtener los datos del usuario:", error);
      event.reply("datos-usuario-obtenidos", {
        success: false,
        error: error.message,
      });
    }
  });

  // Evento de IPC para actualizar la imagen del usuario
  ipcMain.on(
    "actualizar-imagen-usuario",
    async (event, { userId, imageUrl }) => {
      console.log(
        "Evento actualizar-imagen-usuario recibido:",
        userId,
        imageUrl
      );
      try {
        await actualizarImagenUsuario(userId, imageUrl);
        event.reply("respuesta-actualizar-imagen-usuario", {
          exito: true,
          imageUrl: imageUrl,
        });
      } catch (error) {
        console.error("Error al actualizar la imagen del usuario:", error);
        event.reply("respuesta-actualizar-imagen-usuario", {
          exito: false,
          mensaje: error.message,
        });
      }
    }
  );

  // Backend
  ipcMain.on("obtener-admin", (event) => {
    const response = obtenerAdmin();

    event.reply("respuesta-obtener-admin", response);
  });

  ///
  //ESCUCHAS DE EVENTOS DE CUENTAS
  //

  ipcMain.on(
    "actualizar-estado-pagado",
    async (event, { idCuenta, estadoPagado }) => {
      try {
        // Actualiza el estado de 'pagado' en la base de datos
        await actualizarEstadoPagado(idCuenta, estadoPagado);
        // Aquí deberías añadir lógica para recuperar el estado actualizado de 'pagado' de la base de datos para 'idCuenta'
        // Por ejemplo, supongamos que tienes una función 'obtenerEstadoPagado' que hace exactamente eso:
        const estadoPagadoActualizado = await obtenerEstadoPagado(idCuenta);
        // Envía el estado actualizado de vuelta al frontend
        event.reply("estado-pagado-actualizado", {
          exitoso: true,
          idCuenta,
          estadoPagado: estadoPagadoActualizado,
        });
      } catch (error) {
        console.error(error);
        event.reply("estado-pagado-actualizado", {
          exitoso: false,
          error: error.message,
          idCuenta,
        });
      }
    }
  );

  ipcMain.on("solicitar-estado-pagado-inicial", async (event) => {
    try {
      // Obtener los estados de pagado para todas las cuentas desde la base de datos
      const estados = await obtenerEstadosPagadosInicial();
      event.reply("estado-pagado-inicial", { exitoso: true, estados });
    } catch (error) {
      console.error(error);
      event.reply("estado-pagado-inicial", {
        exitoso: false,
        error: error.message,
      });
    }
  });

  // En tu archivo del proceso principal de Electron (backend)
  ipcMain.on(
    "actualizar-cuenta",
    async (event, { idCuenta, datosActualizados }) => {
      try {
        await actualizarCuenta(idCuenta, datosActualizados);
        const cuentasActualizadas = await obtenerCuentas(); // Supongamos que esta función obtiene todas las cuentas actualizadas
        event.reply("cuentas-actualizadas", cuentasActualizadas);
      } catch (error) {
        console.error("Error al actualizar la cuenta:", error);
        event.reply("error-actualizando-cuenta", error.message);
      }
    }
  );

  //////eliminar cuentas
  ipcMain.on("eliminar-cuenta", async (event, { id }) => {
    try {
      // Intentar eliminar la cuenta de la base de datos
      await cuentas.remove({ _id: id }, {});
      // Enviar respuesta exitosa al proceso de renderizado
      event.reply("cuenta-eliminada", { exitoso: true });
    } catch (error) {
      // Enviar respuesta de error al proceso de renderizado
      event.reply("cuenta-eliminada", {
        exitoso: false,
        error: error.message,
      });
    }
  });

  //////evento cuentas para caja

  // Función para obtener las cuentas a pagar
  async function getAccountsToPay() {
    return new Promise((resolve, reject) => {
      cuentas.find({}, (err, docs) => {
        if (err) {
          reject(err);
        } else {
          resolve(docs);
        }
      });
    });
  }

  // Evento para manejar la solicitud de cuentas a pagar
  ipcMain.on("get-accountToPay", async (event) => {
    try {
      const accountsToPay = await getAccountsToPay();
      event.reply("response-get-accountToPay", accountsToPay);
    } catch (error) {
      console.error("Error al obtener las cuentas a pagar:", error);
      event.reply("response-get-accountToPay", []);
    }
  });

  ipcMain.on("save-accountToPay", async (event, account) => {
    const accountToSave = account;

    accountToPay(accountToSave);
  });

  ipcMain.on("get-accountToPay", async (event, account) => {
    const accountsToPay = await getAccountsToPay();

    event.reply("response-get-accountToPay", accountsToPay);
  });

  ///////////////////
  ipcMain.on("actualizar-cuenta", async (event, { id, updatedAccount }) => {
    try {
      const resultado = await actualizarCuenta(id, updatedAccount);
      event.reply("cuenta-actualizada", { exitoso: true, id, resultado });
    } catch (error) {
      console.error(error);
      event.reply("cuenta-actualizada", {
        exitoso: false,
        error: error.message,
        id,
      });
    }
  });
};
