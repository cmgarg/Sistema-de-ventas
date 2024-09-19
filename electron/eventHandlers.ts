import { ipcMain, BrowserWindow } from "electron";
import {
  accountToPay,
  actualizarCuenta,
  actualizarEstadoPagado,
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
  guardarUsuarioAdmin,
  verificarAdminExistente,
  verificarCodigoDesbloqueo,
  cambiarContrasena,
  restarRecuperacionCuenta,
  reiniciarRecuperacionCuenta,
  guardarUsuarioSecundario,
  cargarTodosLosUsuarios,
  actualizarImagenSubusuario,
  actualizarPermisosUsuario,
  actualizarUsuario,
  obtenerPermisosUsuario,
  getAccountsToPay,
  eliminarCuenta,
  deleteUnit,
  saveSupplier,
  deleteSupplier,
  getSuppliers,
  updateSuppliers,
  createDeposit,
  updateDeposit,
  addProductInDeposit,
  deleteSector,
  editSectorInDeposit,
  getDeposits,
  createSectorInDeposit,
  saveNotification,
  getNotifications,
  deleteNotification,
  markNotificationAsRead,
  hideNotification,
  disableNotificationType,
  getDisabledNotificationTypes,
  deleteOldNotifications,
  actualizarImagenUsuario,
  getPayMethods,
  addPayMethod,
  removePayMethod,
  updatePayMethod,
  actualizarSenotifico,
  getAccountsToPay20,
  saveHistorialCuenta,
  getAccountsToPay20editar,
  updateAccountInDb,
  getHistorialCuentaPorId,
} from "./databaseOperations";
import { verificarToken } from "./vFunctions";
import { articleData, IUser } from "../types/types";






