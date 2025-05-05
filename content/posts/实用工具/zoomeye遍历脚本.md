---
title: zoomeye遍历脚本
tags:
  - 爬虫
  - python
  - blog
  - 实用工具
categories:
  - 技术
keywords: zoomeye遍历脚本
description: zoomeye遍历脚本
copyright: true
copyright_author: sikuai
copyright_author_href: https://sikuai2333.github.io
highlight_shrink: false
date: 2023-02-02 02:55:39
updated: 
copyright_url: 
copyright_info: 
aside: 
abcjs: 
lastmod: 2025-05-05T08:22:26.129Z
---
# zoomeye遍历脚本

## 前言

### 网站挑选

常用的几个网站\
www.fofa.info 非会员50条,\
www.zoomeye.org 非会员400条,\
www.shodan.io 非会员两页，应该是40条,\
还有鹰眼？啥的网站，不过量好像不太行\
所以肯定挑最多的下手（PS:如果有好的网站，欢迎评论）

### 爬取方式

requests或者selenium，奈何我不会selenium带cookie，所以只能用requests，实操过程中使用burpsuit代理抓包，发现网站加载数据分为多个接口，大体如下

```
搜索结果：https://www.zoomeye.org/search?q=
结果个数：https://www.zoomeye.org/search_total?q=
国家地区：https://www.zoomeye.org/aggs?q=
端口啥的可选所以这里没有写，也可能是包含在上面接口里面了。
```

至于headers的参数，我这里用postman大概测试了一下，需要cookie，Cube-Authorization，Host，其他参数自测吧。

# 新版换接口

偶然用脚本，发现一个数据都爬不下来，上网页一看发现接口地址换了，在这更新一下新版。

```python
'''
Descripttion: 
version: 39
Author: sikuai
Date: 2023-02-02 21:54:35
LastEditors: sikuai
LastEditTime: 2023-02-05 11:02:17
'''
from time import sleep
import requests
import json
from urllib import parse
import os

def get_address(headers, search_info):
    address_url = 'https://www.zoomeye.org/api/aggs?q='+str(search_info)
    # print("搜索链接"+address_url)
    res_address = requests.get(address_url, headers=headers)
    # print(res_address.text)
    address = json.loads(res_address.text)
    contory_items = address["country"]  # contory_items为总列表
    for country_item in contory_items:
        国家_name_zh = country_item["name_zh"]  # name_zh为国家名
        # print(国家_name_zh)
        国家_name = country_item["name"]
        # 国家_name = "CN"
        # subdivisions_zh为省份列表
        subdivisions_zh_items = country_item["subdivisions_zh"]
        for subdivisions_zh_item in subdivisions_zh_items:
            省份_name = subdivisions_zh_item["name"]  # name为省份名
            # print(省份_name)
            city_zh_items = subdivisions_zh_item["city_zh"]  # city_zh为市列表
            for city_zh_item in city_zh_items:
                市_name = city_zh_item["name"]
                # print(市_name)
                print(国家_name, 省份_name, 市_name)
                search(search_info, 国家_name, 省份_name, 市_name)


def search(search_info, 国家_name, 省份_name, 市_name):
    page = 0
    while page < 8:
        page = page + 1
        print("当前页面："+str(page))
        # print(address)
        sleep(1)
        # address = parse.quote(address)
        search_url = 'https://www.zoomeye.org/api/search?q='+search_info+'%20%2Bcountry%3A"' + \
            str(国家_name)+'"%20%2Bsubdivisions%3A"'+str(省份_name) + \
            '"%20%2Bcity:"'+str(市_name)+'"&t=v4&page='+str(page)+'&pageSize=50'
        # print(search_url)
        r = requests.get(url=search_url, headers=headers)
        # print(r.text)
        datas = json.loads(r.text, strict=False)
        # print(datas)
        matches = datas['matches']
        for line in matches:
            ip = line['ip']
            # print(ip)
            port = line['portinfo']['port']
            # timestamp = line['timestamp']
            # address = parse.unquote(address)
            result = str(ip)+":"+str(port)
            with open(save_name+'.txt', 'a', encoding='utf-8') as f:
                f.write(str(result)+'\n')
                f.close()
        if page > 8 or matches == []:
            print("当前参数遍历完成")
            break
        else:
            continue

if __name__ == "__main__":
    search_info = input("请输入q后的参数（脚本仅遍历国内地区和页数）：")
    save_name = input("请输入保存的文件名")
    # search_info = '%2Bapp%3A"Hikvision%20IP%20camera%20httpd"%20%2Bcountry%3A"CN"%20%2Btitle%3A"index"%20%2Bport%3A"80"%20-title%3A"Login"%20%2Bafter%3A"2021-01-01"%20%2Bbefore%3A"2023-12-31"'
    # save_name = 'new_hikvision'
    print("初次使用请编辑脚本的headers，脚本很垃圾，大佬请自己写")
    # 注意配置时选api的那个查看cookie，有Cookie和Cube-Authorization
    headers = {}
    get_address(headers, search_info)
    print("爬取结束")


```

