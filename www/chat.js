var m_chat = {
    messages: ko.observableArray(),

    init: function() {
        var socket = io();

        socket.on('chat_message', function (message) {
            m_chat.messages.push(message);
        })
    },
    preloadLast: function() {
        var messages = $.ajax({
            url: 'getlastmessages',
            dataType: 'json',
            type: 'post',
            async: false
        }).responseJSON;

        m_chat.messages(messages)
    }
}
