---
title: termux proot安装Ubuntu编译安装python3.10
tags:
- termux
- python
- blog
- 系统运维
categories:
- 技术
keywords: termux
description: termux使用proot安装Ubuntu，编译安装python3.10
top_img: https://img.gumengya.com/api/mc/108.jpg
comments: false
cover: https://img.gumengya.com/api/mc/108.jpg
copyright: true
copyright_author: sikuai
copyright_author_href: https://sikuai2333.github.io
highlight_shrink: false
date: 2023-07-29 08:11:02
updated: null
copyright_url: null
copyright_info: null
aside: null
abcjs: null
---
> 视频教程

# 官网安装pRoot

[官网WIKI](https://wiki.termux.com/wiki/PRoot#Installing_Linux_distributions)

## 使用proot安装

```shell
#列举所有版本
proot-distro list
#安装Ubuntu
#如果下载失败请使用魔法
proot-distro install ubuntu
```

## 快捷启动脚本

```shell
#新建文件
vim u.sh
#如果没有vim则用下面的命令安装，顺带安装wget,git
apt install vim
apt install wget
apt install git
#使用i开始编辑，输入
proot-distro login ubuntu
#使用ESC，输入:wq保存退出
#使用chmod赋予权限
chmod -R 777 u.sh
#下次./u.sh即可启动
./u.sh
```

## 替换国内源

```shell
#编辑/etc/apt/sources.list
vim /etc/apt/sources.list
#注销原有的内容，粘贴下面的
deb http://mirrors.tuna.tsinghua.edu.cn/ubuntu-ports/ jammy main restricted universe multiverse

deb http://mirrors.tuna.tsinghua.edu.cn/ubuntu-ports/ jammy-updates main restricted universe multiverse

jammy-updates main restricted universe multiverse

deb http://mirrors.tuna.tsinghua.edu.cn/ubuntu-ports/ jammy-backports main restricted universe multiverse

deb http://ports.ubuntu.com/ubuntu-ports/ jammy-security main restricted universe multiverse

#然后向上文一样保存退出
apt-get update
```

## 安装python

**有的教程编译安装会报错，建议就按这个试试**

```shell
#wget下载
wget https://www.python.org/ftp/python/3.10.12/Python-3.10.12.tgz
#安装依赖
apt-get install -y make build-essential libssl-dev zlib1g-dev libbz2-dev libreadline-dev libsqlite3-dev wget curl llvm libncurses5-dev libncursesw5-dev xz-utils tk-dev
#配置编译安装
./configure && make && make install
```
