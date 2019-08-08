'use strict';

module.exports = () => async (ctx, next) => {
  try {
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
