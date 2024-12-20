import { contextBridge, ipcRenderer } from "electron";
// import * as pushReceiver from "electron-push-receiver";

// Expose some API to the Renderer process
contextBridge.exposeInMainWorld("ipcRenderer", withPrototype(ipcRenderer));

// `exposeInMainWorld` can't detect attributes and methods of `prototype`, manually patching it.
function withPrototype(obj: Record<string, any>) {
  const protos = Object.getPrototypeOf(obj);

  for (const [key, value] of Object.entries(protos)) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) continue;

    if (typeof value === "function") {
      // Some native APIs, like `NodeJS.EventEmitter['on']`, don't work in the Renderer process. Wrapping them into a function.
      obj[key] = function (...args: any) {
        return value.call(obj, ...args);
      };
    } else {
      obj[key] = value;
    }
  }
  return obj;
}

// Preload scripts loading
function domReady(
  condition: DocumentReadyState[] = ["complete", "interactive"]
) {
  return new Promise((resolve) => {
    if (condition.includes(document.readyState)) {
      resolve(true);
    } else {
      document.addEventListener("readystatechange", () => {
        if (condition.includes(document.readyState)) {
          resolve(true);
        }
      });
    }
  });
}

const safeDOM = {
  append(parent: HTMLElement, child: HTMLElement) {
    if (!Array.from(parent.children).find((e) => e === child)) {
      parent.appendChild(child);
    }
  },

  remove(parent: HTMLElement, child: HTMLElement) {
    if (Array.from(parent.children).find((e) => e === child)) {
      parent.removeChild(child);
    }
  },
};

/**
 * https://tobiasahlin.com/spinkit
 * https://connoratherton.com/loaders
 * https://projects.lukehaas.me/css-loaders
 * https://matejkustec.github.io/SpinThatShit
 */
function useLoading() {
  const className = `loaders-css__square-spin`;
  const styleContent = `
@keyframes square-spin {
  25% { transform: perspective(100px) rotateX(180deg) rotateY(0); }
  50% { transform: perspective(100px) rotateX(180deg) rotateY(180deg); }
  75% { transform: perspective(100px) rotateX(0) rotateY(180deg); }
  100% { transform: perspective(100px) rotateX(0) rotateY(0); }
}
.${className} > div {
  animation-fill-mode: both;
  width: 50px;
  height: 50px;
  background: #fff;
  animation: square-spin 3s 0s cubic-bezier(0.09, 0.57, 0.49, 0.9) infinite;
}
.app-loading-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #282c34;
  z-index: 9;
}
    `;
  const oStyle = document.createElement("style");
  const oDiv = document.createElement("div");

  oStyle.id = "app-loading-style";
  oStyle.innerHTML = styleContent;
  oDiv.className = "app-loading-wrap";
  oDiv.innerHTML = `<div class="${className}"><div></div></div>`;

  return {
    appendLoading() {
      safeDOM.append(document.head, oStyle);
      safeDOM.append(document.body, oDiv);
    },
    removeLoading() {
      safeDOM.remove(document.head, oStyle);
      safeDOM.remove(document.body, oDiv);
    },
  };
}

// ----------------------------------------------------------------------

const { appendLoading, removeLoading } = useLoading();
domReady().then(appendLoading);

window.onmessage = (ev) => {
  ev.data.payload === "removeLoading" && removeLoading();
};

setTimeout(removeLoading, 4999);

