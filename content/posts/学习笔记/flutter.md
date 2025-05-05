---
title: flutter学习笔记
date: 2025-04-01
categories:
- 学习笔记
tags:
- blog
- 学习笔记
---
# 1. 一

https://www.bilibili.com/video/BV1RZ421p7BL

## 1.1. 创建第一个flutter应用

```dart
import 'package:flutter/cupertino.dart';  
import 'package:flutter/material.dart';  
  
/// 所有flutter代码都在lib目录中，默认入口是main.dart,可以手动指定  
/// runApp把你传入的widght小组件显示在屏幕上  
/// runApp必须包含import 'package:flutter/material.dart';  
/// runApp只要一个参数就是Widget，翻译就是组件、控件，所有显示的都是Widget的子类  
/// Widget是一个抽象类abstract class，所以只能创建他的子类，例如Text  

/// Text是一个文本框，data默认参数，必须写，用""传入，其他参数在{}中，在编辑器中按住ctrl+左键可以定位查看，不用记 
  
main(){  
  runApp(Text("hello flutter",  
    textDirection: TextDirection.ltr,  // 必须包含的文本方向
    style: TextStyle(  
      fontSize: 100,  
        color: Colors.blue  
    ),  
  ));  
}
```

## 1.2. 使用material主题和scaffold脚手架搭建app

### 1.2.1. material初体验

```dart
import 'package:flutter/material.dart';  
// material包含文本方向，不需要特殊指定  
main(){  
  // 不能在runApp中定义  
  String title = "sikuai";  
  runApp(MaterialApp(  
    // home: Text("abc"),  
    home: Center(  
      child: Text(title,style: TextStyle(fontSize: 60),),  
    ),  
  ));  
}
```

### 1.2.2. scaffold脚手架搭建

```dart
import 'package:flutter/cupertino.dart';  
import 'package:flutter/material.dart';  
  
/// scaffold脚手架  
/// 参数appBar需要用leading（最左侧）和title（中间位置）可以用Widget  
/// 注意系统图标要在pubspec.yaml中配置 uses-material-design:true  
main(){  
  runApp(MaterialApp(  
    home: Scaffold(  
      appBar:  AppBar (  
        leading: Icon(Icons.home),  
        title: Text("导航栏标题"),  
      ),  
    ),  
  ));  
}
```

## 1.3. 使用floatingActionButton创建悬浮按钮，TextButton创建可点击的文本按钮，onPress按下长按、onLongPress长按，GestureDetector手势识别onTap点击onLongPress长按的识别

```dart
import 'package:flutter/cupertino.dart';  
import 'package:flutter/material.dart';  
  
main() {  
  int i = 0;  
  runApp(MaterialApp(  
    home: Scaffold(  
      appBar: AppBar(  
        // leading: Icon(Icons.arrow_back), // 导航栏左侧，如果页面是弹出的则添加一个backbutton  
        // automaticallyImplyLeading: false, // 上面的是默认开启的，关闭上面的功能  
        leading: Text("后退"),  
        title: Text("title"),  
        actions: [  
          Text("111"),  
          Icon(Icons.home),  
        ],  
        // 脚手架 上面的appBar从左到右依次为leading、title、actions  
      ),  
      floatingActionButton: FloatingActionButton(  
        onPressed: () {  
          print("点击了按钮");  
        },  
        child: const Icon(Icons.add),  
        tooltip: "长按了按钮",  
      ),  
      // 只能右下角写一个，想多写可以使用body、指定行和列  
      body: Row(  
        children: [  
          Text("i=$i"),  
          Spacer(),  
          Text("body222"),  
          Spacer(),  
          TextButton(  
            onPressed: () {  
              print("点击了TextButton按钮");  
            },  
            onLongPress: () {  
              print("长按TextButton按钮");  
            },  
            child: Icon(Icons.menu),  
          ),  
          Spacer(),  
          // GestureDetector手势点击长按，需要在child包裹一个控件进行触发  
          GestureDetector(  
            onLongPress: () {  
              print("手势长按");  
            },  
            onTap: () {  
              print("手势点击${++i}"); // 还没学页面刷新，暂时在print输出  
            },  
            child: Text("手势点我"),  
          )  
        ],  
      ),  
    ),  
  ));  
}
```

## 1.4. setState刷新页面，自动更新

```dart
import 'package:flutter/cupertino.dart';  
import 'package:flutter/material.dart';  
  
main() {  
  runApp(MaterialApp(home: MyApp())); // 理论上只写有状态的widget，不直接写Text什么的  
}  

// stful自动补全下面的

class MyApp extends StatefulWidget {  
  const MyApp({super.key});  
  
  @override  
  State<MyApp> createState() => _MyAppState();  
}  
  
class _MyAppState extends State<MyApp> {  
  int i = 0;  
  @override  
  Widget build(BuildContext context) {  
    return Row(  
      children: [  
        ElevatedButton(  
            onPressed: () {  
              print("按钮被点击了,${++i}");  
              setState(() {});   // setState一定要有，可以为空但是必须有才能刷新页面显示
            },  
            child: Text("点击${i}次"))  
      ],  
    );  
  }  
}
```

