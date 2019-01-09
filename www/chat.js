var groupColors = {
    owner: 'black',
    admin: 'rgb(250, 75, 75)',
    coder: 'rgb(72, 0, 173)',
    lua_coder: 'rgb(72, 0, 173)',
    builder: 'rgb(255, 255, 0)',
    Unter_Builder: 'rgb(0, 100, 200)',
    respected: 'rgb(0, 168, 0)',
    newbie: 'rgb(0, 255, 38)',
    user: 'rgb(140, 140, 140)',
    mingebag: 'rgb(232, 130, 0)'
}
var formatMessage = function(message) {
    message.time = new Date(message.time + (3600000 * (new Date).getTimezoneOffset() ));
    var group = message.group.replace(/-/g, '_')
    if (group in groupColors) {
        message.groupColor = groupColors[group]
    }
    return message
}
var m_chat = {
    messages: [],

    init: function() {
        var socket = io();

        socket.on('chat_message', function (message) {
            m_chat.messages.push(formatMessage(message));

            var chatBox = document.getElementById('chatBox');
            chatBox.scrollTop = chatBox.scrollHeight;
            if (m_chat.messages().length > 100) {
                m_chat.messages.shift();
            }
        })
        var messages
        $.ajax({
            url: 'getlastmessages',
            dataType: 'json',
            type: 'post',
            async: false,
            success: function(answer) {
                messages = answer;
            }
        })

        for (message in messages) {
            m_chat.messages.push(formatMessage(messages[message]));
        }
        // var chatBox = document.getElementById('chatBox');
        // chatBox.scrollTop = chatBox.scrollHeight;
    }
}
