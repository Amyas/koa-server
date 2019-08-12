'use strict';

/**
 * @api {POST} /api/goods-class 创建商品分类
 * @apiGroup goodsClass
 * @apiVersion  1.0.0
 * @apiParam  {String} name 分类名称
 */

exports.create = async ctx => {
  const data = ctx.request.body;

  const rules = {
    name: 'string',
  };

  ctx.validate(rules, data);

  const test = await ctx.model.goodsClass.findOne({
    name: data.name,
    isDeleted: false,
  });

  if (test) {
    ctx.body = ctx.helper.fail('商品分类已存在');
    return;
  }

  const goodsClass = new ctx.model.goodsClass(data);
  await goodsClass.save();

  ctx.body = ctx.helper.success(goodsClass);
};

/**
 * @api {DELETE} /api/goods-class/:id 删除商品分类
 * @apiGroup goodsClass
 * @apiVersion  1.0.0
 */

exports.delete = async ctx => {
  const goodsClass = await ctx.model.goodsClass.findOneAndUpdate({
    _id: ctx.params.id,
    isDeleted: false,
  }, { $set: { isDeleted: true } });
  if (!goodsClass) {
    ctx.body = ctx.helper.fail('商品分类不存在');
    return;
  }

  ctx.body = ctx.helper.success('删除成功');
};

/**
 * @api {PUT} /api/goods-class/:id 更新商品分类
 * @apiGroup goodsClass
 * @apiVersion  1.0.0
 * @apiParam  {String} name 名称
 */

exports.update = async ctx => {
  const filter = [ 'name' ];
  const data = await ctx.helper.filterParams(ctx.request.body, filter);

  const goodsClass = await ctx.model.goodsClass.findOneAndUpdate({
    _id: ctx.params.id,
    isDeleted: false,
  }, { $set: data }, { new: true });
  if (!goodsClass) {
    ctx.body = ctx.helper.fail('商品分类不存在');
    return;
  }

  ctx.body = ctx.helper.success(goodsClass);
};

/**
 * @api {GET} /api/goods-class 商品分类列表
 * @apiGroup goodsClass
 * @apiVersion  1.0.0
 * @apiParam  {String} [pageNumber=1] 当前页数
 * @apiParam  {String} [pageSize=20] 每页显示的个数
 * @apiParam  {String} [name=男装] 模糊查询名称
 */

exports.index = async ctx => {
  const {
    pageNumber,
    pageSize,
    sortBy,
    orderBy,
    filter,
  } = await ctx.helper.handleQuery(ctx.query);

  // 模糊查询名称
  if (filter.name) {
    filter.name = new RegExp(filter.name, 'i');
  }

  const [ items, total ] = await Promise.all([
    ctx.model.goodsClass.find(filter)
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .sort({ [sortBy]: orderBy }),
    ctx.model.goodsClass.count(filter),
  ]);

  ctx.body = ctx.helper.success({
    items,
    total,
  });
};
