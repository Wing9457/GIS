// 综合项目：学生成绩管理系统
let students = [
  { name: "张三", score: 95, project: true },
  { name: "李四", score: 82, project: false },
  { name: "王五", score: 76, project: true },
  { name: "赵六", score: 58, project: false }
];

for (let i = 0; i < students.length; i++) {
  let s = students[i];
  let grade;

  if (s.score >= 90) grade = "A";
  else if (s.score >= 80) grade = "B";
  else if (s.score >= 70) grade = "C";
  else if (s.score >= 60) grade = "D";
  else grade = "F";

  let status;
  if (s.score >= 60 && s.project) status = "通过";
  else if (s.score >= 60 || s.project) status = "复试";
  else status = "未通过";

  console.log(`${i+1}. ${s.name} ${s.score}分 ${grade} ${status}`);
}

// 统计平均分
let total = 0;
for (let i = 0; i < students.length; i++) {
  total += students[i].score;
}
console.log("平均分：", total / students.length);