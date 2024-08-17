import react from "@vitejs/plugin-react";
import { UserConfig, ConfigEnv } from "vite";
import { rmSync } from "node:fs";
import { join, resolve } from "path";
import electron from "vite-plugin-electron";
import renderer from "vite-plugin-electron-renderer";
import pkg from "./package.json";

// Definir las rutas raíz del proyecto
const root = join(__dirname);
const srcRoot = join(__dirname, "src");

// Eliminar el directorio 'dist-electron' para asegurar una construcción limpia
rmSync("dist-electron", { recursive: true, force: true });

/**
 * Función para configurar las opciones de construcción para Electron
 * @param isDev - Booleano que indica si el entorno es de desarrollo
 * @returns Opciones de construcción para Electron
 */
const buildElectron = (isDev: boolean) => ({
  sourcemap: isDev, // Habilitar sourcemap en desarrollo para facilitar la depuración
  minify: !isDev, // Minificar el código en producción
  outDir: join(root, "dist-electron"), // Directorio de salida para la construcción de Electron
  rollupOptions: {
    external: Object.keys(pkg.dependencies || {}), // Excluir dependencias del paquete
  },
});

/**
 * Función para configurar los plugins para Vite
 * @param isDev - Booleano que indica si el entorno es de desarrollo
 * @returns Array de plugins
 */
function plugins(isDev: boolean) {
  return [
    react(), // Plugin de React para Vite
    electron([
      {
        // Archivo de entrada del proceso principal de la aplicación Electron
        entry: join(root, "electron/main.ts"),
        onstart(options) {
          options.startup(); // Iniciar la aplicación Electron
        },
        vite: {
          build: buildElectron(isDev), // Opciones de construcción para el proceso principal de Electron
        },
      },
      {
        // Script de precarga para Electron
        entry: join(root, "electron/preload.ts"),
        onstart(options) {
          options.reload(); // Recargar el proceso de renderizado al completar la construcción del script de precarga
        },
        vite: {
          build: buildElectron(isDev), // Opciones de construcción para el script de precarga de Electron
        },
      },
    ]),
    renderer(), // Plugin de renderizado para Vite
  ];
}

/**
 * Configuración de Vite
 * @param command - El comando que se está ejecutando (serve o build)
 * @returns Objeto de configuración de Vite
 */
export default ({ command }: ConfigEnv): UserConfig => {
  // Configuración para desarrollo
  if (command === "serve") {
    return {
      root: srcRoot, // Directorio raíz para Vite
      base: "/", // URL base para el servidor de desarrollo
      plugins: plugins(true), // Plugins para desarrollo
      resolve: {
        alias: {
          "/@": resolve(__dirname, "src"), // Alias para el directorio src
        },
      },
      build: {
        outDir: join(root, "dist-vite"), // Directorio de salida para la construcción de Vite
        emptyOutDir: true, // Limpiar el directorio de salida antes de construir
        rollupOptions: {},
      },
      server: {
        port: process.env.PORT === undefined ? 3000 : +process.env.PORT, // Puerto para el servidor de desarrollo
      },
      publicDir: "public", // Asegurar que la carpeta public sea servida correctamente
      optimizeDeps: {
        exclude: ["path"], // Excluir el módulo 'path' de la optimización de dependencias
      },
    };
  }

  // Configuración para producción
  return {
    root: srcRoot, // Directorio raíz para Vite
    base: "./", // URL base para la construcción de producción
    plugins: plugins(false), // Plugins para producción
    resolve: {
      alias: {
        "/@": resolve(__dirname, "src"), // Alias para el directorio src
      },
    },
    build: {
      outDir: join(root, "dist-vite"), // Directorio de salida para la construcción de Vite
      emptyOutDir: true, // Limpiar el directorio de salida antes de construir
      rollupOptions: {},
    },
    server: {
      port: process.env.PORT === undefined ? 3000 : +process.env.PORT, // Puerto para el servidor (si es necesario en producción)
    },
    publicDir: "public", // Asegurar que la carpeta public sea servida correctamente
    optimizeDeps: {
      exclude: ["path"], // Excluir el módulo 'path' de la optimización de dependencias
    },
  };
};
