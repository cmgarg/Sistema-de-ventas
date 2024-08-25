import { app, BrowserWindow, globalShortcut, ipcMain } from "electron";
import path from "path";
import { loadEvents } from "./eventHandlers";
// No necesitas `electron-is-dev`, puedes usar `process.env.NODE_ENV`

const isDev = process.env.NODE_ENV !== 'production';




let win: BrowserWindow | null;
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];

function createWindow() {
  win = new BrowserWindow({
    width: 1100,
    height: 1800,
    minWidth: 1100,
    icon: path.join(__dirname, "assets", "icon.ico"),
    title: "Punto de Ventas",
    minHeight: 600,
    titleBarStyle: "hidden",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });
  if (!isDev) {
    win.removeMenu(); // Esto remueve el menú que incluye la opción de abrir DevTools
  }
  
  win.webContents.session.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: Object.assign({
        'Content-Security-Policy': ["default-src 'self' 'unsafe-eval' 'unsafe-inline' blob: data: filesystem:; connect-src 'self' https: wss:; frame-src 'self'; img-src 'self' data: https:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; style-src 'self' 'unsafe-inline' https:;"]
      }, details.responseHeaders)
    });
  });

  win.on("maximize", () => {
    win?.webContents.send("window-state", "maximized");
  });

  win.on("unmaximize", () => {
    win?.webContents.send("window-state", "windowed");
  });

  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString());
  });

  const port = process.env.PORT || 3000;
  const url = isDev
    ? `http://localhost:${port}`
    : path.join(__dirname, "../dist-vite/index.html");

  if (isDev) {
    win.loadURL(url);
  } else {
    win.loadFile(url);
  }

  globalShortcut.register("CommandOrControl+Shift+I", () => {
    win?.webContents.openDevTools();
  });

  win.webContents.session.webRequest.onHeadersReceived((details, callback) => {
    const csp = isDev
      ? "default-src 'self' 'unsafe-inline'; connect-src 'self' ws://vps-4260176-x.dattaweb.com; style-src 'self' 'unsafe-inline';"
      : "default-src 'self'; connect-src 'self' ws://vps-4260176-x.dattaweb.com;";

    callback({
      responseHeaders: {
        ...details.responseHeaders,
        "Content-Security-Policy": [csp],
      },
    });
  });

  loadEvents();
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

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});

app.on("ready", () => {
  globalShortcut.register("CommandOrControl+R", () => {
    win?.reload();
  });
  createWindow();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
