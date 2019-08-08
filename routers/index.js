'use strict';

const KoaRouter = require('koa-router');
const $ = require('../controllers');

const router = new KoaRouter({
  prefix: '/api',
});

router
  .get('/home', $.home.index)
  .get('/test', $.home.test)
  .get('/login', $.home.login);

exports = module.exports = router;
