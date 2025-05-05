---
title: bing总是重定向过多的解决办法
date: 2024-09-30
categories:
- 网站建设
tags:
- blog
- 网站建设
---
来源[微软社区](https://answers.microsoft.com/zh-hans/microsoftedge/forum/all/%E5%9C%A8edge%E9%87%8C%E6%89%93%E5%BC%80%E5%85%B3/4c2d87b0-333b-4dd2-8877-cfb1e087a702)

简单讲就是删除插件“当前已知会引起这个问题的插件为Header Editor和ModHeader”，我还装了个proxyxxxxxx，卸载后恢复正常。

然后可以**以管理员权限**打开cmd，执行下面的命令

```cmd
ipconfig /release
ipconfig /renew
ipconfig /flushdns
ipconfig /registerdns
netsh int ip reset
netsh winsock reset
netsh winhttp reset proxy
```

然后重启电脑
