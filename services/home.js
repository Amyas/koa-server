'use strict';

exports.index = async () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('Hello, Welcome to use llk');
    }, 100);
  });
};
