'use strict';

let path = require('path');
let webpack = require('webpack');
let baseConfig = require('./base');
let defaultSettings = require('./defaults');


//插件
let BowerWebpackPlugin = require('bower-webpack-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');

let config = Object.assign({}, baseConfig, {
  entry: [
    'webpack-dev-server/client?http://127.0.0.1:' + defaultSettings.port,
    'webpack/hot/only-dev-server',
    './client/index'
  ],
  cache: true,
  devtool: 'eval-source-map',
  plugins: [
    new webpack.LoaderOptionsPlugin({
      debug: true
    }),
    new ExtractTextPlugin({
      filename: 'app.css',
      allChunks: true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"dev"',
        IS_BUNDLING_FOR_BROWSER: true
      }
    })
  ],
  module: defaultSettings.getDefaultModules()
});

// loaders
config.module.rules.push({
  test: /\.(js|jsx)$/,
  use: ['react-hot-loader', 'babel-loader'],
  include: [path.join(__dirname, '/../client')],
  exclude: [path.join(__dirname, '/../client/statics')]
});
module.exports = config;
