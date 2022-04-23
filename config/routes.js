const express = require("express");
const routes = express.Router();
const dotenv = require('dotenv');
const alert = require('alert');

const connection = require("../db/db");
const Supplier = require("../suppliers/Supplier");
const Product =require("../products/Product")
const mailSend = require("../config/email")

dotenv.config({path: './.env'})

//Global variables
const company = {
    email : process.env.EMAIL,
    phone : process.env.PHONE,
    wpp : process.env.WPP,
    cnpj : process.env.CNPJ,
    cep : process.env.CEP,
    address : process.env.ADDRESS,
    provincy : process.env.PROVINCY,
    city : process.env.CITY,
    state : process.env.STATE
}

//main page
routes.get("/", (req, res) => {

    const slide = {
        max: 4,
        min: 0,
        avg: 3
    } 

    Product.findAll({
        include: [{model: Supplier}]
    }).then(products => {res.render("index", {
            products: products,
            company: company,
            slide: slide
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
                company: company
            });
        });
    });
});

//send e-mail route
routes.post("/send", mailSend, (req, res) => {
    res.redirect("/#contact")
    alert("Email enviado com sucesso!")
});

//Not found page
routes.get('*', (req, res) =>{
    res.render("erro", {company: company})
});

//Database connection
connection.authenticate().then(() => {
    console.log("connection success");
}).catch((error) => {
    console.log(error);
});


module.exports = routes;