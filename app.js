const express = require('express');
const app = express();
const server  = require('http').createServer(app);
const bodyParser = require("body-parser");
const path = require("path");

app.set('json spaces', 40);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', require('./api'));
const chat = require('./chat').socket(app, server)

app.use('/', express.static('./www'));
app.get('/*', function (req, res, next) {
    if(req.url.indexOf('/api') !== -1) return next();
    res.sendFile("index.html", { root: __dirname + "/www"} )
});

const PORT = 8083
server.listen(PORT, function () {
    console.log('listening on ' + PORT);
});
