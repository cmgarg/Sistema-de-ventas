const path = require("path");

module.exports = {
  entry: "./electron/preload.ts",
  target: "electron-preload",
  output: {
    path: path.resolve(__dirname, "dist-electron"),
    filename: "preload.js",
  },
  module: {
    rules: [
      {
        test: /\.ts$/, // Manejar archivos TypeScript
        exclude: /node_modules/,
        use: {
          loader: "ts-loader", // Usar ts-loader para compilar TypeScript
        },
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"], // Resolver archivos con extensiones .ts y .js
  },
  node: {
    __dirname: false,
    __filename: false,
  },
  externals: {
    path: "commonjs path",
    electron: "commonjs electron",
  },
};
