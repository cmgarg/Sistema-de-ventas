import { app, BrowserWindow, ipcMain, ipcRenderer } from "electron";
import path from "node:path";

//GUARDAR PETICION CUANDO SE ESTA OFFLINE
//DATA BASES LOCALES
import Datastore from "nedb";
const db = new Datastore({ filename: "database/datafile.js", autoload: true });
const articulos = new Datastore({
  filename: "database/articulos.js",
  autoload: true,
});
const ventas = new Datastore({
  filename: "database/ventasFile.js",
  autoload: true,
});
const cuentas = new Datastore({
  filename: "database/cuentasFile.js",
  autoload: true,
});

//FUNCIONES DE CLIENTES ARCHIVO DATAFILE

function guardarUsuario(data: any) {
  const client = {
    ...data,
    compras: [],
  };

  db.insert(client, (err, newDoc) => {
    if (err) {
      // Manejar el error
      console.error("Error al guardar el objeto:", err);
    } else {
      // Objeto guardado con éxito
      console.log("Objeto guardado:", newDoc);
    }
  });
}
async function registerBuyClient(clientBuy: any) {
  const client = await getClientById(clientBuy.cliente.idClient);
  console.log("CLIENTE OBTENIDO APAPA", client[0].compras);
  const clientUpdated = {
    ...client[0],
    compras: [...client[0].compras, clientBuy.compra],
  };
  console.log("WACHAAAA", clientUpdated);
  delete clientUpdated._id;

  await actualizarCliente(client[0]._id, clientUpdated);
}
function getClientById(clientId: string) {
  return new Promise((resolve, reject) => {
    db.find({ _id: clientId }, (err: any, doc: any) => {
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
function borrarCliente(data: any) {
  console.log("ACA ERSTAMOS");
  db.remove({ _id: data }, (err, newDoc) => {
    if (err) {
      // Manejar el error
      console.error("Error al guardar el objeto:", err);
    } else {
      // Objeto guardado con éxito
      console.log("Cliente eliminado:", newDoc);
    }
  });
}
function buscarClientes() {
  return new Promise((resolve, reject) => {
    db.find({}, (err: any, docs: any) => {
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
function actualizarCliente(clientId: string, updateData: any) {
  delete updateData._id;
  return new Promise((resolve, reject) => {
    db.update(
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
////////////////////////////////
//FUNCIONES DE ARTICULOS ARKCHIVO ARTICULOS.JS
///////////////////////////////

function guardarArticulo(a: any) {
  const articleToSave = {
    ...a,
    ventas: [],
  };

  articulos.insert(articleToSave, (err, newDoc) => {
    if (err) {
      // Manejar el error
      console.error("Error al guardar el objeto:", err);
    } else {
      // Objeto guardado con éxito
      console.log("Objeto guardado:", newDoc);
    }
  });
}
function getArticleById(articleId: string) {
  return new Promise((resolve, reject) => {
    articulos.find({ _id: articleId }, (err: any, doc: any) => {
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
    articulos.find({ articulo: articleName }, (err: any, doc: any) => {
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
function buscarArticulos() {
  return new Promise((resolve, reject) => {
    articulos.find({}, (err: any, docs: any) => {
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
function borrarArticulo(data: any) {
  console.log("ACA ERSTAMOS");
  articulos.remove({ _id: data }, (err, newDoc) => {
    if (err) {
      // Manejar el error
      console.error("Error al guardar el objeto:", err);
    } else {
      // Objeto guardado con éxito
      console.log("Cliente eliminado:", newDoc);
    }
  });
}
async function updatedStockArticle(idArticle: any, sold: any) {
  const articleUpdate = await getArticleById(idArticle);
  console.log(articleUpdate, "ARTICULO A ACTUALIZAR STOCK");
  const stock = parseInt(articleUpdate[0].stock);
  console.log(articleUpdate[0].stock, "STOCK");
  const restSold = stock - sold;

  return new Promise((resolve, reject) => {
    articulos.update(
      { _id: idArticle },
      { ...articleUpdate[0], stock: restSold },
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
async function updateCountSaleArticle(articleId: string, sale: object) {
  const article = await getArticleById(articleId);

  const salesCount = article[0].ventas;

  return new Promise((resolve, reject) => {
    articulos.update(
      { _id: articleId },
      { ...article[0], ventas: [...salesCount, sale] },
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
/////////////////////////////////////////////////////
function guardarVenta(a: any) {
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
  ventas.insert(saleToSave, (err, newDoc) => {
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
  const articuloVendido = await getArticleById(venta.articulo.idArticle);
  const cantidadVendida = parseInt(venta.cantidad);
  const idArticle = articuloVendido[0]._id;
  const totalMoneySold = venta.cantidad * articuloVendido[0].costo;

  const saleComplete = { ...venta, sold: totalMoneySold };

  await updatedStockArticle(idArticle, cantidadVendida); //actualiza el stock del articulo vendido
  await updateCountSaleArticle(idArticle, saleComplete);

  return guardarVenta(saleComplete);
}
function buscarVentas() {
  return new Promise((resolve, reject) => {
    ventas.find({}, (err: any, docs: any) => {
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
function borrarVentas(data: any) {
  console.log("ACA ERSTAMOS");
  ventas.remove({ _id: data }, (err, newDoc) => {
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
function accountToPay(account: object) {
  cuentas.insert(account, (err, newDoc) => {
    if (err) {
      // Manejar el error
      console.error("Error al guardar el objeto:", err);
    } else {
      // Objeto guardado con éxito
      console.log("Objeto guardado:", newDoc);
    }
  });
}
async function getAccountsToPay() {
  return new Promise((resolve, reject) => {
    cuentas.find({}, (err: any, docs: any) => {
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
    minWidth: 900,
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
ipcMain.on("guardar-usuario", (e, clienteAGuardar) => {
  guardarUsuario(clienteAGuardar);
});
ipcMain.on("obtener-clientes", async (event) => {
  const clientes = await buscarClientes();

  console.log("SE ENVIO LO PEDIDO", clientes);
  event.reply("respuesta-obtener-clientes", clientes); //TRATANDO QUE SE ACTUALICE CUANDO HAY UN CLIENTE NUEVO REGISTRADO
});

ipcMain.on("eliminar-cliente", (e, clienteAEliminar) => {
  borrarCliente(clienteAEliminar);
});
ipcMain.on("obtener-clienteById", async (event, clientId) => {
  console.log("AGUANTEEEEE BOCAA LOCOOO");
  const cliente = await getClientById(clientId);

  event.reply("cliente-encontradoById", cliente);
});
ipcMain.on("actualizar-cliente", async (event, clienteData) => {
  const mensajeAResponder = await actualizarCliente(
    clienteData._id,
    clienteData
  );

  event.reply("respuesta-actualizar-cliente", mensajeAResponder);
});

ipcMain.on("register-buy-client", async (event, clienteData) => {
  console.log("ESTO LLEGO", clienteData);
  const mensajeAResponder = await registerBuyClient(clienteData);

  event.reply("response-register-buy", mensajeAResponder);
});

///
//ESCUCHAS DE EVENTOS DE GUARDADO DE ARTICULOS
//

ipcMain.on("guardar-articulo", async (event, articuloAGuardar) => {
  guardarArticulo(articuloAGuardar);
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
ipcMain.on("obtener-articulos", async (event) => {
  const articulos = await buscarArticulos();

  console.log("SE ENVIO LO PEDIDO", articulos);
  event.reply("respuesta-obtener-articulos", articulos); //TRATANDO QUE SE ACTUALICE CUANDO HAY UN CLIENTE NUEVO REGISTRADO
});

ipcMain.on("eliminar-articulo", (e, articuloAEliminar) => {
  borrarArticulo(articuloAEliminar);
});

///
//ESCUCHAS DE EVENTOS DE GUARDADO DE VENTAS
//
ipcMain.on("sale-process", async (event, venta) => {
  saleProcess(venta);
});

ipcMain.on("obtener-ventas", async (event) => {
  const ventas = await buscarVentas();

  console.log("SE ENVIO LO PEDIDO", ventas);
  event.reply("respuesta-obtener-ventas", ventas); //TRATANDO QUE SE ACTUALICE CUANDO HAY UN CLIENTE NUEVO REGISTRADO
});

ipcMain.on("eliminar-venta", (e, ventaAEliminar) => {
  borrarVentas(ventaAEliminar);
});
///
//ESCUCHAS DE EVENTOS DE CUENTAS
//

ipcMain.on("save-accountToPay", async (event, account) => {
  const accountToSave = account;

  accountToPay(accountToSave);
});
ipcMain.on("get-accountToPay", async (event, account) => {
  const accountsToPay = await getAccountsToPay();

  event.reply("response-get-accountToPay", accountsToPay);
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
