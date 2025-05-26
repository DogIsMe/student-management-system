CREATE TABLE IF NOT EXISTS students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  age INT NOT NULL,
  gender VARCHAR(10) NOT NULL,
  class VARCHAR(100) NOT NULL
);

-- 初始数据
INSERT INTO students (name, age, gender, class) VALUES
('张三', 12, '男', '一年级一班'),
('李四', 11, '女', '一年级二班'),
('王五', 13, '男', '二年级一班'),
('赵六', 12, '女', '二年级二班'),
('钱七', 14, '男', '三年级一班');