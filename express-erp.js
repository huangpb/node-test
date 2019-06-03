var express = require('express');
var proxy = require('http-proxy-middleware');
var args = require('minimist')(process.argv.slice(2));
var mockConfig = require('./mock/config.js');
var http = require('http');
const path = require('path');

var config = {
    serverUrl: 'http://127.0.0.1:8008',
    serverTestUrl: 'http://test.xxx.kuaimai.com',
    serverOnlineUrl: 'http://xxx.kuaimai.com'
};

var port = 10001;

var globalMock = args.mock || args.m || false;
var serverUrl = args.url || config.serverUrl;
var test = args.test;
var online = args.online;
if (test) {
    serverUrl = config.serverTestUrl;
} else if (online) {
    serverUrl = config.serverOnlineUrl;
} else {
    if (serverUrl.indexOf('http://') == -1) {
        serverUrl = 'http://' + serverUrl;
    }
}

var getRap = url => {
    return new Promise((resolve, reject) => {
        http.get(url, res => {
            let chunks = '';

            res.on('data', chunk => {
                chunks += chunk;
            });

            res.on('end', () => {
                resolve(JSON.parse(chunks));
            });

            res.on('error', e => {
                console.error(`Got error: ${e.message}`);
            });
        });
    });
};

var app = express();

// 给匹配路径的请求加上中间件
app.use('/', function(req, res, next) {
    let pathName = req.path;
    let mock = mockConfig[pathName];
    if (globalMock && mock && mock.active) {
        // 从自己的mock文件获取模拟数据
        if (mock.filename) {
            let data = require(`./mock/${mock.filename}`);
            res.send(data);
            return;
        }

        // 从Rap获取模拟数据
        if (mock.rapUrl) {
            getRap(mock.rapUrl).then(data => {
                res.send(data);
            });
            return;
        }
    } else {
        // 进入下一步
        next();
    }
});

app.use(
    '/',
    proxy({
        target: serverUrl,
        changeOrigin: true
    })
);

app.use(express.static(path.join(__dirname, 'public')));

app.listen(port);
console.log(`running ${port}`);




