'use strict';

const fs = require('fs');
const path = require('path');
const config = require('../config');

exports.index = async ctx => {
  const res = await ctx.service.home.index();
  ctx.body = ctx.helper.success(res);
};

/**
 * @api {GET} /api/files 文件列表
 * @apiGroup file
 * @apiVersion  1.0.0
 * @apiParam  {String} [type=file] 文件类型 可选：`image`，`audio`，`video`
 * @apiParam  {String} [limit=1000] 每页显示个数
 * @apiParam  {String} [marker] 上一次列表返回的位置标记，作为本次列举的起点
 */

exports.getFileList = async ctx => {
  const {
    type = 'file',
    limit = 1000,
    marker,
  } = ctx.query;

  const bucketManager = await ctx.service.utils.createBucketManager();

  const options = {
    limit,
  };
  if (marker) {
    options.marker = marker;
  }

  const data = await bucketManager.listPrefixAsync(type, options);
  data.items.forEach(v => {
    v.url = `http://${config.qiniu[type].domain}/${v.key}`;
  });

  ctx.body = ctx.helper.success(data);

};

/**
 * @api {POST} /api/uploadfile 上传单个文件
 * @apiGroup file
 * @apiVersion  1.0.0
 */

exports.uploadfile = async ctx => {
  // 获取上传文件
  const file = ctx.request.files.file;
  // 创建可读流
  const reader = fs.createReadStream(file.path);

  // 处理文件名：时间戳-随机数.后缀
  const random = Math.ceil(Math.random() * 1000000);
  const extension = path.extname(file.name);
  const fileName = `${Date.now()}-${random}${extension}`;

  // 处理文件类型;
  const FILE_ENUM = [ 'image', 'audio', 'video' ];
  const fileType = FILE_ENUM.find(v => file.type.indexOf(v) !== -1) || 'file';

  // 创建七牛token
  const token = await ctx.service.utils.createQiniuToken(fileName, fileType);

  // 上传文件
  const data = await ctx.service.utils.uploadFile(token, fileName, reader);

  // 获取URL
  const url = await ctx.service.utils.getUrl(data.key, fileType);

  ctx.body = {
    url,
  };
};
