---
title: dart学习笔记
date: 2025-01-21
categories:
  - 学习笔记
tags:
  - blog
  - 学习笔记
lastmod: 2025-05-05T08:22:26.156Z
---
https://www.bilibili.com/video/BV1RZ421p7BL

# 1. main函数

```dart
main(){
  
}
```

# 2. 数据类型

* int
* double
* String

# 3. 定义参数

**大小写敏感**

```dart
main(){
  int a1 = 123;
  a1 =345;
  print(a1);
  const int a2 = 321;
  a2 = 456; // 报错
  final int a3;
  a3 = 678; // 和const比可以先定义类型，不给值

  final time1 = DateTime.now();
  const time1 = DateTime.now(); // 报错

  var age = 18; // 等于执行了 int age = 18;
  age = 18.5; // 报错，不能赋double类型
  var name = "sikuai"; // String类型
  name = 13; // 同样的原因报错。
}
```

# 4. 注释

```dart
// 单行注释

/// 自动换行加注释
/// 下一行自动注释

/*
多行注释
123321
345
*/
```

# 5. int和float的转换

```dart
main(){  
  int f = 2.5.toInt();  
  print(f);  
  double i = 2.toDouble();  
  print(i);  
  // ()的优先级高于toInt/toDouble
  int f1 = (5/2).toInt();  // 不加括号报错，因为先toint再/导致2.5不是int类型
  print(f1);  
  double f2 = 5/2;  
  print(f2);
}
```

# 6. 数学运算符

```dart
main(){  
  int a = 1+1;  
  int b = 1-1;  
  int c = 1*1;  
  double d = 1/1;  // 使用int会报错，因为结果是1.0
  print("a=$a,b=$b,c=$c,d=$d");  
  // a=2,b=0,c=1,d=1.0
}
```

# 7. var和dynamic

dynamic可以应用于函数的返回值

```dart
main(){  
  var a1 = 1;  
  dynamic a2 = 100;  
  print('a1的类型是${a1.runtimeType}, a2的类型是${a2.runtimeType}');  
  var a3 = 1.0;  
  dynamic a4 = 1.0;  
  print('a3的类型是' + a3.runtimeType.toString() + ', a4的类型是' + a4.runtimeType.toString());  
  // a1的类型是int, a2的类型是int
  // a3的类型是double, a4的类型是double
}
```

# 8. 函数 function

```dart
main(){  
 fun1();  
 int a1 = 1;  
 int a2 = 2;  
 dynamic c = fun2(a1, a2);  
 print(c);  
 print(c.runtimeType.toString());  
}  
  
dynamic fun1(){  
  print("fun1");  
}  
  
dynamic fun2(a,b){  
  return (a+b).toDouble();  
}
```

# 9. 列表 List和add、addAll、insert、remove、removeAt、removeRange、removeLast、isEmpty

```dart
main(){  
  List<int> a1 = []; // int是泛型，list只接受int类型数据  
  print(a1); // []  
  a1.add(123);  
  a1.add(345);  
  a1.add(345); // 数据可重复的  
  print(a1); // [123, 345, 345]  
  
  // 判断长度  
  print(a1.length);  
  
  // 使用var定义一个,不指定类型，那么为dynamic，可以存各类数据  
  var b1 = [];  
  print(b1.runtimeType.toString()); // List<dynamic>  
  b1.add("sikuai");  
  b1.add(123);  
  print(b1.runtimeType.toString()); // List<dynamic>  
  // 使用var还可以定义指定类型的  
  var f1 = [1,2,3]; // 只有int类型数据  
  print(f1.runtimeType.toString()); // List<int>  
  
  // 下面两个一致  
  var c1=<int>[];  
  List<int> d1 = [];  
  
 // addAll的用法  
  var a1 = [1,2,3];  
  var b1 = [4,5,6];  
  a1.addAll(b1);  
  print(a1); // [1, 2, 3, 4, 5, 6]  

  // insert插入，第一个参数是序列，从0开始  
  var c1 = [1,2,3];  
  c1.insert(0,999); // [999,1,2,3]  
  c1.insert(3,999); // [999,1,2,999,3]  
  print(c1);
  
  // remove删除指定值
  var d1 = [1,2,3,4,5];
  d1.remove(3);
  print(d1); //[1, 2, 4, 5]
  
  
  // removeAt删除指定序号
  var e1 = [1,2,3,4,5];
  e1.removeAt(0);
  print(e1); //[2, 3, 4, 5]
  
  // removeRange接受两个参数，从起始序号删到第二个参数前一个序号
  var f1 = [1,2,3,4,5];
  f1.removeRange(0,2); // 从第0个开始删除，删到2号前一个也就是序号1，删除0和1的值
  print(f1); // [3, 4, 5]
  f1.removeRange(1, 2); // 删除第一个和第二个前一个（也就是删除第一个到第一个）
  print(f1); // [3, 5]

  // removeLast删除最后一个
  var a2 = [1,2,3,4];
  a2.removeLast();
  print(a2); // [1,2,3]

  // isEmpty和isNotEmpty判断是否为空
  var b2 = [];
  print(b2.isEmpty); // true

}
```

