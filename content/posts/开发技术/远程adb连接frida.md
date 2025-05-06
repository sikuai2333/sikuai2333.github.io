---
title: 远程adb连接frida
date: 2025-02-08
categories:
  - 开发技术
tags:
  - blog
  - 开发技术
lastmod: 2025-05-06T00:29:57.842Z
---
# 1. 远程adb

开发者选项开启wifi调试并信任，电脑和手机在同一wifi下

```
adb connect 192.168.237.243:41527
adb devices
adb shell
su
cd /data/local/tmp
./frida-server -l 192.168.237.243
```

# 2. 远程frida

```
frida -H 192.168.239.243
不管什么都带上就行
```

# 3. 获取手机软件

```shell
adb connect 192.168.243.243:39879 
不知道为什么数据线总是offline
adb shell pm path  com.magicalstory.AppStore 
获取软件安装包位置
adb shell cp /data/app/~Q==/base.apk /sdcard/base.apk
使用cp命令将文件提取到根目录
adb  pull /sdcard/base.apk
使用adb pull将文件拉到本地
```
