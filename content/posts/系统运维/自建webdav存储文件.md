---
title: 自建webdav存储文件
date: 2024-09-30
categories:
  - 系统运维
tags:
  - blog
  - 系统运维
lastmod: 2025-05-06T00:27:08.389Z
---
# 1. 使用docker搭建

创建一个 docker-compose.yml 然后填入

```yaml
version: '3.2'

services:
  webdav-zotero:
    image: morrisjobke/webdav
    container_name: webdav-zotero
    environment:
      USERNAME: 账号
      PASSWORD: 密码
    volumes:
      - 挂载本机路径:/var/webdav
    restart: always
    ports:
      - "本地对外端口:80"
```

然后执行 docker-compose up -d  （拉取镜像，创建然后启动容器）\
使用 docker-compose down 可以停止并删除（比以前方便多了）

然后放行端口

## 1.1. 软件使用报错403

obsidian添加第三方remote插件测试提示403，原因是当前目录没有足够权限创建，赋予777以后正常

## 1.2. 为什么选这个

另一个webdav项目对中文编码不支持