# 10. 列表List的map和reversed、匿名函数和参数匿名函数

```dart
main(){  
  var a1 = [1,2,3,4];  
  print(a1.reversed); // (4, 3, 2, 1) 小括号是 iterable：可迭代  
  var a1r = a1.reversed;  
  print("a1r的值是${a1r},类型是${a1r.runtimeType.toString()}"); // a1r的值是(4, 3, 2, 1),类型是ReversedListIterable<int>  
  var a1rl = a1r.toList();  
  print("a1rl的值是${a1rl},类型是${a1rl.runtimeType.toString()}"); // a1rl的值是[4, 3, 2, 1],类型是List<int>  
  // 可以写成  
  var b1 = a1.reversed.toList();  
  print(b1); // [4, 3, 2, 1]  
  
  // map的用法  
  var list1 = [1,2,3];  
  var list2 = list1.map((e)=>e+1).toList();  
  print(list2); // [2, 3, 4]  
  // 其中map里面的是匿名函数，比如下面  
  /*  
  正常函数fun1(){}  
  匿名函数没有函数名且需要分号结尾 (){};  接收参数不需要泛型  
  (e){    return e+1  };  这个简写可以写成 e=>e+1;  所以list3可以写成  
  */  var list3 = list1.map((e){  
    return e+1;  
  }).toList();  
  print(list3);  
  
  // 有参数的匿名函数  
  (v){  
    print("有参数的匿名函数，v=${v}"); // 有参数的匿名函数，v=3  
  
  }(3);  
}
```

# 11. 箭头函数

**多行代码不能用箭头函数**

```dart
main(){  
  var a1 = [1,2,3];  
  var a2 = a1.map(  
      (e){  
        print("执行了，值是${e}");  
        return e+1;  
      }  
  ).toList();  
  print(a2);  
}
```

# 12. Function函数类型

```dart
add(int a,int b){  
  print("add函数执行，a+b=${a+b}");  
}  
  
main(){  
  // add(1,3);  
  Function fun1 = add;  
  fun1(1,5);  
  var result = fun1(3,4);  
  print(result);  
}
```

# 13. 几种main函数的写法

```dart
// 1. 不指定返回类型  
main(){  
// main 函数的几种写法   
}  
  
// 2.无返回的main  
void main(){  

}  
  
// 3. 返回整形  
int main(){  
  return 1;  
}  
  
// 4. 返回字符串  
String main(){  
  return "sikuai";  
}  
  
// 5. 带参数调用main  
main(List<String> list){  
  // List是指定传入的参数为列表 String是泛型 list是参数名字  
  print("main函数传入的参数为${list.toString()}");  
  // 在命令行执行 dart run 014.dart 就可以执行了，得到main函数传入的参数为[]  
  // 在命令行执行 dart run 014.dart 1,2,xyz 得到main函数传入的参数为[1,2,xyz]  
  // 在命令行执行 dart run 014.dart 1 2 xyz 得到main函数传入的参数为[1,2,xyz]  
  // 在命令行执行 dart run 014.dart "1","2","xyz" 得到main函数传入的参数为[1,2,xyz]  
}

// 可以组合使用，比如
void main(List<String> list){
  print(list);
}
// dynamic,int,double,String
```

# 14. for循环和while循环

