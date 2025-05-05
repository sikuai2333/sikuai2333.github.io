---
title: python爬取微信小程序“点点畅行”充电桩数据，并对接QQ机器人获取
author: 四块
top: false
cover: false
toc: true
mathjax: false
date: 2022-09-21 07:09:28
tags:
- python
- 机器人
- 抓包
- blog
- 开发技术
categories:
- 技术
---
欢迎来到我的博客，第一篇也没啥唠的，简单写一篇文章吧。\
[哔哩哔哩](https://space.bilibili.com/274581343)[GitHub](https://github.com/sikuai2333)

[视频原链接](https://www.bilibili.com/read/cv18670765)\
使用的b站图床所以带有水印，懒得去掉了

## 0.1. 起因

今天中午下课去找充电桩充电，接连错过三个，小程序的刷新逻辑还有点“感人”，于是打开“黄鸟”开干。

## 0.2. 工具

蓝鸟“美化版黄鸟”\
python（有手就行）\
微信（trustmealready否则抓不到小程序）\
**主要是记录思路，代码什么的是次要的**

## 0.3. 开始

抓包过程就不放出来了，很简单，xp模块过检测，抓更新数据接口，放张测试后的截图

![](https://s2.loli.net/2022/09/19/7sbkOxBiMPrjtTw.jpg)

<center>参数好像有点问题。是个api，传入经纬度获取参数</center>

可以看到返回的json数据，简单解析一下，看看有没有逻辑

⚠️upload failed, check dev console

<center>可以看到两个特殊的参数：OccupyWays，TotalWays</center>

**（我一开始以为剩余端口是直接返回的数据，仔细一看才发现是做减法）**

既然有明文数据就好办了，打开vs开干\
![](https://s2.loli.net/2022/09/21/Tmq58YLlEVc1Hp3.jpg)

<center>简单写几行</center>

可以看到输出正是我想要的，但是这样调用还是不方便，还记得我之前搭的nonebot2机器人，简单修改后效果如下

![](https://s2.loli.net/2022/09/21/TlaLvPAwrzZFmVg.jpg)

附上代码，短短几行没啥技术含量，还请大佬勿喷

```python

'''
Descripttion:
version:
Author: sikuai
Date: 2022-09-19 13:22:27
LastEditors: sikuai
LastEditTime: 2022-09-19 13:36:59
'''
import requests
import json

url = 'https://api.hzchaoxiang.cn/api-device/api/v1/Home/AppRecentlyOnlineStation'
headers={
    'Header':'application/x-www-form-urlencoded;charset=UTF-8',
    'Longitude':'116.80847981770833',
    'Latitude':'33.984828287760415',
    'deviceTypeParam':'1'
}
res = requests.post(url,headers)
# print(res.text)
data = json.loads(res.text, strict=False)
all_data = data['data']
# print(data)
for i in range(1,10):
    TotalWays = all_data[i]['TotalWays']
    OccupyWays = all_data[i]['OccupyWays']
    Name = all_data[i]['Name']
    if TotalWays-OccupyWays > 0:
        print(Name+"有"+str(TotalWays-OccupyWays)+"个空")
```

对接机器人我就放个图，毕竟大家框架都不太一样

!\[]
