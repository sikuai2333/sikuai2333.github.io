---
title: typescript学习笔记
date: 2025-03-16
categories:
  - 学习笔记
tags:
  - blog
  - 学习笔记
lastmod: 2025-05-06T00:26:34.522Z
---
# 1. 视频链接

https://www.bilibili.com/video/BV1YS411w7Bf/

# 2. 编译ts

命令行运行，安装 `npm i typescript -g`

## 2.1. 手动编译

在ts文件目录执行 `tsc index.ts` 将index.ts编译为index.js

## 2.2. 自动编译

在ts文件目录执行 `tsc --init` 初始化，并生成配置文件\
执行 `tsc --watch` 监视所有ts文件，发生变化自动编译\
如不希望ts编写出错时仍然编译成js，打开配置文件，取消 `// "noEmitOnError": true,` 的注释即可。

# 3. 类型声明

* `let` 用于声明可变变量
* `const` 用于声明不可变常量
* `: string` 是类型注解，表明变量只能存储字符串类型的值
* 如果不立即赋值，需要使用 `let`，因为 `const` 必须在声明时初始化

类型 `number`、`string`、`boolean` 等，TS官方推荐小写

```ts
let a: string
let b: number
let c: boolean
a = 'hello'
b = 123
c = true
console.log(a, b, c)

// 指定函数接收和返回值的类型
function count(a:number,b:number):number{
  return a + b
}
let result = count(1,2)
console.log(result,typeof result)
```

# 4. 推断类型

```ts
let d = -99 // 推断出d是number类型
d = 'hello' // 报错
```

# 5. 常用类型

## 5.1. any

```ts
let a: any
a = 1
a = '1'
a = true

let b: number
b = a // 不报错
```

区别就是下面的unknown

## 5.2. unknown

```ts
let a: unknown

a = '1'
a = true
a = 1

let b: number
b = a // 报错
```

ts虽然是a=1赋值结尾的，但是不能直接把unknown给number，可以使用判断或者是断言

```ts
let a: unknown

a = '1'
a = true
a = 1

let b: number
if (typeof a === 'number'){
	b = a // 不报错
}

b = a as number // 不报错
b = <number>a // 不报错
```

## 5.3. never

never 是不能有值，所以不适用于定义变量`let a: never`，适用于函数。几乎不使用。

```ts
function demo1():never{
	// 此处不写东西报错，写return报错(包括undefined、null)，只有两个情况1.永远调不完（死循环）2.跑不通（throw报错）
	// demo()
	// throw new Error('error')
}
```

## 5.4. void

void不返回任何值，调用者也不应该对其进行如何操作。\
下面三种一样

```ts
function demo1():void{
	console.log("你好")
}
demo1()

function demo2():void{
	console.log("你好")
	return;
}
demo2()

function demo3():void{
	console.log("你好")
	return undefined
}
demo3()
```

但是**调用者也不应该对其进行如何操作**

```ts
function demo3():void{
	console.log("你好")
	return undefined
}
let result = demo3()
if(result){ // 不应该对其进行操作，报错

}
```

## 5.5. undefined

```ts
function demo3():void{
	console.log("你好")
	return undefined
}
let result = demo3()
if(result){ // 不报错

}
```

## 5.6. object

```ts
let a: object // 【非原始类型】
a = {}
a = []
a = function(){}
class Person {}
a = new Person()
// 由于是非原始类型，所以下面是不行的
a = 1
a = "1"
a = true
a = undefined
```

**但是**使用Object是可以的，包含原始和非原始类型

```ts
let b: Object // 【存储的是可以调用到Object方法的类型】
b = {}
b = []
b = function(){}
class Person {}
b = new Person()
// 下面的也不报错
b = 1
b = "1"
b = true
// b = undefined 报错
// b = null 报错
```

### 5.6.1. 声明对象类型

```ts
let person: {
    name: string;
    age?: number; // ? 表示可选
    [key: string]: any; // 表示支持key是string类型，值是any（任意类型）的属性
}
person = {
    name: 'Jack',
    age: 18,
    sex: "男",
    city: "北京",
    data:{
        avator: "http://www.baidu.com",
        sign: "hello,world"
    }
} 
console.log(person)
console.log(person.data.avator)
```
