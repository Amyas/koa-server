'use strict';

const mongoose = require('mongoose');
const mall = require('../lib/mongoose').mall;
const { ObjectId } = mongoose.Schema.Types;

const UserSchema = new mongoose.Schema({
  // 手机号，不能出现重复
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  // 密码
  password: {
    type: String,
    required: true,
  },
  // 名字
  name: {
    type: String,
  },
  // 邀请码，邀请人的_id
  invitationCode: {
    type: ObjectId,
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

UserSchema.pre('findOneAndUpdate', updateHook);
UserSchema.pre('update', updateHook);

module.exports = mall.model('User', UserSchema);
