'use strict';

exports.index = async ctx => {
  const res = await ctx.service.home.index();
  ctx.body = ctx.helper.success(res);
};

exports.test = async ctx => {
  if (!ctx.session.username) {
    ctx.body = ctx.helper.fail('请登录');
    return;
  }
  const session = await ctx.redis.get(`mall:${ctx.sessionId}`);
  ctx.body = ctx.helper.success(session);
};

exports.login = async ctx => {
  ctx.session.username = 'amyas';
  ctx.body = ctx.helper.success('登录成功');
};
