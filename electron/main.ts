import { app, BrowserWindow, globalShortcut, ipcMain } from "electron";
import path from "path";
import { loadEvents } from "./eventHandlers";
import isDev from "electron-is-dev";
import {
  PosPrintData,
  PosPrinter,
  PosPrintOptions,
} from "electron-pos-printer";
import { findArticles, findClients } from "./databaseOperations";
import { saleData } from "../types/types";

let win: BrowserWindow | null;
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];

function createWindow() {
  win = new BrowserWindow({
    width: 1100,
    height: 1800,
    minWidth: 1100,
    icon: path.join(__dirname, '../src/assets/icon.ico'), // Ruta al ícono
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
    : path.join(__dirname, "../dist-vite/index.html");

  if (isDev) {
    win.loadURL(url);
  } else {
    win.loadFile(url);
  }

  globalShortcut.register("CommandOrControl+Shift+I", () => {
    win?.webContents.openDevTools();
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

// Impresora
export const printBill = async (saleData: saleData, factureType: string) => {
  const articulos = await findArticles();
  const clientes = await findClients();
  const options: PosPrintOptions = {
    preview: true,
    margin: "5 5 5 5",
    copies: 1,
    printerName: "IMPRESORATERMICA",
    pageSize: "80mm",
    timeOutPerLine: 1000,
    boolean: false,
    silent: false,
  };

  let data: PosPrintData[] = [];

  if (factureType === "TYPEA") {
    data = [
      {
        type: "text",
        value: "------------------------------------------------------------\n",
        style: { textAlign: "center" },
      },
      {
        type: "text",
        value: "FACTURA A\n",
        style: {
          textAlign: "center",
          fontSize: "22px",
          fontWeight: "bold",
          fontFamily: "italic",
        },
      },
      {
        type: "text",
        value: "------------------------------------------------------------\n",
        style: { textAlign: "center" },
      },
      {
        type: "text",
        value:
          "Fecha: 18/07/2024                          Nro: 0001-00001234\n",
        style: { textAlign: "left" },
      },
      {
        type: "text",
        value: "------------------------------------------------------------\n",
        style: { textAlign: "center" },
      },
      {
        type: "text",
        value: "Razón Social: Empresa Ejemplo S.A.\n",
        style: { textAlign: "left" },
      },
      {
        type: "text",
        value: "Domicilio: Calle Falsa 123, Ciudad\n",
        style: { textAlign: "left" },
      },
      {
        type: "text",
        value: "CUIT: 30-12345678-9\n",
        style: { textAlign: "left" },
      },
      {
        type: "text",
        value: "Condición IVA: Responsable Inscripto\n",
        style: { textAlign: "left" },
      },
      {
        type: "text",
        value: "------------------------------------------------------------\n",
        style: { textAlign: "center" },
      },
      {
        type: "text",
        value: "Cliente: Juan Pérez\n",
        style: { textAlign: "left" },
      },
      {
        type: "text",
        value: "Domicilio: Av. Siempreviva 742, Ciudad\n",
        style: { textAlign: "left" },
      },
      {
        type: "text",
        value: "CUIT/CUIL: 20-87654321-0\n",
        style: { textAlign: "left" },
      },
      {
        type: "text",
        value: "Condición IVA: Responsable Inscripto\n",
        style: { textAlign: "left" },
      },
      {
        type: "text",
        value: "------------------------------------------------------------\n",
        style: { textAlign: "center" },
      },
      {
        type: "text",
        value:
          "Descripción           Cantidad   Precio Unitario   Precio Total\n",
        style: { textAlign: "left" },
      },
      {
        type: "text",
        value: "------------------------------------------------------------\n",
        style: { textAlign: "center" },
      },
      {
        type: "text",
        value:
          "Producto 1               2           $500.00         $1000.00\n",
        style: { textAlign: "left" },
      },
      {
        type: "text",
        value: "Servicio 1               1           $300.00         $300.00\n",
        style: { textAlign: "left" },
      },
      {
        type: "text",
        value: "------------------------------------------------------------\n",
        style: { textAlign: "center" },
      },
      {
        type: "text",
        value: "Subtotal                                         $1300.00\n",
        style: { textAlign: "left" },
      },
      {
        type: "text",
        value: "IVA 21%                                           $273.00\n",
        style: { textAlign: "left" },
      },
      {
        type: "text",
        value: "Total                                            $1573.00\n",
        style: { textAlign: "left" },
      },
      {
        type: "text",
        value: "------------------------------------------------------------\n",
        style: { textAlign: "center" },
      },
      {
        type: "text",
        value: "Condiciones de Venta: Contado\n",
        style: { textAlign: "left" },
      },
      {
        type: "text",
        value: "------------------------------------------------------------\n",
        style: { textAlign: "center" },
      },
      {
        type: "text",
        value: "CAE: 12345678901234\n",
        style: { textAlign: "left" },
      },
      {
        type: "text",
        value: "Fecha Vto. CAE: 25/07/2024\n",
        style: { textAlign: "left" },
      },
      {
        type: "text",
        value: "------------------------------------------------------------\n",
        style: { textAlign: "center" },
      },
      {
        type: "text",
        value: "[QR]",
        style: { textAlign: "center" },
      },
      {
        type: "text",
        value: "------------------------------------------------------------\n",
        style: { textAlign: "center" },
      },
    ];
  } else if (factureType === "TYPEB") {
    data = [
      {
        type: "text",
        value: "------------------------------------------------------------\n",
        style: { textAlign: "center" },
      },
      {
        type: "text",
        value: "FACTURA B\n",
        style: { textAlign: "center", fontSize: "22px", fontWeight: "bold" },
      },
      {
        type: "text",
        value: "------------------------------------------------------------\n",
        style: { textAlign: "center" },
      },
      {
        type: "text",
        value:
          "Fecha: 18/07/2024                          Nro: 0002-00001234\n",
        style: { textAlign: "left", fontWeight: "bold" },
      },
      {
        type: "text",
        value: "------------------------------------------------------------\n",
        style: { textAlign: "center" },
      },
      {
        type: "text",
        value: "Razón Social: Empresa Ejemplo S.A.\n",
        style: { textAlign: "left", fontStyle: "italic" },
      },
      {
        type: "text",
        value: "Domicilio: Calle Falsa 123, Ciudad\n",
        style: { textAlign: "left", fontWeight: "bold" },
      },
      {
        type: "text",
        value: "CUIT: 30-12345678-9\n",
        style: { textAlign: "left" },
      },
      {
        type: "text",
        value: "Condición IVA: Responsable Inscripto\n",
        style: { textAlign: "left", textDecoration: "underline" },
      },
      {
        type: "text",
        value: "------------------------------------------------------------\n",
        style: { textAlign: "center" },
      },
      {
        type: "text",
        value: "Cliente: Juan Pérez\n",
        style: { textAlign: "left" },
      },
      {
        type: "text",
        value: "Domicilio: Av. Siempreviva 742, Ciudad\n",
        style: { textAlign: "left" },
      },
      {
        type: "text",
        value: "CUIT/CUIL: 20-87654321-0\n",
        style: { textAlign: "left" },
      },
      {
        type: "text",
        value: "Condición IVA: Consumidor Final\n",
        style: { textAlign: "left" },
      },
      {
        type: "text",
        value: "------------------------------------------------------------\n",
        style: { textAlign: "center" },
      },
      {
        type: "text",
        value:
          "Descripción           Cantidad   Precio Unitario   Precio Total\n",
        style: { textAlign: "left", fontWeight: "bold" },
      },
      {
        type: "text",
        value: "------------------------------------------------------------\n",
        style: { textAlign: "center" },
      },
      {
        type: "text",
        value:
          "Producto 1               2           $500.00         $1000.00\n",
        style: { textAlign: "left" },
      },
      {
        type: "text",
        value: "Servicio 1               1           $300.00         $300.00\n",
        style: { textAlign: "left" },
      },
      {
        type: "text",
        value: "------------------------------------------------------------\n",
        style: { textAlign: "center" },
      },
      {
        type: "text",
        value: "Total                                            $1300.00\n",
        style: { textAlign: "left" },
      },
      {
        type: "text",
        value: "------------------------------------------------------------\n",
        style: { textAlign: "center" },
      },
      {
        type: "text",
        value: "Condiciones de Venta: Contado\n",
        style: { textAlign: "left" },
      },
      {
        type: "text",
        value: "------------------------------------------------------------\n",
        style: { textAlign: "center" },
      },
      {
        type: "text",
        value: "CAE: 12345678901234\n",
        style: { textAlign: "left" },
      },
      {
        type: "text",
        value: "Fecha Vto. CAE: 25/07/2024\n",
        style: { textAlign: "left" },
      },
      {
        type: "text",
        value: "------------------------------------------------------------\n",
        style: { textAlign: "center" },
      },
      {
        type: "text",
        value: "[QR]",
        style: { textAlign: "center" },
      },
      {
        type: "text",
        value: "------------------------------------------------------------\n",
        style: { textAlign: "center" },
      },
    ];
  }

  try {
    await PosPrinter.print(data, options);
    console.log("Test print successful");
  } catch (error) {
    console.error("Test print failed", error);
  }
};

ipcMain.handle("print", async (_event, sale, totalAmount) => {
  const result = await printBill(sale, "TYPEB");
  return result;
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
