const { Sequelize, DataTypes } = require('sequelize');
const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const config = require('../config/config');
const env = process.env.NODE_ENV || 'test';
const dbConfig = config[env]

let sequelize;
let User;

beforeAll(async() => {
    sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
       host: dbConfig.host,
       dialect: dbConfig.dialect,  
        logging: false,
    });

    User = userModel(sequelize, DataTypes);
    await sequelize.sync({force: true});
});




describe('User Model', () => {
    test('Should create the User model in database', async () => {
        const tables = await sequelize.getQueryInterface().showAllTables();
    });
});