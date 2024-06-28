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
} from "./databaseOperations";
import { verificarToken } from "./vFunctions";

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

  ipcMain.on("delete-supplier", async (event, supplierToSave) => {
    const res = await deleteSupplier(supplierToSave);
    event.reply("response-delete-supplier", res);
  });

  ipcMain.on("get-suppliers", async (event) => {
    const res = await getSuppliers();
    event.reply("response-get-suppliers", res);
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
      event.reply("error-save-article", { message: "", type: "", active: false });
    } else if (!brandExist && !categoryExist) {
      event.reply("error-save-article", { message: "no registrada", type: "all", active: true });
    } else if (!categoryExist) {
      event.reply("error-save-article", { message: "no registrada", type: "category", active: true });
    } else if (!brandExist) {
      event.reply("error-save-article", { message: "no registrada", type: "brand", active: true });
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

  ipcMain.on("delete-sale", (e, ventaAEliminar) => {
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

  // Usuario
  ipcMain.on("guardar-usuario-admin", async (event, usuarioAdmin) => {
    const usuarioConPasswordEncriptado = await guardarUsuarioAdmin(usuarioAdmin);
    event.reply("respuesta-guardar-usuario-admin", { exito: true, usuarioAdmin: usuarioConPasswordEncriptado });
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
      event.reply("respuesta-iniciar-sesion", { exito: false, mensaje: error.message });
    }
  });

  ipcMain.on("ruta-protegida", (event, token) => {
    const decoded = verificarToken(token);
    if (decoded) {
      // Token válido, maneja la solicitud
    } else {
      // Token inválido o expirado, envía un mensaje de error
      event.reply("respuesta-ruta-protegida", { exito: false, mensaje: "Token inválido o expirado" });
    }
  });

  ipcMain.on("obtener-datos-usuario", async (event, userId) => {
    try {
      const usuario = await getUser(userId);
      if (usuario) {
        event.reply("datos-usuario-obtenidos", { success: true, data: usuario });
      } else {
        event.reply("datos-usuario-obtenidos", { success: false, error: "Usuario no encontrado" });
      }
    } catch (error: any) {
      event.reply("datos-usuario-obtenidos", { success: false, error: error.message });
    }
  });

  ipcMain.on("verificar-codigo-desbloqueo", async (event, codigoIngresado) => {
    try {
      const resultado = await verificarCodigoDesbloqueo(codigoIngresado);
      event.reply("respuesta-verificar-codigo", resultado);
    } catch (error) {
      event.reply("respuesta-verificar-codigo", { exito: false });
    }
  });

  ipcMain.on("cambiar-contrasena", async (event, { userId, nuevaContrasena }) => {
    try {
      const resultado = await cambiarContrasena(userId, nuevaContrasena);
      event.reply("respuesta-cambiar-contrasena", resultado);
    } catch (error: any) {
      event.reply("respuesta-cambiar-contrasena", { exito: false, error: error.message });
    }
  });

  ipcMain.on("restar-recuperacioncuenta", async (event, userId) => {
    try {
      const usuarioActualizado: any = await restarRecuperacionCuenta(userId);
      event.reply("actualizacion-recuperacioncuenta", usuarioActualizado.recuperacioncuenta);
    } catch (error) {
    }
  });

  ipcMain.on("reiniciar-recuperacioncuenta", async (_event, userId) => {
    try {
      await reiniciarRecuperacionCuenta(userId);
    } catch (error) {
    }
  });

  ipcMain.on("guardar-usuario-secundario", async (event, usuario) => {
    try {
      const usuarios = await guardarUsuarioSecundario(usuario);
      event.reply("respuesta-cargar-todos-usuarios", { exito: true, usuarios });
    } catch (error: any) {
      event.reply("respuesta-guardar-usuario", { exito: false, error: error.message });
    }
  });

  ipcMain.on("cargar-todos-usuarios", async (event) => {
    try {
      const usuarios = await cargarTodosLosUsuarios();
      event.reply("respuesta-cargar-todos-usuarios", { exito: true, usuarios });
    } catch (error: any) {
      event.reply("respuesta-cargar-todos-usuarios", { exito: false, error: error.message });
    }
  });

  ipcMain.on("actualizar-imagen-subusuario", async (event, { userId, imageUrl }) => {
    try {
      await actualizarImagenSubusuario(userId, imageUrl);
      event.reply("respuesta-actualizar-imagen-subusuario", { exito: true, userId, imageUrl });
    } catch (error: any) {
      event.reply("respuesta-actualizar-imagen-subusuario", { exito: false, mensaje: error.message });
    }
  });

  ipcMain.on("actualizar-permisos-usuario", async (event, { userId, nuevosPermisos }) => {
    try {
      const usuarioActualizado = await actualizarPermisosUsuario(userId, nuevosPermisos);
      event.reply("respuesta-actualizar-permisos-usuario", { exito: true, usuario: usuarioActualizado });
    } catch (error: any) {
      event.reply("respuesta-actualizar-permisos-usuario", { exito: false, mensaje: error.message });
    }
  });

  ipcMain.on("guardar-usuario-editado", async (event, updatedUser) => {
    try {
      const userId = updatedUser._id;
      delete updatedUser._id;
      await actualizarUsuario(userId, updatedUser);
      event.reply("respuesta-guardar-usuario-editado", { exito: true });
    } catch (error: any) {
      event.reply("respuesta-guardar-usuario-editado", { exito: false, mensaje: error.message });
    }
  });

  ipcMain.on("obtener-permisos-usuario", async (event, userId) => {
    try {
      const permisos = await obtenerPermisosUsuario(userId);
      event.reply("respuesta-obtener-permisos-usuario", permisos);
    } catch (error: any) {
      event.reply("respuesta-obtener-permisos-usuario", { success: false, error: error.message });
    }
  });

  // Cuentas a pagar
  ipcMain.on("actualizar-estado-pagado", async (event, { idCuenta, estadoPagado, pagado2, pagado3 }) => {
    try {
      await actualizarEstadoPagado(idCuenta, estadoPagado, pagado2, pagado3);
      const estadoPagadoActualizado = await obtenerEstadoPagado(idCuenta);
      event.reply("estado-pagado-actualizado", { exitoso: true, idCuenta, estadoPagado: estadoPagadoActualizado });
    } catch (error: any) {
      event.reply("estado-pagado-actualizado", { exitoso: false, error: error.message, idCuenta });
    }
  });

  ipcMain.on("solicitar-estado-pagado-inicial", async (event) => {
    try {
      const estados = await obtenerEstadosPagadosInicial();
      event.reply("estado-pagado-inicial", { exitoso: true, estados });
    } catch (error: any) {
      event.reply("estado-pagado-inicial", { exitoso: false, error: error.message });
    }
  });

  ipcMain.on("eliminar-cuenta", async (event, { id }) => {
    try {
      await eliminarCuenta(id);
      event.reply("cuenta-eliminada", { exitoso: true });
    } catch (error: any) {
      event.reply("cuenta-eliminada", { exitoso: false, error: error.message });
    }
  });

  ipcMain.on("get-accountToPay", async (event) => {
    try {
      const accountsToPay = await getAccountsToPay();
      event.reply("response-get-accountToPay", accountsToPay);
    } catch (error: any) {
      event.reply("response-get-accountToPay", []);
    }
  });

  ipcMain.on("save-accountToPay", async (_event, account) => {
    await accountToPay(account);
  });

  ipcMain.on("actualizar-cuenta", async (event, { id, updatedAccount }) => {
    try {
      const resultado = await actualizarCuenta(id, updatedAccount);
      event.reply("cuenta-actualizada", { exitoso: true, id, resultado });
    } catch (error: any) {
      event.reply("cuenta-actualizada", { exitoso: false, error: error.message, id });
    }
  });

  ipcMain.on("obtener-admin", async (event) => {
    try {
      const adminData = await obtenerAdmin();
      event.reply("respuesta-obtener-admin", adminData);
    } catch (error: any) {
      event.reply("respuesta-obtener-admin", { exito: false, error: error.message });
    }
  });
};
