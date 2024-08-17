import { app, BrowserWindow, globalShortcut, ipcMain } from "electron";
import path from "path";
import { loadEvents } from "./eventHandlers";
import isDev from "electron-is-dev";

let win: BrowserWindow | null;

function createWindow() {
  win = new BrowserWindow({
    width: 1100,
    height: 1800,
    minWidth: 1600,
    icon: path.join(__dirname, 'assets', 'icon.ico'), // Asegúrate de que esta ruta sea correcta
    title: "Punto de Ventas",
    minHeight: 600,
    titleBarStyle: "hidden",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
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
    : path.join(__dirname, "../dist-vite/index.html"); // Asegúrate de que esta ruta sea correcta

  if (isDev) {
    win.loadURL(url);
  } else {
    win.loadFile(url);
  }

  globalShortcut.register("CommandOrControl+Shift+I", () => {
    win?.webContents.openDevTools();
  });

  // Configuración de CSP para permitir conexiones WebSocket y scripts en línea en desarrollo
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
