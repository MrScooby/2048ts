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
    extensions: ['.js', '.ts', '.tsx']
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist'
  },
  entry: {
    main: APP_DIR + 'main.tsx'
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
  resolve: {
    extensions: ['.js', '.ts', '.tsx']
  },
  entry: {
    main: APP_DIR + 'main.tsx'
  },
  output: {
    path: path.resolve(BUILD_DIR),
    filename: '[name].[hash:6].boundle.js'
  },
  module: modules('[hash:6].'),
  plugins: plugins('[hash:6].'),
  externals: {
    "react": "React",
    "react-dom": "ReactDOM"
  }
}

function modules(hash) {
  return {
    rules: [
      {
        test: /\.(css|scss)$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ],
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'ts-loader'
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        loader: 'file-loader',
        options: {
          name: 'media/[name].' + hash + '[ext]'
        }
      }
    ]
  };
}

function plugins(hash) {
  return [
    new MiniCssExtractPlugin({
      filename: '[name].' + hash + 'boundle.css'
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: APP_DIR + 'indexTemplate.html',
      filename: 'index.html'
    }),
    new CleanWebpackPlugin('dist/*', {
    })
  ];
}