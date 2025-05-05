---
title: awvs手动卸载重装报错
tags:
  - awvs
  - 漏洞扫描
  - Ubuntu
  - blog
  - 系统运维
categories:
  - 技术
keywords: awvs手动卸载重装报错
description: awvs手动卸载重装报错
top_img: https://api.gmit.vip/Api/McImg?format=image
comments: false
cover: https://api.gmit.vip/Api/McImg?format=image
copyright: true
copyright_author: sikuai
copyright_author_href: https://sikuai2333.github.io
highlight_shrink: false
date: 2023-08-24 07:38:56
updated: 
copyright_url: 
copyright_info: 
aside: 
abcjs: 
lastmod: 2025-05-05T08:22:26.067Z
---
# 报错如下：

Configuring acunetix user...\
User acunetix already exist.\
Home directory for user acunetix not found.\
Aborting installation

## 删除用户

```shell
userdel -r acunetix
提示正在被使用
userdel: user acunetix is currently used by process 575244
停止服务
sudo systemctl stop acunetix
然后删除
```
