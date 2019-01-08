const express = require('express');
const api = express();
const Gamedig = require('gamedig');

api.post("/getserverdata", function(req, res, next) {
    if (!req.xhr) return next();
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
                    maxplayers: state.maxplayers,
                    palyerslist: state.players
                }
                res.json(answer)
            }
        }
    );
});

module.exports = api;
