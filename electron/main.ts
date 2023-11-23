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

//FUNCIONES DE CLIENTES ARCHIVO DATAFILE

function guardarUsuario(data: any) {
  db.insert(data, (err, newDoc) => {
    if (err) {
      // Manejar el error
      console.error("Error al guardar el objeto:", err);
    } else {
      // Objeto guardado con éxito
      console.log("Objeto guardado:", newDoc);
    }
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
////////////////////////////////
//FUNCIONES DE ARTICULOS ARKCHIVO ARTICULOS.JS
///////////////////////////////

function guardarArticulo(a: any) {
  articulos.insert(a, (err, newDoc) => {
    if (err) {
      // Manejar el error
      console.error("Error al guardar el objeto:", err);
    } else {
      // Objeto guardado con éxito
      console.log("Objeto guardado:", newDoc);
    }
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
    icon: path.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    width: 1000,
    height: 600,
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
///
//ESCUCHAS DE EVENTOS DE GUARDADO DE ARTICULOS
//

ipcMain.on("guardar-articulo", async (event, articuloAGuardar) => {
  guardarArticulo(articuloAGuardar);
});

ipcMain.on("obtener-articulos", async (event) => {
  const articulos = await buscarArticulos();

  console.log("SE ENVIO LO PEDIDO", articulos);
  event.reply("respuesta-obtener-articulos", articulos); //TRATANDO QUE SE ACTUALICE CUANDO HAY UN CLIENTE NUEVO REGISTRADO
});

ipcMain.on("eliminar-articulo", (e, articuloAEliminar) => {
  borrarArticulo(articuloAEliminar);
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
