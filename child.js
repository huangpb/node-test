var express = require('express')
var fs = require('fs')

var app = express()

app.get('/child.html', function(req, res) {
    fs.readFile('./views/child.html', function(err, data) {
        if(err) {
            res.writeHead(404, {'Content-Type': 'text/html'});
        }else {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data.toString());
        }

        res.end();
    })
})

app.get('/getData', function(req, res) {
    res.send('hi')
})

app.get('/api', function(req, res) {
    console.log(req.query.callback)
    var data = {name: 'jim'}
    res.send(req.query.callback + '(' + JSON.stringify(data) + ')')

})

app.listen(10002, function() {
    console.log('http://localhost:10002/child.html')
})
