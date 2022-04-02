const express = require('express');
const app = express();
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const session = require('express-session');


const routes = require('./config/routes');
const usersController = require("./controllers/users/UsersController");

//Set envkeys
dotenv.config({path: './.env'})

//View engine
app.set('view engine', 'ejs');

//Sessions
app.use(session({
    secret: process.env.SESSION_SECRET, 
    resave: false,
    saveUninitialized: false
}))

//static
app.use(express.static('public'));

//body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//routes
 app.use("/", usersController);
// app.use("/", productsController);
// app.use("/", usersController);
app.use("/", routes);

//Server
app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running");
})