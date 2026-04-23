// day18 地图数据接口 + MySQL
const express = require('express');
const cors = require('cors');
const db = require('./db');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// 测试接口
app.get('/api/test', (req, res) => {
  res.json({
    status: 'ok',
    msg: 'day18 MySQL 接口服务已启动',
    day: 18
  });
});

// 获取所有地图点位（预留）
app.get('/api/markers', (req, res) => {
  const sql = 'SELECT * FROM markers';
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: '查询失败' });
    }
    res.json({ data: results });
  });
});

// 添加点位（预留）
app.post('/api/markers', (req, res) => {
  const { name, lat, lng } = req.body;
  const sql = 'INSERT INTO markers (name, lat, lng) VALUES (?, ?, ?)';
  db.query(sql, [name, lat, lng], (err, result) => {
    if (err) {
      return res.status(500).json({ error: '添加失败' });
    }
    res.json({ msg: '添加成功', id: result.insertId });
  });
});

app.listen(port, () => {
  console.log(`服务运行：http://localhost:${port}`);
});