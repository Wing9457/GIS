// 数组基础
let cities = ["佛山", "广州", "深圳", "东莞"];
console.log("数量：", cities.length);
console.log("第一个：", cities[0]);

// 遍历
for (let i = 0; i < cities.length; i++) {
  console.log(i + 1, cities[i]);
}

// 数字计算
let distances = [20, 35, 50];
let total = 0;
for (let i = 0; i < distances.length; i++) {
  total += distances[i];
}
console.log("总距离：", total);