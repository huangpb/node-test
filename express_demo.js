const express = require('express');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');


const app = express();

function dirPath(url = '', ext = '.js') {
    const fileName = url.split('/').filter(Boolean).join('-') + ext;
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

/********* 使用 js mock 文件 *********/
/**
 * 为什么选择 js mock 文件，而不用下面的 json mock 文件？
 * 因为js文件比json文件更灵活，可以通过js语法生成mock数据。
 */
app.get('/*', function(req, res) {
    const data = require(`${dirPath(req.path)}`);
    res.json(data);
    console.log(chalk.green(`${req.path} 接口 mock 成功！`))
    res.end();
})

app.post('/*', function(req, res) {
    const data = require(`${dirPath(req.path)}`);
    res.json(data);
    console.log(chalk.green(`${req.path} 接口 mock 成功！`))
    res.end();
})

/********* 使用 json mock 文件 *********/
/*
app.get('/*', function(req, res) {
    fs.readFile(dirPath(req.path, 'json'), 'utf8', function(err, data) {
        // 找不到mock文件返回错误状态码
        if (!data) {
            res.status(500);
        } else {
            data = JSON.parse(data);
            // var user = data['user' + req.params.id];
            res.json(data);
        }
        res.end();
    })
})

app.post('/*', function(req, res) {
    fs.readFile(dirPath(req.path), 'utf8', function(err, data) {
        // 找不到mock文件返回错误状态码
        if (!data) {
            res.status(500);
        } else {
            data = JSON.parse(data);
            res.json(data);
        }
        res.end();
    })
})
*/

app.listen(8090, function() {
    console.log('server run in http://localhost:8090')
});

