---
title: 自动解析json的键值层级
author: 四块
top: false
cover: https://s2.loli.net/2023/03/25/tJxSeioa5C6lwBc.png
toc: true
mathjax: false
date: 2022-12-14 10:57:12
img: 
coverImg: 
password: 
summary: 
tags:
  - python
  - 工具
  - blog
  - 开发技术
categories:
  - 技术
lastmod: 2025-05-05T08:22:26.138Z
---
# 1. 我的需求

以前写脚本经常被大段的json折磨的死去活来，虽然最终能写出来，但是对着各种折叠总是不太美观（也可能是我的角度不对）。\
![](https://s2.loli.net/2023/03/25/oJcrmPZAGsufTeN.png)

<center >接口如上</center>

当然，格式化以后对于大段的参数还是难以阅读\
![](https://s2.loli.net/2023/03/25/tJxSeioa5C6lwBc.png)

<center>用的是sojson校验json是否有误</center>

遂使用python写了个脚本，测试有限，还请使用者发现bug自行修改 /doge

# 2. 上代码

```python
import json
def print_json_keys(json_obj, search_term='', prefix=''):
    """递归函数，输出JSON对象中所有值对应的键。仅输出包含指定关键词（忽略大小写）的键。"""
    if isinstance(json_obj, dict):
        for key in json_obj:
            new_prefix = f"{prefix}['{key}']"
            if search_term.strip().lower() in new_prefix.lower() or key.lower().startswith(search_term.lower()):
                print(new_prefix)
            print_json_keys(json_obj[key], search_term, new_prefix)
    elif isinstance(json_obj, list):
        for i in range(len(json_obj)):
            new_prefix = f"{prefix}[{i}]"
            if search_term.strip().lower() in new_prefix.lower():
                print(new_prefix)
            print_json_keys(json_obj[i], search_term, new_prefix)
    else:
        if search_term.strip().lower() in prefix.lower():
            print(f"{prefix} = {json_obj}")
# 读取JSON文件
with open('json.txt',encoding="latin1") as json_file:
    json_data = json.load(json_file)
# 要搜索的关键词
search_term = input("请输入要搜索的关键词：")

# 调用函数输出所有值对应的键（包含指定关键词的键）
print(f"以下是包含 '{search_term}' 的键：")
print_json_keys(json_data, search_term)

```

使用方法：运行脚本，输入键值如description，然后脚本会返回所有，效果如下\
![](https://s2.loli.net/2023/03/25/GLChqUPKBOHTsfy.png)

唔，最近好水
