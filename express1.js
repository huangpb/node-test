//server.js
var express = require('express');
var swig = require('swig');
var birds = require('./birds');

var app = express();

const port = 10020;

app.use(express.static('public'));

swig.setDefaults({
    cache: false
});

app.set('view cache', false);

app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.engine('html', swig.renderFile);

app.listen(port);

app.set('name', 'jim');
var name = app.get('name');
console.log(name)

app.use('/birds', birds);

console.log('Server is started at http://localhost:' + port);