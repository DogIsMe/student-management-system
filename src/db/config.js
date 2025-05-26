const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: ' localhost:3000',
  user: 'student',
  password: '123',
  database: 'student',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
