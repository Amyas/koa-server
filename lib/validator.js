'use strict';

const Parameter = require('parameter');

module.exports = app => {
  const validator = new Parameter();
  app.context.validate = (rules, data) => {
    const errors = validator.validate(rules, data);
    if (errors) {
      throw new Error(`${errors.map(v => {
        return Object.keys(v).map(j => {
          return `${j}:${v[j]}`;
        });
      })}`);
    }
  };
};
