var m_chat = {
    messages: ko.observableArray(),

    init: function() {
        var socket = io();

        socket.on('chat_message', function (message) {
            message.time = new Date(message.time + (3600000 * (new Date).getTimezoneOffset() ));
            m_chat.messages.push(message);

            var chatBox = document.getElementById('chatBox');
            chatBox.scrollTop = chatBox.scrollHeight;
            if (m_chat.messages().length > 100) {
                m_chat.messages.shift();
            }
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
