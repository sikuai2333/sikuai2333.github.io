---
title: uniapp的webview返回上一页
date: 2024-07-10
categories:
- 开发技术
tags:
- blog
- 开发技术
---
```js
	var wv; //计划创建的webview
	// wv = plus.webview.create

onBackPress() {
			if (wv && this.canBack) {
				wv.back();
				return true;
			}
			return false;
		},
		onReady() {
			// #ifdef APP-PLUS

			var self = this;
			var currentWebview = this.$scope
				.$getAppWebview(); //此对象相当于html5plus里的plus.webview.currentWebview()。在uni-app里vue页面直接使用plus.webview.currentWebview()无效，非v3编译模式使用this.$mp.page.$getAppWebview()
			setTimeout(function() {
				wv = currentWebview.children()[0];
				wv.addEventListener(
					"progressChanged",
					function(e) {
						wv.canBack(function(e) {
							self.canBack = e.canBack;
						});
					},
					false
				);
			}, 500); //如果是页面初始化调用时，需要延时一下

			// #endif
		},
```

结束
