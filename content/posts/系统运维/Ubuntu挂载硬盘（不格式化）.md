---
title: Ubuntu挂载硬盘（不格式化）
date: 2024-08-03
categories:
  - 系统运维
tags:
  - blog
  - 系统运维
lastmod: 2025-05-06T00:28:07.507Z
---
```shell
# 列举硬盘
fdisk -l
# 创建要挂载的文件夹 
mkdir /data 
# 挂载硬盘到该文件夹上 
mount /dev/sdb1 /data

```

docker run -d -e ACCOUNT=1593635744 -e WSR\_ENABLE=true -e WS\_URLS='\["ws://192.168.0.100:19988/onebot"]' --name napcat --restart=always mlikiowa/napcat-docker:latest