```dart
main(){  
  int i = 10;  
  // 在这里定义的i是main的，和下面for的不冲突  
  for(int i=0;i<3;i++){  
    // for(初始化，运行前执行一遍;每运行一次判断一下;每运行完后执行一次){执行内容}  
    print("for执行得到的${i}"); // 0,1,2  
  }  
  
  // for in  
  List list = [1,2,3,4];  
  for(int item in list){  
    print("for in执行得到的${item}");  
  }  
  
  // while  
  var a = 5;  
  while(a>0){  
    print("while执行得到的${a}");  
    a--;  
  }  
  
  // do while  
  int b = 3;  
  do{  
    print("do while 先执行一次do，再判断while（注意死循环），${b}");  
    a--;  
  }while(a>0);  
}
```

## 14.1. for遍历list取值

```dart
main(){  
  var list = [11,22,33];  
  for(int i=0;i<3;i++){  
    print("${i} in list is ${list[i]}");  
  }  
}
```

# 15. list.generate生成数组、...的用法

```dart
void main() {  
  var list1 = List.generate(3, (index) => "str"); // 每个元素都是 "str",index是索引  
  print(list1);  
  
  var list2 = List.generate(3, (index) => DateTime.now()); // 每个元素都是当前时间  
  print(list2);  
  
  var list3 = List.generate(3,(index)=> index*2);  
  print(list3);  

  // ...的用法，将list拆解成元素
  var list4 = [...[1,2,3],4,5,6];  
  print(list4); // [1, 2, 3, 4, 5, 6]  
}
```

# 16. Set集合的用法

```dart
main() {  
  // Set是集合  
  Set<int> s1 = new Set<int>();  
  // 平时可以略写  
  var s2 = new Set<int>();  
  
  // add添加值  
  s2.add(1);  
  s2.add(2);  
  s2.add(4);  
  print(s2); // {1, 2, 4}  
  
  // 略写，省略泛型和new  
  var s3 = Set();  
  s3.add(1);  
  s3.add("123");  
  print(s3);  
  print(s3.runtimeType.toString()); // _Set<dynamic>  
    // from   
var s4 = new Set.from(s3);  
  print(s4);  
  var s5 = Set.from([1,23,4,5]);  
  print(s5); // {1, 23, 4, 5}  
  
  // 不能使用下标查值，因为没有顺序，但是可以用for  
  for(var item in s5){  
    print(item);  
  }  
}
```

# 17. as、Map、addEntries方法

```dart
main(){  
  // as 用法  
  dynamic a1 = "123321";  
  // a1.length; 不可用因为是dynamic  
  var a2 = a1 as String;  
  print(a2.length);  
  
  // Map是键值对，泛型第一个类型是键key，第二个是值value，有点像json  
  // 先规定泛型为int，值为String  
  var m1 = Map<int,String>();  
  m1[0] = "sikuai";  
  m1[2] = "hi";  
  print(m1); // {0: sikuai, 2: hi}  
  // 不规定类型，默认为dynamic  
  var m2 = Map();  
  m2[0] = "hi";  
  m2["a"] = 2;  
  m2[1.2] = 3.2;  
  print(m2); // {0: hi, a: 2, 1.2: 3.2}  
  
  // {}手写一个  
  var m3 = {  
    "name" : "sikuai",  
    "age" : 18  
  };  
  print(m3);  
  
  // addEntries添加一组数据,MapEntry需要使用[]包裹起来成为一个itemable（迭代操作），成为一个数组  
  m3.addEntries(  
    [MapEntry("contry", "china"),  
    MapEntry("sex", "man")]  
  );  
  print(m3); // {name: sikuai, age: 18, contry: china, sex: man}  
  
}
```

# 18. MapEntry()和.map()方法

```dart
main(){  
  // MapEntry()  
  var me = MapEntry("name", "sikuai");  
  print(me); // MapEntry(name: sikuai)  
  
  // .map()相当于遍历出里面的键值对，放到(key，value)  
  var m1 = {  
    "name":"sikuai",  
    "age":18  
  };  
  var m2 = m1.map((key,value)=>MapEntry(key, "test ${value}")); // map()取出一对值，箭头函数相当于一行函数return值，mapentry重写得到一个map  
  print(m2);  
}
```

# 19. List.forEach()和Map.forEach

