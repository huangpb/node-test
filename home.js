var express = require('express')
var fs = require('fs')

var app = express()

app.use(express.static('public'))

app.get('/home.html', function(req, res) {
    fs.readFile('./views/home.html', function(err, data) {
        if(err) {
            res.writeHead(404, {'Content-Type': 'text/html'});
        }else {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data.toString());
        }

        res.end('111');
    })
})

app.get('/proxy.html', function(req, res) {
    fs.readFile('./views/proxy.html', function(err, data) {
        if(err) {
            res.writeHead(404, {'Content-Type': 'text/html'});
        }else {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data.toString());
        }

        res.end('111');
    })
})

app.get('/get', function (req, res) {
    res.set({
        'Access-Control-Allow-Credentials': 'true',
        // 'Access-Control-Allow-Origin': 'http://localhost:10002'
    })
    res.cookie('name', 'jim')

    res.send('Cors测试')
    res.end('222')
})

app.get('/api/users', function (req, res) {
    res.send('fetch')
    res.end('222')
})

app.listen(10001, function() {
    console.log('http://localhost:10001/home.html')
})
