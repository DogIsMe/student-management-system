const pool = require('./config');

// 获取所有学生
async function getAllStudents() {
  try {
    const [rows] = await pool.query('SELECT * FROM students ORDER BY id');
    return rows;
  } catch (error) {
    console.error('获取学生列表失败:', error);
    throw error;
  }
}

// 添加学生
async function addStudent(student) {
  try {
    const [result] = await pool.query(
      'INSERT INTO students (name, age, gender, class) VALUES (?, ?, ?, ?)',
      [student.name, student.age, student.gender, student.class]
    );
    return { id: result.insertId, ...student };
  } catch (error) {
    console.error('添加学生失败:', error);
    throw error;
  }
}

// 更新学生
async function updateStudent(id, student) {
  try {
    await pool.query(
      'UPDATE students SET name = ?, age = ?, gender = ?, class = ? WHERE id = ?',
      [student.name, student.age, student.gender, student.class, id]
    );
    return { id, ...student };
  } catch (error) {
    console.error('更新学生失败:', error);
    throw error;
  }
}

// 删除学生
async function deleteStudent(id) {
  try {
    await pool.query('DELETE FROM students WHERE id = ?', [id]);
    return true;
  } catch (error) {
    console.error('删除学生失败:', error);
    throw error;
  }
}

// 获取单个学生
async function getStudentById(id) {
  try {
    const [rows] = await pool.query('SELECT * FROM students WHERE id = ?', [id]);
    return rows[0];
  } catch (error) {
    console.error('获取学生信息失败:', error);
    throw error;
  }
}

module.exports = {
  getAllStudents,
  addStudent,
  updateStudent,
  deleteStudent,
  getStudentById
};