---
title: uniapp网页跨域请求
date: 2024-03-30
categories:
  - 开发技术
tags:
  - blog
  - 开发技术
lastmod: 2025-05-06T00:30:18.022Z
---
请求失败: {errMsg: "request:fail abort"}\
通过common/config.js进行配置

```js
// config.js
const baseUrl = 'https://sikuai2333.github.io/';

export default {
  baseUrl
}
```

页面

```js
fetchPageConfig(page) {
				const url = `${page}`;
				// const url = `${config.baseUrl}${page}`;
				console.log(url)

```

如果直接请求https://sikuai2333.github.io/main.txt会报错\
但是请求\${config.baseUrl}main.txt就不报错
