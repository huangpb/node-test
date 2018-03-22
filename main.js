var http = require('http');

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});

    res.write('<h2>222</h2>')
    res.end();
}).listen(5555);