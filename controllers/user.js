'use strict';

exports.create = async ctx => {
  const data = ctx.request.body;

  const rules = {
    username: 'string',
    password: 'string',
    name: 'string',
  };
  ctx.validate(rules, data);

  const user = new ctx.model.user(data);
  await user.save();

  ctx.body = ctx.helper.success(user);
};

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
