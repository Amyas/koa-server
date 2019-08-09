'use strict';

const KoaRouter = require('koa-router');
const $ = require('../controllers');

const router = new KoaRouter({
  prefix: '/api',
});

router
  .get('/home', $.home.index)
  .get('/test', $.home.test);

router
  .post('/login', $.user.login)
  .post('/user', $.user.create)
  .delete('/user/:id', $.user.delete);

exports = module.exports = router;
