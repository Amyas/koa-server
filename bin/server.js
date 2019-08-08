'use strict';

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const json = require('koa-json');

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
      console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
    })
    .use(middleware())
    .use(ApiRoutes.routes())
    .use(ApiRoutes.allowedMethods());
} catch (e) {
  console.log('start server failed => ', e);
}

app.listen(config.port, () => {
  console.log(`Server started on ${config.port}`);
});

app.on('error', function(err) {
  console.error(err);
});

exports = module.exports = app;
