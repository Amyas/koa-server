'use strict';

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const json = require('koa-json');

const logger = require('../lib/logger').logger('server');

const config = require('../config');
const middleware = require('../middleware');

const ApiRoutes = require('../routers');
const Helper = require('../helpers');
const Service = require('../services');

const app = new Koa();

app.use(bodyParser());
app.use(json());

try {
  app
    .use(async (ctx, next) => {
      ctx.helper = Helper;
      ctx.service = Service;
      const start = new Date();
      await next();
      const ms = new Date() - start;
      logger.info(`${ctx.method} ${ctx.url} - ${ms}ms`);
    })
    .use(middleware())
    .use(ApiRoutes.routes())
    .use(ApiRoutes.allowedMethods());
} catch (e) {
  logger.error('start server failed => ', e);
}

app.listen(config.port, () => {
  logger.info(`Server started on ${config.port}`);
});

app.on('error', function(err) {
  logger.error('app on error =>', err);
});

exports = module.exports = app;
