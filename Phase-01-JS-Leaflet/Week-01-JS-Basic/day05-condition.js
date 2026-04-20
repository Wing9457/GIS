// 条件判断 if / else if / else
let score = 85;
let grade;

if (score >= 90) {
  grade = "A";
} else if (score >= 80) {
  grade = "B";
} else if (score >= 60) {
  grade = "C";
} else {
  grade = "F";
}
console.log("等级：", grade);

// GIS 示例：卫星云量判断
let cloud = 15;
let resolution = 2;

if (cloud < 10 && resolution <= 1) {
  console.log("质量：优");
} else if (cloud < 20 && resolution <= 5) {
  console.log("质量：良");
} else {
  console.log("质量：差");
}