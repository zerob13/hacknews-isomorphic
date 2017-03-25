'use strict';
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const srcPath = path.join(__dirname, '/../client');
const staticPath = path.join(__dirname, '/../statics/');
let autoprefixer = require('autoprefixer');

const dfltPort = 8888;

function postcssConf() {
  return [autoprefixer({
    browsers: ['last 5 versions', 'IE 8', 'IE 9', '> 1%']
  })]; //可以加autoprefix什么的
}

function getDefaultModules() {
  return {
    rules: [{
      test: /\.(js|jsx)$/,
      include: srcPath,
      enforce: "pre",
      loader: 'eslint-loader'
    }, {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [{
          loader: 'css-loader'
        }, {
          loader: 'postcss-loader',
          options: {
            plugins: function() {
              return postcssConf()
            }
          }
        }]
      })

    }, {
      test: /\.scss/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [{
          loader: 'css-loader'
        }, {
          loader: 'postcss-loader',
          options: {
            plugins: function() {
              return postcssConf()
            }
          }
        }, {
          loader: 'sass-loader'
        }]
      })
    }, {
      test: /\.(png|jpg|gif|woff|woff2)$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 8192
        }
      }]
    }, {
      test: /\.(mp4|ogg|svg)$/,
      use: ['file-loader']
    }]
  };
}
module.exports = {
  srcPath: srcPath,
  publicPath: '/assets/',
  staticPath: staticPath,
  port: dfltPort,
  getDefaultModules: getDefaultModules
};
