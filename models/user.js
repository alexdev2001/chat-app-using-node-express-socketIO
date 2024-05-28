const bcrypt = require('bcrypt');
const  { Sequelize, DataTypes }  = require('sequelize');


const sequelize = new Sequelize('chat_users', 'postgres', 'imani2001', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false,
});

const User = sequelize.define('chatuser', {
            id: {
               type: DataTypes.INTEGER,
               autoIncrement: true,
               allowNull: false, 
               primaryKey: true
            },
            username : {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            }
        });

        User.beforeCreate(async (user, options) => {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt)
    
        });
    
        User.prototype.validPassword = async function(password) {
            return await bcrypt.compare(password, this.password);
        };


async function syncBook() {
    try {
        sequelize.sync();
        console.log('users table successfully created!');
    } catch (error) {
        console.error('Could not create table in database');
    }
}

syncBook();

module.exports = User;