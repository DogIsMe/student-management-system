const pool = require('./config');

async function testLocalConnection() {
  try {
    // 尝试连接数据库
    const connection = await pool.getConnection();
    console.log('本地数据库连接成功!');
    
    // 执行简单查询测试
    const [result] = await connection.query('SELECT 1 + 1 AS solution');
    console.log('查询测试结果:', result[0].solution);
    
    // 尝试查询学生表
    const [students] = await connection.query('SELECT * FROM students LIMIT 3');
    console.log('学生表数据示例:');
    students.forEach(student => {
      console.log(`ID: ${student.id}, 姓名: ${student.name}, 年龄: ${student.age}, 性别: ${student.gender}, 班级: ${student.class}`);
    });
    
    // 释放连接
    connection.release();
    console.log('连接已释放');
    
    // 关闭连接池
    await pool.end();
    console.log('连接池已关闭');
  } catch (error) {
    console.error('本地数据库连接失败:', error);
    console.log('\n可能的解决方案:');
    console.log('1. 确保MySQL服务正在运行');
    console.log('2. 检查用户名和密码是否正确');
    console.log('3. 确保数据库已创建');
    console.log('4. 运行 src/db/setup-local-db.js 脚本初始化数据库');
  }
}

// 执行测试
testLocalConnection();