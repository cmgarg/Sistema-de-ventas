import { app, BrowserWindow, ipcMain, ipcRenderer } from "electron";
import path from "node:path";
const bcrypt = require('bcrypt');
const saltRounds = 10; // El coste del proceso de hashing

//GUARDAR PETICION CUANDO SE ESTA OFFLINE
//DATA BASES LOCALES
import { articleData } from "@/types";
import Datastore from "@seald-io/nedb";

const db = {
  clients: new Datastore({ filename: "database/clients.db", autoload: true }),
  articles: new Datastore({ filename: "database/articles.db", autoload: true }),
  sales: new Datastore({ filename: "database/sales.db", autoload: true }),
  accounts: new Datastore({ filename: "database/accounts.db", autoload: true }),
  users: new Datastore({ filename: "database/users.db", autoload: true }),
  filters: new Datastore({ filename: "database/filters.db", autoload: true }),
  usuariosAdmin:new Datastore({ filename: "database/usuarios.db", autoload: true }),
  usuarios:new Datastore({ filename: "database/sub-usuarios.db", autoload: true }),
};

////////////////////////////////

const saveClient = async (data: object) => {
  await db.clients
    .insertAsync(data)
    .then((res) => {
      console.log("Cliente guardado con exito", res);
    })
    .catch((err) => {
      console.log("Error al guardar el cliente", err);
    });
};

async function registerBuyClient(clientBuy: any) {
  const client = await getClientById(clientBuy.cliente.idClient);
  console.log("CLIENTE OBTENIDO APAPA", client[0].sales);
  const fechaActual = new Date();
  const año = fechaActual.getFullYear();
  const mes = fechaActual.getMonth() + 1;
  const dia = fechaActual.getDate();
  const clientWithDate = {
    compra: clientBuy.compra,
    dateOfRegister: `${dia.toString().padStart(2, "0")}-${mes
      .toString()
      .padStart(2, "0")}-${año}`,
  };
  const clientUpdated = {
    ...client[0],
    compras: [...client[0].sales, clientWithDate],
  };
  console.log("WACHAAAA", clientUpdated);
  delete clientUpdated._id;

  await updateClient(client[0]._id, clientUpdated);
}
function getClientById(clientId: string) {
  return new Promise((resolve, reject) => {
    db.clients.find({ _id: clientId }, (err: any, doc: any) => {
      if (err) {
        console.log("error al buscar el cliente", err);
        reject(err);
      } else {
        console.log("Cliente encontrado", doc);
        resolve(doc);
      }
    });
  });
}
const deleteClient = async (data: any) => {
  console.log("ACA ERSTAMOS");
  await db.clients
    .removeAsync({ _id: data._id }, {})
    .then((data) => {
      console.log("Cliente eliminado", data);

      return { clientDelete: data.name };
    })
    .catch((err) => {
      console.log("No se ha podido eliminar el cliente", err);

      return false;
    });
};
function findClients() {
  return new Promise((resolve, reject) => {
    db.clients.find({}, (err: any, docs: any) => {
      if (err) {
        console.error("Error al obtener datos:", err);
        reject(err);
      } else {
        console.log("Datos obtenidos:", docs);
        resolve(docs);
      }
    });
  });
}
function updateClient(clientId: string, updateData: any) {
  delete updateData._id;
  return new Promise((resolve, reject) => {
    db.clients.update(
      { _id: clientId },
      { $set: updateData },
      { multi: false },
      (err: any, docs: any) => {
        if (err) {
          console.log("hubo un error ", err);
          reject(err);
        } else {
          console.log("todo salio bien se actualizo el cliente", updateData);
          resolve(docs);
        }
      }
    );
  });
}

///////////////////////////////////
/////FUNCIONES DE USUARIOS
////////////////////////////////



///contraseña


////////////////////////////////
//FUNCIONES DE ARTICULOS ARKCHIVO ARTICULOS.JS
///////////////////////////////

