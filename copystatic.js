var copyfiles = require('copyfiles');

copyfiles([
  './client/index.html',
  './build'
], true, function () {
  console.log('index copied');
});

copyfiles([
  './client/statics/test.js',
  './build/statics/'
], true, function () {
  console.log('test copied');
});

copyfiles([
  './client/img/*',
  './build/img'
], true, function () {
  console.log('img copied');
});
