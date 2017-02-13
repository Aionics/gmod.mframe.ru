function socket(app, server) {
    const socket = require('socket.io').listen(server);

    socket.on('connection', function (connection) {
        console.log('connected');
    })

    app.post("/chat", function(req, res, next) {
        let {name, group, team, message} = req.body
        if (team == 'false') {
            socket.emit('chat_message', {
                name: name,
                group: group,
                message: message
            })
        }
        res.send('received!');
    })

    return socket;
}

module.exports.socket = socket;
