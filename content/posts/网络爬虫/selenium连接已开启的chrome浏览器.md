---
title: selenium连接已开启的chrome浏览器
date: 2023-12-08
categories:
  - 网络爬虫
tags:
  - blog
  - 网络爬虫
lastmod: 2025-05-06T00:29:39.860Z
---
chromedrive：下载安装配置Path，不赘述\
对于chrome，找到安装位置，使用命令行

```cmd
C:\Program Files\Google\Chrome\Application>chrome.exe --remote-debugging-port=9222
```

启动9222端口并打开chrome浏览器

python脚本

```python
import json
import os
from selenium import webdriver
from selenium.webdriver.common.by import By
from lxml import etree
#去除selenium自动提示
options = webdriver.ChromeOptions()
# options.add_experimental_option('excludeSwitches', ['enable-automation'])
#去除selenium检测
options.add_argument('--disable-blink-features=AutomationControlled')
options.add_argument('--disable-blink-features=AutomationControlledByDomain')
options.add_argument('--disable-blink-features=AutomationControlledByUrl')
options.add_argument('--disable-blink-features=AutomationControlledByUrlBlockList')
#去除证书
options.add_argument('-ignore-certificate-errors')
options.add_argument('-ignore -ssl-errors')
options.add_experimental_option("debuggerAddress", "127.0.0.1:9222")
driver = webdriver.Chrome(options=options)
driver.get('https://twitter.com')
print("打开了")
driver.get('http://exercise.kingname.info/exercise_login_success')
input('输入任意内容继续')
driver.get('https://www.kingname.info')
input('输入任意内容继续')
driver.get('http://exercise.kingname.info/exercise_login_success')
```

重点就这一行

```python
options.add_experimental_option("debuggerAddress", "127.0.0.1:9222")
```

参考https://cloud.tencent.com/developer/article/1922615
