// 函数基础
function sayHi() {
  console.log("Hi GIS");
}
sayHi();

// 带参数
function greet(name) {
  return "你好，" + name;
}
console.log(greet("Wing"));

// 计算等级函数
function getGrade(score) {
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 60) return "C";
  return "F";
}
console.log(getGrade(85));