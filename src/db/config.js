const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',      // 修改为本地主机
  user: 'student',           // 修改为本地MySQL用户名
  password: '123',           // 修改为本地MySQL密码
  database: 'student', // 可以修改为您想要的数据库名
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;

