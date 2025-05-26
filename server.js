const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const studentDB = require('./src/db/studentDB');

// 中间件
app.use(express.json());
app.use(express.static(path.join(__dirname, '.')));

// 首页路由
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// API 路由
// 获取所有学生
app.get('/api/students', async (req, res) => {
  try {
    const students = await studentDB.getAllStudents();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: '获取学生列表失败' });
  }
});

// 添加学生
app.post('/api/students', async (req, res) => {
  try {
    const newStudent = await studentDB.addStudent(req.body);
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(500).json({ error: '添加学生失败' });
  }
});

// 更新学生
app.put('/api/students/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const updatedStudent = await studentDB.updateStudent(id, req.body);
    res.json(updatedStudent);
  } catch (error) {
    res.status(500).json({ error: '更新学生失败' });
  }
});

// 删除学生
app.delete('/api/students/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await studentDB.deleteStudent(id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: '删除学生失败' });
  }
});

// 启动服务器
app.listen(port, () => {
  console.log(`学生管理系统运行在 http://localhost:${port}`);
});
