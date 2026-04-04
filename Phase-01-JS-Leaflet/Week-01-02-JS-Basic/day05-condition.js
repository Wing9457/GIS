//条件判断练习
//基础if-else
let age=24;

if(age>=18){
  console.log("已成年");
}else{
  console.log("未成年");
}

//多条件判断（成绩评级）
let score=85;
let grade;

if(score>=90){
  grade="A(优秀)";
}else if(score>=80){
  grade="B(良好)";
}else if(score>=70){
  grade="C(中等)";
}else if(score>=60){
  grade="D(及格)";
}else{grade="F(不及格)";
     }
console.log("成绩等级："+grade);

//复杂条件（面试筛选）
let jsScore=85;
let hasProject=true;

if(jsScore>=80&&hasProject){
  console.log("进入面试");
}else if(jsScore>=60||hasProject){
  console.log("进入复试");
}else{
  console.log("未通过");
}

//实际应用：卫星影像质量判断
let cloudCover=15;//云覆盖率百分比
let resolution=2;//分辨率/米

if(cloudCover<10&&resolution<=1){
  console.log("影像质量：优（可用）");
}else if(cloudCover<20&&resolution<=5){
  console.log("影像质量：良（可用）");
}else if(cloudCover<30){
  console.log("影像质量：一般（谨慎使用）");
}else {
  console.log("影像质量：差（不可用）");
}


