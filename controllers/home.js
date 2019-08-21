'use strict';

const fs = require('fs');
const path = require('path');

exports.index = async ctx => {
  const res = await ctx.service.home.index();
  ctx.body = ctx.helper.success(res);
};

// 上传单个文件
exports.uploadfile = async ctx => {
  // 获取上传文件
  const file = ctx.request.files.file;
  // 创建可读流
  const reader = fs.createReadStream(file.path);
  const filePath = path.join(__dirname, '../public/upload/', `${Date.now()}_${file.name}`);
  // 创建可写流
  const upStream = fs.createWriteStream(filePath);
  // 可读流通过管道写入可写流
  reader.pipe(upStream);

  ctx.body = '上传成功！';
};

// 上传多个文件
exports.uploadfiles = async ctx => {
  // 获取上传文件
  const files = ctx.request.files.file;
  for (const file of files) {
    // 创建可读流
    const reader = fs.createReadStream(file.path);
    // 获取上传文件扩展名
    const filePath = path.join(__dirname, '../public/upload/', `${Date.now()}_${file.name}`);
    // 创建可写流
    const upStream = fs.createWriteStream(filePath);
    // 可读流通过管道写入可写流
    reader.pipe(upStream);
  }

  ctx.body = '上传成功！';
};
