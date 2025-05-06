---
title: 微博“实时”内容爬虫，获取热点话题下的评论
author: 四块
top: false
cover: false
toc: true
mathjax: false
date: 2022-09-21 07:09:28
tags:
  - python
  - 爬虫
  - blog
  - 网络爬虫
categories:
  - 网络爬虫
lastmod: 2025-05-06T06:35:08.567Z
---
## 0.1. 起因

安徽国庆部分高校只放假三天，微博话题下评论区一堆“美好的祝福”，想起之前爬取b站评论做情感分析总是没有合适的训练数据，遂爬取。（2023.1.19更新一次，requests的可能排版有些问题）

## 0.2. selenium爬取

因为微博实时的话题评论是异步加载，下滑刷新才可以获取其他评论，所以一开始打算用selenium搭配xpath获取所有信息。

<strong>写完才发现自己脑抽了，每次刷新数据不固定，请直接跳到下面</strong>\
\#selenium代码如下：

```python
'''
Descripttion: 
version: 
Author: sikuai
Date: 2022-07-05 12:07:29
LastEditors: sikuai
LastEditTime: 2022-09-19 22:05:39
'''
from lib2to3.pgen2 import driver
import os
from selenium import webdriver
from selenium.webdriver.common.by import By
import time
from lxml import etree
import openpyxl

#i从四开始是因为网页第一条评论的标签参数就是4
i = 4
search_url = '热搜链接，自己填'
#去除selenium自动提示
options = webdriver.ChromeOptions()
options.add_experimental_option('excludeSwitches', ['enable-automation'])
#去除selenium检测
options.add_argument('--disable-blink-features=AutomationControlled')
options.add_argument('--disable-blink-features=AutomationControlledByDomain')
options.add_argument('--disable-blink-features=AutomationControlledByUrl')
options.add_argument('--disable-blink-features=AutomationControlledByUrlBlockList')
#去除证书
options.add_argument('-ignore-certificate-errors')
options.add_argument('-ignore -ssl-errors')
driver = webdriver.Chrome(options=options)
prefs = {"profile.default_content_setting_values.notifications": 2}
options.add_experimental_option("prefs", prefs)

driver.get(search_url)
time.sleep(3)
shishi = driver.find_element(By.XPATH,r'/html/body/div/div[1]/div[1]/div[3]/div[2]/div[1]/div/div/div/ul/li[2]/span')
shishi.click()
time.sleep(3)
workbook = openpyxl.load_workbook("guoqing.xlsx")
sheet = workbook["Sheet1"]
while True:
    i = i + 1
    print(i)
#    time.sleep(3)
    try:
        driver.execute_script('window.scrollTo(0,document.body.scrollHeight)')
        # /html/body/div/div[1]/div[1]/div[4]/div/div/div/header/div/div/a/h3
        name = driver.find_element(By.XPATH,r'/html/body/div/div[1]/div[1]/div['+str(i)+']/div/div/div/header/div/div/a/h3').text
        msg = driver.find_element(By.XPATH,r'/html/body/div/div[1]/div[1]/div['+str(i)+']/div/div/div/article/div[2]/div[1]').text
        msg_time = driver.find_element(By.XPATH,r'/html/body/div/div[1]/div[1]/div['+str(i)+']/div/div/div/header/div/div/h4/span[1]').text
        device = driver.find_element(By.XPATH,r'/html/body/div/div[1]/div[1]/div['+str(i)+']/div/div/div/header/div/div/h4/span[2]').text
        msg = msg.replace("#安徽省大学生国庆假期只有3天#","")
        device = device.replace("来自","")
        device = device.replace("客户端","")
        print(name+"在"+msg_time+"用"+device+"说："+msg)
        sheet.cell(row=i,column=1,value=name)
        sheet.cell(row=i,column=2,value=msg_time)    
        sheet.cell(row=i,column=3,value=device)
        sheet.cell(row=i,column=4,value=msg)
        workbook.save("guoqing.xlsx")
    except:
        continue

```

<center>但是这样效率貌似很慢</center>

## 0.3. requests爬取

因为selenium虽然很直观，但奈何我功力不够，不能最大化利用，于是打开burpsuit开始抓包\
![](https://s2.loli.net/2022/09/21/ulf2dqaJpjWLiDE.jpg)

<center>先”代理“获取链接</center>

![](https://s2.loli.net/2022/09/21/Q2tHLgMrI9bNonl.jpg)

<center>然后重放器确定一下参数</center>

确定没有问题打开vscode开整

\#代码如下：

```python
'''
Descripttion:
version:
Author: sikuai
Date: 2022-09-20 06:49:09
LastEditors: sikuai
LastEditTime: 2023-01-19 20:17:10
'''
import requests
import json
import time
import re
import openpyxl
a = 0
page = 2
workbook = openpyxl.load_workbook("教育局.xlsx")
sheet = workbook["Sheet1"]
for page in range(2,10000):
    print(str(page)+"页")
    url = 'https://m.weibo.cn/api/container/getIndex?containerid=100103type%3D1%26t%3D10%26q%3D%E5%BD%93%E6%88%91%E5%8E%BB%E7%8C%AB%E5%92%96%E6%91%B8%E4%BA%86%E5%87%A0%E5%8D%81%E5%8F%AA%E7%8C%AB%E4%BB%A5%E5%90%8E&page='+str(page)
    res = requests.get(url)
    res = str(res.text)
    # print(res.encode('utf-8', 'replace').decode('utf-8'))
    res = res.encode('utf-8', 'replace').decode('utf-8')
    data = json.loads(res, strict=False)
    try:
        for i2 in range(1,10):
            print(i2)
            cards = data['data']['cards'][i2]['card_group']
            try:
                for i in cards:
                    # print(i)
                    # print(a)
                    mblog = i['mblog']
                    # print(mblog)
                    mblog_text = mblog['text']
                    user_id = mblog['id']
                    name = mblog['user']['screen_name']
                    region_name = mblog['region_name']
                    device = mblog['source']
                    # print(mblog_text)
                    chinese = re.findall('[\u4e00-\uFF1F]', mblog_text)
                    chinese = str(chinese)
                    chinese = chinese.replace(",","").replace("'","").replace("[","").replace("]","").replace(" ","")
                    if chinese != '':
                        a = a + 1
                       
                       print(device+region_name+user_id+name+chinese)
                        sheet.cell(row=a,column=1,value=device)
                        sheet.cell(row=a,column=2,value=region_name)
                        sheet.cell(row=a,column=3,value=user_id)
                        sheet.cell(row=a,column=4,value=name)
                        sheet.cell(row=a,column=5,value=chinese)
                        workbook.save("教育局.xlsx")
            except:
                print("未获取到数据, 请检查链接或重新解析json")
                continue
    except:
        print("未获取到数据, 请检查链接或重新解析json")
        continue
```

```

数据展示：
![](https://s2.loli.net/2022/09/21/23BjngJcPWd9v7V.jpg)

上面代码是获取设备型号，归属地，id，昵称，评论(自行replace标题)
自己按需增减。

最后提醒大家，网络并非法外之地，请理性发言。
```
