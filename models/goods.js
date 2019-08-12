'use strict';

const mongoose = require('mongoose');
const mall = require('../lib/mongoose').mall;
const { ObjectId } = mongoose.Schema.Types;

const GoodsSchema = new mongoose.Schema({
  // 商品名称
  goodsName: {
    type: String,
    required: true,
  },
  // 商品介绍
  goodsIntro: {
    type: String,
    required: true,
  },
  // 商品图片
  goodsImgUrl: {
    type: String,
    required: true,
  },
  // 商品详情：
  goodsDesc: {
    type: String,
    required: true,
  },
  // 商品详情图
  goodsDescImgUrl: {
    type: Array,
    required: true,
  },
  // 商品价格
  goodsPrice: {
    type: Number,
    required: true,
  },
  // 商品所属分类
  _class: {
    type: ObjectId,
    ref: 'GoodsClass',
  },
  // 是否已经删除
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

GoodsSchema.pre('findOneAndUpdate', updateHook);
GoodsSchema.pre('update', updateHook);

module.exports = mall.model('Goods', GoodsSchema);
