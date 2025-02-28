const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js", // Entry point
  output: {
    filename: "[name].[contenthash].js", // Cache-busting for production
    path: path.resolve(__dirname, "dist"),
    clean: true, // Cleans dist folder before each build
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Transpile JS
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"], // Converts ES6+ to ES5
          },
        },
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/, // Load images
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/, // Load fonts
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/template.html", // Uses custom HTML template
    }),
  ],
};