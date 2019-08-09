'use strict';

exports.index = async ctx => {
  const res = await ctx.service.home.index();
  ctx.body = ctx.helper.success(res);
};


/**
 * @api {GET} /api/test 测试session
 * @apiName apiName
 * @apiGroup test
 * @apiVersion  1.0.0
 *
 * @apiParam  {String} test 测试字段
 *
 * @apiParamExample Response-Body:
 * {
 *     session : 123123
 * }
 */

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
