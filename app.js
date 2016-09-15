var express = require('express');
var app = express();
var path = require("path");
var PORT = 8083

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname+'/www/index.html'));
});

app.listen(PORT, function () {
    console.log('listening on ' + PORT);
});
