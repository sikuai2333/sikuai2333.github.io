---
title: u蓝系列短视频刷邀请
date: 2024-12-08
categories:
- 网络爬虫
tags:
- blog
- 网络爬虫
---
# 邀请人

## 注册

设备注册，拿到临时账号，得到邀请码

## 解密密钥算法

aes cbc pkcs7padding

### 头条

密钥为fQMDyTAK9fedYJOt\
偏移为NTobdLvTqyEhNV46\
硬编码

### U蓝

密钥为M7svI1puJldS78W3\
偏移为S87Iwwp7wJl0d8W1

# 被邀请人

## 下载

扫描二维码得到下载链接，浏览器会添加到剪贴板，下载完成并打开软件会进行识别，上传

# 相关接口

## 响应包含vno，分类，公告等信息，第一次打开获取的

```
curl --http2 -X GET -H "Host:ccgap0424h.gta9lqy.top" -H "equip:PD2324" -H "sysinfo:ANDROID" -H "sysver:10" -H "vos:ANDROID" -H "vcode:" -H "vsk:7ac4cdb251fe73c7dc024ec575dfb2a058ff424a31c05061179f00d671080a00" -H "content-type:application/json" -H "vmid:fbdfe5210592363cad3a966606581d7b" -H "app-version:2.8.3" -H "version-code:1" -H "app-name:GGT" -H "device-modal:vivo" -H "vke:d8f4ec0dd57268bda01e1f5a2f55194e" -H "vsd:1" -H "vtoken:9j4al/9/qEItiukFSAICEEuTj0HdPqb4YHdXRDIFQDQps8JqSVwwjv5PW7vayURc" -H "vtime:1714278807578" -H "vversion:283" -H "device-uniq:fbdfe5210592363cad3a966606581d7b" -H "os:android" -H "package-name:com.play.app" -H "os-version:10" -H "client-time:1714278807578" -H "rand-str:fbdfe5210592363cad3a966606581d7b1714278807578829980317" -H "accept-encoding:gzip" -H "user-agent:okhttp/4.9.0" "https://ccgap0424h.gta9lqy.top/app/run/info"
```

## 注册，获取nickname和其他信息

```
curl --http2 -X GET -H "Host:ccgap0424h.gta9lqy.top" -H "content-type:application/json" -H "vmid:fbdfe5210592363cad3a966606581d7b" -H "app-version:2.8.3" -H "version-code:1" -H "app-name:GGT" -H "device-modal:vivo" -H "vke:ce5590b2403a9cb150ba4f190a677f6e" -H "vsd:1" -H "vtoken:9j4al/9/qEItiukFSAICEEuTj0HdPqb4YHdXRDIFQDR+HWQlumW1cMsc6Kr8LfCNKPPLgcA7l+/tRdJ7A6meW4/nfZxG4uhzphWd1yiFNYQ1IZBVfs29WiobzfBke8JC" -H "vtime:1714278808245" -H "vversion:283" -H "device-uniq:fbdfe5210592363cad3a966606581d7b" -H "os:android" -H "package-name:com.play.app" -H "os-version:10" -H "client-time:1714278808245" -H "rand-str:fbdfe5210592363cad3a966606581d7b17142788082455337748369" -H "vno:g662dd198e4b0a6ab82029477i3y2rqlq" -H "accept-encoding:gzip" -H "user-agent:okhttp/4.9.0" "https://ccgap0424h.gta9lqy.top/member/home/info"
```

## 重点，这个是invite接口，用于记录邀请

code为1，密文为success，邀请成功

```
curl --http2 -X GET -H "Host:ccgap0424h.gta9lqy.top" -H "content-type:application/json" -H "vmid:fbdfe5210592363cad3a966606581d7b" -H "app-version:2.8.3" -H "version-code:1" -H "app-name:GGT" -H "device-modal:vivo" -H "vke:05394d0627d1537e5ee828bad25a7e05" -H "vsd:1" -H "vtoken:9j4al/9/qEItiukFSAICEEuTj0HdPqb4YHdXRDIFQDR+HWQlumW1cMsc6Kr8LfCNKPPLgcA7l+/tRdJ7A6meW4/nfZxG4uhzphWd1yiFNYQ1IZBVfs29WiobzfBke8JC" -H "vtime:1714278808606" -H "vversion:283" -H "device-uniq:fbdfe5210592363cad3a966606581d7b" -H "os:android" -H "package-name:com.play.app" -H "os-version:10" -H "client-time:1714278808606" -H "rand-str:fbdfe5210592363cad3a966606581d7b17142788086066009619712" -H "vno:g662dd198e4b0a6ab82029477i3y2rqlq" -H "accept-encoding:gzip" -H "user-agent:okhttp/4.9.0" "https://ccgap0424h.gta9lqy.top/app/invite/bind?code=MRyr"
```

## 主页信息的

