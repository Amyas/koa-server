define({ "api": [  {    "type": "DELETE",    "url": "/api/user/:id",    "title": "删除用户",    "group": "user",    "version": "1.0.0",    "filename": "controllers/user.js",    "groupTitle": "user",    "name": "DeleteApiUserId"  },  {    "type": "GET",    "url": "/api/user",    "title": "用户列表",    "group": "user",    "version": "1.0.0",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": true,            "field": "pageNumber",            "defaultValue": "1",            "description": "<p>当前页数</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": true,            "field": "pageSize",            "defaultValue": "20",            "description": "<p>每页显示的个数</p>"          }        ]      }    },    "filename": "controllers/user.js",    "groupTitle": "user",    "name": "GetApiUser"  },  {    "type": "POST",    "url": "/api/login",    "title": "登录",    "group": "user",    "version": "1.0.0",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "username",            "description": "<p>账号</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "password",            "description": "<p>密码</p>"          }        ]      }    },    "filename": "controllers/user.js",    "groupTitle": "user",    "name": "PostApiLogin"  },  {    "type": "POST",    "url": "/api/user",    "title": "创建用户",    "group": "user",    "version": "1.0.0",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "username",            "description": "<p>账号</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "password",            "description": "<p>密码</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "name",            "description": "<p>名字</p>"          }        ]      }    },    "filename": "controllers/user.js",    "groupTitle": "user",    "name": "PostApiUser"  },  {    "type": "PUT",    "url": "/api/user",    "title": "更新用户",    "group": "user",    "version": "1.0.0",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": true,            "field": "password",            "description": "<p>密码</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": true,            "field": "name",            "description": "<p>名字</p>"          }        ]      }    },    "filename": "controllers/user.js",    "groupTitle": "user",    "name": "PutApiUser"  }] });
