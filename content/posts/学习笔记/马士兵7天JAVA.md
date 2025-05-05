---
title: 1. 变量
date: 2025-01-18
categories:
- 学习笔记
tags:
- blog
- 学习笔记
---
# 1. 变量

```java
public class testVar {  
    public static void main(String[] args) {  
        // 定义一个整型变量age  
        int age;  
        // 赋值age为18  
        age = 18;  
        // 打印age的值  
        System.out.println(age);  
    }  
}
```

# 2. 数据类型

## 2.1. 基本数据类型

* 整数型 byte, short, int, long
* 浮点型 float, double
* 字符型 char
* 布尔型 boolean

## 2.2. 引用数据类型

* 类 class
* 接口 interface
* 数组

```java
public class testType {  
    public static void main(String[] args) {  
        //整数类型  
        byte a = 10; // 范围-128~127  
        short b = 20000; // 范围 正负3w  
        int c = 3000000; // 范围 正负21亿  
        long d = 40123456578L; // 最大，如果范围超过int，最后加L  
        // 浮点类型  
        float e = 3.1415F; // float表示小数后加F  
        double f = 3.141592653589793238462643383279; // 小数更多  
        // 字符型  
        char g = 'a'; //单引号引起来的是单个字符，双引号是字符串  
        // 布尔型  
        boolean h = true; // true false  
    }  
}
```

# 3. 运算符

## 3.1. 算术运算符 + ++

```java
public class testOpe {  
  
    public static void main(String[] args) {  
        // 算术运算符  
        // 加法 + 相加 表示正数 字符串拼接  
        System.out.println(+10);  
        System.out.println(1+10);  
        System.out.println("abc"+"123");  
        System.out.println(5+6+"abc"); // 从左到右先算数运算，再进行字符串拼接  
        System.out.println("abc"+5+6); // 从左到右先进行字符串拼接，没有算数运算  
        // ++ 自增运算符  
        int a = 10;  
        System.out.println(a);  
        System.out.println(++a); // 先自增，再输出 是11  
        int b = 10;  
        b++; // 先自增，再输出  
        System.out.println(b); // 输出11  
    }  
}
```

## 3.2. 赋值运算符 =  +=

```java
public class testOpe2 {  
    public static void main(String[] args) {  
        // 赋值运算符 =        int a1 = 10;  
        int a2 = 20;  
        int num = a1+a2;  
        System.out.println("num = " + num);  
        // += 运算符  
        a1 += a2; // a1 = a1 + a2  
        System.out.println("a1 = " + a1);  
    }  
}
```

## 3.3. 关系运算符 == != >= <=

```java
public class testOpe3 {  
    public static void main(String[] args) {  
        System.out.println(5==5);  
    }  
}
// 打印true或false
```

## 3.4. 逻辑运算符 && ||

```java
public class testOpe3 {  
    public static void main(String[] args) {  
        System.out.println(true&&false); // false  
        System.out.println(true&&true); // true  
        System.out.println(false&&false); // false  
        System.out.println(false&&true); // false  
        System.out.println(true||false); // true  
        System.out.println(true||true); // true  
        System.out.println(false||false); // false  
        System.out.println(false||true); // true  
        System.out.println(!true); // false  
        System.out.println(!false); // true  
    }  
}
// &&两边均为true才是true，||两边存在true就是true
```

# 4. 流程控制

* 顺序结构
* 分支结构
  * if分支
  * switch分支
* 循环结构
  * while循环
  * for循环
  * do while循环（不常用）

## 4.1. 分支结构

### 4.1.1. if分支

#### 4.1.1.1. 双分支

```java
public class testIf01 {  
    public static void main(String[] args) {  
        int a = 10;  
        if (a > 5){  
            System.out.println("a大于5");  
        }else{  
            System.out.println("a不大于5");  
        }  
    }  
}
```

#### 4.1.1.2. 多分支

```java
public class testIf01 {  
    public static void main(String[] args) {  
        int score = 85;  
        if(score >= 90){  
            System.out.println("优秀");  
        }else if(score >= 80){  
            System.out.println("还不错");  
        }else if(score >= 60){  
            System.out.println("刚及格");  
        }else{  
            System.out.println("没及格");  
        }  
    }  
}
```

## 4.2. 循环结构

### 4.2.1. for 循环

```java
public class testFor {  
    public static void main(String[] args) {  
        for(int i=0;i<10;i++){  
            System.out.println(i);}  
    }  
}
```

### 4.2.2. while 循环

```java
public class testWhile {  
    public static void main(String[] args) {  
        int i = 0;  
        while(i< 5){  
            i = i + 1;  
            System.out.println("过程变量i的值为："+i);  // 1,2,3,4,5
        }  
        System.out.println(i);  // 5
    }  
}
```

# 5. 方法和方法的重载

\[修饰符1 修饰符2 ...] 返回类型 方法名 ( 形式参数列表 ) {\
java语句\
}\
**方法名相同而形参列表不同，构成了方法的重载**

```java
public class testMethod {  
    public static void main(String[] args) {  
        System.out.println("这是main方法");  
        System.out.println("调用sum方法"+sum(10, 20));  
        System.out.println("调用sum2方法"+sum(10, 20, 30));  
    }  
    public static int sum(int a, int b) {  // 方法名是sum但是接受两个参数
        return a + b;  
    }  
    public static int sum(int a, int b, int c) {  // 方法名是sum但是接受三个参数
        return a + b + c;  
    }  
}
```

# 6. 数组

```java
public class testArray {  
    public static void main(String[] args) {  
        int[] arr; //定义一个数组的名字是arr，类型是int[]  
        arr = new int[4]; //给arr分配内存，大小为4个int  
        // arr = new int[4] 合成一句话  
        arr[0] = 10;  
        arr[1] = 20;  
        arr[3] = 30;  
        for(int i=0;i<4;i++){  
            //输出数组中的元素  
            System.out.println(arr[i]);  
        }  
        for(int i:arr){  
            //效果和上面的for循环一样  
            System.out.println(i);  
        }  
    }  
}
```

# 7. 类和对象

## 7.1. 类的编写

* 起名
* 编写属性
* 编写方法

## 7.2. 对象创建和使用
