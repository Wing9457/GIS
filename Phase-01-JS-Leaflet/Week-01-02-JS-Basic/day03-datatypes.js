//数据类型练习
let age=24;
let temperature=23.5;
let year=2026;
let name="Wing";
let city="佛山";
let job="烘焙师";
let isMarried=false;
let hasDegree=true;
let isTired=true;

//查看类型
console.log(typeof age);
console.log(typeof name);
console.log(typeof isMarried);

//字符串输出
let info="我叫"+name+"，今年"+age+"岁";
console.log(info);

//模版字符串输出（反引号`）
let info2=`我叫${name},今年${age}岁，住在${city}`;
console.log(info2);