function saveArticle(a: any) {
  const articleToSave = {
    ...a,
    sales: [],
  };

  db.articles.insert(articleToSave, (err, newDoc) => {
    if (err) {
      // Manejar el error
      console.error("Error al guardar el objeto:", err);
    } else {
      // Objeto guardado con éxito
      console.log("Objeto guardado:", newDoc);
    }
  });
}
function getArticleById(articleId: string): Promise<object[]> {
  return new Promise((resolve, reject) => {
    db.articles.find({ _id: articleId }, (err: any, doc: any) => {
      if (err) {
        console.log("error al buscar el Articulo", err);
        reject(err);
      } else {
        console.log("Artciulo encontrado", doc);
        resolve(doc);
      }
    });
  });
}
function getArticleByName(articleName: string) {
  return new Promise((resolve, reject) => {
    db.articles.find({ articulo: articleName }, (err: any, doc: any) => {
      if (err) {
        console.log("error al buscar el Articulo", err);
        reject(err);
      } else {
        console.log("Artciulo encontrado", doc);
        resolve(doc);
      }
    });
  });
}
function findArticles() {
  return new Promise((resolve, reject) => {
    db.articles.find({}, (err: any, docs: any) => {
      if (err) {
        console.error("Error al obtener datos:", err);
        reject(err);
      } else {
        console.log("Datos obtenidos:", docs);
        resolve(docs);
      }
    });
  });
}
function deleteArticle(data: any) {
  console.log("ACA ERSTAMOS");
  db.articles.remove({ _id: data }, (err, newDoc) => {
    if (err) {
      // Manejar el error
      console.error("Error al guardar el objeto:", err);
    } else {
      // Objeto guardado con éxito
      console.log("Cliente eliminado:", newDoc);
    }
  });
}
async function updatedStockArticle(article: {
  idArticle: string;
  quantity: string;
  nameArticle: string;
  totalCost: string;
}) {
  const { idArticle, quantity } = article;
  const articleUpdate = await getArticleById(idArticle);
  console.log(articleUpdate, "ARTICULO A ACTUALIZAR STOCK");
  const stock = parseInt(articleUpdate[0].stock.amount);
  console.log(articleUpdate[0].stock.amount, "STOCK");
  const restSold = stock - parseInt(quantity);

  return new Promise((resolve, reject) => {
    db.articles.update(
      { _id: idArticle },
      {
        ...articleUpdate[0],
        stock: { ...articleUpdate[0].stock, amount: restSold },
      },
      { multi: false },
      (err: any, docs: any) => {
        if (err) {
          reject(err);
          console.log("HUBO UN ERROR DE LA CAJETA", err);
        } else {
          resolve(docs);
          console.log("TODO BIEN SALIO GIL DE MIERDA", docs);
        }
      }
    );
  });
}
async function updateCountSaleArticle(article: {
  idArticle: string;
  quantity: string;
  nameArticle: string;
  totalCost: string;
}) {
  const { idArticle } = article;

  const articleUpdate: articleData[] = await getArticleById(idArticle);

  const salesCount = articleUpdate[0].sales;

  return new Promise((resolve, reject) => {
    db.articles.update(
      { _id: idArticle },
      { ...articleUpdate[0], ventas: [...salesCount, article] },
      { multi: false },
      (err: any, docs: any) => {
        if (err) {
          reject(err);
          console.log("HUBO UN ERROR DE LA CAJETA", err);
        } else {
          resolve(docs);
          console.log("TODO BIEN SALIO GIL DE MIERDA", docs);
        }
      }
    );
  });
}

//////////////////////////////////////////////////////
//FUNCIONES DE CLIENTES ARCHIVO ventasFile.js////////
////////////////////////////////////////////////////
function saveSale(a: any) {
  const fechaActual = new Date();
  const año = fechaActual.getFullYear();
  const mes = fechaActual.getMonth() + 1;
  const dia = fechaActual.getDate();
  const saleToSave = {
    ...a,
    dateOfRegister: `${dia.toString().padStart(2, "0")}-${mes
      .toString()
      .padStart(2, "0")}-${año}`,
  };
  db.sales.insert(saleToSave, (err, newDoc) => {
    if (err) {
      // Manejar el error
      console.error("Error al guardar el objeto:", err);
    } else {
      // Objeto guardado con éxito
      console.log("Objeto guardado:", newDoc);
    }
  });
}
async function saleProcess(venta: any) {
  console.log("VENTA RECIBIDA", venta);

  const articlesOfSale = [...venta.articulos];
  const totalCost = articlesOfSale.reduce((accumulator, currentArticle) => {
    console.log(
      accumulator.costoArticle,
      currentArticle.costoArticle,
      "ASDASDASDASDASWW"
    );
    return (
      parseInt(accumulator.costoArticle) + parseInt(currentArticle.costoArticle)
    );
  });

  const quantityOfSale = articlesOfSale.map((article) => {
    return {
      idArticle: article.idArticle,
      nameArticle: article.nombreArticle,
      quantity: article.amount,
      totalCost: article.costoArticle,
    };
  });

  quantityOfSale.map(
    async (articleToUpdate: {
      idArticle: string;
      nameArticle: string;
      quantity: string;
      totalCost: string;
    }) => {
      await updatedStockArticle(articleToUpdate);
    }
  );

  quantityOfSale.map(async (articleToUpdate) => {
    await updateCountSaleArticle(articleToUpdate);
  });

  const saleComplete = { ...venta, sold: totalCost };

  return saveSale(saleComplete);
  //de articulo a articulos
  // const articuloVendido = await getArticleById(venta.articulo.idArticle);
  // const cantidadVendida = parseInt(venta.cantidad);
  // const idArticle = articuloVendido[0]._id;
  // const totalMoneySold = venta.cantidad * articuloVendido[0].costo;

  // const saleComplete = { ...venta, sold: totalMoneySold };

  // await updatedStockArticle(idArticle, cantidadVendida); //actualiza el stock del articulo vendido
  // await updateCountSaleArticle(idArticle, saleComplete);

  // return guardarVenta(saleComplete);
}
function findSales() {
  return new Promise((resolve, reject) => {
    db.sales.find({}, (err: any, docs: any) => {
      if (err) {
        console.error("Error al obtener datos:", err);
        reject(err);
      } else {
        console.log("Datos obtenidos:", docs);
        resolve(docs);
      }
    });
  });
}
function deleteSales(data: any) {
  console.log("ACA ERSTAMOS");
  db.sales.remove({ _id: data }, (err, newDoc) => {
    if (err) {
      // Manejar el error
      console.error("Error al guardar el objeto:", err);
    } else {
      // Objeto guardado con éxito
      console.log("Cliente eliminado:", newDoc);
    }
  });
}
//////////////////////////////////////////////////////
//FUNCIONES DE CUENTAS ARCHIVO cuentasFile.js////////
/////////////////////////////////////////////////////

