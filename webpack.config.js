'use strict';

const path = require('path');
const args = require('minimist')(process.argv.slice(2));

//开发环境变量, test预留未来使用
const allowedEnvs = ['dev', 'dist', 'test'];

// 获取环境
let env;
if (args._.length > 0 && args._.indexOf('start') !== -1) {
  env = 'test';
} else if (args.env) {
  env = args.env;
} else {
  env = 'dev';
}
process.env.REACT_WEBPACK_ENV = env;

/**
 * 生成 webpack 配置
 * @param  {String} wantedEnv The wanted environment
 * @return {Object} Webpack config
 */
function buildConfig(wantedEnv) {
  let isValid = wantedEnv && wantedEnv.length > 0 && allowedEnvs.indexOf(wantedEnv) !== -1;
  let validEnv = isValid ? wantedEnv : 'dev';
  let config = require(path.join(__dirname, 'webpack/' + validEnv));
  return config;
}

module.exports = buildConfig(env);

