const webpack = require('webpack')
const path = require('path')
const fs = require('fs')
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/main.js",
  mode: 'development',
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, 'dist')   
  },
  plugins: [   

    new CopyWebpackPlugin([{ from: "./src/index.html", to: "index.html"},{ from: "./src/register.html", to: "register.html"},{ from: "./src/item.html", to: "item.html"}])
  ],
  devServer: { contentBase: path.join(__dirname, "dist"), compress: true }
}