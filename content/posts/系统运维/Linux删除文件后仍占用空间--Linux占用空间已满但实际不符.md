---
title: Linux删除文件后仍占用空间--Linux占用空间已满但实际不符
date: 2023-04-12
updated: 2023-04-12
comments: true
description: Linux删除文件后仍占用空间
keywords: 踩坑
author: 四块
top: false
cover: https://s2.loli.net/2023/04/12/C8AVeFymOYl1RIM.png
toc: true
mathjax: false
img: null
coverImg: null
summary: null
tags:
- 踩坑
- Linux
- 服务器
- blog
- 系统运维
categories:
- 技术
---
# 问题描述

我在服务器搭建AriaNg服务，下载了大约8G的文件，打包上传阿里云盘后在宝塔将文件删除，因为服务器剩余空间只有29G，所以在意了一下空间大小，发现删除后占用空间仍然39G，查阅一番教程记录下来。\
![](https://s2.loli.net/2023/04/12/C8AVeFymOYl1RIM.png)

# 解决办法

\#先记录一下排查空间的办法

```shell
DF -i # 查看inode使用率
df -h # 检查根目录空间占用
du -m –max-depth=1 # 检查各目录占用的空间
```

\#原因 删除文件后仍有进程占用，所以kill进程即可

![](https://s2.loli.net/2023/04/12/Mtvecn1g5SiNXOT.png)

```shell
lsof |grep delete # 查询进程
kill -9 PID # 如上图的PID就是1241621
```

kill以后空间就恢复正常了
