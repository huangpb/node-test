//模仿浏览器向服务器发送请求
var http = require('http');

var options = {
    host: 'localhost',
    port: 8081,
    path: '/index.html'
};

var req = http.request(options, function(res) {
    var body = '';
    res.on('data', function(data) {
        body += data;
    });

    res.on('end', function() {
        console.log(body)
    })
});

req.end();