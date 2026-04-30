const express = require('express');
const cors = require('cors');
const db = require('./db');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// 测试接口
app.get('/api/test', (req, res) => {
  res.json({ status: 'ok', msg: 'day21 GIS全栈最终版' });
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

// 修改点位
app.put('/api/markers/:id', (req, res) => {
  const { name } = req.body;
  const sql = 'UPDATE markers SET name=? WHERE id=?';
  db.query(sql, [name, req.params.id], (err) => {
    if (err) return res.status(500).json({ error: '修改失败' });
    res.json({ status: 'ok' });
  });
});

// 删除点位
app.delete('/api/markers/:id', (req, res) => {
  const sql = 'DELETE FROM markers WHERE id=?';
  db.query(sql, [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: '删除失败' });
    res.json({ status: 'ok' });
  });
});

app.use(express.static('.'));

app.listen(port, () => {
  console.log(`✅ 服务已启动：http://localhost:${port}`);
});