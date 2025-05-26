const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: '121.41.60.47',
  user: 'student',
  password: '123',
  database: 'student',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
