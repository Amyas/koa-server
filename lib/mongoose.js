'use strict';
const mongoose = require('mongoose');
const config = require('../config');
const Promise = require('bluebird');
const logger = require('./logger').logger('mongoose');
mongoose.Promise = Promise;

const dbs = {};

const mongodbConfig = config.mongodb;
for (const clientName in mongodbConfig) {
  const { host = 'localhost', dbName, userName, password, authSource, replicaSet } = mongodbConfig[clientName];
  let connectionStr = 'mongodb://';
  if (userName && password) {
    connectionStr += `${userName}:${password}@`;
  }
  if (replicaSet) {
    connectionStr += `${host}/${dbName}?replicaSet=${replicaSet}`;
  } else {
    connectionStr += `${host}/${dbName}?`;
  }
  if (authSource) {
    connectionStr += `&authSource=${authSource}`;
  }
  logger.info(`🍺 DB ${clientName} connected !`);

  const db = mongoose.createConnection(connectionStr, { poolSize: 10, useNewUrlParser: true, useFindAndModify: false });
  dbs[clientName] = db;

  db
    .on('error', error => logger.error(error))
    .on('close', () => logger.info('Database connection closed.'))
    .once('open', function() {
      logger.info(`🍺 DB ${clientName} opened !`);
    });
}

module.exports = dbs;
