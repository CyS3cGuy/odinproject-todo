const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = merge(common, {
  mode: "production",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"], // Extract CSS to files
      },
    ],
  },
  optimization: {
    minimize: true, // Enable minification
    minimizer: [
      new TerserPlugin(), // Minify JS
      new CssMinimizerPlugin(), // Minify CSS
    ],
    splitChunks: {
      chunks: "all", // Split vendor files
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css", // Cache busting for styles
    }),
  ],
});