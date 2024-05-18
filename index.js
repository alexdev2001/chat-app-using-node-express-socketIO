// import libraries we need and set them to variables
var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);

var io = require('socket.io')(server);


// set view engine
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.engine('jade', require('jade').__express);

// Route for the main page
app.get('/', (req, res) => {
    res.render('page');
});

// set libray methods that we need to variables


var port = process.env.PORT || 3000


// serve static files
app.use('/public', express.static(__dirname + '/public'));



// server listen
server.listen(port, () => {
    console.log(`The server is listening on port ${port}`);
});


// set up a socketIO connection handler
io.sockets.on('connection', (socket) => {
    console.log('user is successfully conneted');
    socket.emit('connection', {message: 'you are now connected'});

    socket.on('send', (data) => {
        io.sockets.emit('message', data);
    });

    socket.on('disconnected', () => {
        console.log('user is disconnected');
    });
});

module.exports = io;





