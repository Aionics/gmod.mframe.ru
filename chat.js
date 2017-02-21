function socket(app, server) {
    const socket = require('socket.io').listen(server);
    let lastMessages = []

    socket.on('connection', function (connection) {
        console.log('connected');
    })

    app.post("/chat", function(req, res, next) {
        let {name, group, team, message} = req.body
        if (team == 'false') {
            message = {
                name: name,
                group: group,
                message: message
            };
            socket.emit('chat_message', message);
            lastMessages.push(message);
            if (lastMessages.length > 10) {
                array.splice(0, 1);
            }

        }
        res.send('received!');
    })

    app.post("/getlastmessages", function(req, res, next) {
        res.send(lastMessages);
    })

    return socket;
}

module.exports.socket = socket;
