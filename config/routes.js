const express = require("express");
const routes = express.Router();

//main page
routes.get('/', (req,res) => {
    res.render("index");
});

module.exports = routes;