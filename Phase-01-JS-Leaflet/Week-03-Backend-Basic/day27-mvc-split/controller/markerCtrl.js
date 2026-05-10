const db = require('../db');

// 统一响应
exports.success = (res, data = [], msg = "请求成功") => {
  res.json({ code: 200, msg, data });
};
exports.fail = (res, msg = "操作失败", code = 500) => {
  res.json({ code, msg });
};

// 查询所有点位
exports.getMarkers = (req, res) => {
  const sql = "SELECT * FROM markers ORDER BY id DESC";
  db.query(sql, (err, results) => {
    if(err) return exports.fail(res, "查询失败");
    exports.success(res, results);
  });
};

// 新增点位
exports.addMarker = (req, res) => {
  const { name, lat, lng } = req.body;
  if(!name || !lat || !lng) return exports.fail(res, "参数不能为空",400);
  if(name.length > 20) return exports.fail(res, "名称过长",400);

  const sql = "INSERT INTO markers(name,lat,lng) VALUES (?,?,?)";
  db.query(sql,[name,lat,lng], err => {
    if(err) return exports.fail(res, "新增失败");
    exports.success(res, [], "新增成功");
  });
};

// 修改点位
exports.editMarker = (req, res) => {
  const { name } = req.body;
  const id = req.params.id;
  if(!name || name.length>20) return exports.fail(res, "名称格式错误",400);

  const sql = "UPDATE markers SET name=? WHERE id=?";
  db.query(sql,[name,id], err => {
    if(err) return exports.fail(res, "修改失败");
    exports.success(res, [], "修改成功");
  });
};

// 删除点位
exports.delMarker = (req, res) => {
  const sql = "DELETE FROM markers WHERE id=?";
  db.query(sql,[req.params.id], err => {
    if(err) return exports.fail(res, "删除失败");
    exports.success(res, [], "删除成功");
  });
};