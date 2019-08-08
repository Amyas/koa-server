'use strict';

const common = require('./common');

const env = process.env.NODE_ENV || 'development';
const config = require(`./${env}`);

const result = Object.assign({}, common, config);

exports = module.exports = result;
