---
title: JavaScript学习笔记
date: 2025-01-15
categories:
  - 学习笔记
tags:
  - blog
  - 学习笔记
lastmod: 2025-05-06T00:26:30.587Z
---
# 1. 视频链接

https://www.bilibili.com/video/BV1Y84y1L7Nn

## 1.1. 定义变量

```javascript
let age
age = 18
alert(age)
```

## 1.2. 更新变量

```javascript
let age = 18
age = 19
console.log(age)
```

## 1.3. 定义多个变量

```javascript
let age = 19,nickName = "张三"
console.log(age,nickName)
```

## 1.4. 输出用户名

```javascript
//用户输入
//prompt("请输入名字")
//保存数据
let nickName = prompt("请输入名字")
//输出数据
document.write("你好" + nickName + "！")

```

## 1.5. 变量命名规则规范

**<font color="#ffc000">只能以数字,字母,\$以及下划线组成，且不能以数字开头</font>**\
**<font color="#ffc000">不能以关键字命名</font>**\
**<font color="#ffc000">大小写敏感，age和Age代表不同</font>**\
建议 **命名有意义、使用小驼峰**

## 1.6. 变量数组

```javascript
//声明数组
let arr = []
let names = ['张三','李四','王五']

//使用数组
console.log(names[0])
console.log(names.length)
```

## 1.7. 常量

```js
//const声明的变量为常量，不允许重新赋值，初始化必须赋值
const G = 9.8
console.log(G)
```

## 1.8. 数据类型

```js
/*
运算符
+：求和
-：求差
*：求积
/：求商
%：取余
*/

//写一个求圆面积的计算
let R = prompt("请输入圆的半径")
let S = 3.14*R*R
document.write(S)

//字符串类型
//用+拼接字符串
let name = prompt("请输入您的姓名：")
let tips = ",天冷记得添衣"
console.log(name + tips)

//输出类型
console.log(typeof tips) // string
console.log(typeof (tips)) // string
```

## 1.9. 模板字符串

```js
//注意使用反引号进行包裹，拼接变量使用${}包裹变量
let name = prompt("请输入姓名")
console.log(`${name},天冷记得添衣`)
```

## 1.10. 类型转换

```js
let num1 = prompt("请输入第一个数")
console.log(typeof num1) //string
```

### 1.10.1. 隐式转换

```js
// +两边出现一次字符串，自动把另一个变成字符串
// -,*,/ 都会把数据转换成数字
console.log(2+'2') //22
console.log(2 + 2) //4
console.log(2 - 2) //0
console.log(2 - '2') //0

console.log(+12) //12
console.log(+'123') //123 
console.log(typeof (+'123')) //number 
// 所以+可以把字符串转换成数字类型
console.log(+'123'+123) //246

let num = +prompt("请输入数字")
let str = prompt("请输入字符串")
console.log(typeof num) //number
console.log(typeof str) //string
```

### 1.10.2. 显式转换

```js
//转换成数字类型
let str = '123'
console.log(Number(str)) 
console.log(typeof (Number(str))) //Number

//parseInt 只保留整数
//parseFloat 保留小数
console.log(parseInt('12px')) //12
console.log(parseFloat('12.94px')) //12.94
```

## 1.11. 实操渲染表格

```html
<!DOCTYPE html>
<html lang="cn">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Document</title>
</head>
<body>
    <h2>订单信息</h2>
    <script src="index.js">
    </script>
</body>
<style>
    h2 {text-align: center}
    table {
        /* 表格居中 */
        margin: 0 auto;
    }
    table,
    th,
    td {
        border: 1px solid black;
        border-collapse: collapse;
        padding: 10px;
        text-align: center;
    }
</style>
</html>

```

```js
let price = +prompt("请输入价格")
let number = +prompt("请输入数量")
let address = prompt("请输入收货地址")
//计算总额
let total = price * number
//渲染到页面
document.write(`<table>
        <tr>
            <th>商品名称</th>
            <th>商品价格</th>
            <th>商品数量</th>
            <th>总价</th>
            <th>收货地址</th>
        </tr>
        <tr>
            <td>苹果</td>
            <td>${price}元</td>
            <td>${number}</td>
            <td>${total}</td>
            <td>${address}</td>
        </tr>
    </table>`)
```

## 1.12. 赋值运算符

```js
let num = 1
//num = num + 1 
num += 1
console.log(num) // 2

let num = 1
num += 3 
//num = num + 3
console.log(num) //4
```

