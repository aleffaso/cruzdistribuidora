const Sequelize = require('sequelize');
const dotenv = require('dotenv');

dotenv.config({path: './.env'})

const connection = new Sequelize(
    process.env.DATABASE_TABLE, 
    process.env.DATABASE_USER, 
    process.env.DATABASE_PASSWORD,
    { //Database set up
        host: process.env.DATABASE_HOST, // Whenever you want to run in a server you can replace localhost with the IP address
        dialect: process.env.DATABASE_DIALECT,
        timezone: process.env.DATABASE_TIMEZONE
    });

module.exports = connection;