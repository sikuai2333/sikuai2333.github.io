---
title: NoneBot搭配gocqhttp创建QQ机器人
tags:
- QQ机器人
- nonebot
- go-cqhttp
- python
- blog
- 开发技术
categories:
- 技术
keywords: qq机器人
description: NoneBot搭配gocqhttp创建QQ机器人
top_img: https://img.gumengya.com/api/mc/11.jpg
comments: false
cover: https://img.gumengya.com/api/mc/11.jpg
copyright: true
copyright_author: sikuai
copyright_author_href: https://sikuai2333.github.io
highlight_shrink: false
date: 2023-07-30 08:16:02
updated: null
aside: null
abcjs: null
---
<font color="#e36c09">原本零零散散写过一些脚本，有的年久失修，有的代码不规范，趁假期全部解决并移入家里云。适当添加新功能</font>

## 搭建环境

* 服务器系统Ubuntu-server 22.04.1
* python版本3.10.11(官方要求大于3.7还是3.8忘了)

## 重新创建NoneBot

### 首先创建venv虚拟环境^\[https://zhuanlan.zhihu.com/p/341481537]

```bash
# 安装venv
sudo aptinstall python3-venv
```

```python
# 创建新的虚拟环境
python3 -m venv qqbot
# 进入虚拟环境
source ./qqbot/bin/activate
# 运行完成退出venv环境
deactivate
```

### 安装NoneBot

首先进入上面的虚拟环境，然后安装pipx 官方文档^\[https://nonebot.dev/docs/quick-start]

```python
python3 -m pip install --user pipx
# 安装失败使用 pip3 install pipx就行

python3 -m pipx ensurepath
# 出现re-login等词关掉当前终端窗口再打开

pipx install nb-cli
# 安装脚手架

nb create
# 新建项目（然后根据命令行的提示即可，我使用的是插件开发者，后续的创建venv选择了n）

cd sikuaibot
# 进入机器人目录

nb run --reload
# 启动尝试
```

出现下文说明正常启动了

```text
[INFO] uvicorn | Uvicorn running on http://127.0.0.1:8080 (Press CTRL+C to quit)

端口什么的在sikuaibot文件夹中的env.dev
添加HOST=127.0.0.1   PORT=32223 来进行配置
```

***

### 下载运行go-cqhttp

```shell
GitHub官方链接
https://github.com/Mrs4s/go-cqhttp

根据自己的服务器架构选择合适的版本

对服务器文件夹进行chmod 777，上传文件，或者使用wget直接下载
下载完成后chmod 777 go-cqhttp
然后./go-cqhttp   运行文件
```

根据自己的需要选择，这里我选择的是<font color="#e36c09">3反向链接</font>\
他会生成配置文件config.ymal

```yaml
修改QQ号
末尾修改反向的链接
- ws://127.0.0.1:8080/onebot/v11/
```

然后./go-cqhttp\
会生成session和其他的文件\
建议扫码登陆，使用密码可能会登录失败