contextBridge.exposeInMainWorld("api", {
  enviarEvento: (canal: string, data?: any) => {
    const canalesPermitidos = [
      //EVENTOS DE VENTANA
      "maximize-window",
      "unmaximize-window",
      "close-window",
      "minimize-window",
      //EVENTOS DE ARTICULOS
      "get-articles",
      "save-article",
      "edit-article",
      "delete-article",
      "get-articleByCode",
      "update-article",
      "get-articleByName",
      "article_restock",
      //EVENTOS DE CLIENTES
      "save-client",
      "get-clients",
      "delete-client",
      "get-client-byId",
      "update-client",
      "register-buy-client",
      //EVENTOS DE VENTAS
      "get-sales",
      "prueba-afipo",
      "save-sale",
      "sale-process",
      "delete-sale",
      "get-sales-stats",
      //EVENTOS CUENTAS
      "save-accountToPay",
      "get-accountToPay",
      "get-accountToPay2",
      "get-accountToPay3",
      "actualizar-estado-pagado",
      "solicitar-estado-pagado-inicial",
      "eliminar-cuenta",
      //EVENTOS FILTROS
      "save-category",
      "save-subcategory",
      "save-brand",
      "get-categoryAndBrand",
      //Eventos Usuario
      "guardar-usuario-admin",
      "iniciar-sesion",
      "obtener-datos-usuario",
      "actualizar-imagen-usuario",
      "obtener-admin",
      "verificar-codigo-desbloqueo",
      "cambiar-contrasena",
      "reiniciar-recuperacioncuenta",
      "restar-recuperacioncuenta",
      "guardar-usuario-secundario",
      "cargar-todos-usuarios",
      "actualizar-imagen-subusuario",
      "actualizar-permisos-usuario",
      "guardar-usuario-editado",
      "obtener-permisos-usuario",
      "verificar-admin-existente",
      "obtener-admin",
      //Unidades
      "get-unitsArticleForm",
      "save-unitsArticleForm",
      "update-unitsArticleForm",
      "remove-unitsArticleForm",
      //proveedores
      "save-supplier",
      "delete-supplier",
      "get-suppliers",
      //NOTIFICACIONES
      "send-notification",
      "get-notifications",
      "delete-notification",
      "mark-notification-as-read",
      "hide-notification",
      "disable-notification-type",
      "get-disabled-notification-types",
      "delete-old-notifications",
      "update-supplier",
      "actualizar-senotifico",
      //IMPRESORA PRUEBA
      "imprimir-pa",
      //METODOS DE PAGO
      "get-pay-methods",
      "update-pay-method",
      "add-pay-method",
      "remove-pay-method",
      //COMPRAS
      "clear-cache",
      "guardar-historial-cuenta",
      "save-accountToPayeditar",
      "get-historial-cuenta",
      "save-notification",
    ];
    if (canalesPermitidos.includes(canal)) {
      ipcRenderer.send(canal, data);
    }
  },
  recibirEvento: (canal: string, callback: any) => {
    const canalesPermitidos = [
      //RESPUESTAS SOBRE ARTICULOS
      "response-get-articles",
      "error-save-article", //ERROR AL GUARDAR EL ARTICULO
      "response-edit-article",
      "response-delete-article",
      "response-get-articleByCode",
      "response-update-article",
      "response-restock-article",
      /////
      //RESPUESTAS CLIENTES
      "response-update-client",
      "response-register-buy-client",
      "response-get-client-byId",
      "response-get-clients",
      "response-delete-clients",
      "response-save-client",
      ///
      "response-get-sales",
      "article-foundById",
      "article-foundByName",
      "response-get-accountToPay",
      "response-get-accountToPay2",
      "response-get-accountToPay3",
      "response-get-categoryAndBrand",
      "response-get-sales-stats",
      "response-sale-process",
      "respuesta-iniciar-sesion",
      "datos-usuario-obtenidos",
      "datos-usuario-obtenidos",
      "respuesta-obtener-admin",
      "respuesta-verificar-codigo",
      "actualizacion-recuperacioncuenta",
      "respuesta-actualizar-imagen-usuario",
      "respuesta-guardar-usuario",
      "respuesta-cargar-todos-usuarios",
      "respuesta-actualizar-imagen-subusuario",
      "respuesta-actualizar-permisos-usuario",
      "respuesta-iniciar-sesion",
      "respuesta-obtener-permisos-usuario",
      "respuesta-verificar-admin",
      "respuesta-obtener-admin",
      "estado-pagado-inicial",
      "cuenta-eliminada",
      "estado-pagado-actualizado",
      //UNIT RESPONSE
      "response-get-unitsArticleForm",
      "response-save-unitsArticleForm",
      "response-update-unitsArticleForm",
      "response-remove-unitsArticleForm",
      //PROVEEDORES RESPONSE ,
      "response-save-supplier",
      "response-delete-supplier",
      "response-get-suppliers",
      "response-update-supplier",
      //IMPRESORA
      "response-imprimir-pa",
      //NOTIFICACIONES
      "response-get-notifications",
      "hide-notification",
      "disable-notification-type",
      "response-get-disabled-notification-types",
      "cache-cleared",
      "actualizarEstadoNoPago",
      //METODOS DE PAGO
      "response-get-pay-methods",
      "response-update-pay-method",
      "response-add-pay-method",
      "response-remove-pay-method",
      "account-saved",
      "accounts-updated",
      "respuesta-historial-cuenta",
      "datos-usuario-obtenidoss",
    ];

    if (canalesPermitidos.includes(canal)) {
      console.log(`Escuchando evento: ${canal}`); // Agrega esta línea
      ipcRenderer.on(canal, (_event, ...args) => callback(...args));
    }
  },
  removeListener: (canal: string, callback: (...args: any[]) => void) => {
    if (ipcRenderer.listenerCount(canal) > 0) {
      console.log(`Removiendo listener del canal: ${canal}`);
      ipcRenderer.removeListener(canal, callback);
    } else {
      console.warn(`No hay listeners para el canal: ${canal}`);
    }
  },

  removeAllListeners: (canal: string, _callback: (...args: any[]) => void) => {
    console.log(`Removiendo todos los listeners del canal: ${canal}`);
    ipcRenderer.removeAllListeners(canal);
  },
});

window.addEventListener("DOMContentLoaded", () => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/firebase-messaging-sw.js")
      .then((registration) => {
        console.log("Service Worker registrado con éxito:", registration.scope);
      })
      .catch((err) => {
        console.log("Error al registrar el Service Worker:", err);
      });
  }
});
