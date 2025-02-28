const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map", // Improves debugging
  devServer: {
    static: "./dist",
    hot: true, // Enables Hot Module Replacement (HMR)
    open: true, // Auto-opens browser
    port: 3000, // Runs on localhost:3000
    watchFiles: ["src/template.html"], // 👈 Watches index.html for changes
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"], // Inject styles into DOM
      },
    ],
  },
});