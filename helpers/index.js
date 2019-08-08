'use strict';

exports.success = function(data) {
  return {
    status: {
      errCode: -1,
      message: 'success',
    },
    data,
  };
};

exports.fail = function(message = '未知错误') {
  return {
    status: {
      errCode: 1,
      message,
    },
  };
};
