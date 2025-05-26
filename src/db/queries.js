const pool = require('./config');

async function getAllUsers() {
  try {
    const [rows] = await pool.query('SELECT * FROM te');
    return rows;
  } catch (error) {
    console.error('Database error:', error);
    throw error;
  }
}

module.exports = {
  getAllUsers
};