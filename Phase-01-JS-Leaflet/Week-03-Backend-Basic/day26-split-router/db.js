const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'webgis_map',
  connectionLimit: 10
});

pool.getConnection(err => {
  err ? console.log('数据库连接失败') : console.log('✅ 数据库连接池正常');
});

module.exports = pool;