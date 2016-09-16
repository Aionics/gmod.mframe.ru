var express = require('express');
var app = express();
var path = require("path");
var PORT = 8083

app.use('/', express.static('./www'));
app.get('/*', function (req, res) {
    res.sendFile("index.html", { root: __dirname + "/www"} )
});

app.listen(PORT, function () {
    console.log('listening on ' + PORT);
});