function obtenerEstadoPagado(idCuenta) {
  return new Promise((resolve, reject) => {
    db.accounts.findOne({ _id: idCuenta }, (err, doc) => {
      if (err) {
        console.error("Error al obtener el estado de pagado:", err);
        reject(err);
      } else {
        console.log("Estado de pagado obtenido:", doc.pagado);
        resolve(doc.pagado); // Suponiendo que 'doc.pagado' es el campo que contiene el estado de pagado
      }
    });
  });
}


function accountToPay(account: object) {
  db.accounts.insert(account, (err, newDoc) => {
    if (err) {
      // Manejar el error
      console.error("Error al guardar el objeto:", err);
    } else {
      // Objeto guardado con éxito
      console.log("Objeto guardado:", newDoc);
    }
  });
}


function actualizarCuenta(idCuenta: string, datosActualizados: any) {
  if (idCuenta == null || datosActualizados == null) {
    console.error("Error: El ID de la cuenta y los datos actualizados no pueden ser nulos o indefinidos.");
    return Promise.reject("ID de la cuenta o datos actualizados no válidos");
  }

  // Eliminar el campo _id de los datos actualizados si existe
  delete datosActualizados._id;

  // Mostrar los datos que se van a actualizar
  console.log(`Actualizando cuenta con ID: ${idCuenta}`);
  console.log('Datos actualizados:', datosActualizados);

  return new Promise((resolve, reject) => {
    db.accounts.update(
      { _id: idCuenta },
      { $set: datosActualizados },
      { multi: false },
      (err: any, numUpdated: number) => {
        if (err) {
          console.error("Error al actualizar la cuenta:", err);
          reject(err);
        } else {
          console.log(`Cuenta actualizada con éxito. Número de documentos actualizados: ${numUpdated}`);
          if (numUpdated === 0) {
            console.warn('Advertencia: No se actualizó ningún documento. Verifique que el ID de la cuenta sea correcto.');
          }
          resolve(numUpdated);
        }
      }
    );
  });
}





//////////////////////////////////////////////////////
//FUNCIONES DE CUENTAS ARCHIVO filtersFile.js////////
/////////////////////////////////////////////////////
function actualizarEstadoPagado(idCuenta, estadoPagado) {
  return new Promise((resolve, reject) => {
    db.accounts.update({ _id: idCuenta }, { $set: { pagado: estadoPagado } }, {}, (err, numReplaced) => {
      if (err) {
        reject(err);
      } else {
        resolve(numReplaced); // numReplaced es el número de documentos actualizados
      }
    });
  });
}


// Suponiendo que `cuentas` es tu Datastore de NeDB para las cuentas
async function obtenerEstadosPagadosInicial() {
  return new Promise((resolve, reject) => {
   db.accounts.find({}, (err, docs) => {
      if (err) {
        reject(err);
      } else {
        // Transforma los documentos para obtener solo los IDs y los estados de pagado
        const estados = docs.reduce((acc, doc) => {
          acc[doc._id] = doc.pagado; // Suponiendo que `pagado` es un campo en tus documentos
          return acc;
        }, {});
        resolve(estados);
      }
    });
  });
}


