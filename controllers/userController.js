const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/config');
const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];
const bcrypt = require('bcrypt');

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    logging: false
});

const User = require('../models/user');


// Get a user by id
const getUserById = async (id) => {
    try {
        const user = await User.findByPk(id);
        if (user) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(newPassword, salt);
            await user.save();
            return user;
        } else {
            throw new Error('user is not found');
        }
    } catch (error) {
        throw error;
    }
};

const updateUserPassword = async (id, newPassword) => {
    try {
        const user = await User.findByPk(id);
        if (user) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(newPassword, salt);
            await user.save();
            return user;
        } else {
            throw new Error('User not found');
        }
    }  catch (error) {
        throw error;
    }
};

const deleteUserById = async (id) => {
    try {
        const result = await User.destroy({ where: { id }});
        return result;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getUserById,
    updateUserPassword,
    deleteUserById
}

