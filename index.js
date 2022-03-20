const express = require('express');
const app = express();
const routes = require('./config/routes');
const dotenv = require('dotenv');

//Set envkeys
dotenv.config({path: './.env'})

//View engine
app.set('view engine', 'ejs');

//Static
app.use(express.static('public'));

//routes
app.use("/", routes);

//Server
app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running");
})