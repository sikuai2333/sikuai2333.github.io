---
title: 命令行用unzip和p7zip带密码解压
date: 2025-01-18
categories:
- 系统运维
tags:
- blog
- 系统运维
---
# 1. unzip解压

```shell
#unzip解压
unzip -P 解压密码 文件
#unzip解压到同一文件夹
unzip -j -P 解压密码 文件
```

# 2. p7zip带密码解压

```shell
# 先安装
apt install 7za-full
# 带密码解压
7za x -p密码 文件
# 解压到指定目录（-p和-o都没有空格）
7za x -p密码 文件 -o目录 
```
