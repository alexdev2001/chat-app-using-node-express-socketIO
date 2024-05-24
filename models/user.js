const bcrypt = require('bcrypt');
const  { sequelize, DataTypes }  = require('sequelize');


module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
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
    return User; 

}