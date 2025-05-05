---
title: 借助cloudflare实现零成本内网穿透
tags:
- cloudflare
- 内网穿透
- blog
- 网站建设
categories:
- 技术
keywords: 借助cloudflare实现零成本内网穿透
description: 借助cloudflare实现零成本内网穿透
top_img: https://s2.loli.net/2023/05/27/8iSsGB6PFvadWCX.png
comments: false
cover: https://s2.loli.net/2023/05/27/8iSsGB6PFvadWCX.png
copyright: true
copyright_author: sikuai
copyright_author_href: https://sikuai2333.github.io
highlight_shrink: false
date: 2023-05-27 16:32:07
updated: null
copyright_url: null
copyright_info: null
aside: null
abcjs: null
---
<strong>非零基础，不提创建域名、配置DNS的事了</strong>\ <strong>免费域名freenom，每年续一次</strong>\ <strong>免费CDN，就是这里的cloud flare</strong>\ <strong>注册PayPal（跟着教程走，后续如果不用付款就不用）</strong>

# 1. 第一步

## 1.1. 免费注册域名

省略，后续可能的话补上\
使用的[Freenom](https://www.freenom.com/)，网上教程很多，注册也不麻烦，就是网址国内可能交互可能不太方便\
![](https://s2.loli.net/2023/05/27/8u6VjlkwyESKdn7.png)

# 2. 第二步

## 2.1. 添加域名到cloud flare

省略，后续可能的话补上，默认你的域名已经是Active\
![](https://s2.loli.net/2023/05/27/sVTWZjJv6B1hLfe.png)

## 2.2. 添加隧道

然后点击域名，进入后选择左侧的Access的Launch Zero Trust\
![](https://s2.loli.net/2023/05/27/JulmbHT9xYkdgV8.png)\
选择隧道，然后新建一个\
![](https://s2.loli.net/2023/05/27/oGPcaVJ6DAW5qCb.png)\
此处需要选择套餐，选择0元的就行，但是可能会需要支付，我看网上教程有些人没说，但是我遇到了，所以记录一下，选择0元的，绑定PayPal支付就行，PayPal可以绑定银联，零费用大概几分钟就好了。\
![](https://s2.loli.net/2023/05/27/8iSsGB6PFvadWCX.png)\
新建一个隧道需要新建一个名字，随便起就行了，然后选择docker，复制下面的代码然后执行，我这里是用的screen保活，不知道是不是多此一举了。

```shell
screen -R 窗口名
# 新建

screen -r 窗口名
# 恢复

# Ctrl+A+D
# 退出窗口
```

然后要设置子域，这里不是必须的，也可以不设子域，但是要没解析过，ip填本地ip就行。\
![](https://s2.loli.net/2023/05/27/1WhsVD3dHtyLiuK.png)\
然后就可以访问啦，当然命令行可以看到访问的详细信息。\
![](https://s2.loli.net/2023/05/27/kyipj81rB5TIgFh.png)
