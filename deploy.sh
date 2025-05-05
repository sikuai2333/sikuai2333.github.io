#!/bin/bash

# 切换到博客根目录
cd "$(dirname "$0")"

# 执行Python脚本清理lastmod字段
echo "清理文章中的lastmod字段..."
python clean_lastmod.py

# 构建站点
echo "开始构建Hugo站点..."
hugo --minify

echo "构建完成!" 