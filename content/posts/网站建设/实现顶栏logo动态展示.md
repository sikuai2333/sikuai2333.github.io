---
title: 实现顶栏logo动态展示
tags:
- 博客美化
- 前端
- styl
- pug
- blog
- 网站建设
categories:
- 博客美化
keywords: 实现顶栏logo动态展示
description: 实现顶栏logo动态展示
top_img: https://s2.loli.net/2023/05/16/MTVUOApKsdC8qma.png
comments: false
cover: https://s2.loli.net/2023/05/16/MTVUOApKsdC8qma.png
copyright: true
copyright_author: sikuai
copyright_author_href: https://sikuai2333.github.io
highlight_shrink: false
date: 2023-05-16 12:55:39
updated: null
copyright_url: null
copyright_info: null
aside: null
abcjs: null
---
# 动态变化效果

![](https://s2.loli.net/2023/05/16/MTVUOApKsdC8qma.png)

# 思路

### pug文件

```pug
//- themes\butterfly\layout\includes\header\nav.pug
nav#nav
  span#blog-info
    a(href=url_for('/') title=config.title)#blog-info-hover
      if theme.nav.logo
        img.site-icon(src=url_for(theme.nav.logo))
      if theme.nav.display_title
        span.site-name=config.title
      img.site-icon-hover(src=url_for(theme.nav.hover_logo))
```

此处给a标签家里个class，方便添加样式，新增的hover\_logo路径需要去\_config.yml添加

### 配置文件添加图标

![](https://s2.loli.net/2023/05/16/1pv8tLdjfDAnENa.png)

```yml
_config.yml
nav:

  logo: /img/icon.png # image

  hover_logo: /img/home.png # image
```

### 样式文件

下面是实现效果的样式

```styl
// themes\butterfly\source\css\_layout\head.styl
#blog-info
    flex: 1
    color: var(--light-grey)
    @extend .limit-one-line
  #blog-info-hover
    flex: 1
    color: var(--light-grey)
    @extend .limit-one-line

    .site-icon
      margin-right: 6px
      height: 20px
      margin-top: -8px
      vertical-align: middle

    .site-icon-hover
      background-color: white
      widows 30px
      height: 30px
      vertical-align: middle
      display: none
  #blog-info-hover:hover
    .site-icon-hover
      background-color: transparent
      opacity: 1
      margin-left: -80px
      display: inline-block
      transition: opacity  0.4s
    .site-icon
      opacity 0
      transition opacity  0.2s

    .site-name
      opacity 0
      transition: opacity 0.2s

```

主要就是吧原来的blog-info加上了hover的样式
