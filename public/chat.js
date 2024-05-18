
window.onload = function() {
    // variables we need that manipulate the state of the messages
    var messages = [];
    var socket = io.connect('http://localhost:3000');
    var field = document.getElementById('field');
    var sendButton = document.getElementById('send');
    var content = document.getElementById('content');
    var name = document.getElementById('name');

    // message listener
    socket.on('message', (data) => {
        if(data.message) {
            messages.push(data);
            var html = '';
            for (var i = 0; i < messages.length; i++) {
                html += '<b>' + (messages[i].username ? messages[i].username : 'Server') + ':</b>';
                html += messages[i].message +  '</br>';
            }
            content.innerHTML = html;
            content.scrollTop = content.scrollHeight;
        } else {
            console.log('could not process message', );
        }
    });

    // btton to send message to socket
    sendButton.onclick = () => {
        if (name.value = '') {
            alert('please enter your name?');
        } 
        var text = field.value;
        socket.emit('send', {message: text, username: name.value});
        field.value =  '';

    }
   
    // add a key listener
    field.addEventListener('keypress', (e) => {
        var key = e.which || e.keyCode;
        if (key === 13) {
            sendButton.onclick();
        }
    });

};