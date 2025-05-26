// 学生数据存储
let students = [];

// DOM 元素
const studentTableBody = document.getElementById('studentTableBody');
const addStudentForm = document.getElementById('addStudentForm');
const saveStudentBtn = document.getElementById('saveStudentBtn');
const editStudentForm = document.getElementById('editStudentForm');
const updateStudentBtn = document.getElementById('updateStudentBtn');

// 初始化页面
document.addEventListener('DOMContentLoaded', () => {
  loadStudents();
  setupEventListeners();
});

// 设置事件监听器
function setupEventListeners() {
  // 添加学生
  saveStudentBtn.addEventListener('click', addStudent);
  
  // 更新学生
  updateStudentBtn.addEventListener('click', updateStudent);
  
  // 表格中的编辑和删除按钮事件通过事件委托处理
  studentTableBody.addEventListener('click', handleTableActions);
}

// 从服务器加载学生数据
async function loadStudents() {
  try {
    const response = await fetch('/api/students');
    if (!response.ok) {
      throw new Error('获取学生数据失败');
    }
    students = await response.json();
    renderStudentTable();
  } catch (error) {
    console.error('加载学生数据错误:', error);
    alert('加载学生数据失败，请刷新页面重试');
  }
}

// 渲染学生表格
function renderStudentTable() {
  studentTableBody.innerHTML = '';
  
  students.forEach(student => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${student.id}</td>
      <td>${student.name}</td>
      <td>${student.age}</td>
      <td>${student.gender}</td>
      <td>${student.class}</td>
      <td>
        <button class="btn btn-sm btn-primary btn-action edit-btn" data-id="${student.id}">编辑</button>
        <button class="btn btn-sm btn-danger btn-action delete-btn" data-id="${student.id}">删除</button>
      </td>
    `;
    studentTableBody.appendChild(row);
  });
}

// 添加学生
async function addStudent() {
  const name = document.getElementById('studentName').value.trim();
  const age = parseInt(document.getElementById('studentAge').value);
  const gender = document.querySelector('input[name="studentGender"]:checked').value;
  const studentClass = document.getElementById('studentClass').value;
  
  if (!name || isNaN(age) || !studentClass) {
    alert('请填写所有必填字段！');
    return;
  }
  
  // 创建新学生对象
  const newStudent = {
    name: name,
    age: age,
    gender: gender,
    class: studentClass
  };
  
  try {
    // 发送到服务器
    const response = await fetch('/api/students', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newStudent)
    });
    
    if (!response.ok) {
      throw new Error('添加学生失败');
    }
    
    // 获取服务器返回的数据（包含ID）
    const savedStudent = await response.json();
    
    // 添加到本地数组
    students.push(savedStudent);
    
    // 重新渲染表格
    renderStudentTable();
    
    // 重置表单并关闭模态框
    addStudentForm.reset();
    const modal = bootstrap.Modal.getInstance(document.getElementById('addStudentModal'));
    modal.hide();
  } catch (error) {
    console.error('添加学生错误:', error);
    alert('添加学生失败，请重试');
  }
}

// 处理表格中的编辑和删除操作
function handleTableActions(event) {
  const target = event.target;
  
  // 编辑按钮
  if (target.classList.contains('edit-btn')) {
    const studentId = parseInt(target.dataset.id);
    openEditModal(studentId);
  }
  
  // 删除按钮
  if (target.classList.contains('delete-btn')) {
    const studentId = parseInt(target.dataset.id);
    deleteStudent(studentId);
  }
}

// 打开编辑模态框
function openEditModal(studentId) {
  const student = students.find(s => s.id === studentId);
  if (!student) return;
  
  // 填充表单
  document.getElementById('editStudentId').value = student.id;
  document.getElementById('editStudentName').value = student.name;
  document.getElementById('editStudentAge').value = student.age;
  document.getElementById('editStudentClass').value = student.class;
  
  // 设置性别单选按钮
  if (student.gender === '男') {
    document.getElementById('editGenderMale').checked = true;
  } else {
    document.getElementById('editGenderFemale').checked = true;
  }
  
  // 打开模态框
  const modal = new bootstrap.Modal(document.getElementById('editStudentModal'));
  modal.show();
}

// 更新学生信息
async function updateStudent() {
  const id = parseInt(document.getElementById('editStudentId').value);
  const name = document.getElementById('editStudentName').value.trim();
  const age = parseInt(document.getElementById('editStudentAge').value);
  const gender = document.querySelector('input[name="editStudentGender"]:checked').value;
  const studentClass = document.getElementById('editStudentClass').value;
  
  if (!name || isNaN(age) || !studentClass) {
    alert('请填写所有必填字段！');
    return;
  }
  
  // 创建更新的学生对象
  const updatedStudent = {
    name: name,
    age: age,
    gender: gender,
    class: studentClass
  };
  
  try {
    // 发送到服务器
    const response = await fetch(`/api/students/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedStudent)
    });
    
    if (!response.ok) {
      throw new Error('更新学生失败');
    }
    
    // 更新本地数组中的学生
    const studentIndex = students.findIndex(s => s.id === id);
    if (studentIndex !== -1) {
      students[studentIndex] = { id, ...updatedStudent };
    }
    
    // 重新渲染表格
    renderStudentTable();
    
    // 关闭模态框
    const modal = bootstrap.Modal.getInstance(document.getElementById('editStudentModal'));
    modal.hide();
  } catch (error) {
    console.error('更新学生错误:', error);
    alert('更新学生失败，请重试');
  }
}

// 删除学生
async function deleteStudent(studentId) {
  if (confirm('确定要删除这名学生吗？')) {
    try {
      // 发送到服务器
      const response = await fetch(`/api/students/${studentId}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) {
        throw new Error('删除学生失败');
      }
      
      // 从本地数组中移除
      students = students.filter(student => student.id !== studentId);
      
      // 重新渲染表格
      renderStudentTable();
    } catch (error) {
      console.error('删除学生错误:', error);
      alert('删除学生失败，请重试');
    }
  }
}

