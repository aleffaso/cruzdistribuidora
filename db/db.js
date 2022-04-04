const Sequelize = require('sequelize');
const dotenv = require('dotenv');

dotenv.config({path: './.env'})

const connection = new Sequelize(
    process.env.HEROKU_DATABASE_TABLE, 
    process.env.HEROKU_DATABASE_USER, 
    process.env.HEROKU_DATABASE_PASSWORD,
    { //Database set up
        host: process.env.HEROKU_DATABASE_HOST, // Whenever you want to run in a server you can replace localhost with the IP address
        dialect: process.env.DATABASE_DIALECT,
        timezone: process.env.DATABASE_TIMEZONE
    });

module.exports = connection;