## 1.5. build可以嵌套

```dart
import 'package:flutter/cupertino.dart';  
import 'package:flutter/material.dart';  
  
main() {  
  runApp(MaterialApp(  
    home: Widget1(),  
  ));  
}  
  
class Widget1 extends StatefulWidget {  
  const Widget1({super.key});  
  
  @override  
  State<Widget1> createState() => _Widget1State();  
}  
  
class _Widget1State extends State<Widget1> {  
  @override  
  Widget build(BuildContext context) {  
    return Column(  
      children: [  
        Text("111"),  
        Text("222"),  
        Widget2(),   // 新建一个stful嵌套进来，可以正常显示
      ],  
    );  
  }  
}  
  
class Widget2 extends StatefulWidget {  
  const Widget2({super.key});  
  
  @override  
  State<Widget2> createState() => _Widget2State();  
}  
  
class _Widget2State extends State<Widget2> {  
  int i = 0;  
  @override  
  Widget build(BuildContext context) {  
    return Column(  
      children: [  
        Text("222"),  
        ElevatedButton(  
            onPressed: () {  
              print("点击了${++i}次");  
              setState(() {  
                // 可以为空但一定要有setState否则不会刷新  
              });  
            },  
            child: Text("$i"))  
      ],  
    );  
  }  
}
```

## 1.6. initState生命周期和dispose销毁

```dart
import 'package:flutter/cupertino.dart';  
import 'package:flutter/material.dart';  
  
main() {  
  runApp(MaterialApp(  
    home: Scaffold(  
        appBar: AppBar(  
          title: Text('生命周期标题'),  
        ),  
        body: HomePage()),  
  ));  
}  
  
class HomePage extends StatefulWidget {  
  int i = 0;  
  HomePage({super.key});  
  
  @override  
  State<HomePage> createState() => _HomePageState();  
}  
  
class _HomePageState extends State<HomePage> {  
  void initState(){  
    super.initState();  // 生命周期方法  
    print("initState初始化");  
  }  
  // 此处暂时用不到销毁页面  
  // void dispose(){  
  //   super.dispose();  //   print("销毁");  
  // }  @override  
  Widget build(BuildContext context) {  
    return Text("abc");  
  }  
}
```

## 1.7. container设置尺寸大小和背景颜色

<strong style="color:red">注意一定要使用Scaffold包裹起来，否则大小设置不生效</strong>

```dart
import 'package:flutter/cupertino.dart';  
import 'package:flutter/material.dart';  
  
main() {  
  runApp(MaterialApp(  
    home: Scaffold(  
      appBar: AppBar(  
        title: Text('appbarTitle'),  
      ),  
      body: Widget1(),  
    ),  
  ));  
}  
  
class Widget1 extends StatefulWidget {  
  const Widget1({super.key});  
  
  @override  
  State<Widget1> createState() => _Widget1State();  
}  
  
class _Widget1State extends State<Widget1> {  
  @override  
  Widget build(BuildContext context) {  
    return Container(  
      width: double.maxFinite,  // 占据整个宽度
      height: 100,  
      color: Colors.red,  // 底色颜色
      alignment: Alignment.center, // 对齐方式  
      child: Text(  
        "abc",  
        style: TextStyle(fontSize: 40, backgroundColor: Colors.yellow),  
      ),  
    );  
  }  
}
```

## 1.8. Row和Column的对齐方式、Expanded的按比例缩放子控件

