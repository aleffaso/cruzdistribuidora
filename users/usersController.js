const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const dotenv = require('dotenv');
const routes = express.Router();

const User = require('./User');
const adminAuth = require("../middleware/adminAuth"); 

dotenv.config({path: './.env'})

routes.get("/admin/users", adminAuth, (req, res) => {
    User.findAll().then(users => {
        res.render("admin/users/index", {users:users});
    })
});

routes.get("/admin/user/new", adminAuth, (req, res) => {
    res.render("admin/users/new");
});

routes.post("/users/new", adminAuth, (req,res) => {

    var {name, email, password, passwordCheck} = req.body;

    if(password != passwordCheck){
        res.send("É necessário informar a mesma senha");
    };

    User.findOne({where:{email: email}}).then(user => {

        if(user == undefined){
            
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(password,salt);

            User.create({
                name: name,
                email: email,
                password: hash
            }).then(() => {
                res.redirect("/admin/users");
            }).catch((err) => {
                res.redirect("/admin/users");
            });
        }else{
            res.send("O e-mail já existe");
        }
    })
});

routes.post("/users/delete", adminAuth, (req, res) => {

    var id = req.body.id;

    if(id != undefined){
        if(!isNaN(id)){ //is it a number or not?
            User.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                res.redirect("/admin/users");
            });
        }else{
            res.redirect("/admin/users");
        }
    }else{
        res.redirect("/admin/users");
    }
});

routes.get("/admin/users/edit/:id", adminAuth, (req,res) => {

    var id = req.params.id;

    if(isNaN(id)){
        res.redirect("/admin/users");
    };

    User.findByPk(id).then(user => { //Search user by its ID
        if(user != undefined){
            res.render("admin/users/edit", {user: user});
        }else{
            res.redirect("/admin/users");
        }
    }).catch(err => {
        res.redirect("/admin/users");
    });
});

routes.post("/users/update", adminAuth, (req,res) => {

    var {id, name, email, password, passwordCheck} = req.body;

    if(password != passwordCheck){
        res.send("É necessário informar a mesma senha");
    };

    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password,salt);

    User.update({name: name, email: email, password: hash},{
        where: {
            id:id
        }
    }).then(() => {
        res.redirect("/admin/users");
    }).catch(err => {
        res.redirect("/admin/users");
    });
});

routes.get("/admin/index", adminAuth, (req, res) => {
    res.render("admin/index");
});

routes.get("/login", (req,res) => {
    res.render("login");
}); 

routes.post("/login", (req, res) => {

    var {email, password} = req.body;

    if(email != undefined) {

        User.findOne({where: {email: email}}).then(user => {

            if(user != undefined){

                if( bcrypt.compareSync(password, user.password)){

                    jwt.sign({id:user.id, email:user.email}, process.env.JWT_TOKEN, {expiresIn:'10h'}, (err, token) =>{
                        if(err){
                            res.redirect("/login");
                        }else{
                            req.session.token = token
                            res.redirect("/admin/index");   
                        }

                    })
                }else{
                    res.redirect("/login");
                }
    
            }else{
                res.redirect("/login");
            }
        })

    }else{
        res.redirect("/login");
    }
})

routes.get("/logout", (req,res) => {
    req.session.token = undefined;
    res.redirect("/login");
});

module.exports = routes;
