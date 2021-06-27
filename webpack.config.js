/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env) => {
  const isDev = !env.production;

  return {
    entry: path.resolve(__dirname, "./src/index.tsx"),
    mode: isDev ? "development" : "production",
    module: {
      rules: [
        {
          enforce: "pre",
          test: /\.tsx?$/,
          exclude: /node_modules/,
          loader: "eslint-loader",
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ["babel-loader"],
        },
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: ["ts-loader"],
        },
        {
          test: /\.css$/i,
          exclude: /node_modules/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            {
              loader: "css-loader",
              options: {
                modules: {
                  auto: true,
                  localIdentName: isDev
                    ? "[local]_[hash:base64:6]"
                    : "[hash:base64:6]",
                },
              },
            },
          ],
        },
        {
          test: /\.(png|svg|ttf|eot|woff|otf)$/,
          use: ["file-loader"],
        },
      ],
    },
    resolve: {
      alias: {
        "~": path.resolve(__dirname, "src"),
      },
      extensions: ["*", ".js", ".jsx", ".ts", ".tsx", "json"],
    },
    output: {
      path: path.resolve(__dirname, "./dist"),
      filename: "bundle.js",
      chunkFilename: "js/[name].[contenthash:8].js",
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css",
      }),
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
        template: path.join(__dirname, "public", "index.html"),
      }),
    ],
    devServer: {
      contentBase: path.join(__dirname, "./dist"),
      compress: true,
      port: 3000,
      hot: true,
    },
  };
};
