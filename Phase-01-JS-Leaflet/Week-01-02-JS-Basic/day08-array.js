//数组基础练习

//基础数组
let cities=["佛山","广州","深圳","东莞"];
console.log("城市数量："+cities.length);
console.log("第一个城市："+cities[0]);
console.log("最后一个城市："+cities[cities.length-1]);

//遍历输出
console.log("\n===城市列表===");
for(let i=0;i<cities.length;i++){
  console.log(`${i+1}.${cities[i]}`);
}

//添加和修改
cities.push("中山");
cities[0]="顺德";
console.log("\n修改后："+cities);

//数字数组计算
let distances=[20,35,50,15,40];
let total=0;
for(let i=0;i<distances.length;i++){
  total+=distances[i];
}
console.log("\n总距离："+total+"公里");
console.log("平均距离："+(total/distances.length)+"公里");

//对象数组
let images=[
  {name:"IMG001",cloud:5,usable:true},
  {name:"IMG002",cloud:25,usable:false},
  {name:"IMG003",cloud:10,usable:true}
  ];
console.log("\n===可用影像===");
let usableCount=0;
for(let i=0;i<images.length;i++){
  if(images[i].usable){
    usableCount++;
    console.log(images[i].name+"(云量"+images[i].cloud+"%)");
                }
}
console.log("可用影像数："+usableCount);




