---
title: requests搭配xpath爬取全网热搜
author: 四块
top: false
cover: false
toc: true
mathjax: false
date: 2022-12-14 10:57:12
img: 
coverImg: 
password: 
summary: 
tags:
  - python
  - 爬虫
  - blog
  - 网络爬虫
categories:
  - 技术
lastmod: 2025-05-05T08:22:26.118Z
---
# 起因

某天闲来无事，想着看看现在大家每天都在关注些什么，遂打开浏览器，查找热搜，偶然间看到下面这个网站，于是心生一计，打算用python爬取网站生成词云，看看关注最多的事情是什么。

```url
https://tophub.today/c/ent
```

## 需要工具

python3环境（会pip安装包）\
会ctrl CV的手\
\~~脑子~~ （不用也行）

# 开整

简单浏览一下，发现网页为动态加载，可能是<strong>加载框架+接口获取数据</strong>（参考 [zoomeye白嫖万条数据](https://mianfeisong.cf/2022/11/25/zoomeye%E8%87%AA%E5%8A%A8%E9%81%8D%E5%8E%86%E5%85%A8%E7%90%83%E5%9C%B0%E5%9D%80/)），也可能是<strong>获取页面</strong>，这里直接打开bp抓包，重放器看一眼发现请求参数是（/c/ent?p=N），很明显是动态加载页面，那么我们可以<strong>使用selenium模拟浏览器下滑加载所有网页</strong>，也可以<strong>使用requests请求网页获取</strong>，此处我们选择requests的方法。

## Burpsuit请求参数

```
GET /c/ent?p=24 HTTP/2
Host: tophub.today
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.5112.81 Safari/537.36
```

只需要带上UA 就可以请求到网页，用python简单写一下就是

```python
import requests
url = 'https://tophub.today/c/ent?p=2'
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.5112.81 Safari/537.36',
}
res = requests.get(url=url,headers=headers)
print(res.text)
```

## 确定页数

因为get的参数只有一个p（ent为娱乐，此处只爬取该页面），所以肯定是要确定页数，这里我们可以检测为空就跳出循环，也可以计算页数，根据xpath获取到个数（右键->检查，右键->复制完整xpath）

```python
# res.text为获取的网页，此处确定编码并etree处理方便下面解析
res.encoding = "utf-8"
html = etree.HTML(res.text)
num = html.xpath("/html/body/div[1]/div[4]/div/div[1]/div[1]/small")[0].text
print(num,type(num))
# print一下确定是想要的数据和类型
290个 <class 'str'>
```

此处含有“个”以及类型是str，所以我们使用replace去掉不需要的字符，int()转换类型.

```python
# //在python3里指整除，有余数所以在后面+1捕捉所有页面
page = (int(num.replace("个","")) // 12 ) + 1
print(page)

25
```

同理我们通过xpath可以获取热点来源和热点的列表以及作者\
此处我们只需要列表即热搜内容，所以右键复制xpath进行分析,懒得贴出来了，简单对比一下就知道哪些参数对应不同的列表。\
使用try是为了遍历所有的msg，list参数为1到12（因为每个p只返回12个结果）

```python
try:
	for i in range(1,100):
		msg = html.xpath("/html/body/div[1]/div[4]/div/div[2]/div["+str(list)+"]/div/div[2]/div[1]/a["+str(i)+"]/div/span[2]")[0].text
		with open('娱乐.txt','a',encoding='utf-8') as f:
			f.write(msg+'\n')
			f.close()
except:
	continue
```

简单记了一下时间大概50秒跑完这26个页面，获取9500条数据。\
代码有一点点长，放在了GitHub上 [点这](https://github.com/sikuai2333/python_webspider/blob/main/requests%E6%90%AD%E9%85%8Dxpath%E7%88%AC%E5%8F%96%E5%85%A8%E7%BD%91%E7%83%AD%E6%90%9C)