## 1.13. 比较运算符

单个等于号是赋值，比较推荐使用===

```js
>,<,<=,>=
==两边是否相等
===两边值和类型是否相等
!==两边不相等
NaN !== NaN  (NaN不和任何内容相等，包括自身)
比较后返回内容为true或false

字母有对应的ASCII码，也可以对比
```

## 1.14. 逻辑运算符

```js
// 逻辑与 && 一假得假
console.log(true && true); // true
console.log(true && false); // false
console.log(false && true); // false
console.log(false && false); // false
// 逻辑或 || 一真得真
console.log(true || true); // true
console.log(true || false); // true
console.log(false || true); // true
console.log(false || false); // false
// 逻辑非! 取反
console.log(!true); // false
console.log(!false); // true
```

## 1.15. 分支语句

```js
if (条件) {
	执行代码
}

所有数字均为真，0为假
所有字符串都为真，空字符串为假

```

### 1.15.1. 单分支语句

```js
let a = prompt("请输入a")
let b = prompt("请输入b")
if (a>=b) {
console.log("a大于b")
}

单个大括号可以省略
if (a>=b)  console.log("a大于b")

```

### 1.15.2. 双分支语句

```js
let a = +prompt("输入一个大于10的数")
if (a > 10) {
    console.log("确实大于10")
} else {
    console.log("不对，他小于10")
}
```

## 1.16. 多分支语句

```js
let score = +prompt("输入你的成绩")
if (score >= 90) {
    alert("你的成绩优秀！")
}else if (score >= 80) {
    alert("你的成绩良好！")
}else if (score >= 60) {
    alert("你的成绩及格！")
}else {
    alert("你的成绩不及格！")
}
```

## 1.17. switch语句

```js
let num1 = prompt("输入第一个数")
let num2 = prompt("输入第二个数")
let cz = prompt("输入+-*/的操作")
switch(cz){
    case "+":
        console.log(num1 + num2);
        break;
    case "-":
        console.log(num1 - num2);
        break;
    case "*":
        console.log(num1 * num2);
        break;
    case "/":
        console.log(num1 / num2);
        break;
    default:
        console.log("输入错误");
}
```

## 1.18. while循环

```js
while(循环条件){
  循环代码
}

//练习，100以内偶数求和
let num = 1
let sum = 0
while (num < 101) {
    console.log(num)
    num = num + 1
    if (num % 2 === 0) {
        sum = sum + num
    }

}
document.write(`求和${sum}<br>`)

```

## 1.19. 循环退出

### 1.19.1. break退出大循环

```js
let num = 1
while (num < 5) {
    num = num + 1
    if (num = 3) {
        document.write(`退出循环${num}`)
        break

    }
}
```

### 1.19.2. continue结束当前循环

## 1.20. atm练习

```js
let money = 1000
while (true) {
    let cz = +prompt("1存钱2取钱3查询4退出")
    if (cz == 4) {
	    // 4直接退出
        break
    }
    switch (cz) {
        case 1:
            let temp1 = +prompt("存入多少")
            alert(`余额为${temp1 + money}`)
            break // 退出switch
        case 2:
            let temp2 = + prompt("取出多少")
            alert(`余额为${money - temp2}`)
            break
        case 3:
            alert(`余额为${money}`)
            break
        default:
            alert("输入错误")
            break

    }
}
```

## 1.21. for循环

* 运行流程
* 1.初始化
* 2.通过条件表达式判断是否执行
* 3.执行循环体
* 4.执行更新表达式

```js
// 初始化表达式;条件表达式;更新表达式
for(let i=0;i<5;i++){
	console.log(i)
}
// 也可以写成这样，但是没必要
let i=0
for(;i<5;){
	console.log(i)
	i++
}
// 下面是一个死循环
for (;;){
	alert("123")
}

//let的作用域局限在循环中，var的作用域为全局

```

### 1.21.1. 循环练习题

```js
// 1练习：求一百以内3的倍数的总和以及个数
let total = 0
let num = 0
for (let i = 1; i < 100; i++) {
    if (i % 3 === 0) {
        total = total + i
        num++
    }
}
console.log(total, num)
```

