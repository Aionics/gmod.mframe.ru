var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var PORT = 8083

var path = require("path");
var Gamedig = require('gamedig');

app.set('json spaces', 40);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// var respond = function(err, result) {
//     if(err == undefined) {
//         err = null
//     }
//
//     if(result == undefined) {
//         result = null
//     }
//
//     this.json({
//         err: err,
//         result: result
//     })
// }
//
// app.use(function(req, res, next) {
//     res.respond = function() {
//         respond.apply(res, arguments)
//     }
// })

app.post("/api/getserverdata", function(req, res) {
    Gamedig.query(
        {
            type: 'garrysmod',
            host: 'mframe.ru'
        },
        function(state) {
            if (state.error) {
                res.end("Server is offline");
            } else {
                var answer = {
                    map: state.map,
                    playersamount: state.raw.numplayers,
                    maxplayers: state.maxplayers
                }
                res.json(answer)
            }
        }
    );
});

app.use('/', express.static('./www'));
app.get('/*', function (req, res) {
    res.sendFile("index.html", { root: __dirname + "/www"} )
});

app.listen(PORT, function () {
    console.log('listening on ' + PORT);
});
