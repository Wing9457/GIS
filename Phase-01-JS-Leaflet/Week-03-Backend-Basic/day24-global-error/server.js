const express = require('express');
const cors = require('cors');
const db = require('./db');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('./'));

// 统一成功返回
function success(res, data = [], msg = '请求成功') {
  res.json({ code: 200, msg, data });
}

// 统一失败返回
function fail(res, msg = '操作失败', code = 500) {
  res.json({ code, msg });
}

// 测试接口
app.get('/api/test', (req, res) => {
  success(res, [], 'day24 全局异常处理服务正常');
});

// 查询点位
app.get('/api/markers', (req, res) => {
  db.query('SELECT * FROM markers ORDER BY id DESC', (err, data) => {
    if (err) return fail(res, '查询失败');
    success(res, data);
  });
});

// 新增点位
app.post('/api/markers', (req, res) => {
  const { name, lat, lng } = req.body;
  if (!name || !lat || !lng) return fail(res, '参数不能为空', 400);
  if (name.length > 20) return fail(res, '名称过长', 400);

  db.query('INSERT INTO markers (name,lat,lng) VALUES (?,?,?)', [name, lat, lng], (err) => {
    if (err) return fail(res, '新增失败');
    success(res, [], '新增成功');
  });
});

// 修改
app.put('/api/markers/:id', (req, res) => {
  const { name } = req.body;
  if (!name || name.length > 20) return fail(res, '名称格式错误', 400);
  db.query('UPDATE markers SET name=? WHERE id=?', [name, req.params.id], (err) => {
    if (err) return fail(res, '修改失败');
    success(res, [], '修改成功');
  });
});

// 删除
app.delete('/api/markers/:id', (req, res) => {
  db.query('DELETE FROM markers WHERE id=?', [req.params.id], (err) => {
    if (err) return fail(res, '删除失败');
    success(res, [], '删除成功');
  });
});

// 全局错误处理中间件
app.use((err, req, res, next) => {
  console.error('服务器异常：', err);
  fail(res, '服务器内部错误');
});

// 404
app.use((req, res) => {
  fail(res, '接口不存在', 404);
});

app.listen(port, () => {
  console.log(`✅ day24 服务已启动：http://localhost:${port}`);
});