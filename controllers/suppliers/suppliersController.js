const express = require('express');
const routes = express.Router();


const Supplier = require('./Supplier');
const adminAuth = require("../../middleware/adminAuth");

routes.get("/admin/suppliers", (req, res) => {
    Supplier.findAll().then(suppliers => {
        res.render("admin/suppliers/index", {suppliers:suppliers});
    })
});

routes.get("/admin/supplier/new", adminAuth, (req, res) => {
    res.render("admin/suppliers/new");
});

routes.post("/supplier/new", adminAuth, (req,res) => {
    var title = req.body.title;

    Supplier.findOne({where:{title: title}}).then(supplier => {
        if(supplier == undefined){
            Supplier.create({
                title: title
            }).then(() => {
                res.redirect("/admin/suppliers");
            }).catch((err) => {
                res.redirect("/admin/suppliers");
            });
        }else{
            res.send("O e-mail já existe");
        }
    })
});

routes.post("/suppliers/delete", adminAuth, (req, res) => {
    var id = req.body.id;
    if(id != undefined){
        if(!isNaN(id)){ //is it a number or not?
            Supplier.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                res.redirect("/admin/suppliers");
            });
        }else{
            res.redirect("/admin/suppliers");
        }
    }else{
        res.redirect("/admin/suppliers");
    }
});

routes.get("/admin/suppliers/edit/:id", adminAuth, (req,res) => {
    var id = req.params.id;

    if(isNaN(id)){
        res.redirect("/admin/suppliers");
    };

    Supplier.findByPk(id).then(supplier => { //Search supplier by its ID
        if(supplier != undefined){
            res.render("admin/supplier/edit", {supplier: supplier});
        }else{
            res.redirect("/admin/suppliers");
        }
    }).catch(err => {
        res.redirect("/admin/suppliers");
    });
});

routes.post("/supplier/update", adminAuth, (req,res) => {
    var id = req.body.id;
    var title = req.body.title;

    Supplier.update({title: title},{
        where: {
            id:id
        }
    }).then(() => {
        res.redirect("/admin/suppliers");
    }).catch(err => {
        res.redirect("/admin/suppliers");
    });
});

module.exports = routes;