//循环练习

//基础for循环：打印1-10
console.log("==打印1-10==");
for(let i=1;i<=10;i++){
  console.log(i);}

//打印偶数
console.log("==打印2-10的偶数==");
for(let i=2;i<=10;i+=2){
  console.log(i);}

//倒序打印
console.log("==倒序打印10-1==");
for(let i=10;i>=1;i--){
  console.log(i);}

//计算累加：1+2+3+......+10
console.log("==计算1-10的和==");
let sum=0;
for(let i=1;i<=10;i++){
  sum+=i;
}console.log("总和："+sum);

//while循环：直到满足条件
console.log("==while循环==");
let count=0;
while(count<5){
  console.log("当前计数："+count);
  count++;
}

//实际应用：批量生成影响编号
console.log("==生成影响编号==");
for(let i=1;i<=5;i++){
  let imageName="IMG_20260405_"+i;
  console.log(imageName);}

//遍历数组基础
console.log("==遍历城市列表==");
let cities=["佛山","广州","深圳","东莞"];
for (let i=0;i<cities.length;i++){
  console.log(i+1+". "+cities[i]);
}


