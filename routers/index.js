'use strict';

const KoaRouter = require('koa-router');
const $ = require('../controllers');

const router = new KoaRouter({
  prefix: '/api',
});

router
  .get('/home', $.home.index)
  .post('/uploadfile', $.home.uploadfile)
  .get('/files', $.home.getFileList);

// 用户
router
  .post('/login', $.user.login)
  .get('/getUserInfo', $.user.getUserInfo)
  .post('/user', $.user.create)
  .delete('/user/:id', $.user.delete)
  .put('/user/:id', $.user.update)
  .get('/user', $.user.index)
  .post('/register', $.user.register)
  .get('/invitation', $.user.invitation);

// 商品分类
router
  .post('/goods-class', $.goodsClass.create)
  .delete('/goods-class/:id', $.goodsClass.delete)
  .put('/goods-class/:id', $.goodsClass.update)
  .get('/goods-class', $.goodsClass.index);

// 商品
router
  .post('/goods', $.goods.create)
  .delete('/goods/:id', $.goods.delete)
  .put('/goods/:id', $.goods.update)
  .get('/goods', $.goods.index);

exports = module.exports = router;
