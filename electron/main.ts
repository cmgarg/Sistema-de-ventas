import { app, BrowserWindow, ipcMain, ipcRenderer } from "electron";
import path from "node:path";

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
async function getAccountsToPay() {
  return new Promise((resolve, reject) => {
    db.accounts.find({}, (err: any, docs: any) => {
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
    minWidth: 900,
    minHeight: 500,
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
