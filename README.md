# node-github-trending-api

基于Koa.js，Mongodb实现稳定的Github Trending Api。

## 开始

[演示](https://baka.coolecho.net/api/github/trending)

### 环境准备

- Node.js >= 7.6
- Mongodb >= 3.0

### 配置

编辑```app/config.json```，配置MongoDB连接，以及爬虫爬取Github Trending的时间间隔。

```js
{
  "mongodb": {
    "host": "localhost",
    "port": 27017,
    "database": "database",  // 对应数据库
    "username": "username",  // 用户名
    "password": "password"   // 密码
  },
  "spider": {
    "interval": {
      "githubTrending": 20   // 爬虫定时任务，单位分钟
    }
  }
}
```

### 启动

安装依赖
```shell
npm intall
```

启动项目
```
npm start
```

访问```http://localhost:8888/api/github/trending```即可获取最新的github trending。

## LICENSE
BSD-3-Clause @Alcemy