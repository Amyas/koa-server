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
  const data = ctx.request.body;

  const rules = {
    username: 'string',
    password: 'string',
    name: 'string',
  };
  ctx.validate(rules, data);

  const user = new ctx.model.user(data, { password: 0 });
  await user.save();

  ctx.body = ctx.helper.success(user);
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

  ctx.session.user = user;

  delete user.password;
  ctx.body = ctx.helper.success(user);
};
