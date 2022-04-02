const express = require("express");
const routes = express.Router();

const connection = require("../db/db")

//main page
routes.get('/', (req,res) => {
    res.render("index");
});

//database connection
connection.authenticate().then(() => {
    console.log("connection success");
}).catch((error) => {
    console.log(error);
});

module.exports = routes;