```js
// 2练习：求1000以内的水仙花数
// （水仙花数就是，一个n位数，n>=3，各个位上的数字的n次幂之和还等于这个数，那么他就是水仙花数）

for (i = 100; i < 1000; i++) {
    // console.log("数字:" + i)
    // 获取所有的i的百位
    bai = parseInt(i / 100)
    // console.log("bai:" + bai)
    // 获取十位数
    shi = parseInt((i - (bai * 100)) / 10)
    // console.log("shi:" + shi)
    // 获取个位数
	ge = (i - bai * 100)-shi*10
	// console.log("ge:"+ge)
	if(bai**3+shi**3+ge**3===i){
		console.log(i)
	}
}

// 更简便的是通过索引取值
for(i=100;i<1000;i++){
	let strI = String(i)
	bai = strI[0]
	shi = strI[1]
	ge = strI[2]
	if(bai**3+shi**3+ge**3===i){
		console.log(i)
	}
}

```

## 1.22. break和continue

* ## break
  * ## break适用于终止switch和循环语句
  * ## break以后，switch或者循环会立即停止

```js
for (let i = 0; i < 5; i++) {
    if (i === 3) {
        break
    }
    console.log(i)
}
// 仅输出0 1 2 
```

```js
for (let j = 0; j < 5; j++) {
    console.log(j)
    for (let i = 0; i < 5; i++) {
        console.log('内层循环' + i)
    }
}
// 此时输出内外层都是0-4
// 但是如果内层加上break
for (let j = 0; j < 5; j++) {
    console.log(j)
    for (let i = 0; i < 5; i++) {
        if (i == 2) {
            break
            // 此处的break只会终止内层循环
            // 外层0-4，内层0-1
        }
        console.log('内层循环' + i)
    }
}
```

* ## continue
  * ## continue跳过当前循环

```js
for (let i = 0; i < 5; i++) {
    if (i === 3) {
        continue
    }
    console.log(i)
}
// 输出0 1 2 4
// 即跳过当i等于3的时候，循环后面的所有内容
// 仅对最近的生效
for (let i = 0; i < 5; i++) {
    console.log(i)
    for (let j = 0; j < 5; j++) {
        if (j === 3) {
            continue
        }
        console.log('内层循环' + j) 
        
        // 注意此处的log是在continue之后的
        // 所以在等于3时不输出内层嵌套
    }
}
```

## 1.23. 对象

### 1.23.1. 创建对象

```js
let obj = new Object()
console.log(obj)
```

### 1.23.2. 添加属性

```js
// 对象.属性名 = 属性
let obj = new Object()
obj.name='sikuai'
console.log(obj)
// 控制台打印出 {name: 'sikuai'}
```

### 1.23.3. 修改属性

```js
// 对象.属性名 = 属性
let obj = new Object()
obj.name='sikuai'
console.log(obj)
obj.name='Tom'
console.log(obj)
// 控制台打印出 {name: 'Tom'}
// 直接覆盖了
```

### 1.23.4. 删除属性

```js
let obj = new Object()
obj.name='sikuai'
obj.age=18
obj.sex='man'
console.log(obj)
delete obj.name
console.log(obj)
// 依次输出
// {name: 'sikuai', age: 18, sex: 'man'}
// {age: 18, sex: 'man'}
```

### 1.23.5. 属性名可以是任意字符串

```js
let obj=new Object()
// obj.2134213red21q3&* = "该属性名会报错"
obj["2134213red21q3&*"] = "通过中括号加引号的方式就不会报错"
console.log(obj)
console.log(obj["2134213red21q3&*"])
```

### 1.23.6. 中括号内可以是变量或字符串

```js
let obj = new Object()
obj.str = "str是属性名"
let name = "sikuai"
obj[name] = "此时sikuai是属性名"
obj["sikuai"] = "此时sikuai还是属性名"
obj.name = "此处的name就是新的属性名"
console.log(obj)
// {str: 'str是属性名', sikuai: '此时sikuai还是属性名', name: '此处的name就是新的属性名'}
// 当使用中括号时可以使用变量进行定义，但是使用.则只会是属性名
```

### 1.23.7. 对象内还可以存放对象

```js
let obj = new Object()
obj.name = "张三"
obj.phone = "13888888888"
obj.n = Object() //此处的Object的new是可以省略的
obj.n.name = "李四"
obj.n.phone = "13666666666"
console.log(obj)
console.log(obj.name)
console.log(obj.n.name)
// {name: '张三', phone: '13888888888', n: {…}}
// 张三
// 李四
```

