'use strict';

var path = require('path');
var logMiddleware = require('volleyball');

var rootPath = path.join(__dirname, '../../../');
var indexPath = path.join(rootPath, );

var env = require(path.join(rootPath, './srv/env'));

module.exports = function (app) {
  app.setValue('env', env);
  app.setValue('projectRoot', rootPath);
  app.setValue('indexHTMLPath', indexPath);
  app.setValue('log', logMiddleware);
};
