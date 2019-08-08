'use strict';

const session = require('koa-generic-session');
const redisStore = require('koa-redis');
const config = require('../config');

const store = new redisStore({
  all: `${config.redis.host}:${config.redis.port}`,
});

exports.session = () => session({
  prefix: 'mall:',
  // 配置cookie
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  },
  // 配置redis
  store,
});

exports.redis = store.client;
