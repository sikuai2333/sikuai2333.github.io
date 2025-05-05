---
title: "Hugo 博客使用指南"
date: 2023-09-18
slug: hugo-guide
---

# Hugo 博客使用指南

## 写新文章

创建新文章的步骤:

1. 在 `content/post/` 目录下创建一个新的文件夹，命名为你的文章标题（英文，用连字符"-"分隔）
2. 在这个文件夹中创建 `index.md` 文件
3. 添加必要的前置元数据，然后写正文

**文章前置元数据示例:**

```markdown
---
title: "文章标题"
description: "文章描述"
slug: article-url-slug
date: 2023-09-18T14:00:00+08:00
image: cover.jpg
categories:
    - 分类名称
tags:
    - 标签1
    - 标签2
weight: 1  # 可选，用于排序
---

正文内容从这里开始...
```

如果要添加封面图片，将图片文件放在同一个文件夹中，并在前置元数据中的 `image` 字段引用图片文件名。

## 创建新分类

1. 在 `content/categories/` 目录下创建一个新的文件夹，命名为分类名称（英文，用连字符"-"分隔）
2. 在这个文件夹中创建 `_index.md` 文件
3. 添加必要的前置元数据

**分类前置元数据示例:**

```markdown
---
title: 分类名称
description: 分类描述
image: 分类图片.jpg (可选)

# 标签样式
style:
    background: "#1d3557"  # 背景颜色
    color: "#fff"  # 文字颜色
---
```

## 添加新页面

1. 在 `content/page/` 目录下创建一个新的文件夹，命名为页面名称（英文，用连字符"-"分隔）
2. 在这个文件夹中创建 `index.md` 文件
3. 添加必要的前置元数据

**页面前置元数据示例:**

```markdown
---
title: "页面标题"
description: "页面描述"
slug: "page-url-slug"
menu:
    main:
        weight: 100
        params: 
            icon: home  # 图标名称
---

页面内容从这里开始...
```

## 常用的 Markdown 语法

```markdown
# 一级标题
## 二级标题
### 三级标题

**粗体文本**
*斜体文本*
[链接文本](https://example.com)

![图片描述](图片链接)

> 引用内容

- 无序列表项1
- 无序列表项2

1. 有序列表项1
2. 有序列表项2

| 表头1 | 表头2 |
|-------|-------|
| 内容1 | 内容2 |
| 内容3 | 内容4 |

`行内代码`

```语言名
代码块
```

## 本地预览与发布

1. 本地预览: 在博客根目录运行 `hugo server`
2. 构建静态文件: 运行 `hugo`
3. 发布到GitHub: 推送代码更改

```bash
git add .
git commit -m "添加/更新文章"
git push origin master
```

## 配置文件

如需修改网站配置，请编辑 `config/_default/` 目录下的配置文件:

- `config.toml`: 基本设置
- `menu.toml`: 导航菜单配置
- `params.toml`: 主题参数
- `languages.toml`: 多语言设置 