```dart
main(){  
  var l1 =  [1,2,3,4,"sikuai"];  
  l1.forEach((value){  
    print("l1的forEach: ${value}");  
  });  
  
  var m1 = {  
    "name":"sikuai",  
    "age":18  
  };  
  m1.forEach((key,value){  
    print("key is ${key},value is ${value}");  
  });  
}
```

# 20. if else和bool布尔类型

```dart
main(){  
  var a = "12";  
  if (a == "123"){  
    print("a是123");  
  }else if(a == "456"){  
    print("a是456");  
  }else{  
    print("不是123也不是456");  
  }  
  var b = true;  
  if(!b){  
    print("真");  
  }else{  
    print("假");  
  }  
}
```

# 21. is判断类型

```dart
main(){  
  var name = "sikuai";  
  if (name is String) {  
    print("name是string类型的");  
  }else{  
    print("asdasd");  
  }  
}
```

# 22. 三元运算符

```dart
main(){  
  // 三元运算符，？左侧为true则返回:左侧的，为假返回右侧的  
  var a = true?"真":"假";  
  print(a); // 真  
}
```

# 23. 类和对象（this）

## 23.1. 无参构造

```dart
  
class Person{  
  // 属性是类下的变量  
  // String name; // 不行，需要初始化一个值  
  String name = "sikuai";  
  int age = 18;  
  late String a; // 使用late可以暂不给值，即稍后初始化  
  // 对象的方法  
  action(){  
    print("人类的动作");  
  }  
  // 对象可以访问自己的属性  
  showInfo(){  
    print("name is ${name},age is ${age}"); 
  }  
  // 对象可以访问自己的属性  
  showInfo2(){  
    print("name is ${name},age is ${age}, a is ${a}");  
  }  
}  
  
main(){  
  // 类和对象  
  // 创建实例，创建对象  
  Person p1 = new Person(); // 规范  
  var p2 = Person(); // 简写  
  p1.name = "张三";  
  p1.age = 22;  
  p1.showInfo();  
  
  p2.name = "李四";  
  p2.age = 16;  
  p2.a = "现在进行初始化";  
  p2.showInfo2();  
}
```

## 23.2. 有参构造

```dart
  
class Person{  
  // 属性是类下的变量  
  // String name; // 不行，需要初始化一个值  
  String name = "sikuai";  
  int age = 18;  
  late String a; // 使用late可以暂不给值，即稍后初始化  
  // 对象的方法  
  action(){  
    print("人类的动作");  
  }  
  // 对象可以访问自己的属性  
  showInfo(){  
    print("name is ${name},age is ${age}");  
  }  
  // 对象可以访问自己的属性  
  showInfo2(){  
    print("name is ${name},age is ${age}, a is ${a}");  
  }  
  
  // 指定接收的参数  
  Person(String name,int age,String a){  
    this.name = name;  
    this.age = age;  
    this.a = a;  
  }  
}  
  
main(){  
  var p3 = Person("王五",18,"a");  
  print(p3);  
}
```

# 24. hashCode判断函数和变量是否一致

```dart
class Person{  
  String name = "sikuai";  
  int age = 18;  
  showInfo(){  
    print("name is ${this.name}");  
  }  
  Person(String name,int age){  
    this.name = name;  
    this.age = age;  
  }  
}  
  
main(){  
  var p1 = new Person("sikuai",18);  
  print(p1.hashCode); // 985590427  
  p1  = new Person("sikuai",18);  
  print(p1.hashCode); // 834181739  
  // 两次hashCode不一致说明每次创建对象都是新的  
  
  int a = 100;  
  int b = 100;  
  print("a's hashCode is ${a.hashCode},b's hashCode is ${b.hashCode}"); //a's hashCode is 1160100,b's hashCode is 1160100  
}
```

# 25. static静态变量 静态方法

```dart
class Student{  
  String name = "四块";  
  int age = 18;  
  // static指定静态变量和静态方法  
  static String time = "6:00";  
  static getTime(){  
    print("time is ${time}"); // static方法只能访问static变量  
  }  
}  
  
main(){  
  // 静态方法  支持不创建对象进行调用  
  Student.getTime(); // time is 6:00  
  Student.time = "7:00"; // 不创建对象修改静态变量  
  Student.getTime(); // time is 7:00  
  
  // 对象不能访问静态方法  
  var p2 = new Student();  
  p2.name; // 可以  
  // p2.time; // 报错  
}
```