//////////////////////////////////////////////////////
//FUNCIONES DE CUENTAS ARCHIVO filtersFile.js////////
/////////////////////////////////////////////////////
const addCategory = async (newCategory: string) => {
  const newCategoryLabel =
    newCategory.charAt(0).toUpperCase() + newCategory.slice(1).toLowerCase();
  const category = {
    value: newCategory,
    label: newCategoryLabel,
    typeFilter: "category",
  };
  return await db.filters
    .insertAsync(category)
    .then((res) => {
      console.log("Se guardo la cateogria correctamente :", res);
    })
    .catch((err) => {
      console.log("No se pudo guardar la categoria", err);
    });
};
function addBrand(e: { value: string; label: string; typeFilter: string }) {
  console.log(e);
  return new Promise((resolve, reject) => {
    db.filters.insert(e, (err, docs) => {
      if (err) {
        console.error("Error al obtener datos:", err);
        reject(err);
      } else {
        console.log("Datos obtenidos:", docs);
        resolve(docs);
      }
    });
  });
}

function getCategoryAndBrand() {
  return new Promise((resolve, reject) => {
    db.filters.find({}, (err: any, docs: unknown) => {
      if (err) {
        console.error("Error al obtener datos:", err);
        reject(err);
      } else {
        console.log("Datos obtenidos:", docs);
        resolve(docs);
      }
    });
  });
}

//FUNCIONES DE PETICIONES DE ESTADISTICAS

async function getStats() {
  const ventasAll = await findSales();

  const ventasStats = ventasAll.map((e) => {
    return {
      article: e.articulo.nombreArticulo,
      amount: e.cantidad,
      sold: e.sold,
      date: e.dateOfRegister,
    };
  });

  return ventasStats;
}

//////////////////////////////////////////////////////

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js
// │
process.env.DIST = path.join(__dirname, "../dist");
process.env.VITE_PUBLIC = app.isPackaged
  ? process.env.DIST
  : path.join(process.env.DIST, "../public");

let win: BrowserWindow | null;
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];

function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, "logo-cmg.png"),
    width: 1000,
    height: 1800,
    minWidth: 1100,
    minHeight: 600,
    titleBarStyle: "hidden",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.on("maximize", () => {
    win?.webContents.send("window-state", "maximized");
  });

  // Cuando la ventana se restaure al tamaño normal
  win.on("unmaximize", () => {
    win?.webContents.send("window-state", "windowed");
  });

  // Test active push message to Renderer-process.
  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString());
  });

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(process.env.DIST, "index.html"));
  }
  win.webContents.openDevTools();
}

ipcMain.on("unmaximize-window", () => {
  win?.unmaximize();
});
ipcMain.on("maximize-window", () => {
  win?.maximize();
});
ipcMain.on("close-window", () => {
  win?.close();
});
ipcMain.on("minimize-window", () => {
  win?.minimize();
});
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

