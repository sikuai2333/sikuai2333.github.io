// sw.js - Service Worker 文件
const CACHE_NAME = 'portfolio-v1.0.0';
const urlsToCache = [
    '/',
    '/index.html',
    // 如果需要缓存其他资源，请添加到这里
];

// 安装事件 - 预缓存资源
self.addEventListener('install', event => {
    console.log('Service Worker: 安装中...');
    
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Service Worker: 缓存文件');
                return cache.addAll(urlsToCache);
            })
            .then(() => {
                console.log('Service Worker: 跳过等待，立即激活');
                return self.skipWaiting();
            })
            .catch(err => {
                console.error('Service Worker: 缓存失败', err);
            })
    );
});

// 激活事件 - 清理旧缓存
self.addEventListener('activate', event => {
    console.log('Service Worker: 激活中...');
    
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Service Worker: 删除旧缓存', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            console.log('Service Worker: 激活完成');
            return self.clients.claim();
        })
    );
});

// 拦截请求 - 缓存优先策略
self.addEventListener('fetch', event => {
    // 跳过非 GET 请求
    if (event.request.method !== 'GET') return;
    
    // 跳过 Chrome 扩展请求
    if (event.request.url.startsWith('chrome-extension://')) return;
    
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // 如果缓存命中，直接返回
                if (response) {
                    console.log('Service Worker: 从缓存加载', event.request.url);
                    return response;
                }
                
                // 否则从网络获取
                return fetch(event.request)
                    .then(response => {
                        // 检查是否有效响应
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }
                        
                        // 克隆响应，因为 response 只能使用一次
                        const responseToCache = response.clone();
                        
                        caches.open(CACHE_NAME)
                            .then(cache => {
                                console.log('Service Worker: 缓存新资源', event.request.url);
                                cache.put(event.request, responseToCache);
                            });
                        
                        return response;
                    })
                    .catch(error => {
                        console.error('Service Worker: 网络请求失败', error);
                        // 可以在这里返回离线页面
                        // return caches.match('/offline.html');
                    });
            })
    );
});

// 后台同步（可选）
self.addEventListener('sync', event => {
    console.log('Service Worker: 后台同步', event.tag);
    // 在这里处理后台同步任务
});

// 推送通知（可选）
self.addEventListener('push', event => {
    console.log('Service Worker: 收到推送通知');
    const options = {
        body: event.data ? event.data.text() : '你有一条新消息',
        icon: '/icon-192x192.png',
        badge: '/badge-72x72.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            {
                action: 'explore',
                title: '查看详情',
                icon: '/check.png'
            },
            {
                action: 'close',
                title: '关闭',
                icon: '/x.png'
            }
        ]
    };
    
    event.waitUntil(
        self.registration.showNotification('Portfolio 通知', options)
    );
});

// 通知点击事件
self.addEventListener('notificationclick', event => {
    console.log('Service Worker: 通知被点击');
    event.notification.close();
    
    event.waitUntil(
        clients.openWindow('/')
    );
});
