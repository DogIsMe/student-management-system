const pool = require('./config');
import pool from './config.js';

async function testConnection() {
  try {
    // 尝试连接数据库
    const connection = await pool.getConnection();
    console.log('数据库连接成功!');
    
    // 执行简单查询测试
    const [result] = await connection.query('SELECT * FROM te');
    console.log('查询结果:', result[0]);
    
    // 释放连接
    connection.release();
    console.log('连接已释放');
    
    // 关闭连接池
    await pool.end();
    console.log('连接池已关闭');
  } catch (error) {
    console.error('数据库连接失败:', error);
  }
}

// 执行测试
testConnection();