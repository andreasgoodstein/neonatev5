const path = require("path");

const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: path.resolve(__dirname, "src", "index.js"),
  output: {
    filename: "neonatev5.[hash].js",
    path: path.resolve(__dirname, "docs")
  },
  devtool: "source-map",
  resolve: {
    extensions: [".js", ".jsx", ".less"],
    modules: [
      path.resolve(__dirname, "src"),
      path.resolve(__dirname),
      "node_modules"
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "docs"),
    compress: true,
    port: 80
  },
  module: {
    rules: [
      {
        test: /\.m?jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"]
          }
        }
      },
      {
        test: /\.(css|less)$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: "less-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|)$/,
        use: {
          loader: "url-loader"
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(path.resolve(__dirname, "docs/**/*")),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src", "html", "index.template.html")
    }),
    new CopyWebpackPlugin([
      {
        from: "./src/html/favicon.ico"
      },
      {
        from: "./src/progressive/service-worker.js"
      },
      {
        from: "./src/progressive/manifest.webmanifest"
      },
      {
        from: "./assets",
        to: "assets"
      }
    ])
  ]
};
