'use strict';

// 我邀请的人
exports.invitation = async ctx => {
  const invitationCode = ctx.session.user._id;
  const user = await ctx.model.user.find({
    invitationCode,
  });
  ctx.body = ctx.helper.success(user);
};

// 注册;
exports.register = async ctx => {
  const data = ctx.request.body;

  const rules = {
    name: 'string',
    phone: 'string',
    password: 'string',
    invitationCode: 'string',
  };
  ctx.validate(rules, data);

  const test = await ctx.model.user.findOne({
    phone: data.phone,
    isDeleted: false,
  });

  if (test) {
    ctx.body = ctx.helper.fail('用户已存在');
    return;
  }

  const user = new ctx.model.user(data);
  await user.save();
  ctx.session.user = user;

  ctx.body = ctx.helper.success('创建成功');
};

/**
 * @api {POST} /api/user 创建用户
 * @apiGroup user
 * @apiVersion  1.0.0
 * @apiParam  {String} username 账号
 * @apiParam  {String} password 密码
 * @apiParam  {String} name 名字
 */

exports.create = async ctx => {
  const { user: sessionUser } = ctx.session;
  if (sessionUser.username !== 'wangjianpeng') {
    ctx.body = ctx.helper.fail('你不是超级管理员，不能创建用户');
    return;
  }

  const data = ctx.request.body;

  const rules = {
    username: 'string',
    password: 'string',
    name: 'string',
  };
  ctx.validate(rules, data);

  const {
    username,
    password,
    name,
  } = data;

  await ctx.model.user.findOneAndUpdate({
    username,
    password,
    name,
    isDeleted: true,
  }, {
    username,
    password,
    name,
    isDeleted: false,
    createTime: Date.now(),
  }, { upsert: true });

  ctx.body = ctx.helper.success('创建成功');
};

/**
 * @api {DELETE} /api/user/:id 删除用户
 * @apiGroup user
 * @apiVersion  1.0.0
 */

exports.delete = async ctx => {
  const { user: sessionUser } = ctx.session;
  if (sessionUser.username !== 'wangjianpeng') {
    ctx.body = ctx.helper.fail('你不是超级管理员');
    return;
  }
  if (sessionUser._id === ctx.params.id) {
    ctx.body = ctx.helper.fail('你不能删除你自己o(╯□╰)o');
    return;
  }

  const user = await ctx.model.user.findOneAndUpdate({
    _id: ctx.params.id,
    isDeleted: false,
  }, { $set: { isDeleted: true } });

  if (!user) {
    ctx.body = ctx.helper.fail('用户不存在');
    return;
  }

  ctx.body = ctx.helper.success('删除成功');

};

/**
 * @api {PUT} /api/user/:id 更新用户
 * @apiGroup user
 * @apiVersion  1.0.0
 * @apiParam  {String} [password] 密码
 * @apiParam  {String} [name] 名字
 */

exports.update = async ctx => {
  const { user: sessionUser } = ctx.session;
  if (sessionUser.username !== 'wangjianpeng') {
    ctx.body = ctx.helper.fail('你不是超级管理员');
    return;
  }

  const filter = [ 'password', 'name' ];
  const data = await ctx.helper.filterParams(ctx.request.body, filter);

  const user = await ctx.model.user.findByIdAndUpdate(ctx.params.id, { $set: data });
  if (!user) {
    ctx.body = ctx.helper.fail('用户不存在');
    return;
  }

  ctx.body = ctx.helper.success('更新成功');
};

/**
 * @api {GET} /api/user 用户列表
 * @apiGroup user
 * @apiVersion  1.0.0
 * @apiParam  {String} [pageNumber=1] 当前页数
 * @apiParam  {String} [pageSize=20] 每页显示的个数
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
    ctx.model.user.find(filter, { password: 0 })
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .sort({ [sortBy]: orderBy }),
    ctx.model.user.count(filter),
  ]);

  ctx.body = ctx.helper.success({
    items,
    total,
  });
};

/**
 * @api {POST} /api/login 登录
 * @apiGroup user
 * @apiVersion  1.0.0
 * @apiParam  {String} username 账号
 * @apiParam  {String} password 密码
 */

exports.login = async ctx => {
  const data = ctx.request.body;

  const rules = {
    password: 'string',
  };
  ctx.validate(rules, data);

  const user = await ctx.model.user.findOne(data, { password: 0 });
  if (!user) {
    ctx.body = ctx.helper.fail('账号密码错误');
    return;
  }
  if (user.isDeleted) {
    ctx.body = ctx.helper.fail('用户不存在');
    return;
  }

  ctx.session.user = user;
  ctx.body = ctx.helper.success(user);
};

/**
 * @api {GET} /api/getUserInfo 获取用户信息
 * @apiGroup user
 * @apiVersion  1.0.0
 */

exports.getUserInfo = async ctx => {
  ctx.body = ctx.helper.success(ctx.session.user);
};
