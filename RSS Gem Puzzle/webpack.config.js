const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackHarddiskPlugin = require("html-webpack-harddisk-plugin");

module.exports = {
  entry: {
    index: "./src/js/index.js",
  },
  devtool: "inline-source-map",
  devServer: {
    static: "./dist",
    hot: true,
  },
  optimization: {
    runtimeChunk: "single",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.join(__dirname, "dist"),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "RSS Gem Puzzle",
      alwaysWriteToDisk: true,
      template: path.join(__dirname, "src", "index.html"),
      filename: `index.html`,
      chunks: "index.html",
      favicon: "./src/favicon.png",
      clean: true,
    }),
    new HtmlWebpackHarddiskPlugin(),
  ],
  resolve: {
    alias: {
      assets: path.resolve(__dirname, "assets"),
      src: path.resolve(__dirname, "src"),
    },
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ogg|mp3|wav)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(html)$/i,
        use: ["html-loader"],
      },
    ],
  },
};
