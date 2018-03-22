var express = require('express');
var fs = require('fs');

var app = express();

app.get('/v1/home', function(req, res) {
    fs.readFile(__dirname + '/user.json', 'utf8', function(err, data) {
        // data = JSON.parse(data);

        // var user = data['user' + req.params.id];
        res.json(data);
        res.end();
    })
})

app.listen(8081, function() {
    console.log('http://localhost:8081')
});



































