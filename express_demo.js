var express = require('express');
var fs = require('fs');
var path = require('path');

var app = express();

function dirPath(url = '') {
    const fileName = url.split('/').filter(Boolean).join('-') + '.json';
    return path.resolve(__dirname, 'mock', fileName);
}

//设置跨域访问（设置在所有的请求前面即可）
app.all("*", function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "*");
	res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
	if (req.method == 'OPTIONS')
		res.sendStatus(200); //让options尝试请求快速结束
	else
		next();
});

// app.get('/v1/home', function(req, res) {
//     fs.readFile(__dirname + '/mock/user.json', 'utf8', function(err, data) {
//         data = JSON.parse(data);

//         // var user = data['user' + req.params.id];
//         res.json(data);
//         res.end();
//     })
// })

// app.post('/security/login', function(req, res) {
//     fs.readFile(__dirname + '/mock/login.json', 'utf8', function(err, data) {
//         data = JSON.parse(data);
//         res.json(data);
//         res.end();
//     })
// })

app.get('/*', function(req, res) {
    fs.readFile(dirPath(req.path), 'utf8', function(err, data) {
        data = JSON.parse(data);

        // var user = data['user' + req.params.id];
        res.json(data);
        res.end();
    })
})

app.post('/*', function(req, res) {
    fs.readFile(dirPath(req.path), 'utf8', function(err, data) {
        data = JSON.parse(data);
        res.json(data);
        res.end();
    })
})

app.listen(8081, function() {
    console.log('server run in http://localhost:8081')
});



































