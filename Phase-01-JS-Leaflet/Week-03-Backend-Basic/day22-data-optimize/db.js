// day22 数据库优化配置
const mysql = require('mysql2');

// 使用连接池，优化频繁请求性能
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'webgis_map',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

pool.getConnection((err) => {
  if(err){
    console.log('数据库连接失败：',err);
    return;
  }
  console.log('✅ 数据库连接池启动成功');
});

module.exports = pool;