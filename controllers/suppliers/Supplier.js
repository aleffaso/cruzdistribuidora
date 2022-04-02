const Sequelize = require("sequelize");


const connection = require("../../db/db");

const Supplier = connection.define('supplier', {
    title:{
        type: Sequelize.STRING,
        allowNull: false
    }
});

Supplier.sync({force:true}).then(() => {}); //Create table in case of it dos not exist

module.exports = Supplier;

