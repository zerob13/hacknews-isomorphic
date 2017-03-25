'use strict';
let path = require('path');
let defaultSettings = require('./defaults')

module.exports = {
  devtool: 'eval',
  output: {
    path: path.join(__dirname, '/../build/assets'),
    filename: 'app.js',
    publicPath: defaultSettings.publicPath
  },
  devServer: {
    contentBase: './client',
    historyApiFallback: true,
    hot: true,
    port: defaultSettings.port,
    publicPath: defaultSettings.publicPath,
    proxy: {
      '/api/*': {
        target: 'http://localhost:3002',
        secure: false
      }
    },
    noInfo: false
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      actions: `${defaultSettings.srcPath}/actions/`,
      components: `${defaultSettings.srcPath}/components/`,
      constants: `${defaultSettings.srcPath}/constants/`,
      store: `${defaultSettings.srcPath}/store/`,
      reducers: `${defaultSettings.srcPath}/reducers/`,
      scss: `${defaultSettings.srcPath}/scss/`,
      config: `${defaultSettings.srcPath}/config/` + process.env.REACT_WEBPACK_ENV,
      img: `${defaultSettings.srcPath}/img/`
    }
  },
  module: {},
}
