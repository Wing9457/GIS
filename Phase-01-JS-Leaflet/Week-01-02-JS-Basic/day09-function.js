//函数练习
//基础函数
function sayHello(){
  console.log("Hello,GIS!");
}
sayHello();

//带参数
function greet(name,city){
  console.log(`你好，${name}，来自${city}`);
}
greet("Wing","佛山");

//带返回值
function add(a,b){
  return a+b;
}
console.log("3+5=",add(3,5));

//实际应用：计算两点间的距离
function getDistanceDescription(km){
  if (km<5)return"很近";
  if (km<20)return"适中";
  return"很远";
}
console.log(getDistanceDescription(15));

//函数+数组：批量处理
let scores=[85,92,78,65];
function getAverage(arr){
  let total=0;
  for(let i=0;i<arr.length;i++){
    total+=arr[i];
  }
  return total/arr.length;
}
console.log("平均分：",getAverage(scores));

    




