'use strict';

const mongoose = require('mongoose');
const mall = require('../lib/mongoose').mall;

const GoodsClassSchema = new mongoose.Schema({
  // 分类名称
  name: {
    type: String,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  createTime: {
    type: Number,
    default: Date.now,
  },
  updateTime: {
    type: Number,
    default: Date.now,
  },
});

const updateHook = function() {
  if (this.options.overwrite) {
    this._update.updateTime = Date.now();
  } else {
    this._update.$set = this._update.$set || {};
    this._update.$set.updateTime = Date.now();
  }
};

GoodsClassSchema.pre('findOneAndUpdate', updateHook);
GoodsClassSchema.pre('update', updateHook);

module.exports = mall.model('GoodsClass', GoodsClassSchema);