## 老版接口V1 爬取单页

<strong> 提前申明：写出来半年了，仅作存档，自己改改勉强用</strong>

```python
'''
Descripttion:
version:
Author: sikuai
Date: 2022-02-27 16:10:10
LastEditors: sikuai
LastEditTime: 2022-11-25 12:11:05
'''
from urllib import response
import urllib3
import requests
import json
import os
# url = input("请输入网址链接：")
url='https://www.zoomeye.org/searchResult?q='+input("请输入参数：(q=后面的参数）")
# url = 'https://www.zoomeye.org/search?q=app%253A%2522Privoxy%2520http%2520proxy%2522%2520%252Bcountry%3A%2522US%2522&page=1&pageSize=20&t=v4%2Bv6%2Bweb'

headers={
#自行配置
}

r = requests.get(url=url,headers=headers)
print(r.json)
datas = json.loads(r.text, strict=False)
print(datas)
matches = datas['matches']

for line in matches:
    ip = line['ip']
    port = line['portinfo']['port']
    # timestamp = line['timestamp']
    result = str(ip)+":"+str(port)
    with open('test.txt','a',encoding='utf-8') as f:
        # 此处是因为其他扫描器需要http://, 所以加上,自行修改
        f.write(str(result)+'\n')
        f.close()
```

## V2 老版接口遍历国内地址

<strong> 提前申明：写出来半年了，仅作存档</strong>

```python
'''
Descripttion:
version:
Author: sikuai
Date: 2022-05-27 16:10:10
LastEditors: sikuai
LastEditTime: 2022-11-25 12:14:33
'''
from time import sleep
import requests
import json
from urllib import parse
import os

def address_1(address2):
    for address in address2:
        search(address,page,search_info,headers,save_name)
def search(address,page,search_info,headers,save_name):
    while page < 8:
        page = page + 1
        print(address)
        # sleep(3)
        address = parse.quote(address)
        search_url = 'https://www.zoomeye.org/search?q='+search_info+'%20%2Bcountry:%22CN%22%20%2Bsubdivisions:'+address+'&t=v4&page='+str(page)+'&pageSize=50'
        print(search_url)
        r = requests.get(url=search_url,headers=headers)
        # print(r.text)
        datas = json.loads(r.text, strict=False)
        # print(datas)
        matches = datas['matches']
        for line in matches:
            ip = line['ip']
            port = line['portinfo']['port']
            # timestamp = line['timestamp']
            address = parse.unquote(address)
            result = "http://"+str(ip)+":"+str(port)
            with open(save_name+'.txt','a',encoding='utf-8') as f:
                f.write(str(result)+'\n')
                f.close()
        if page > 8:
            address_1(address2)
        else:
            continue
if __name__=="__main__":
    search_info = input("请输入q后的参数（脚本仅遍历国内地区和页数）：")
    save_name = input("请输入保存的文件名")
    print("初次使用请编辑脚本的headers，脚本很垃圾，大佬请自己写")
    headers={
    }
    # search_info = 'app%3A"Hikvision%20IP%20camera%20httpd"%20%2Bcountry:"CN"'
    address2 ={'北京','天津','上海','重庆','河北','山西','辽宁','吉林','江苏','浙江','安徽','福建','江西','山东','河南','湖北','湖南','广东','海南','黑龙江','四川','贵州','云南','陕西','甘肃','青海','台湾','内蒙','广西','西藏','宁夏','新疆','香港','澳门'}
    page = 0
    address_1(address2)
    print("爬取结束")
```

<strong>说实话没眼看，当时写的什么玩意</strong>\
（有的时候会获取不到信息，可能是访问快了？）
