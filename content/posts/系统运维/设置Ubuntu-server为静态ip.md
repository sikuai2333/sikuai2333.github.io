---
title: 设置Ubuntu-server为静态ip
tags:
- Ubuntu
- blog
- 系统运维
categories:
- 技术
keywords: Ubuntu-server
description: 设置Ubuntu-server为静态ip
top_img: https://img.gumengya.com/api/mc/26.jpg
comments: false
cover: https://img.gumengya.com/api/mc/26.jpg
copyright: true
copyright_author: sikuai
copyright_author_href: https://sikuai2333.github.io
highlight_shrink: false
date: 2023-07-30 08:25:25
updated: null
copyright_url: null
copyright_info: null
aside: null
abcjs: null
---
**家里云每次重启都会重新获取ip，绑定的ssh,数据库等都要重新配置，查了两篇教程貌似文件不太一样，顺手记录下来。**\
![](https://s2.loli.net/2023/07/28/Zei65ADrafbR173.png)

# 编辑配置文件

````shell
sudo su
#cd到/etc/netplan/
cd /etc/netplan/
#编辑配置文件 tab键补全就行
vim xxxx.yaml 
#vim编辑器的用法简述一下，i键编辑，编辑完后esc退出然后英文冒号:,输入wq保存或者q!放弃保存

```yaml
# This is the network config written by 'subiquity'
network:
  ethernets:
    enp1s0:
      dhcp4: no
      addresses: [192.168.1.66/24]    #配置的静态ip地址和掩码
      optional: true
      routes:   #有的使用gateway会报错，提示已弃用
        - to: default
          via: 192.168.1.1
      nameservers:
        addresses: [8.8.8.8,1.1.1.1]    #DNS服务器地址，多个DNS服务器地址需要用英文逗号分隔开
  version: 2
````

```shell
netplan apply
# 然后执行netplan apply即可
```
