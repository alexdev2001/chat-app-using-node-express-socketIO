const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { createUser, getUserById, updateUserPassword, deleteUserById } = require('./controllers/userController');



