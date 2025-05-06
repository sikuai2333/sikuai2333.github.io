---
title: amh面板搭建网站记录
tags:
  - 前端
  - blog
  - 网站建设
keywords: amh面板,伪静态
description: amh面板搭建网站记录
top_img: https://v2.api-m.com/api/wallpaper?return=302
comments: false
cover: https://v2.api-m.com/api/wallpaper?return=302
copyright: true
copyright_author: sikuai
copyright_author_href: https://sikuai2333.github.io
highlight_shrink: false
date: 2023-10-10 11:06:47
updated: 
copyright_url: 
copyright_info: 
aside: 
abcjs: 
lastmod: 2025-05-06T06:33:03.897Z
---
## 0.1. 伪静态设置

amh7.0并没有自带伪静态规则，搭建typecho一访问后台就404，只能自己手动添加伪静态规则了。\
下面是搜集到的一些常见伪静态规则，可以自行修改。

### 0.1.1. 修改伪静态规则

* 命令行的方式

```shell
# cd进你的目录，确保装了
cd /usr/local/nginx/conf/rewrite
# 用顺手的编辑器修改或新建
vim name.conf
```

* 图形界面的方式\
  打开“网站”，点击“amh.conf”，安装rewrite，点击新建，起名后填入伪静态规则，设置生效，重启nginx。

### 0.1.2. 常见的伪静态

* Typecho伪静态规则

````text
if (-f $request_filename/index.html){
rewrite (.*) $1/index.html break;
}
if (-f $request_filename/index.php){
rewrite (.*) $1/index.php;
}
if (!-f $request_filename){
rewrite (.*) /index.php;
}```

- WordPress伪静态规则
```text
if (-f $request_filename/index.html){
rewrite (.*) $1/index.html break;
}
if (-f $request_filename/index.php){
rewrite (.*) $1/index.php;
}
if (!-f $request_filename){
rewrite (.*) /index.php;
}
````

* SHOPEX伪静态规则

```text
if (!-e $request_filename) {
rewrite ^/(.+.(html|xml|json|htm|php|jsp|asp|shtml))$ /index.php?$1 last;
}
```

* DiscuzX伪静态规则

```text
rewrite ^(3*)/topic-(.+).html$ $1/portal.php?mod=topic&topic=$2 last;
rewrite ^(4*)/article-([0-9]+)-([0-9]+).html$ $1/portal.php?mod=view&aid=$2&page=$3 last;
rewrite ^(5*)/forum-(w+)-([0-9]+).html$ $1/forum.php?mod=forumdisplay&fid=$2&page=$3 last;
rewrite ^(6*)/thread-([0-9]+)-([0-9]+)-([0-9]+).html$ $1/forum.php?mod=viewthread&tid=$2&extra=page%3D$4&page=$3 last;
rewrite ^(7*)/group-([0-9]+)-([0-9]+).html$ $1/forum.php?mod=group&fid=$2&page=$3 last;
rewrite ^(8*)/space-(username|uid)-(.+).html$ $1/home.php?mod=space&$2=$3 last;
rewrite ^(9*)/([a-z]+)-(.+).html$ $1/$2.php?rewrite=$3 last;
if (!-e $request_filename) {
return 404;
}
```

* Discuz7伪静态规则

```text
rewrite ^/archiver/((fid|tid)-[w-]+.html)$ /archiver/index.php?$1 last;
rewrite ^/forum-([0-9]+)-([0-9]+).html$ /forumdisplay.php?fid=$1&page=$2 last;
rewrite ^/thread-([0-9]+)-([0-9]+)-([0-9]+).html$ /viewthread.php?tid=$1&extra=page%3D$3&page=$2 last;
rewrite ^/space-(username|uid)-(.+).html$ /space.php?$1=$2 last;
rewrite ^/tag-(.+).html$ /tag.php?name=$1 last;
```

* ECSHOP伪静态规则

