---
title: python线程池限制等待队列数量
tags:
  - python
  - 爬虫
  - blog
  - 开发技术
categories:
  - 开发技术
keywords: python线程池限制等待队列数量
description: python线程池限制等待队列数量
top_img: https://v2.api-m.com/api/wallpaper?return=302
comments: false
cover: https://v2.api-m.com/api/wallpaper?return=302
copyright: true
copyright_author: sikuai
copyright_author_href: https://sikuai2333.github.io
highlight_shrink: false 配置代码框是否展开(true/false)(默认为设置中 highlight_shrink 的配置)
date: 2023-10-10 10:52:35
updated: 
copyright_url: 
copyright_info: 
aside: 
abcjs: 
lastmod: 2025-05-06T06:34:02.327Z
---
# 1. 背景

刚接触线程池，由于要爬取数量太多，使用线程池来处理会oom，上网查找一番，记录下来解决方法。

# 2. 代码

修改后的代码\
文件位置：C:\Users\用户名\AppData\Local\Programs\Python\Python310\Lib\concurrent\futures\thread.py

```python
# class ThreadPoolExecutor下的init
self._max_workers = max_workers
# super().__init__(max_workers, thread_name_prefix)
self._work_queue = queue.Queue(self._max_workers * 4)
# 队列最大是进程四倍
# self._work_queue = queue.SimpleQueue()
```
