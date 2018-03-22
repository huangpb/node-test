var http = require('http');
var url = require('url');
var fs = require('fs');


http.createServer(function(req, res) {
    var pathname = url.parse(req.url).pathname;
    console.log('pathname: ' + pathname);

    fs.readFile(pathname.substr(1), function(err, data) {
        if(err) {
            console.log(err);
            res.writeHead(404, {'Content-Type': 'text/html'});
        }else {
            res.writeHead(200, {'Content-Type': 'text/html'});
            console.log(data)
            res.write(data.toString());
        }

        res.end();
    })
}).listen(8081);

console.log('Server run in port 8081');



