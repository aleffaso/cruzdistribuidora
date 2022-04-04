const Sequelize = require("sequelize");


const connection = require("../../db/db");
const Supplier = require("../suppliers/Supplier")

const Product = connection.define('products', {
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false
    },
    code: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    price: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    amount: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    picture: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

Product.belongsTo(Supplier)

Product.sync({force:false}).then(() => {}); //Create table in case of it dos not exist

module.exports = Product;