### 1.23.8. 检查对象中的属性名

```js
let obj = new Object()
obj.name = "张三"
console.log("name" in obj) // 存在，返回true
console.log("test" in obj) // 不存在，返回false
```

### 1.23.9. 对象的字面量

```js
// 可以使用 let obj = new Object()来创建对象
// 也可以使用 let obj2 = {} 来创建对象
let obj = new Object()
let obj2 = Object()
let obj3 = {}
// 属性均为object
// 可以更方便的创建并添加属性
let obj4 = {
    name: "张三",
    phone: 13666666666,
    ["2343&*"]: "更复杂的属性名",
    [obj]: "特殊的属性",
    obj5: {
        text: "特殊的属性"
    }
}
console.log(obj4)
console.log(obj4.obj5.text) // 和上面的效果一样
// {name: '张三', phone: 13666666666, 2343&*: '更复杂的属性名', [object Object]: '特殊的属性', obj5: {…}}}
// 注意要使用,隔开
```

### 1.23.10. 枚举属性

```js
let obj = {
    name: "张三",
    phone: 13666666666,
    ["2343&*"]: "更复杂的属性名",
    obj2: {
        text: "特殊的属性"
    },
    [Symbol()]: "符号创建的属性"
}
// 使用for-in语句
for (let propName in obj) {
    console.log(propName, obj[propName]) // 此处的propName是变量，随便命名
}
// 逐行打印出属性名和响应的值，因为是obj[propName]
// name 张三
// phone 13666666666
// 2343&* 更复杂的属性名
// obj2 {text: '特殊的属性'}
// 但是符号添加的属性不可以枚举
```

## 1.24. 函数

* ### 函数声明

```js
function fn(){
	console.log("函数声明")
}
```

* ### 函数表达式

```js
const fn = function(){
	console.log("匿名函数所以要const做定义")
}
```

* ### 箭头函数

```js
() => {
	console.log("箭头函数")
}
// 简写
() => console.log("一句话所以可以简写")

// 因为是匿名函数，所以使用需要进行定义
const fn = (){
	console.log("箭头函数")
}
```

### 1.24.1. 参数

##### 1.24.1.1.1. 形参（形式参数）

```
没有实际值的参数，变量
```

##### 1.24.1.1.2. 实参（实际参数）

```
有确定的数字的参数
```

```js
const fn = (a,b) => {
	console.log("a=",a)
	console.log("b=",b)
}
fn(1,10)
// 上面的a,b都是形参，定义时未知，下面的1，10是实参，定义时已知。
```

##### 1.24.1.1.3. 数量不一致

```js
function fn2(a,b){
	console.log(a)
	console.log(b)
} 
fn2(1,12,123,1234)
// 此时传入和需要的参数数量不一致，但是js只会选取前两个，忽略不需要的。

function fn3(a,b){
	console.log(a)
	console.log(b)
} 
fn3(1)
// 此时传入参数少于需要的参数，js会定义其他的为undefined，未定义的变量
```

##### 1.24.1.1.4. 参数类型

```js
// 此处的参数可以是任意类型
function fn(a, b) {
    console.log("a=", a)
    console.log("name=", a.name)
    console.log("b=", b)
}
fn({ name: "张三" }, 123)
// a= {name: '张三'}name: "张三"[[Prototype]]: Object
// name= 张三
// b= 123
```

##### 1.24.1.1.5. 箭头函数的参数

```js
const fn = a => console.log(a)
fn(211)
// 此处箭头函数省略了括号，定义时可以更简单
```

##### 1.24.1.1.6. 参数可以设置默认值

```js
const fn = (a = 10, b = 20, c = 30) => {
    console.log(a)
    console.log(b)
    console.log(c)
}
fn(1, 2)
// 此处没有传入c，但是设置了默认值，所以不会未定义
```

##### 1.24.1.1.7. 对象作为参数

```js
let obj = {name:"唐僧"}
const fn = (a=obj) =>{
	console.log(a.name)
	a.name = "张三"
	console.log(a.name)
}
fn()
fn()
// 唐僧 张三 张三 张三
// 此处是因为调用同一个obj

const fn = (a={name:"唐僧"}) =>{
	console.log(a.name)
	a.name = "张三"
	console.log(a.name)
}
fn()
fn()
// 唐僧 张三 唐僧 张三
// 此处是因为默认值一直为唐僧，函数内修改仅在函数内生效
```
