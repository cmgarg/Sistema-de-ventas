/// <reference types="vite/client" />
declare global {
  interface Window {
    api: {
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
