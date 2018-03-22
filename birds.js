//birds.js
var express = require('express');
var router = express.Router();

router.use(function(req, res, next) {
    console.log(Date.now());
    next()
})

router.get('/', function(req, res) {
    res.render('index', {
        title: '首页',
        content: 'hello swig'
    })
});

router.get('/about', function(req, res) {
    res.render('index', {
        title: 'about',
        content: 'hello about'
    })
});

module.exports = router;