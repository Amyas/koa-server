'use strict';

const session = require('koa-generic-session');
const redisStore = require('koa-redis');
const redisConfig = require('../config').redis;

const store = new redisStore(redisConfig);

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
