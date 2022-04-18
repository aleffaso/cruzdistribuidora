const express = require("express");
const routes = express.Router();

const connection = require("../db/db");
const Supplier = require("../suppliers/Supplier");
const Product =require("../products/Product")
const mailSend = require("../config/email")

//database connection
connection.authenticate().then(() => {
    console.log("connection success");
}).catch((error) => {
    console.log(error);
});

//main page
routes.get("/", (req, res) => {
    Product.findAll({
        include: [{model: Supplier}]
    }).then(products => {
        res.render("index", {products: products});
    });
});

//Product page
routes.get("/produtos", (req, res) => {
    Product.findAll({
        include: [{model: Supplier}]
    }).then(products => {
        Supplier.findAll({
        }).then(suppliers => {
            res.render("pages/products", {products: products, suppliers: suppliers});
        });
    });
});

//send e-mail route
routes.post("/send", mailSend, (req, res) => {
    res.redirect("/#contact")
});

//Error not found page
routes.get('*', (req, res) =>{
    res.render("erro")
});

module.exports = routes;