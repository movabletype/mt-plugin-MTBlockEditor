/* eslint-env node */
const path = require("path");

const config = {
  plugins: [],
  mode: "development",
  entry: {
    "block.min": ["./mt-static/plugins/MTBlockEditor/src/block.ts"],
    "loader_content_data.min": ["./mt-static/plugins/MTBlockEditor/src/loader_content_data.ts"],
    "loader_entry.min": ["./mt-static/plugins/MTBlockEditor/src/loader_entry.ts"],
    "config.min": ["./mt-static/plugins/MTBlockEditor/src/config.ts"],
    "edit.min": ["./mt-static/plugins/MTBlockEditor/src/edit.ts"],
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    modules: ["node_modules", "mt-static/plugins/MTBlockEditor/src"],
  },
  externals: {
    jquery: "jQuery",
  },
  output: {
    path: path.resolve(__dirname, "mt-static/plugins/MTBlockEditor/dist"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      { test: /\.svg$/, use: "svg-url-loader" },
    ],
  },
  watchOptions: {
    ignored: ["node_modules/**"],
  },
};

if (process.env.NODE_ENV === "development") {
  config.devtool = "inline-source-map";
}

module.exports = config;
