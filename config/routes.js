const express = require("express");
const routes = express.Router();
const dotenv = require('dotenv');

const connection = require("../db/db");
const Supplier = require("../suppliers/Supplier");
const Product =require("../products/Product")
const mailSend = require("../config/email")

dotenv.config({path: './.env'})

//main page
routes.get("/", (req, res) => {
    Product.findAll({
        include: [{model: Supplier}]
    }).then(products => {res.render("index", {
            products: products,
            email: process.env.EMAIL,
            phone: process.env.PHONE,
            wpp: process.env.WPP,
            cnpj: process.env.CNPJ,
            cep: process.env.CEP,
            address: process.env.ADDRESS,
            provincy: process.env.PROVINCY,
            city: process.env.CITY,
            state: process.env.STATE
        });
    });
});

//Product page
routes.get("/produtos", (req, res) => {
    Product.findAll({
        include: [{model: Supplier}]
    }).then(products => {
        Supplier.findAll({
        }).then(suppliers => {
            res.render("pages/products", {
                products: products, 
                suppliers: suppliers,
                email: process.env.EMAIL,
                phone: process.env.PHONE,
                wpp: process.env.WPP,
                cnpj: process.env.CNPJ,
                cep: process.env.CEP,
                address: process.env.ADDRESS,
                provincy: process.env.PROVINCY,
                city: process.env.CITY,
                state: process.env.STATE
            });
        });
    });
});

//send e-mail route
routes.post("/send", mailSend, (req, res) => {
    res.redirect("/#contact")
});

//Not found page
routes.get('*', (req, res) =>{
    res.render("erro", {
        email: process.env.EMAIL,
        phone: process.env.PHONE,
        wpp: process.env.WPP,
        cnpj: process.env.CNPJ,
        cep: process.env.CEP,
        address: process.env.ADDRESS,
        provincy: process.env.PROVINCY,
        city: process.env.CITY,
        state: process.env.STATE
    })
});

//Database connection
connection.authenticate().then(() => {
    console.log("connection success");
}).catch((error) => {
    console.log(error);
});


module.exports = routes;