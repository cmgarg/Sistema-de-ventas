/// <reference types="vite/client" />
declare global {
  interface Window {
    api: {
      removeAllListeners(arg0: string): unknown;
      enviarEvento: (canal: string, data?: any) => void;
      recibirEvento: (
        canal: string,
        callback: (...args: any[]) => void
      ) => void;
      // Añade aquí otras funciones expuestas en tu API
    };
  }
}

export {};
