---
title: hexo博客butterfly主题使用gitalk和valine作为评论
author: 四块
top: false
cover: false
toc: true
mathjax: false
date: 2022-12-14 10:57:12
img: https://s2.loli.net/2023/01/23/doHIevCT6axsOG5.jpg
coverImg: https://s2.loli.net/2023/01/23/doHIevCT6axsOG5.jpg
tags:
  - 博客美化
  - 评论
  - blog
  - 网站建设
categories:
  - 博客美化
  - 网站建设
lastmod: 2025-05-06T06:36:25.670Z
---
# 1. 使用Gitalk

![](https://s2.loli.net/2023/01/23/doHIevCT6axsOG5.jpg)

<center>Gitalk界面</center>

## 1.1. 登录GitHub新建

第一步登录你的[GitHub](https:github.com) ，此处默认你有GitHub账号并有基础的阅读理解能力。\
点击右上角的头像，选择“settings”，在左栏底部找到“Developer settings”， 或者直接点击  [Developer settings](https://github.com/settings/developers) ，选择"OAuth Apps" ，点击New OAuth App新建一个。\
![](https://s2.loli.net/2023/01/23/iDO479ZFha5WLHg.jpg)\
![](https://s2.loli.net/2023/01/23/iDO479ZFha5WLHg.jpg)\
![](https://s2.loli.net/2023/01/23/iDO479ZFha5WLHg.jpg)

名字随便起，下面填上博客主页链接，回调地址填自己域名就行（我的是GitHub page绑定了一个cname，所以填的自己的域名），

## 1.2. 获取ID

填完以后会获取到client ID和 Client secrets，这里码上了。\
![](https://s2.loli.net/2023/01/23/VnxmgY43EMZ7AiQ.jpg)

我们复制两个值来到butterfly的配置文件 \_config.butterfly.yml

![](https://s2.loli.net/2023/01/23/U5FXBIj1TCSem28.jpg)

repo是存放的仓库repo，我这里填的就是 io 的仓库。当然，你也可以去新建一个。owner 填自己的 github 账号名，配置完成可以自己评论一下试试。

# 2. valine

<strong>因为GitHub在国内属于半墙状态，且gitalk需要GitHub登录使用，考虑到用户体验，且butterfly支持两个评论组件切换，这里再配置一个valine评论组件</strong>\
\#样式如下\
![](https://s2.loli.net/2023/01/23/eWyAfutQ7ox4CRK.jpg)

[Valine网址](https://valine.js.org)

## 2.1. 获取APP ID 和 APP Key

请先[登录](https://leancloud.cn/dashboard/login.html#/signin)或[注册](https://leancloud.cn/dashboard/login.html#/signup) `LeanCloud`, 进入[控制台](https://leancloud.cn/dashboard/applist.html#/apps)后点击左下角[创建应用](https://leancloud.cn/dashboard/applist.html#/newapp)\
LeanCloud国内需要实名认证，填入姓名和身份证号并使用支付宝扫脸<font color=red>免费</font>完成认证。\
或者选择上方的华北为国际版，国际版操作一样但是域名无需备案，账号不用实名。\
点击[创建应用](https://leancloud.cn/dashboard/applist.html#/newapp)名字随便，选择开发版，点击右下角设置。\
![](https://s2.loli.net/2023/01/23/OXxL3a5TqHS98rU.jpg)

如图获取ID，防止泄露这里码上了\
![](https://s2.loli.net/2023/01/23/NAapDYGku9cmZFd.jpg)\
填入butterfly的配置文件

![](https://s2.loli.net/2023/01/23/flZ4I2BTNumKXV3.jpg)\
效果如图\
![](https://s2.loli.net/2023/01/23/oUlMPpOaezIK3H8.png)
