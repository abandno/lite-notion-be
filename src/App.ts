import {register} from 'tsconfig-paths';

register();

import {Ret} from "@/objects/Ret";
import {Hocuspocus} from "@hocuspocus/server";
import HocuspocusService from "@/service/HocuspocusService"

const express = require('express');
const ErrorCode = require("./config/ErrorCode");
const documentRoute = require('./routes/DocumentRoute'); // 引入新的路由文件
require('express-async-errors');
const {v4: uuidv4} = require('uuid');
const cors = require('cors');

const app = express();

app.use(cors());
// app.use(cors({
//   origin: 'http://localhost:3000' // 只允许这个源访问
// }));

// 使用 express.json() 中间件
app.use(express.json());
app.use((req, res, next) => {
  const requestId = res.locals.requestId = req.headers['x-fc-request-id'] || uuidv4();
  const originalJson = res.json.bind(res);
  res.json = function (data) {
    if (data && typeof data === 'object') {
      data.requestId = res.locals.requestId;
    }
    return originalJson(data);
  };
  // res.setHeader('X-Fc-Request-Id', requestId);
  // res.setHeader('X-Request-ID', requestId);
  next();
});

app.get("/", async (req, res) => {
  let rand = Math.random();
  if (rand > 0.8) {
    const err = new Error();
    err.name = '无法访问';
    err.message = '对不起, 别来烦我';
    // next(err);
    throw err;
  } else if (rand > 0.5) {
    // @ts-ignore
    function error() {
      let err = new Error('网站维护');
      err.message = "哼哼, 网站维护";
      return Promise.reject(err);
    }

    res.send(await error()).end();
  }

  res.send(Ret.success({
    "pong": "hello world"
  }))
})


//region 配置业务路由分组
app.use('/api/document', documentRoute);
//endregion

// 异常捕获中间件务必放到最后加入
app.use((err, req, res, next) => {
  console.error(err.stack); // 打印错误堆栈到控制台
  res.status(500).send(Ret.fail(null).appendError(err.message));
});
app.use((req, res, next) => {
  const ret = Ret.fail(null, ErrorCode.INVALID_REQUEST).appendError(`未找到资源: ${req.method} ${req.originalUrl}`);
  res.status(404).send(ret);
});

const port = 8080
app.listen(port, () => {
  console.log('start success.');
  console.log("http://localhost:" + port)

  HocuspocusService.listen();
  console.log("HocuspocusService started.");

}).on('error', (e) => {
  console.error(e.code, e.message)
})