```dart
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

main() {
  runApp(MaterialApp(
    home: Scaffold(
      appBar: AppBar(
        title: Text("title"),
      ),
      body: Widget1(),
    ),
  ));
}

class Widget1 extends StatefulWidget {
  const Widget1({super.key});

  @override
  State<Widget1> createState() => _Widget1State();
}

class _Widget1State extends State<Widget1> {
  @override
  Widget build(BuildContext context) {
    // return Row(
    //   // mainAxisAlignment: MainAxisAlignment.center, // 对齐方式
    //   // mainAxisAlignment:MainAxisAlignment.spaceEvenly,//均匀分布子控件，两边顶头也有空间
    //   // mainAxisAlignment:MainAxisAlignment.spaceBetween,// 均匀分布子控件，两边顶头没有空间
    //   children: [
    //     Text("abc123",style: TextStyle(fontSize: 40,backgroundColor: Colors.red),),
    //     Text("123abc",style: TextStyle(fontSize: 40,backgroundColor: Colors.green),)
    //   ],
    // );
    return Container(
      height: 200,
      color: Colors.green,
      child: Row(
        children: [
          // Container(
          //   width: 100,
          //   height: 100,
          //   color: Colors.blue,
          // ),
          Expanded(
              // 按比例缩放子控件
              // flex: 1, // 默认值为1
              child: Text(
            "abc=",
            style: TextStyle(
                fontSize: 20,
                color: Colors.red,
                backgroundColor: Colors.yellow),
          )),
          Expanded(
              // 显示占位大小
              child: Container(
            color: Colors.red,
          )),
          Expanded(
              flex: 2,
              child: Text(
                "abc=",
                style: TextStyle(
                    fontSize: 20,
                    color: Colors.red,
                    backgroundColor: Colors.yellow),
              )),
          Expanded(
              // 显示占位大小
              child: Container(
            color: Colors.red,
          )),

          Expanded(
              child: Text(
            "abc=",
            style: TextStyle(
                fontSize: 20,
                color: Colors.red,
                backgroundColor: Colors.yellow),
          ))
        ],
      ),
    );
  }
}

```

## 1.9. decoration背景/前景装饰和Container的嵌套尺寸

1. **`BoxDecoration`**：这是最常用的装饰类，用于实现边框、圆角、阴影、形状、渐变、背景图像等功能。它支持以下属性：
   * `color`：背景颜色。
   * `image`：背景图像。
   * `border`：边框样式。
   * `borderRadius`：圆角大小。
   * `boxShadow`：阴影效果。
   * `gradient`：渐变效果。
2. **`ShapeDecoration`**：用于定义形状相关的装饰，比如矩形、圆形、椭圆等，并支持设置边框颜色和宽度。
3. **`UnderlineTabIndicator`**：用于实现下划线效果，常用于 TabBar 中。
4. **`FlutterLogoDecoration`**：用于绘制 Flutter 的 logo。

```dart
import 'package:flutter/cupertino.dart';  
import 'package:flutter/material.dart';  
  
main() {  
  runApp(MaterialApp(  
    home: Scaffold(  
      appBar: AppBar(  
        title: Text("title"),  
      ),  
      body: Widget1(),  
    ),  
  ));  
}  
  
class Widget1 extends StatelessWidget {  
  const Widget1({super.key});  
  
  @override  
  Widget build(BuildContext context) {  
    return Container(  
      width: 100,  
      height: 100,  
      decoration: BoxDecoration(   // 背景装饰  
        color: Colors.red,  
      ),  
      foregroundDecoration: BoxDecoration(  // 前景装饰 （覆盖上面的背景装饰）  
          color: Colors.yellow,  
          borderRadius: BorderRadius.circular(75)),  
      child: Text("body text"),  
    );  
  }  
}
```

在父组件没有指定大小而子组件有大小的时候，父组件就会贴近子组件的大小，下面就是父组件绿色无大小，子组件红色有大小，那么看不到父组件的绿色，只有红色。

```dart

    return Container(  
      color: Colors.green,  
      child: Container(  
        width: 100,  
        height: 200,  
        color: Colors.red,  
      ),  
    );  
```

# 2. 二

https://www.bilibili.com/video/BV16TCXYcEHR/

## 2.1. 基准

```dart
import 'package:flutter/material.dart';  
  
void main() {  
  runApp(const MyApp());  
}  
  
class MyApp extends StatelessWidget {  
  const MyApp({super.key});  
  
  @override  
  Widget build(BuildContext context) {  
    return MaterialApp(  
      debugShowCheckedModeBanner: false,  
      home: Scaffold(  
        backgroundColor: Colors.blue[100],  
          body: Column(  
          children: [  
            Container(  
              height: 200,  
              width: 200,  
              color: Colors.deepPurple,  
            ),  
            Container(  
              height: 200,  
              width: 200,  
              color: Colors.deepPurple[300],  
            ),  
            Container(  
              height: 200,  
              width: 200,  
              color: Colors.deepPurple[100],  
            )  
          ],  
        )  
      ),  
    );  
  }  
}
```

## 2.2. Expanded自适应高度

将Container包裹在Expnded里，就可以得到自适应高度的块，通过flex可以控制占几份。

```dart
Expanded(  
  flex: 2,  
	child: Container(  
  width: 200,  
  color: Colors.deepPurple,  
)),
```

## 2.3. ListView滑动展示

改会Container，将Column换成ListView，则得到可以上下滑动的列，超出页面高度的部分下滑可以看到。

