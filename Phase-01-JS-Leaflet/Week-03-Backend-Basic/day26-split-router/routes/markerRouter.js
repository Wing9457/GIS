const express = require('express');
const router = express.Router();
const db = require('../db.js');

// 统一响应封装
const success = (res, data = [], msg = "请求成功") => {
  res.json({ code: 200, msg, data });
};
const fail = (res, msg = "操作失败", code = 500) => {
  res.json({ code, msg });
};

// 查询所有点位
router.get('/markers', (req, res) => {
  const sql = "SELECT * FROM markers ORDER BY id DESC";
  db.query(sql, (err, results) => {
    if (err) return fail(res, "查询点位失败");
    success(res, results);
  });
});

// 新增点位
router.post('/markers', (req, res) => {
  const { name, lat, lng } = req.body;
  if (!name || !lat || !lng) return fail(res, "参数不能为空", 400);
  if (name.length > 20) return fail(res, "名称不能超过20字", 400);

  const sql = "INSERT INTO markers(name,lat,lng) VALUES (?,?,?)";
  db.query(sql, [name, lat, lng], err => {
    if (err) return fail(res, "新增点位失败");
    success(res, [], "新增成功");
  });
});

// 修改点位
router.put('/markers/:id', (req, res) => {
  const { name } = req.body;
  const id = req.params.id;
  if (!name || name.length > 20) return fail(res, "名称格式错误", 400);

  const sql = "UPDATE markers SET name = ? WHERE id = ?";
  db.query(sql, [name, id], err => {
    if (err) return fail(res, "修改失败");
    success(res, [], "修改成功");
  });
});

// 删除点位
router.delete('/markers/:id', (req, res) => {
  const sql = "DELETE FROM markers WHERE id = ?";
  db.query(sql, [req.params.id], err => {
    if (err) return fail(res, "删除失败");
    success(res, [], "删除成功");
  });
});

module.exports = router;