---
title: Hexo文章添加网易云歌单播放器，获取网易云歌单外链id，解决资源加载失败问题
tags:
  - 博客美化
  - 前端
  - blog
  - 网站建设
categories:
  - 博客美化
  - 网站建设
keywords: 网易云,Hexo
description: 获取网易云歌单外链id，解决资源加载失败问题
top_img: https://s2.loli.net/2023/05/18/auWTNJO3bUADYMr.png
comments: false
cover: https://s2.loli.net/2023/05/18/auWTNJO3bUADYMr.png
copyright: true
copyright_author: sikuai
highlight_shrink: false
date: 2023-05-18 19:36:30
updated: 
copyright_url: 
copyright_info: 
aside: 
abcjs: 
lastmod: 2025-05-06T06:36:39.027Z
---
# 1. 起因

在写about介绍页面的时候想添加一个歌单，首选肯定是网易云啊，隐约记得他有播放器的代码生成，遂打开浏览器，找到下面的网页 https://music.163.com/#/outchain/0/6815390387\
![](https://s2.loli.net/2023/05/18/5lMEb8nSCf2OuXx.png)\
可以看出歌单可以正常显示并且可以播放，下面是提供的iframe框架代码

```html
<iframe frameborder="no" border="0" marginwidth="0" 
marginheight="0" width=330 height=86 
src="//music.163.com/outchain/player?type=2&id=27646205&auto=1&height=66">
</iframe>
```

我们大致可以看出控制窗体的宽高和type，id以及auto（自动播放）\
此文只提及type和id

# 2. 获取歌单ID

### 2.1.1. 看不到生成按钮

首先是歌单界面看不到“生成外链播放器”，我们可以点击<strong>“分享”</strong>，发送后来到<strong>个人主页</strong>，最近的动态，点击进去看到的歌单就可以看到生成按钮了

### 2.1.2. 版权原因不能生成

![](https://s2.loli.net/2023/05/18/is9BArTxCZjphLS.png)\
我们只需要右键，选择<strong>检查</strong>，在右侧看到data-href后面的一串数字，复制即是我们需要的id\
![](https://s2.loli.net/2023/05/18/CBZ6HPAXagxFLft.png)

### 2.1.3. type的值

type分为单曲和歌单，分别是2和0，如下\
![](https://s2.loli.net/2023/05/18/auWTNJO3bUADYMr.png)\
填错资源会加载不出来，我就踩了坑，还以为是网易加了校验（雾）

# 3. 其他播放器

butterfly支持aplayer，还没时间研究，看文档功能挺强大的，有时间再琢磨

* APlayer https://aplayer.js.org/#/zh-Hans/?id=%E5%85%A5%E9%97%A8
