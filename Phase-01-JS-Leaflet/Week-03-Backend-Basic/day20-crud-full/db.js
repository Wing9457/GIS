const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'webgis_map'
});

db.connect((err) => {
  if (err) {
    console.log('MySQL 连接失败');
    return;
  }
  console.log('✅ MySQL 连接成功');
});

module.exports = db;