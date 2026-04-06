//综合项目：学生成绩管理系统

let students=[
  {name:"赵一",score:95,project:true},
  {name:"钱二",score:82,project:false},
  {name:"孙三",score:76,project:true},
  {name:"李四",score:58,project:false}
  ];
console.log("===学生成绩评级===");
for(let i=0;i<students.length;i++){
  let s=students[i];
  let grade="";
  let status="";

//成绩等级
if (s.score>=90)grade="A";
  else if(s.score>=80)grade="B";
  else if(s.score>=70)grade="C";
  else if(s.score>=60)grade="D";
  else grade="F";
  
//判断
if(s.score>=60&&s.project) status="通过";
  else if(s.score>=60||s.project)status="复试";
  else status="未通过";
  console.log(`${i+1}.${s.name}:${s.score}分，等级${grade},${status}`);
}
//统计
let total=0;
for (let i=0;i<students.length;i++){
  total+=students[i].score;
}
console.log(`\n平均分：${total/students.length}`);
console.log(`总人数：${students.length}`);

