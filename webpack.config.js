const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.tsx",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/", // Ścieżka root dla zasobów
  },
  devServer: {
    historyApiFallback: {
      rewrites: [{ from: /^\/user-details/, to: "src/public/index.html" }],
    },
    static: path.join(__dirname, "./dist"),
    port: 8080,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/public/index.html",
      favicon: "src/assets/favicon.svg",
    }),
    new CopyPlugin({
      patterns: [{ from: "./src/assets", to: "assets" }],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    extensions: [".js", ".ts", ".jsx", ".tsx", ".scss"],
  },
  module: {
    rules: [
      {
        test: /\.js$|jsx/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              ["@babel/preset-env", { targets: "defaults" }],
              ["@babel/preset-react", { runtime: "automatic" }],
            ],
          },
        },
      },
      {
        test: /\.(scss|css)$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: "ts-loader",
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: "asset/resource", // Nowoczesne podejście
        generator: {
          filename: "assets/[name][ext]",
          publicPath: "/", // Poprawne ścieżki
        },
      },
    ],
  },
};