export const loadEvents = () => {
  console.log("eventHandlers Se esta Ejecutando...");

  // Clientes
  ipcMain.on("save-client", async (event, clientToSave) => {
    await saveClient(clientToSave);
    const clients = await findClients();
    event.reply("response-get-clients", clients);
  });

  ipcMain.on("get-clients", async (event) => {
    const clients = await findClients();
    event.reply("response-get-clients", clients);
  });

  ipcMain.on("delete-client", async (event, clienteAEliminar) => {
    const result = await deleteClient(clienteAEliminar);
    event.reply("response-delete-client", result);
  });

  ipcMain.on("get-client-byId", async (event, clientId) => {
    const cliente = await getClientById(clientId);
    event.reply("response-get-client-byId", cliente);
  });

  ipcMain.on("update-client", async (event, clienteData) => {
    const mensajeAResponder = await updateClient(clienteData._id, clienteData);
    event.reply("response-update-client", mensajeAResponder);
  });

  ipcMain.on("register-buy-client", async (event, clienteData) => {
    const mensajeAResponder = await registerBuyClient(clienteData);
    event.reply("response-register-buy-client", mensajeAResponder);
  });

  // Proveedores
  ipcMain.on("save-supplier", async (event, supplierToSave) => {
    const res = await saveSupplier(supplierToSave);
    event.reply("response-save-supplier", res);
  });

  ipcMain.on("delete-supplier", async (event, supplierToDelete) => {
    console.log("ACA SI LLEGA");
    const res = await deleteSupplier(supplierToDelete);

    event.reply("response-delete-supplier", res);
  });

  ipcMain.on("get-suppliers", async (event) => {
    const res = await getSuppliers();
    event.reply("response-get-suppliers", res);
  });
  ipcMain.on("update-supplier", async (event, supplierToUpdate) => {
    console.log("ACAAA SI LLEGAAA");
    const res = await updateSuppliers(supplierToUpdate._id, supplierToUpdate);
    event.reply("response-update-supplier", res);
  });

  // Artículos
  ipcMain.on("save-article", async (event, articuloAGuardar) => {
    const categoryAndBrands = await getCategoryAndBrand();
    const { brand, category } = articuloAGuardar;
    const categorys = categoryAndBrands.categorys;
    const brands = categoryAndBrands.brands;
    const categoryString = categorys.map((cat) => cat.value.toLowerCase());
    const brandString = brands.map((br) => br.value.toLowerCase());
    const categoryExist = categoryString.includes(category.value.toLowerCase());
    const brandExist = brandString.includes(brand.value.toLowerCase());

    if (categoryExist && brandExist) {
      await saveArticle(articuloAGuardar);
      const articles = await findArticles();
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
        message: "no registrada",
        type: "category",
        active: true,
      });
    } else if (!brandExist) {
      event.reply("error-save-article", {
        message: "no registrada",
        type: "brand",
        active: true,
      });
    }
  });

  ipcMain.on("get-articleByCode", async (event, articleCode) => {
    const article = await getArticleByCode(articleCode);
    event.reply("response-get-articleByCode", article);
  });

  ipcMain.on("get-articles", async (event) => {
    const articulos = await findArticles();
    event.reply("response-get-articles", articulos);
  });

  ipcMain.on("edit-article", async (e, articleEdit) => {
    const articleEditResult = await editArticle(articleEdit);
    e.reply("response-edit-article", articleEditResult);
  });

  ipcMain.on("delete-article", async (e, articuloAEliminar) => {
    const result = await deleteArticle(articuloAEliminar);
    e.reply("response-delete-article", result);
  });

  // Ventas
  ipcMain.on("get-sales-stats", async (event) => {
    const statsSales = await getStats();
    event.reply("response-get-sales-stats", statsSales);
  });

  ipcMain.on("sale-process", async (event, venta) => {
    const res = await saleProcess(venta);
    event.reply("response-sale-process", res);
  });

  ipcMain.on("get-sales", async (event) => {
    const ventas = await findSales();

    event.reply("response-get-sales", ventas);
  });

  ipcMain.on("delete-sale", (_e, ventaAEliminar) => {
    deleteSales(ventaAEliminar);
  });
  ipcMain.on("guardar-usuario-admin", async (event, usuarioAdmin) => {
    try {
      const usuarioConPasswordEncriptado = await guardarUsuarioAdmin(
        usuarioAdmin
      );
      event.reply("respuesta-guardar-usuario-admin", {
        exito: true,
        usuarioAdmin: usuarioConPasswordEncriptado,
      });
    } catch (error: any) {
      event.reply("respuesta-guardar-usuario-admin", {
        exito: false,
        error: error.message,
      });
    }
  });

  ipcMain.on("verificar-admin-existente", async (event) => {
    try {
      const adminInfo = await verificarAdminExistente();
      event.reply("respuesta-verificar-admin", adminInfo);
    } catch (error) {
      console.error("Error al verificar admin existente:", error); // Log para depuración
      event.reply("respuesta-verificar-admin", { existeAdmin: false });
    }
  });

  ipcMain.on("iniciar-sesion", async (event, credentials) => {
    try {
      const response = await iniciarSesion(credentials);
      event.reply("respuesta-iniciar-sesion", response);
    } catch (error: any) {
      event.reply("respuesta-iniciar-sesion", {
        exito: false,
        mensaje: error.message,
      });
    }
  });

  //   event.reply("article-foundByName", article);
  // });
  ipcMain.on("get-articles", async (event) => {
    const articulos = await findArticles();

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
    event.reply("response-get-sales-stats", statsSales);
  });

  ipcMain.on("sale-process", async (event, venta) => {
    const res = await saleProcess(venta);

    event.reply("response-sale-process", res);
  });

  ipcMain.on("get-sales", async (event) => {
    const ventas = await findSales();

    event.reply("response-get-sales", ventas); //TRATANDO QUE SE ACTUALICE CUANDO HAY UN CLIENTE NUEVO REGISTRADO
  });

  ipcMain.on("delete-sale", (_e, ventaAEliminar) => {
    deleteSales(ventaAEliminar);
  });

  // Categorías y marcas
  ipcMain.on("save-category", async (event, category) => {
    await addCategory(category);
    const categorysAndBrands = await getCategoryAndBrand();
    event.reply("response-get-categoryAndBrand", categorysAndBrands);
  });

  ipcMain.on("save-subcategory", async (event, subCategory) => {
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

  // Unidades
  ipcMain.on("get-unitsArticleForm", async (event) => {
    const units = await getUnits();
    event.reply("response-get-unitsArticleForm", units);
  });

  ipcMain.on("save-unitsArticleForm", async (event, unit) => {
    const response = await saveNewUnits(unit);
    event.reply("response-save-unitsArticleForm", response);
  });

  ipcMain.on("update-unitsArticleForm", async (event, unit) => {
    const response = await updateUnit(unit, unit._id);
    event.reply("response-update-unitsArticleForm", response);
  });

  ipcMain.on("remove-unitsArticleForm", async (event, unitToDelete) => {
    const response = await deleteUnit(unitToDelete);
    event.reply("response-remove-unitsArticleForm", response);
  });

  //ALMACENES
  //CREAR DEPOSITO
  ipcMain.on("create-deposit", async (event, newDeposit) => {
    const response = await createDeposit(newDeposit);

    event.reply("response-create-deposit", response);
  });
  //AACTUALIZAR DEPOSITO
  ipcMain.on("update-deposit", async (event, depositToUpdate) => {
    const response = await updateDeposit(depositToUpdate);

    event.reply("response-update-deposit", response);
  });
  //AÑADIR PRODUCTO A DEPOSITO
  ipcMain.on(
    "add-product-in-Deposit",
    async (
      event,
      {
        deposit_id,
        sector,
        productToAdd,
      }: { deposit_id: string; sector: number; productToAdd: articleData }
    ) => {
      const response = await addProductInDeposit(
        deposit_id,
        sector,
        productToAdd
      );

      event.reply("response-add-product-in-Deposit", response);
    }
  );
  //ELIMINAR SECTOR DE DEPOSITO
  ipcMain.on(
    "deposit-delete-sector",
    async (
      event,
      { deposit_id, sectorId }: { deposit_id: string; sectorId: string }
    ) => {
      const response = await deleteSector(deposit_id, sectorId);

      event.reply("response-deposit-delete-sector", response);
    }
  );
  //AÑADIR UN SECTOR EN DEPOSITO
  ipcMain.on(
    "create-sector-in-deposit",
    async (
      event,
      { deposit_id, sector }: { deposit_id: string; sector: any }
    ) => {
      const response = await createSectorInDeposit(deposit_id, sector);

      event.reply("response-create-sector-in-deposit", response);
    }
  );
  //EDITAR UN SECTOR EN DEPOSITO
  ipcMain.on(
    "edit-sector-in-deposit",
    async (
      event,
      {
        deposit_id,
        sectorToEdit,
        sectorUpdate,
      }: { deposit_id: string; sectorToEdit: string; sectorUpdate: any }
    ) => {
      const response = await editSectorInDeposit(
        deposit_id,
        sectorToEdit,
        sectorUpdate
      );

      event.reply("response-edit-sector-in-deposit", response);
    }
  );
  //OBTENER DEPOSITOS
  ipcMain.on("get-deposits", async (event) => {
    console.log("QUE PASA ");
    const response = await getDeposits();

    event.reply("response-get-deposits", response);
  });
  //PAY METHOD
  ipcMain.on("get-pay-methods", async (event) => {
    const pM = await getPayMethods();
    event.reply("response-get-pay-methods", pM);
  });
  ipcMain.on("add-pay-method", async (event, pm) => {
    const response = await addPayMethod(pm);
    event.reply("response-add-pay-method", response);
  });
  ipcMain.on("remove-pay-method", async (event, pm) => {
    const response = await removePayMethod(pm);
    event.reply("remove-pay-method-response", response);
  });
  ipcMain.on("update-pay-method", async (event, pmUpdate) => {
    const response = await updatePayMethod(pmUpdate.id, pmUpdate);
    event.reply("update-pay-method-response", response);
  });
  // Usuario
  ipcMain.on("guardar-usuario-admin", async (event, usuarioAdmin) => {
    const usuarioConPasswordEncriptado = await guardarUsuarioAdmin(
      usuarioAdmin
    );
    event.reply("respuesta-guardar-usuario-admin", {
      exito: true,
      usuarioAdmin: usuarioConPasswordEncriptado,
    });
  });

  ipcMain.on("verificar-admin-existente", async (event) => {
    try {
      const adminInfo = await verificarAdminExistente();
      event.reply("respuesta-verificar-admin", adminInfo);
    } catch (error) {
      event.reply("respuesta-verificar-admin", { existeAdmin: false });
    }
  });

  ipcMain.on("iniciar-sesion", async (event, credentials) => {
    try {
      const response = await iniciarSesion(credentials);
      event.reply("respuesta-iniciar-sesion", response);
    } catch (error: any) {
      event.reply("respuesta-iniciar-sesion", {
        exito: false,
        mensaje: error.message,
      });
    }
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

  ipcMain.on("obtener-datos-usuario", async (event, userId: string) => {
    try {
      const usuario: unknown = await getUser(userId);
      if (isIUser(usuario)) {
        const userData = {
          username: usuario.username || usuario.nombre,
          email: usuario.email,
          ubicacion: usuario.ubicacion,
          direccion: usuario.direccion,
          codigopostal: usuario.codigopostal,
          imageUrl: usuario.imageUrl,
          esAdmin: usuario.esAdmin,
          _id: usuario._id,
        };
        event.reply("datos-usuario-obtenidos", {
          success: true,
          data: userData,
        });
      } else {
        event.reply("datos-usuario-obtenidos", {
          success: false,
          error: "Usuario no encontrado",
        });
      }
    } catch (error: any) {
      event.reply("datos-usuario-obtenidos", {
        success: false,
        error: error.message,
      });
    }
  });

  function isIUser(obj: unknown): obj is IUser {
    return (
      typeof obj === "object" &&
      obj !== null &&
      "username" in obj &&
      "email" in obj &&
      "ubicacion" in obj &&
      "direccion" in obj &&
      "codigopostal" in obj &&
      "imageUrl" in obj &&
      "esAdmin" in obj &&
      "_id" in obj
    );
  }

  ipcMain.on("verificar-codigo-desbloqueo", async (event, codigoIngresado) => {
    try {
      const resultado = await verificarCodigoDesbloqueo(codigoIngresado);
      event.reply("respuesta-verificar-codigo", resultado);
    } catch (error) {
      event.reply("respuesta-verificar-codigo", { exito: false });
    }
  });

  ipcMain.on(
    "cambiar-contrasena",
    async (event, { userId, nuevaContrasena }) => {
      try {
        const resultado = await cambiarContrasena(userId, nuevaContrasena);
        event.reply("respuesta-cambiar-contrasena", resultado);
      } catch (error: any) {
        event.reply("respuesta-cambiar-contrasena", {
          exito: false,
          error: error.message,
        });
      }
    }
  );

  ipcMain.on("restar-recuperacioncuenta", async (event, userId) => {
    try {
      const usuarioActualizado: any = await restarRecuperacionCuenta(userId);
      event.reply(
        "actualizacion-recuperacioncuenta",
        usuarioActualizado.recuperacioncuenta
      );
    } catch (error) {}
  });

  ipcMain.on("reiniciar-recuperacioncuenta", async (_event, userId) => {
    try {
      await reiniciarRecuperacionCuenta(userId);
    } catch (error) {}
  });

  ipcMain.on("guardar-usuario-secundario", async (event, usuario) => {
    try {
      const usuarios = await guardarUsuarioSecundario(usuario);
      event.reply("respuesta-cargar-todos-usuarios", { exito: true, usuarios });
    } catch (error: any) {
      event.reply("respuesta-guardar-usuario", {
        exito: false,
        error: error.message,
      });
    }
  });

  ipcMain.on("cargar-todos-usuarios", async (event) => {
    try {
      const usuarios = await cargarTodosLosUsuarios();
      event.reply("respuesta-cargar-todos-usuarios", { exito: true, usuarios });
    } catch (error: any) {
      event.reply("respuesta-cargar-todos-usuarios", {
        exito: false,
        error: error.message,
      });
    }
  });

  ipcMain.on(
    "actualizar-imagen-subusuario",
    async (event, { userId, imageUrl }) => {
      try {
        await actualizarImagenSubusuario(userId, imageUrl);
        event.reply("respuesta-actualizar-imagen-subusuario", {
          exito: true,
          userId,
          imageUrl,
        });
      } catch (error: any) {
        event.reply("respuesta-actualizar-imagen-subusuario", {
          exito: false,
          mensaje: error.message,
        });
      }
    }
  );

  ipcMain.on(
    "actualizar-imagen-usuario",
    async (event, { userId, imageUrl }) => {
      try {
        await actualizarImagenUsuario(userId, imageUrl);
        event.reply("respuesta-actualizar-imagen-subusuario", {
          exito: true,
          userId,
          imageUrl,
        });
      } catch (error: any) {
        event.reply("respuesta-actualizar-imagen-subusuario", {
          exito: false,
          mensaje: error.message,
        });
      }
    }
  );

  ipcMain.on(
    "actualizar-permisos-usuario",
    async (event, { userId, nuevosPermisos }) => {
      try {
        const usuarioActualizado = await actualizarPermisosUsuario(
          userId,
          nuevosPermisos
        );
        event.reply("respuesta-actualizar-permisos-usuario", {
          exito: true,
          usuario: usuarioActualizado,
        });
      } catch (error: any) {
        event.reply("respuesta-actualizar-permisos-usuario", {
          exito: false,
          mensaje: error.message,
        });
      }
    }
  );

  ipcMain.on("guardar-usuario-editado", async (event, updatedUser) => {
    try {
      const userId = updatedUser._id;
      delete updatedUser._id;
      await actualizarUsuario(userId, updatedUser);
      event.reply("respuesta-guardar-usuario-editado", { exito: true });
    } catch (error: any) {
      event.reply("respuesta-guardar-usuario-editado", {
        exito: false,
        mensaje: error.message,
      });
    }
  });

  ipcMain.on("obtener-permisos-usuario", async (event, userId) => {
    try {
      const permisos = await obtenerPermisosUsuario(userId);
      event.reply("respuesta-obtener-permisos-usuario", permisos);
    } catch (error: any) {
      event.reply("respuesta-obtener-permisos-usuario", {
        success: false,
        error: error.message,
      });
    }
  });

  // Cuentas a pagar
  ipcMain.on(
    "actualizar-estado-pagado",
    async (event, { idCuenta, estadoPagado, pagado2, pagado3 }) => {
      try {
        await actualizarEstadoPagado(idCuenta, estadoPagado, pagado2, pagado3);
        const estadoPagadoActualizado = await obtenerEstadoPagado(idCuenta);
        event.reply("estado-pagado-actualizado", {
          exitoso: true,
          idCuenta,
          estadoPagado: estadoPagadoActualizado,
        });
      } catch (error: any) {
        event.reply("estado-pagado-actualizado", {
          exitoso: false,
          error: error.message,
          idCuenta,
        });
      }
    }
  );
  ipcMain.on(
    "actualizar-estado-pagado",
    async (event, { idCuenta, estadoPagado, pagado2, pagado3 }) => {
      try {
        await actualizarEstadoPagado(idCuenta, estadoPagado, pagado2, pagado3);
        const estadoPagadoActualizado = await obtenerEstadoPagado(idCuenta);
        event.reply("estado-pagado-actualizado", {
          exitoso: true,
          idCuenta,
          estadoPagado: estadoPagadoActualizado,
        });
      } catch (error) {
        event.reply("estado-pagado-actualizado", {
          exitoso: false,
          error: onmessage,
          idCuenta,
        });
      }
    }
  );

  ipcMain.on("solicitar-estado-pagado-inicial", async (event) => {
    try {
      const estados = await obtenerEstadosPagadosInicial();
      event.reply("estado-pagado-inicial", { exitoso: true, estados });
    } catch (error: any) {
      event.reply("estado-pagado-inicial", {
        exitoso: false,
        error: error.message,
      });
    }
  });

  ipcMain.on("eliminar-cuenta", async (event, { id }) => {
    try {
      await eliminarCuenta(id);
      event.reply("cuenta-eliminada", { exitoso: true });
    } catch (error) {
      event.reply("cuenta-eliminada", { exitoso: false, error: onmessage });
    }
  });

  ipcMain.on("get-accountToPay", async (event) => {
    try {
      const accountsToPay = await getAccountsToPay();
      event.reply("response-get-accountToPay", accountsToPay);
    } catch (error) {
      event.reply("response-get-accountToPay", []);
    }
  });
  
  ipcMain.on("get-accountToPay2", async (event) => {
    try {
      const accountsToPay = await getAccountsToPay();
      event.reply("response-get-accountToPay2", accountsToPay);
    } catch (error) {
      event.reply("response-get-accountToPay2", []);
    }
  });

  ipcMain.on("get-accountToPay3", async (event) => {
    try {
      const accountsToPay = await getAccountsToPay();
      event.reply("response-get-accountToPay3", accountsToPay);
    } catch (error) {
      event.reply("response-get-accountToPay3", []);
    }
  });


  ipcMain.on("actualizar-senotifico", async (event, { idCuenta, estadoSenotifico }) => {
    try {
      await actualizarSenotifico(idCuenta, estadoSenotifico);
      event.reply("senotifico-actualizado", { exitoso: true, idCuenta });
    } catch (error) {
      event.reply("senotifico-actualizado", { exitoso: false, error: onmessage });
    }
  });

  
  ipcMain.on("save-accountToPayeditar", async (event, account) => {
    try {
      // Actualizar la cuenta en la base de datos
      await updateAccountInDb(account._id, account);
  
      // Obtener todas las cuentas actualizadas de la base de datos
      const updatedAccounts = await getAccountsToPay20editar();
  
      // Enviar las cuentas actualizadas al frontend
      event.reply("accounts-updated", updatedAccounts);
    } catch (error) {
      console.error("Error al actualizar la cuenta:", error);
      event.reply("accounts-updated-error", { success: false, });
    }
  });


  ipcMain.on("save-accountToPay", async (event, account) => {
    try {
      // Guardar la cuenta nueva en la base de datos y obtener la cuenta guardada con su ID generado
      const savedAccount = await accountToPay(account);
  
      // Obtener la fecha y la hora actuales en la zona horaria de Argentina
      const fechaActual = new Date();
      const fecha_edicion = fechaActual.toLocaleDateString('es-AR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }).split('/').reverse().join('-');
  
      const fecha_edicionHora = fechaActual.toLocaleTimeString('es-AR', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
  
      // Crear historial de la cuenta recién creada utilizando los datos devueltos por la inserción
      await saveHistorialCuenta({
        cuenta: savedAccount, // Guardar la cuenta completa con su nuevo ID
        fecha_edicion, // Fecha de creación (solo fecha)
        fecha_edicionHora, // Hora de creación (solo hora)
      });
  
      // Obtener todas las cuentas actualizadas de la base de datos
      const updatedAccounts = await getAccountsToPay20();
  
      // Enviar las cuentas actualizadas al frontend
      event.reply("accounts-updated", updatedAccounts);
    } catch (error) {
      console.error("Error al guardar la cuenta o al crear el historial", error);
      event.reply("error-save-account", { success: false });
    }
  });
  
  
  
  

  ipcMain.on("actualizar-cuenta", async (event, { id, updatedAccount }) => {
    try {
      const resultado = await actualizarCuenta(id, updatedAccount);
      event.reply("cuenta-actualizada", { exitoso: true, id, resultado });
    } catch (error: any) {
      event.reply("cuenta-actualizada", {
        exitoso: false,
        error: error.message,
        id,
      });
    }
  });

  ipcMain.on("obtener-admin", async (event) => {
    try {
      const adminData = await obtenerAdmin();
      event.reply("respuesta-obtener-admin", adminData);
    } catch (error: any) {
      event.reply("respuesta-obtener-admin", {
        exito: false,
        error: error.message,
      });
    }
  });
};

// Guardar una notificación y enviarla a todas las ventanas
// Validar los datos de la notificación
const validateNotificationData = (data: { nota: any } | null) => {
  return (
    typeof data === "object" && data !== null && typeof data.nota === "string"
  );
};

// Guardar una notificación y enviarla a todas las ventanas
// Guardar una notificación y enviarla a todas las ventanas
ipcMain.on("send-notification", async (event, data) => {
  if (validateNotificationData(data)) {
    try {
      // Obtener los tipos de notificación desactivados
      const disabledTypes = await getDisabledNotificationTypes();

      // Verificar si el tipo de la notificación está desactivado
      if (disabledTypes.includes(data.tipo)) {
        console.log(
          `Notificación de tipo ${data.tipo} está desactivada y no será guardada ni enviada.`
        );
        return;
      }

      // Guardar la notificación
      const savedNotification = await saveNotification(data);

      // Enviar la notificación a todas las ventanas abiertas
      const windows = BrowserWindow.getAllWindows();
      windows.forEach((window) => {
        window.webContents.send("notification", savedNotification);
      });

      // Obtener y enviar todas las notificaciones actuales
      try {
        const notifications = await getNotifications();
        event.reply("response-get-notifications", notifications);
      } catch (error) {
        console.error("Error al obtener las notificaciones:", error);
        event.reply("response-get-notifications", []);
      }

    } catch (error) {
      console.error("Error al guardar la notificación:", error);
    }
  } else {
    console.error("Datos de notificación no válidos:", data);
  }
});

// Obtener todas las notificaciones
ipcMain.on("get-notifications", async (event) => {
  try {
    const notifications = await getNotifications();
    event.reply("response-get-notifications", notifications);
  } catch (error) {
    console.error("Error al obtener las notificaciones:", error);
    event.reply("response-get-notifications", []);
  }
});

// Eliminar una notificación por ID
ipcMain.on("delete-notification", async (event, notificationId) => {
  try {
    await deleteNotification(notificationId);
    const notifications = await getNotifications();
    event.reply("response-get-notifications", notifications);
  } catch (error) {
    console.error("Error al eliminar la notificación:", error);
  }
});

////Actualiza si la notificacion fue vistta o no
ipcMain.on("mark-notification-as-read", async (_event, notificationId) => {
  try {
    await markNotificationAsRead(notificationId);
    console.log(`Notificación ${notificationId} marcada como vista.`);
  } catch (error) {
    console.error(
      `Error al marcar la notificación ${notificationId} como vista:`,
      error
    );
  }
});

///////oculta las notificaciones cambiando la propiedad
ipcMain.on("hide-notification", async (_event, notificationId) => {
  try {
    await hideNotification(notificationId);
    console.log(`Notificación ${notificationId} oculta.`);
  } catch (error) {
    console.error(`Error al ocultar la notificación ${notificationId}:`, error);
  }
});

/////guarda el tipo de notifiaciones que vana estar bloqueadas
ipcMain.on("disable-notification-type", async (_event, tipo) => {
  console.log(tipo);
  try {
    await disableNotificationType(tipo);
    console.log(`Notificaciones del tipo ${tipo} desactivadas.`);
  } catch (error) {
    console.error(
      `Error al desactivar notificaciones del tipo ${tipo}:`,
      error
    );
  }
});

// Escucha del evento para obtener los tipos de notificación desactivados
ipcMain.on("get-disabled-notification-types", async (event) => {
  try {
    const disabledTypes = await getDisabledNotificationTypes();
    event.reply("response-get-disabled-notification-types", disabledTypes);
  } catch (error) {
    console.error(
      "Error al obtener los tipos de notificación desactivados:",
      error
    );
    event.reply("response-get-disabled-notification-types", []);
  }
});

// Escucha para eliminar notificaciones antiguas
// Eliminar notificaciones antiguas
ipcMain.on("delete-old-notifications", async () => {
  const thresholdDate = new Date();
  thresholdDate.setDate(thresholdDate.getDate() - 30);

  try {
    await deleteOldNotifications(thresholdDate);
    console.log("Notificaciones antiguas eliminadas.");
  } catch (error) {
    console.error("Error al eliminar notificaciones antiguas:", error);
  }
});

//////////////////limpiar cache
ipcMain.on("clear-cache", (event) => {
  const webContents = BrowserWindow.getAllWindows()[0].webContents;

  webContents.session
    .clearCache()
    .then(() => {
      console.log("Caché limpiada");
      event.reply("cache-cleared", { success: true });
    })
    .catch((error) => {
      console.error("Error al limpiar la caché:", error);
      event.reply("cache-cleared", { success: false, error: error.message });
    });
});


/////////guarda la edicion de las cuentas para el hisrial
// Evento para guardar historial de cuentas
ipcMain.on("guardar-historial-cuenta", async (event, cuentaHistorial) => {
  try {
    // Llamar a la función para guardar el historial, pasando la cuenta completa
    await saveHistorialCuenta({
      cuenta: cuentaHistorial.cuenta, // Cuenta completa
      fecha_edicion: cuentaHistorial.fecha_edicion, // Fecha de edición (solo la fecha)
      fecha_edicionHora: cuentaHistorial.fecha_edicionHora, // Hora de edición (solo la hora)
    });
    event.reply("historial-guardado", { success: true });
  } catch (error) {
    console.error("Error al guardar historial de cuenta:", error);
    event.reply("historial-guardado", { success: false });
  }
});


ipcMain.on("get-historial-cuenta", async (event, idCuenta) => {
  try {
    // Obtener el historial de la cuenta usando el idCuenta
    const historial = await getHistorialCuentaPorId(idCuenta);

    // Responder al frontend con el historial obtenido
    event.reply("respuesta-historial-cuenta", historial);
  } catch (error) {
    console.error("Error al obtener el historial de la cuenta:", error);
    event.reply("respuesta-historial-cuenta", { error: "Error al obtener el historial" });
  }
});




///////////////////////
