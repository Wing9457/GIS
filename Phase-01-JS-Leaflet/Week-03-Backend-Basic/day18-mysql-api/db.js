// day18 MySQL 数据库连接
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456', // 你之后改成自己的密码
  database: 'webgis_map' // 明天建库
});

db.connect((err) => {
  if (err) {
    console.log('数据库连接失败：', err.message);
    return;
  }
  console.log('✅ MySQL 连接成功');
});

module.exports = db;