```dart
body: ListView(  
  // scrollDirection: Axis.horizontal,  // 这行实现的是横向滑动（需要有width宽度）
  children: [  
    Container(  
      height: 400,  
      width: 200,  
      color: Colors.deepPurple,  
    ),  
    Container(  
      height: 400,  
      width: 200,  
      color: Colors.deepPurple[300],  
    ),  
    Container(  
      height: 400,  
      width: 200,  
      color: Colors.deepPurple[100],  
    )  
  ],  
)),
```

也可以使用ListView.builder

```dart
class HomePage extends StatelessWidget {  
  HomePage({super.key});  
  List names = ["小明", "张三", "李四"];  
  
  @override  
  Widget build(BuildContext context) {  
    return MaterialApp(  
      debugShowCheckedModeBanner: false,  
      home: Scaffold(  
          backgroundColor: Colors.blue[100],  
          body: ListView.builder(  
              itemCount: names.length,  // 以list的长度作为数量
              itemBuilder: (context, index) => ListTile(  
                    title: Text(names[index]),  // 遍历显示每个index对应的name值
                  ))),  
    );  
  }  
}
```

除此以外还有Gridview.builder（网格创建），Stack（堆叠）。。。

## 2.4. GestureDetector

重新回到Center

```dart
  
void myPress() {  
  print("被长按了");  
}  
  
class HomePage extends StatelessWidget {  
  HomePage({super.key});  
  
  @override  
  Widget build(BuildContext context) {  
    return MaterialApp(  
      debugShowCheckedModeBanner: false,  
      home: Scaffold(  
          backgroundColor: Colors.blue[100],  
          body: Center(  
            child: GestureDetector(  
              onTap: () {  // 也可以直接写
                print("被点击了");  
              },  
              onLongPress: myPress,  // 可以写在外面
              child: Container(  
                height: 200,  
                width: 200,  
                decoration: BoxDecoration(  
                    color: Colors.deepPurple,  
                    borderRadius: BorderRadius.circular(20)),  
                child: const Center(  
                    child: Text(  
                  "Tap me!",  
                  style: TextStyle(fontSize: 24, color: Colors.white),  
                )),  
              ),  
            ),  
          )),  
    );  
  }  
}
```

## 2.5. 页面跳转

Navigator.push和Navigator.pushNamed两个方法跳转\
当使用pushNamed的时候，在前面的页面定义路由

```dart
return MaterialApp(  
  debugShowCheckedModeBanner: false,  
  home: FirstPage(),  
  routes: {  
    '/firstpage':(context)=>FirstPage(),  
    '/secondpage':(context)=>SecondPage(),  
    '/homepage':(context)=>HomePage()  
  },  
);
```

```dart
body: Center(  
    child: Column(  
  children: [  
    ElevatedButton(  
      onPressed: () {  
        Navigator.push(context,  
            MaterialPageRoute(builder: (context) => SecondPage()));  
      },  
      child: (const Text('Go to 2nd with push')),  
    ),  
    ElevatedButton(  
      onPressed: () {  
        Navigator.pushNamed(context, '/secondpage');  
      },  
      child: (const Text('Go to 2nd with pushNamed')),  
    )  
  ],  
))
```

## 2.6. 侧边栏抽屉Draw

```dart
Scaffold(  
    appBar: AppBar(  
      centerTitle: true,  
      title: const Text('1st page'),  
    ),  
    drawer: Drawer(  
      backgroundColor: Colors.green[100],  
      child: Column(  
        children: [  
          const DrawerHeader(  // 侧栏顶部图标和文字
            child: Column(  
              children: [  
                Icon(Icons.ad_units_sharp, size: 48),  
                Text("Demo", style: TextStyle(fontSize: 26))  
              ],  
            ),  
          ),  
          ListTile(  // 每个按钮
            leading: const Icon(Icons.home, size: 32),  // 图标
            title: const Text(  
              "主页",  
              style: TextStyle(fontSize: 20),  
            ),  
            onTap: () {  
              Navigator.pop(context);  
              Navigator.push(context,  
                  MaterialPageRoute(builder: (context) => HomePage()));  
            },  
          ),  
          ListTile(  
            leading: const Icon(Icons.settings, size: 32),  
            title: const Text(  
              "设置",  
              style: TextStyle(fontSize: 20),  
            ),  
            onTap: () {  
              Navigator.push(context,  
                  MaterialPageRoute(builder: (context) => SettingPage()));  
            },  
          )  
        ],  
      ),  
    ),  
    body: Center(  
        child: Column(  
      children: [  
        ElevatedButton(  
          onPressed: () {  
            Navigator.push(context,  
                MaterialPageRoute(builder: (context) => SecondPage()));  
          },  
          child: (const Text('Go to 2nd with push')),  
        ),  
        ElevatedButton(  
          onPressed: () {  
            Navigator.pushNamed(context, '/secondpage');  
          },  
          child: (const Text('Go to 2nd with pushNamed')),  
        )  
      ],  
    )),  
  );
```
