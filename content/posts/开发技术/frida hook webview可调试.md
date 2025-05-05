---
title: frida hook webview可调试
date: 2024-08-02
categories:
  - 开发技术
tags:
  - blog
  - 开发技术
lastmod: 2025-05-05T08:22:26.071Z
---
```javascript
Java.perform(function () {
  var WebView = Java.use("android.webkit.WebView");

  WebView.setWebContentsDebuggingEnabled.overload("boolean").implementation =
    function (s) {
      // send(s.toString());

      console.log("webview hook"); // this.loadUrl.overload("java.lang.String").call(this, s); // console.log(this.)

      this.setWebContentsDebuggingEnabled(true);
    };
});
// frida

```