```text
if (!-e $request_filename)
{
rewrite "^/index.html" /index.php last;
rewrite "^/category$" /index.php last;
rewrite "^/feed-c([0-9]+).xml$" /feed.php?cat=$1 last;
rewrite "^/feed-b([0-9]+).xml$" /feed.php?brand=$1 last;
rewrite "^/feed.xml$" /feed.php last;
rewrite "^/category-([0-9]+)-b([0-9]+)-min([0-9]+)-max([0-9]+)-attr(10)-([0-9]+)-(.+)-([a-zA-Z]+)(.).html$" /category.php?id=$1&brand=$2&price_min=$3&price_max=$4&filter_attr=$5&page=$6&sort=$7&order=$8 last;
rewrite "^/category-([0-9]+)-b([0-9]+)-min([0-9]+)-max([0-9]+)-attr(10)(.).html$" /category.php?id=$1&brand=$2&price_min=$3&price_max=$4&filter_attr=$5 last;
rewrite "^/category-([0-9]+)-b([0-9]+)-([0-9]+)-(.+)-([a-zA-Z]+)(.*).html$" /category.php?id=$1&brand=$2&page=$3&sort=$4&order=$5 last;
rewrite "^/category-([0-9]+)-b([0-9]+)-([0-9]+)(.*).html$" /category.php?id=$1&brand=$2&page=$3 last;
rewrite "^/category-([0-9]+)-b([0-9]+)(.*).html$" /category.php?id=$1&brand=$2 last;
rewrite "^/category-([0-9]+)(.*).html$" /category.php?id=$1 last;
rewrite "^/goods-([0-9]+)(.*).html" /goods.php?id=$1 last;
rewrite "^/article_cat-([0-9]+)-([0-9]+)-(.+)-([a-zA-Z]+)(.*).html$" /article_cat.php?id=$1&page=$2&sort=$3&order=$4 last;
rewrite "^/article_cat-([0-9]+)-([0-9]+)(.*).html$" /article_cat.php?id=$1&page=$2 last;
rewrite "^/article_cat-([0-9]+)(.*).html$" /article_cat.php?id=$1 last;
rewrite "^/article-([0-9]+)(.*).html$" /article.php?id=$1 last;
rewrite "^/brand-([0-9]+)-c([0-9]+)-([0-9]+)-(.+)-([a-zA-Z]+).html" /brand.php?id=$1&cat=$2&page=$3&sort=$4&order=$5 last;
rewrite "^/brand-([0-9]+)-c([0-9]+)-([0-9]+)(.*).html" /brand.php?id=$1&cat=$2&page=$3 last;
rewrite "^/brand-([0-9]+)-c([0-9]+)(.*).html" /brand.php?id=$1&cat=$2 last;
rewrite "^/brand-([0-9]+)(.*).html" /brand.php?id=$1 last;
rewrite "^/tag-(.*).html" /search.php?keywords=$1 last;
rewrite "^/snatch-([0-9]+).html$" /snatch.php?id=$1 last;
rewrite "^/group_buy-([0-9]+).html$" /group_buy.php?act=view&id=$1 last;
rewrite "^/auction-([0-9]+).html$" /auction.php?act=view&id=$1 last;
rewrite "^/exchange-id([0-9]+)(.*).html$" /exchange.php?id=$1&act=view last;
rewrite "^/exchange-([0-9]+)-min([0-9]+)-max([0-9]+)-([0-9]+)-(.+)-([a-zA-Z]+)(.*).html$" /exchange.php?cat_id=$1&integral_min=$2&integral_max=$3&page=$4&sort=$5&order=$6 last;
rewrite ^/exchange-([0-9]+)-([0-9]+)-(.+)-([a-zA-Z]+)(.*).html$" /exchange.php?cat_id=$1&page=$2&sort=$3&order=$4 last;
rewrite "^/exchange-([0-9]+)-([0-9]+)(.*).html$" /exchange.php?cat_id=$1&page=$2 last;
rewrite "^/exchange-([0-9]+)(.*).html$" /exchange.php?cat_id=$1 last;
}
```

* DEDECMS伪静态规则

```text
rewrite "^/index.html$" /index.php last;
rewrite "^/list-([0-9]+).html$" /plus/list.php?tid=$1 last;
rewrite "^/list-([0-9]+)-([0-9]+)-([0-9]+).html$" /plus/list.php?tid=$1&totalresult=$2&PageNo=$3 last;
rewrite "^/view-([0-9]+)-1.html$" /plus/view.php?arcID=$1 last;
rewrite "^/view-([0-9]+)-([0-9]+).html$" /plus/view.php?aid=$1&pageno=$2 last;
rewrite "^/tags.html$" /tags.php last;
rewrite "^/tag-([0-9]+)-([0-9]+).html$" /tags.php?/$1/$2/ last;
```

* PHPCMS伪静态规则

```text
rewrite ^/content-([0-9]+)-([0-9]+)-([0-9]+).html /index.php?m=content&c=index&a=show&catid=$1&id=$2&page=$3 last;
rewrite ^/list-([0-9]+)-([0-9]+).html /index.php?m=content&c=index&a=lists&catid=$1&page=$2 last;
rewrite ^/tag-(1*)-([0-9]+)-([0-9]+).html /index.php?m=content&c=tag&catid=$2&tag=$1&page=$3 last;
rewrite ^/comment-([0-9]+)-([0-9]+)-([0-9]+).html /index.php?m=comment&c=index&a=init&commentid=content_$1-$2-$3 last;
rewrite ^/(2*).html /index.php?m=member&c=index&a=$1 last;
```
