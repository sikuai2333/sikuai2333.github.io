---
title: VSCode中Vue格式化
date: 2023-03-14
categories:
  - 开发技术
tags:
  - blog
  - 开发技术
lastmod: 2025-05-05T08:22:26.128Z
---
简单贴一下settings.json配置，自行添加，插件安装了eslint和vetur

```json
"editor.wordWrap": "on",
    "editor.wordWrapColumn": 800,
    "[markdown]": {
 
        "editor.wordWrap": "on",
        "editor.quickSuggestions": false
    },
    // 解决Vue换行问题
    "vetur.format.defaultFormatter.html": "js-beautify-html",
    "vetur.format.defaultFormatter.js": "vscode-typ=script",
    "vetur.format.defaultFormatterOptions": {
        "js-beautify-html": {
            "wrap_attributes": "auto"
        },
        "prettyhtml": {
            "printWidth": 100,
            "singleQuote": false,
            "wrapAttributes": false,
            "sortAttributes": false
        }
    },

```
