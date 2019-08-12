'use strict';

const compose = require('koa-compose');
const errHandler = require('./errHandler');
const auth = require('./auth');

module.exports = function() {
  return compose(
    [
      auth(),
      errHandler(),
    ]
  );
};
