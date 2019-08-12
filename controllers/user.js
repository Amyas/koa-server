'use strict';

/**
 * @api {POST} /api/user 创建用户
 * @apiName 创建用户
 * @apiGroup user
 * @apiVersion  1.0.0
 * @apiParam  {String} username 账号
 * @apiParam  {String} password 密码
 * @apiParam  {String} name 账号
 */

exports.create = async ctx => {
  const { user: sessionUser } = ctx.session;
  if (sessionUser.username !== 'wangjianpeng') {
    ctx.body = ctx.helper.fail('你不是超级管理员，不能创建用户');
    return;
  }

  const data = ctx.request.body;

  const rules = {
    username: 'string',
    password: 'string',
    name: 'string',
  };
  ctx.validate(rules, data);

  const {
    username,
    password,
    name,
  } = data;

  const user = await ctx.model.user.findOneAndUpdate({
    username,
    password,
    name,
    isActive: false,
  }, {
    username,
    password,
    name,
    isActive: true,
    createTime: Date.now(),
  }, { upsert: true, new: true });

  ctx.body = ctx.helper.success(user);
};

/**
 * @api {DELETE} /api/user/:id 删除用户
 * @apiName 删除用户
 * @apiGroup user
 * @apiVersion  1.0.0
 */

exports.delete = async ctx => {
  const { user: sessionUser } = ctx.session;
  if (sessionUser.username !== 'wangjianpeng') {
    ctx.body = ctx.helper.fail('你不是超级管理员');
    return;
  }
  if (sessionUser._id === ctx.params.id) {
    ctx.body = ctx.helper.fail('你不能删除你自己o(╯□╰)o');
    return;
  }

  const user = await ctx.model.user.findOneAndUpdate({
    _id: ctx.params.id,
    isActive: true,
  }, { $set: { isActive: false } });

  if (!user) {
    ctx.body = ctx.helper.fail('用户不存在');
    return;
  }
  ctx.body = ctx.helper.success('删除用户成功');

};

/**
 * @api {POST} /api/login 登录
 * @apiName 登录
 * @apiGroup user
 * @apiVersion  1.0.0
 * @apiParam  {String} username 账号
 * @apiParam  {String} password 密码
 */

exports.login = async ctx => {
  const data = ctx.request.body;

  const rules = {
    username: 'string',
    password: 'string',
  };
  ctx.validate(rules, data);

  const user = await ctx.model.user.findOne(data);

  if (!user) {
    ctx.body = ctx.helper.fail('用户不存在');
    return;
  }
  if (!user.isActive) {
    ctx.body = ctx.helper.fail('用户已被删除');
    return;
  }

  ctx.session.user = user;

  delete user.password;
  ctx.body = ctx.helper.success(user);
};
