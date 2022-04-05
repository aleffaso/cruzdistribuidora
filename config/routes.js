const express = require("express");
const routes = express.Router();

const connection = require("../db/db");
const Supplier = require("../suppliers/Supplier");
const Product =require("../products/Product")

//main page
routes.get("/", (req, res) => {
    Product.findAll({
        include: [{model: Supplier}]
    }).then(products => {
        res.render("index", {products: products});
    });
});

//database connection
connection.authenticate().then(() => {
    console.log("connection success");
}).catch((error) => {
    console.log(error);
});

module.exports = routes;