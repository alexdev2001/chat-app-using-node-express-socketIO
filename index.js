// import libraries we need and set them to variables
var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
const bodyParser = require('body-parser');
const { createUser, getUserById, updateUserPassword, deleteUserById } = require('./controllers/userController');
const { Sequelize } = require('sequelize');
const  User = require('./models/user')
const sequelize = require('./models/index');

var io = require('socket.io')(server);


// set view engine
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.engine('jade', require('jade').__express);

// Route for the main page
app.get('/', (req, res) => {
    res.render('page');
});

app.use(bodyParser.json());


app.post('/users/add', async (req, res) => {
    try {
        const { username, password } = req.body;
        // Create a new user
        const user = await User.create({ username, password });
        // Return the created user data in the response
        res.status(201).json(user);
    } catch (error) {
        // Handle validation and unique constraint errors
        if (error.name === 'SequelizeUniqueConstraintError') {
            res.status(400).json({ error: 'Username already taken' });
        } else {
            res.status(400).json({ error: error.message });
        }
    }
});

// Get a user by id
app.get('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await getUserById(id);
        if (user) {
            res.status(200).json(User);
        } else {
            res.status(404).json({ error: 'User is not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update a user's password 
app.put('/users/update/:id', async (req, res) => {
   try {
    const { id } = req.params;
    const {  newPassword } = req.body;
    const user = await updateUserPassword(id, newPassword);
    res.status(200).json(user);
   } catch (error) {
    res.status(400).json({ error: error.message });
   }
});

// Delete a user by id
app.delete('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await deleteUserById(id);
        if (result) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'User not found' });

        }
    }  catch (error) {
        res.status(400).json({ error: error.message });
    }
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





