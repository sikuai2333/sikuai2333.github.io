---
title: hexo文章排序
date: 2023-07-30
categories:
  - 网站建设
  - 博客美化
tags:
  - blog
  - 网站建设
lastmod: 2025-05-06T06:36:33.679Z
---
```js
'use strict';
var pagination = require('hexo-pagination');
module.exports = function(locals){
  var config = this.config;
  var posts = locals.posts;
    posts.data = posts.data.sort(function(a, b) {
        if(a.top && b.top) { // 当两篇文章top都有定义时
            if(a.top == b.top) return b.updated - a.updated; // 若top值一样，则按照文章更新日期降序排列
            else return b.top - a.top; // 否则按照top值降序排列
        }
        else if(a.top && !b.top) { // 以下两种情况是若只有一篇文章top有定义，则将有top的排在前面（这里用异或操作居然不行233）
            return -1;
        }
        else if(!a.top && b.top) { //上一条已解释
            return 1;
        }
        else return b.updated - a.updated; // 若都没定义，则按照文章更新日期降序排列
    });
  var paginationDir = config.pagination_dir || 'page';
  return pagination('', posts, {
    perPage: config.index_generator.per_page,
    layout: ['index', 'archive'],
    format: paginationDir + '/%d/',
    data: {
      __index: true
    }
  });
};
```
