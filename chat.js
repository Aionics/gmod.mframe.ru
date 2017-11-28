function socket(app, server) {
    const socket = require('socket.io').listen(server);
    let lastMessages = []

    socket.on('connection', function (connection) {
        console.log('connected');
    })

    app.post("/chat", function(req, res, next) {
        let {name, group, team, message} = req.body
        let utcTime = new Date()
        utcTime = utcTime.getTime() + (utcTime.getTimezoneOffset() * 60000);
        if (team == 'false') {
            message = {
                name: name,
                group: group,
                message: message,
                time: utcTime
            };
            socket.emit('chat_message', message);
            lastMessages.push(message);
            if (lastMessages.length > 10) {
                lastMessages.splice(0, 1);
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
