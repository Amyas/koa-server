'use strict';

/**
 * @api {POST} /api/goods 创建商品
 * @apiGroup goods
 * @apiVersion  1.0.0
 * @apiParam  {String} goodsName 商品名称
 * @apiParam  {String} goodsIntro 商品介绍
 * @apiParam  {Url} goodsImgUrl 商品缩略图
 * @apiParam  {String} goodsDesc 商品详情
 * @apiParam  {ArrayUrl} goodsDescImgUrl 商品详情图
 * @apiParam  {Number} goodsPrice 商品价格
 * @apiParam  {ObjectId} _class 商品所属分类
 * @apiParam  {Boolean} [isUpperShelf=true] 是否上架
 */

exports.create = async ctx => {
  const data = ctx.request.body;

  const rules = {
    goodsName: { type: 'string', required: true },
    goodsIntro: { type: 'string', required: true },
    goodsImgUrl: { type: 'url', required: true },
    goodsDesc: { type: 'string', required: true },
    goodsDescImgUrl: { type: 'array', itemType: 'url', required: true },
    goodsPrice: { type: 'int', required: true },
    _class: { type: 'string', required: true },
    isUpperShelf: { type: 'boolean', default: true, required: false },
  };

  ctx.validate(rules, data);

  const test = await ctx.model.goods.findOne({
    goodsName: data.goodsName,
    _class: data._class,
    isDeleted: false,
  });

  if (test) {
    ctx.body = ctx.helper.fail('商品已存在');
    return;
  }

  const goods = new ctx.model.goods(data);
  await goods.save();

  ctx.body = ctx.helper.success('创建成功');
};

/**
 * @api {DELETE} /api/goods/:id 删除商品
 * @apiGroup goods
 * @apiVersion  1.0.0
 */

exports.delete = async ctx => {
  const goods = await ctx.model.goods.findOneAndUpdate({
    _id: ctx.params.id,
    isDeleted: false,
  }, { $set: { isDeleted: true } });
  if (!goods) {
    ctx.body = ctx.helper.fail('商品不存在');
    return;
  }

  ctx.body = ctx.helper.success('删除成功');
};

/**
 * @api {PUT} /api/goods/:id 更新商品
 * @apiGroup goods
 * @apiVersion  1.0.0
 * @apiParam  {ObjectId} _class 商品所属分类
 * @apiParam  {String} [goodsName] 商品名称
 * @apiParam  {String} [goodsIntro] 商品介绍
 * @apiParam  {Url} [goodsImgUrl] 商品缩略图
 * @apiParam  {String} [goodsDesc] 商品详情
 * @apiParam  {ArrayUrl} [goodsDescImgUrl] 商品详情图
 * @apiParam  {Number} [goodsPrice] 商品价格
 * @apiParam  {Boolean} [isUpperShelf] 是否上架
 */

exports.update = async ctx => {
  const filter = [
    'goodsName',
    'goodsIntro',
    'goodsImgUrl',
    'goodsDesc',
    'goodsDescImgUrl',
    'goodsPrice',
    '_class',
    'isUpperShelf',
  ];
  const data = await ctx.helper.filterParams(ctx.request.body, filter);

  if (!data._class) {
    ctx.body = ctx.helper.fail('缺少商品分类');
    return;
  }

  const goods = await ctx.model.goods.findOneAndUpdate({
    _id: ctx.params.id,
    isDeleted: false,
  }, { $set: data }, { new: true });

  if (!goods) {
    ctx.body = ctx.helper.fail('商品不存在');
    return;
  }

  ctx.body = ctx.helper.success('更新成功');
};

/**
 * @api {GET} /api/goods 商品列表
 * @apiGroup goods
 * @apiVersion  1.0.0
 * @apiParam  {String} [pageNumber=1] 当前页数
 * @apiParam  {String} [pageSize=20] 每页显示的个数
 * @apiParam  {ObjectId} [_classs] 按分类查询
 */

exports.index = async ctx => {
  const {
    pageNumber,
    pageSize,
    sortBy,
    orderBy,
    filter,
  } = await ctx.helper.handleQuery(ctx.query);

  const [ items, total ] = await Promise.all([
    ctx.model.goods.find(filter)
      .populate('_class')
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .sort({ [sortBy]: orderBy }),
    ctx.model.goods.count(filter),
  ]);

  ctx.body = ctx.helper.success({
    items,
    total,
  });
};
