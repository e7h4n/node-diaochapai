# 调查派 （还没写完）

[![Build Status](https://travis-ci.org/perfectworks/node-diaochapai.png?branch=master)](https://travis-ci.org/perfectworks/node-diaochapai)

[调查派] 的 nodejs api.

## 使用示例

```js
var diaochapai = require('diaochapai');

var survey = new diaochapai.Survey({
    appid: '调查派的开发者 ID',
    secret: '调查派的开发者密钥',
    survey: '调查问卷的 ID'
});

var uid = '用户 id';
survey.exists(uid, function (err, resp) {
    if (resp && resp.response) {
        console.log('用户已经完成调查');
        return;
    }

    var redirectUrl = survey.getUrl({
        returnUrl: '用户完成问卷时的回调 URL',
        expire: '问卷过期时间'
    });

    console.log('重定向用户至:', redirectUrl);
});
```

## API

* `Survey(options)`

返回一个 `survey` 问卷对象。`options` 参数参考上面的例子。

* `survey.exists(uid, callback)`

查询 `uid` 对应的用户是否已经完成了问卷调查。这是一个异步接口，需要传入 `callback(err, response)`。若 `response.response` 存在则用户已经完成了调查。

* `survey.getUrl(options)`

获取调查的地址，`options` 参数参考上面的例子。


## License

MIT

[调查派]: http://diaochapai.com
