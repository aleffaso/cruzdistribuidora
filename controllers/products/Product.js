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
        allowNull: false
    },
    amount: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    picture: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

Product.belongsTo(Supplier)

Product.sync({force:true}).then(() => {}); //Create table in case of it dos not exist

module.exports = Product;

