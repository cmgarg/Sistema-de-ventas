declare module "quagga" {
  interface InputStream {
    name?: string;
    type: string;
    target: HTMLElement | string;
    constraints?: MediaTrackConstraints;
    area?: {
      top?: string;
      right?: string;
      left?: string;
      bottom?: string;
    };
    singleChannel?: boolean;
  }

  interface ReaderConfig {
    readers: string[];
    debug?: {
      drawBoundingBox?: boolean;
      showFrequency?: boolean;
      drawScanline?: boolean;
      showPattern?: boolean;
    };
  }

  interface QuaggaConfig {
    inputStream: InputStream;
    decoder: ReaderConfig;
    locator?: any;
    locate?: boolean;
  }

  interface Result {
    codeResult: {
      code: string;
    };
    [key: string]: any;
  }

  interface QuaggaStatic {
    init(config: QuaggaConfig, callback: (err: any) => void): void;
    start(): void;
    stop(): void;
    onDetected(callback: (result: Result) => void): void;
    onProcessed(callback: (result: any) => void): void;
  }

  const Quagga: QuaggaStatic;
  export default Quagga;
}

declare module "electron-pos-printer" {
  export const PosPrinter: any;
}
