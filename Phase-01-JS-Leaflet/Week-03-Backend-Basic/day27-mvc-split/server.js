const express = require('express');
const cors = require('cors');
const markerRouter = require('./routes/markerRouter');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('./'));

// 请求日志中间件
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// 挂载路由
app.use('/api', markerRouter);

// 404
app.use((req, res) => {
  res.json({ code:404, msg:"接口不存在" });
});

// 全局异常
app.use((err, req, res, next) => {
  console.error('服务器异常：',err);
  res.json({ code:500, msg:"服务器内部错误" });
});

app.listen(port, () => {
  console.log(`✅ day27 分层架构服务启动：http://localhost:${port}`);
});