```
curl --http2 -X GET -H "Host:ccgap0424h.gta9lqy.top" -H "content-type:application/json" -H "vmid:fbdfe5210592363cad3a966606581d7b" -H "app-version:2.8.3" -H "version-code:1" -H "app-name:GGT" -H "device-modal:vivo" -H "vke:fea898b5d3d7b94ea841e4c74df64c48" -H "vsd:1" -H "vtoken:9j4al/9/qEItiukFSAICEEuTj0HdPqb4YHdXRDIFQDR+HWQlumW1cMsc6Kr8LfCNKPPLgcA7l+/tRdJ7A6meW4/nfZxG4uhzphWd1yiFNYQ1IZBVfs29WiobzfBke8JC" -H "vtime:1714278812429" -H "vversion:283" -H "device-uniq:fbdfe5210592363cad3a966606581d7b" -H "os:android" -H "package-name:com.play.app" -H "os-version:10" -H "client-time:1714278812429" -H "rand-str:fbdfe5210592363cad3a966606581d7b17142788124296749412666" -H "vno:g662dd198e4b0a6ab82029477i3y2rqlq" -H "accept-encoding:gzip" -H "user-agent:okhttp/4.9.0" "https://ccgap0424h.gta9lqy.top/consumer/advice/perfect"
```

## 视频播放链接

```
curl -X GET -H "User-Agent:ExoSourceManager/2.8.3 (Linux;Android 10) ExoPlayerLib/2.16.1" -H "Accept-Encoding:gzip" -H "Host:txcd4z5tgg.gobookstudy.cn" -H "Connection:Keep-Alive" "https://txcd4z5tgg.gobookstudy.cn/files/few/f662ca2fee4b020aab27c3b24/662ca2e0e4b020aab27c3b1e.m3u8"
```

付费的是/few/，免费能看的是/view/

## 搜索接口，post

此处的content加密，解密后还有一个json

```
curl --http2 -X POST -H "Host:ccgap0414c.gta9f7a.top" -H "page:1" -H "size:15" -H "vmid:fbdfe5210592363cad3a966606581d7b" -H "app-version:2.8.3" -H "version-code:1" -H "app-name:GGT" -H "device-modal:vivo" -H "vke:9c880b69b66193a5cd8c87e4751e2d90" -H "vsd:1" -H "vtoken:9j4al/9/qEItiukFSAICEEuTj0HdPqb4YHdXRDIFQDR+HWQlumW1cMsc6Kr8LfCNKPPLgcA7l+/tRdJ7A6meW4/nfZxG4uhzphWd1yiFNYQ1IZBVfs29WiobzfBke8JC" -H "vtime:1714279531986" -H "vversion:283" -H "device-uniq:fbdfe5210592363cad3a966606581d7b" -H "os:android" -H "package-name:com.play.app" -H "os-version:10" -H "client-time:1714279531986" -H "rand-str:fbdfe5210592363cad3a966606581d7b17142795319869932043913" -H "vno:g662dd198e4b0a6ab82029477i3y2rqlq" -H "content-type:application/json;charset=UTF-8" -H "content-length:58" -H "accept-encoding:gzip" -H "user-agent:okhttp/4.9.0" -d "{"content":"MFfFAVe+HDlfFlVpi8fXu3XppmBpAviNB19IXtMIzYc="}" "https://ccgap0414c.gta9f7a.top/player/search/video"
```

## 通过id获取视频详情，包括视频文件链接

```
curl --http2 -X GET -H "Host:ccgap0414c.gta9f7a.top" -H "content-type:application/json" -H "vmid:fbdfe5210592363cad3a966606581d7b" -H "app-version:2.8.3" -H "version-code:1" -H "app-name:GGT" -H "device-modal:vivo" -H "vke:1e0c722ee332527215a85ab7bd649a7d" -H "vsd:1" -H "vtoken:9j4al/9/qEItiukFSAICEEuTj0HdPqb4YHdXRDIFQDR+HWQlumW1cMsc6Kr8LfCNKPPLgcA7l+/tRdJ7A6meW4/nfZxG4uhzphWd1yiFNYQ1IZBVfs29WiobzfBke8JC" -H "vtime:1714279614579" -H "vversion:283" -H "device-uniq:fbdfe5210592363cad3a966606581d7b" -H "os:android" -H "package-name:com.play.app" -H "os-version:10" -H "client-time:1714279614579" -H "rand-str:fbdfe5210592363cad3a966606581d7b17142796145794886612972" -H "vno:g662dd198e4b0a6ab82029477i3y2rqlq" -H "accept-encoding:gzip" -H "user-agent:okhttp/4.9.0" "https://ccgap0414c.gta9f7a.top/player/video/info?id=s65f84e19e4b04cade3e822d0"
```

# 参数

* vmid 设备id，固定不变
* vtoken 设备id加密 格式{"vmid":"fbdfe5210592363cad3a966606581d7b"}
* 请求接口的vmid {"vmid":"fbdfe5210592363cad3a966606581d7b","vno":"g662dd198e4b0a6ab82029477i3y2rqlq"}
* device-uniq 设备id
