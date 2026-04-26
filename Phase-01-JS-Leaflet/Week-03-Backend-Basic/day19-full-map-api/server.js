const express = require('express');
const cors = require('cors');
const db = require('./db');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// 测试接口
app.get('/api/test', (req, res) => {
  res.json({ status: 'ok', msg: 'day19 全栈地图服务运行中' });
});

// 查询所有点位
app.get('/api/markers', (req, res) => {
  const sql = 'SELECT * FROM markers';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: '查询失败' });
    res.json({ data: results });
  });
});

// 添加点位
app.post('/api/markers', (req, res) => {
  const { name, lat, lng } = req.body;
  const sql = 'INSERT INTO markers (name, lat, lng) VALUES (?, ?, ?)';
  db.query(sql, [name, lat, lng], (err, result) => {
    if (err) return res.status(500).json({ error: '添加失败' });
    res.json({ status: 'ok', id: result.insertId });
  });
});

// 静态文件托管（直接访问地图页面）
app.use(express.static('.'));

app.listen(port, () => {
  console.log(`✅ 服务已启动：http://localhost:${port}`);
});