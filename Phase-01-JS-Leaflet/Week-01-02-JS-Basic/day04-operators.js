//算术运算符
let price=100;
let discount=0.8;
let finalPrice=price*discount;
console.log("折后价格："+finalPrice);

//比较运算符
let age=24;
console.log("是否成年："+(age>=18);

//逻辑运算符
let hasJS=true;
let hasGIS=true;
let hasPython=false;
let isHired=hasJS||hasPython&&hasGIS;
console.log("是否录用："+isHired);

//综合：面试条件判断
let score=85;
let hasProject=true;
let canPass=score>=80&&hasProject;
console.log("能否通过面试："+canPass);
