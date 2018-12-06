const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const APP_DIR = __dirname + '/src/';
const BUILD_DIR = __dirname + '/dist/';

module.exports = (env, arg) => {

    if (arg.mode === 'development') {
      return devConfig;
    } else if (arg.mode === 'production') {
      return prodConfig;
    }

  };

  let devConfig = {
    mode: 'development',
    resolve: {
        extensions: ['.ts', '.css']
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist'
    },
    entry: {
      main: APP_DIR + 'main.ts'
    },
    output: {
      path: path.resolve(BUILD_DIR),
      filename: '[name].boundle.js'
    },
    module: modules(''),
    plugins: plugins(''),
  }

  let prodConfig = {
    mode: 'production',
    entry: {
      main: APP_DIR + 'main.js'
    },
    output: {
      path: path.resolve(BUILD_DIR) + '',
      filename: '[name].[hash:6].boundle.js'
    },
    module: modules('[hash:6].'),
    plugins: plugins('[hash:6].'),
  }

function modules() {
  return {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ],
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'ts-loader'
      },
    ]
  };
}

function plugins(hash) {
  return [
    new MiniCssExtractPlugin({
      filename: 'css/[name].' + hash + 'boundle.css'
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: APP_DIR + 'indexTemplate.html',
      filename: 'index.' + hash +'html'
    }),
    new CleanWebpackPlugin('dist/*', {
    })
  ];
}