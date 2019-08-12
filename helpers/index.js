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

exports.filterParams = async (data, filter) => {
  const result = {};
  filter.forEach(v => {
    if (data[v]) {
      result[v] = data[v];
    }
  });
  return result;
};
