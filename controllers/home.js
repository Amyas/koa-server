'use strict';

exports.index = async ctx => {
  const res = await ctx.service.home.index();
  ctx.body = ctx.helper.success(res);
};
