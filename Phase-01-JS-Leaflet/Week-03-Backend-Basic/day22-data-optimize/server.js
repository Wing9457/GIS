const express = require('express');
const cors = require('cors');
const db = require('./db');
const app = express();
const port = 3000;

// 全局中间件
app.use(cors());
app.use(express.json());
app.use(express.static('./'));

// 测试接口
app.get('/api/test',(req,res)=>{
  res.json({code:200,msg:"day22 数据优化版服务运行成功"});
});

// 查询全部点位
app.get('/api/markers',(req,res)=>{
  const sql = "SELECT * FROM markers ORDER BY id DESC";
  db.query(sql,(err,result)=>{
    if(err) return res.json({code:500,msg:"查询失败"});
    res.json({code:200,data:result});
  });
});

// 新增点位
app.post('/api/markers',(req,res)=>{
  const {name,lat,lng} = req.body;
  const sql = "INSERT INTO markers(name,lat,lng) VALUES (?,?,?)";
  db.query(sql,[name,lat,lng],(err)=>{
    if(err) return res.json({code:500,msg:"新增失败"});
    res.json({code:200,msg:"新增点位成功"});
  });
});

// 修改点位
app.put('/api/markers/:id',(req,res)=>{
  const {name} = req.body;
  const sql = "UPDATE markers SET name = ? WHERE id = ?";
  db.query(sql,[name,req.params.id],err=>{
    if(err) return res.json({code:500,msg:"修改失败"});
    res.json({code:200,msg:"修改成功"});
  });
});

// 删除点位
app.delete('/api/markers/:id',(req,res)=>{
  const sql = "DELETE FROM markers WHERE id = ?";
  db.query(sql,[req.params.id],err=>{
    if(err) return res.json({code:500,msg:"删除失败"});
    res.json({code:200,msg:"删除成功"});
  });
});

app.listen(port,()=>{
  console.log(`✅ day22 服务启动：http://localhost:${port}`);
});