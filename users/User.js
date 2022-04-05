const Sequelize = require("sequelize");


const connection = require("../db/db");

const User = connection.define('users', {
    name:{
        type: Sequelize.STRING,
        allowNull: false
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

User.sync({force:false}).then(() => {}); //Create table in case of it dos not exist

module.exports = User;