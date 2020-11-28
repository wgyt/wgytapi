var shell = require('shelljs');
shell.echo('hi')
const express = require('express');
const app = express()

app.all('/', (req, res) => {
    var token = req.param('token');
    var user_name = req.param('username');
		res.status(200).json({"path": "/","token": token, "user": user_name,"Body": "Hi there!"})
});

app.all('/about', function(req, res) {
    var token = req.param('token');
    var user_name = req.param('username');
		res.status(200).json({"path": "/about","token": token, "user": user_name,"Body": "Hi there!"})
});

app.all('/docs', function(req, res) {
    var token = req.param('token');
    var user_name = req.param('username');
		res.status(200).json({"path": "/about","token": token, "user": user_name,"Body": "Hi there!"})
});

app.listen(3000, () => {
  console.log('server started');
});
