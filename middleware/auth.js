'use strict';

module.exports = () => async (ctx, next) => {
  try {
    if (ctx.request.url === '/api/login') {
      await next();
      return;
    }
    if (!ctx.session.user) {
      ctx.status = 401;
      ctx.body = {
        status: {
          errCode: 1,
          errMsg: '请先登录',
        },
      };
      return;
    }
    await next();
  } catch (err) {
    console.error('-------> ERROR : ', err);
    ctx.status = err.status || 500;
    ctx.body = {
      status: {
        errCode: 1,
        errMsg: err.message || '未知错误',
      },
    };
  }
};