ipcMain.on("delete-client", (event, clienteAEliminar) => {
  const result = deleteClient(clienteAEliminar);

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


////////////////////////////////
//////ESCUCHA DE USURARIOS
////////////////////////////////

ipcMain.on("guardar-usuario-admin", async (event, usuarioAdmin) => {
  try {
    // Genera un hash del password del usuario
    const hashedPassword = await bcrypt.hash(usuarioAdmin.password, saltRounds);
    // Sustituye el password en texto plano con el hash antes de guardar en la base de datos
    const usuarioConPasswordEncriptado = {
      ...usuarioAdmin,
      password: hashedPassword,
      esAdmin: true,
    };

    // Ahora guardas el usuario con el password encriptado en la base de datos
    db.usuariosAdmin.insert(usuarioConPasswordEncriptado, (err, newDoc) => {
      if (err) {
        // Si hay un error, envía una respuesta al front-end
        event.reply("respuesta-guardar-usuario-admin", { exito: false, error: err.message });
      } else {
        // Si tiene éxito, también envía una respuesta al front-end
        event.reply("respuesta-guardar-usuario-admin", { exito: true, usuarioAdmin: newDoc });
      }
    });
  } catch (error) {
    // Si hay un error con el proceso de hashing, lo capturas aquí
    console.error("Error al encriptar el password del usuario administrador:", error);
    event.reply("respuesta-guardar-usuario-admin", { exito: false, error: error.message });
  }
});

ipcMain.on('verificar-admin-existente', async (event) => {
  db.usuariosAdmin.findOne({ esAdmin: true }, (err, admin) => {
    if (err) {
      // En caso de error, comunicarlo al frontend
      event.reply('respuesta-verificar-admin', false);
    } else if (admin) {
      // Si encontramos un administrador, comunicamos que existe y enviamos la cantidad de intentos restantes
      event.reply('respuesta-verificar-admin', { existeAdmin: true, recuperacioncuenta: admin.recuperacioncuenta });
    } else {
      // Si no hay administrador, comunicamos que no existe
      event.reply('respuesta-verificar-admin', { existeAdmin: false });
    }
  });
});



const jwt = require('jsonwebtoken');
const secretKey = 'tu_clave_secreta'; // Asegúrate de usar una clave secreta segura y única

ipcMain.on('iniciar-sesion', (event, credentials) => {
  db.usuariosAdmin.findOne({ username: credentials.username }, (err, usuario) => {
    if (err) {
      console.error('Error al buscar el usuario:', err);
      event.reply('respuesta-iniciar-sesion', { exito: false, mensaje: 'Error al buscar el usuario' });
    } else {
      if (usuario && bcrypt.compareSync(credentials.password, usuario.password)) {
        // Genera un token JWT
        const token = jwt.sign({ userId: usuario._id }, secretKey, { expiresIn: '4464h' }); // Token válido por 6 meses
        console.log(usuario._id, token);
        // Incluye el ID del usuario en la respuesta
        event.reply('respuesta-iniciar-sesion', { exito: true, token, userId: usuario._id });
      } else {
        event.reply('respuesta-iniciar-sesion', { exito: false });
      }
    }
  });
});


function verificarToken(token) {
  try {
    return jwt.verify(token, secretKey);
  } catch (err) {
    return null;
  }
}

ipcMain.on('ruta-protegida', (event, token) => {
  const decoded = verificarToken(token);
  if (decoded) {
    // Token válido, maneja la solicitud
  } else {
    // Token inválido o expirado, envía un mensaje de error
    event.reply('respuesta-ruta-protegida', { exito: false, mensaje: 'Token inválido o expirado' });
  }
});


function getUser(userId) {
  return new Promise((resolve, reject) => {
    db.usuariosAdmin.findOne({ _id: userId }, (err, doc) => {
      console.log(userId, "este es  el id que recibo del fronend")
      if (err) {
        console.error('Error al obtener el usuario:', err);
        reject(err);
      } else {

        resolve(doc);
      }
    });
  });
}




// Backend
ipcMain.on('obtener-datos-usuario', async (event, userId) => {
  try {
    const usuario = await getUser(userId);
    if (usuario) {
      // Asegúrate de que la función getUser devuelva la URL de la imagen del usuario
      event.reply("datos-usuario-obtenidos", { success: true, data: usuario });
    } else {
      // Si el usuario no se encuentra, envía una respuesta de error
      event.reply("datos-usuario-obtenidos", { success: false, error: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error('Error al obtener los datos del usuario:', error);
    event.reply("datos-usuario-obtenidos", { success: false, error: error.message });
  }
});



// Función para actualizar la imagen del usuario
function actualizarImagenUsuario(userId, imageUrl) {
  console.log(`Actualizando imagen del usuario ${userId} con URL: ${imageUrl}`);
  return new Promise((resolve, reject) => {
    db.usuariosAdmin.update({ _id: userId }, { $set: { imageUrl: imageUrl } }, {}, (err) => {
      if (err) {
        console.error('Error al actualizar la imagen del usuario:', err);
        reject(err);
      } else {
        console.log('Imagen del usuario actualizada con éxito');
        resolve(true);
      }
    });
  });
}


// Evento de IPC para actualizar la imagen del usuario
ipcMain.on('actualizar-imagen-usuario', async (event, { userId, imageUrl }) => {
  console.log('Evento actualizar-imagen-usuario recibido:', userId, imageUrl);
  try {
    await actualizarImagenUsuario(userId, imageUrl);
    event.reply('respuesta-actualizar-imagen-usuario', { exito: true, imageUrl: imageUrl });
  } catch (error) {
    console.error('Error al actualizar la imagen del usuario:', error);
    event.reply('respuesta-actualizar-imagen-usuario', { exito: false, mensaje: error.message });
  }
});




// Backend
ipcMain.on('obtener-admin', (event) => {
  db.usuariosAdmin.findOne({ esAdmin: true }, (err, admin) => {
    if (err) {
      console.error('Error al buscar el administrador:', err);
      event.reply('respuesta-obtener-admin', { exito: false, error: err.message });
    } else if (admin) {
      event.reply('respuesta-obtener-admin', { exito: true, admin });
    } else {
      event.reply('respuesta-obtener-admin', { exito: false, error: 'No se encontró un administrador' });
    }
  });
});


ipcMain.on("verificar-codigo-desbloqueo", (event, codigoIngresado) => {
  db.usuariosAdmin.findOne({ esAdmin: true }, (err, admin) => {
    if (err) {
      console.error("Error al buscar el administrador:", err);
      event.reply("respuesta-verificar-codigo", { exito: false });
    } else if (admin && admin.bloqueo === codigoIngresado) {
      event.reply("respuesta-verificar-codigo", { exito: true });
    } else {
      event.reply("respuesta-verificar-codigo", { exito: false });
    }
  });
});




// Evento de IPC para cambiar la contraseña
ipcMain.on('cambiar-contrasena', async (event, { userId, nuevaContrasena }) => {
  try {
    // Encripta la nueva contraseña
    const hashedPassword = await bcrypt.hash(nuevaContrasena, saltRounds);

    // Actualiza la contraseña del usuario en la base de datos
    db.usuariosAdmin.update({ _id: userId }, { $set: { password: hashedPassword } }, {}, (err) => {
      if (err) {
        console.error('Error al actualizar la contraseña:', err);
        event.reply('respuesta-cambiar-contrasena', { exito: false, error: err.message });
      } else {
        console.log('Contraseña actualizada con éxito');
        event.reply('respuesta-cambiar-contrasena', { exito: true });
      }
    });
  } catch (error) {
    console.error('Error al encriptar la nueva contraseña:', error);
    event.reply('respuesta-cambiar-contrasena', { exito: false, error: error.message });
  }
});


ipcMain.on('restar-recuperacioncuenta', async (event, userId) => {
  // Restar 1 a recuperacioncuenta del usuario con el ID proporcionado
  db.usuariosAdmin.update({ _id: userId }, { $inc: { recuperacioncuenta: -1 } }, {}, async (err, numAffected) => {
    if (err) {
      console.error('Error al restar recuperacioncuenta:', err);
    } else {
      console.log('recuperacioncuenta restada con éxito');
      // Obtén el valor actualizado de recuperacioncuenta y envíalo al frontend
      const usuarioActualizado = await getUser(userId);
      win.webContents.send('actualizacion-recuperacioncuenta', usuarioActualizado.recuperacioncuenta);
    }
  });
});


ipcMain.on('reiniciar-recuperacioncuenta', async (event, userId) => {
  // Reiniciar recuperacioncuenta a 3 para el usuario con el ID proporcionado
  db.usuariosAdmin.update({ _id: userId }, { $set: { recuperacioncuenta: 3 } }, {}, (err, numAffected) => {
    if (err) {
      console.error('Error al reiniciar recuperacioncuenta:', err);
    } else {
      console.log('recuperacioncuenta reiniciada con éxito');
    }
  });
});





////////crear subUsuarios

ipcMain.on("guardar-usuario-secundario", async (event, usuario) => {
  try {
    // Genera un hash del password del usuario
    const hashedPassword = await bcrypt.hash(usuario.password, saltRounds);
    // Sustituye el password en texto plano con el hash antes de guardar en la base de datos
    const usuarioConPasswordEncriptado = {
      ...usuario,
      password: hashedPassword,
      esusuario: true,
    };

    // Guarda el usuario con el password encriptado en la base de datos
    db.usuarios.insert(usuarioConPasswordEncriptado, async (err, newDoc) => {
      if (err) {
        // Si hay un error, envía una respuesta al front-end
        event.reply("respuesta-guardar-usuario", { exito: false, error: err.message });
      } else {
        // Si tiene éxito, obtiene la lista actualizada de todos los usuarios
        db.usuarios.find({}, (error, docs) => {
          if (error) {
            // Maneja errores al intentar recuperar la lista de usuarios
            console.error("Error al cargar la lista de usuarios:", error);
            event.reply("respuesta-cargar-todos-usuarios", { exito: false, error: error.message });
          } else {
            // Envía la lista actualizada de usuarios al frontend
            event.reply("respuesta-cargar-todos-usuarios", { exito: true, usuarios: docs });
          }
        });
      }
    });
  } catch (error) {
    // Si hay un error con el proceso de hashing, lo capturas aquí
    console.error("Error al encriptar el password del usuario:", error);
    event.reply("respuesta-guardar-usuario", { exito: false, error: error.message });
  }
});


///////carga de usuarios inicial

// Función para cargar todos los usuarios
function cargarTodosLosUsuarios() {
  return new Promise((resolve, reject) => {
    db.usuarios.find({}, (err, docs) => {
      if (err) {
        reject(err);
      } else {
        resolve(docs);
      }
    });
  });
}

// Evento IPC para cargar todos los usuarios
ipcMain.on("cargar-todos-usuarios", async (event) => {
  try {
    const usuarios = await cargarTodosLosUsuarios();
    event.reply("respuesta-cargar-todos-usuarios", { exito: true, usuarios });
  } catch (error) {
    console.error("Error al cargar usuarios:", error);
    event.reply("respuesta-cargar-todos-usuarios", { exito: false, error: error.message });
  }
});


// Función para actualizar la imagen del subusuario
function actualizarImagenSubusuario(userId, imageUrl) {
  console.log(`Actualizando imagen del subusuario ${userId} con URL: `);
  return new Promise((resolve, reject) => {
    db.usuarios.update({ _id: userId }, { $set: { imageUrl: imageUrl } }, {}, (err) => {
      if (err) {
        console.error('Error al actualizar la imagen del subusuario:', err);
        reject(err);
      } else {
        console.log('Imagen del subusuario actualizada con éxito');
        resolve(true);
      }
    });
  });
}

// Evento de IPC para actualizar la imagen del subusuario
ipcMain.on('actualizar-imagen-subusuario', async (event, { userId, imageUrl }) => {
  console.log('Evento actualizar-imagen-subusuario recibido:', userId);
  try {
    await actualizarImagenSubusuario(userId, imageUrl);
    event.reply('respuesta-actualizar-imagen-subusuario', { exito: true, userId, imageUrl });
  } catch (error) {
    console.error('Error al actualizar la imagen del subusuario:', error);
    event.reply('respuesta-actualizar-imagen-subusuario', { exito: false, mensaje: error.message });
  }
});


/////cambiar permisos de sub-usuarios

// Función para actualizar los permisos del usuario
async function actualizarPermisosUsuario(userId, nuevosPermisos) {
  return new Promise((resolve, reject) => {
    db.usuarios.update({ _id: userId }, { $set: { permisos: nuevosPermisos } }, {}, (err, numReplaced) => {
      if (err) {
        reject(err);
      } else {
        db.usuarios.findOne({ _id: userId }, (err, usuario) => {
          if (err) {
            reject(err);
          } else {
            resolve(usuario);
          }
        });
      }
    });
  });
}

// Evento de IPC para actualizar permisos de usuario
ipcMain.on('actualizar-permisos-usuario', async (event, { userId, nuevosPermisos }) => {
  try {
    const usuarioActualizado = await actualizarPermisosUsuario(userId, nuevosPermisos);
    event.reply('respuesta-actualizar-permisos-usuario', { exito: true, usuario: usuarioActualizado });
  } catch (error) {
    console.error('Error al actualizar los permisos del usuario:', error);
    event.reply('respuesta-actualizar-permisos-usuario', { exito: false, mensaje: error.message });
  }
});



// Función para actualizar el usuario en la base de datos
async function actualizarUsuario(userId, updatedUser) {
  return new Promise((resolve, reject) => {
    db.usuarios.update({ _id: userId }, { $set: updatedUser }, {}, (err, numReplaced) => {
      if (err) {
        reject(err);
      } else {
        resolve(numReplaced);
      }
    });
  });
}

// Evento de IPC para actualizar el usuario
ipcMain.on('guardar-usuario-editado', async (event, updatedUser) => {
  try {
    const userId = updatedUser._id;
    delete updatedUser._id; // Asegúrate de eliminar el campo _id antes de actualizar
    await actualizarUsuario(userId, updatedUser);
    event.reply('respuesta-guardar-usuario-editado', { exito: true });
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
    event.reply('respuesta-guardar-usuario-editado', { exito: false, mensaje: error.message });
  }
});



























///
//ESCUCHAS DE EVENTOS DE GUARDADO DE ARTICULOS
//

ipcMain.on("save-article", async (event, articuloAGuardar) => {
  const categoryAndBrands = await getCategoryAndBrand();

  const { brand, category } = articuloAGuardar;

  const categorys = categoryAndBrands.map((e) => {
    return e.typeFilter === "category" && e.value;
  });
  const brands = categoryAndBrands.map((e) => {
    return e.typeFilter === "brand" && e.value;
  });

  const existCategory = categorys.includes(category.value);

  const existBrand = brands.includes(brand.value);

  if (existCategory && existBrand) {
    saveArticle(articuloAGuardar);
    event.reply("error-save-article", {
      message: "",
      type: "",
      active: false,
    });
  } else if (!existBrand && !existCategory) {
    event.reply("error-save-article", {
      message: " no registrada",
      type: "all",
      active: true,
    });
  } else if (!existCategory) {
    event.reply("error-save-article", {
      message: " no registrada",
      type: "category",
      active: true,
    });
  } else if (!existBrand) {
    event.reply("error-save-article", {
      message: " no registrada",
      type: "brand",
      active: true,
    });
  }
});
ipcMain.on("get-articleById", async (event, articleId) => {
  console.log("AGUANTEEEEE BOCAA LOCOOO");
  const article = await getArticleById(articleId);

  event.reply("article-foundById", article);
});
ipcMain.on("get-articleByName", async (event, articleName) => {
  console.log("AGUANTEEEEE BOCAA LOCOOO");
  const article = await getArticleByName(articleName);

  event.reply("article-foundByName", article);
});
ipcMain.on("get-articles", async (event) => {
  const articulos = await findArticles();

  console.log("Se enviaron los ARTICULOS", articulos);
  event.reply("response-get-articles", articulos); //TRATANDO QUE SE ACTUALICE CUANDO HAY UN CLIENTE NUEVO REGISTRADO
});

ipcMain.on("delete-article", (e, articuloAEliminar) => {
  deleteArticle(articuloAEliminar);
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
  await saleProcess(venta);
});

ipcMain.on("get-sales", async (event) => {
  const ventas = await findSales();

  console.log("Se enviaron las ventas", ventas);
  event.reply("response-get-sales", ventas); //TRATANDO QUE SE ACTUALICE CUANDO HAY UN CLIENTE NUEVO REGISTRADO
});

ipcMain.on("delete-sale", (e, ventaAEliminar) => {
  deleteSales(ventaAEliminar);
});
///
//ESCUCHAS DE EVENTOS DE CUENTAS
//


ipcMain.on("actualizar-estado-pagado", async (event, { idCuenta, estadoPagado }) => {
  try {
    // Actualiza el estado de 'pagado' en la base de datos
    await actualizarEstadoPagado(idCuenta, estadoPagado);
    // Aquí deberías añadir lógica para recuperar el estado actualizado de 'pagado' de la base de datos para 'idCuenta'
    // Por ejemplo, supongamos que tienes una función 'obtenerEstadoPagado' que hace exactamente eso:
    const estadoPagadoActualizado = await obtenerEstadoPagado(idCuenta);
    // Envía el estado actualizado de vuelta al frontend
    event.reply("estado-pagado-actualizado", { exitoso: true, idCuenta, estadoPagado: estadoPagadoActualizado });
  } catch (error) {
    console.error(error);
    event.reply("estado-pagado-actualizado", { exitoso: false, error: error.message, idCuenta });
  }
});

ipcMain.on("solicitar-estado-pagado-inicial", async (event) => {
  try {
    // Obtener los estados de pagado para todas las cuentas desde la base de datos
    const estados = await obtenerEstadosPagadosInicial();
    event.reply("estado-pagado-inicial", { exitoso: true, estados });
  } catch (error) {
    console.error(error);
    event.reply("estado-pagado-inicial", { exitoso: false, error: error.message });
  }
});

// En tu archivo del proceso principal de Electron (backend)
ipcMain.on('actualizar-cuenta', async (event, { idCuenta, datosActualizados }) => {
  try {
    await actualizarCuenta(idCuenta, datosActualizados);
    const cuentasActualizadas = await obtenerCuentas(); // Supongamos que esta función obtiene todas las cuentas actualizadas
    event.reply('cuentas-actualizadas', cuentasActualizadas);
  } catch (error) {
    console.error('Error al actualizar la cuenta:', error);
    event.reply('error-actualizando-cuenta', error.message);
  }
});

//////eliminar cuentas
ipcMain.on('eliminar-cuenta', async (event, { id }) => {
  try {
    // Intentar eliminar la cuenta de la base de datos
    await cuentas.remove({ _id: id }, {});
    // Enviar respuesta exitosa al proceso de renderizado
    event.reply('cuenta-eliminada', { exitoso: true});
  } catch (error) {
    // Enviar respuesta de error al proceso de renderizado
    event.reply('cuenta-eliminada', { exitoso: false, error: error.message });
  }
});



//////evento cuentas para caja

// Función para obtener las cuentas a pagar
async function getAccountsToPay() {
  return new Promise((resolve, reject) => {
    db.accounts.find({}, (err, docs) => {
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

ipcMain.on("save-category", async (event, category) => {
  // GUARDAR CATEGORIA EN FILTROS
  await addCategory(category);
});
ipcMain.on("save-brand", async (event, brand) => {
  await addBrand(brand);
});
ipcMain.on("get-categoryAndBrand", async (event, category) => {
  const categorysAndBrands = await getCategoryAndBrand();

  event.reply("response-get-categoryAndBrand", categorysAndBrands);
});

ipcMain.on("actualizar-cuenta", async (event, { id, updatedAccount }) => {
  try {
    const resultado = await actualizarCuenta(id, updatedAccount);
    event.reply("cuenta-actualizada", { exitoso: true, id, resultado });
  } catch (error) {
    console.error(error);
    event.reply("cuenta-actualizada", { exitoso: false, error: error.message, id });
  }
});





//////////////
//////////////
// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    const clientesObtenidos = createWindow();
  }
});

app.whenReady().then(createWindow);
