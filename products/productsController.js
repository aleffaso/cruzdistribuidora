const express = require('express');
const routes = express.Router();
const slugify = require("slugify");

const Product = require('./Product');
const Supplier = require('../suppliers/Supplier');
const adminAuth = require("../middleware/adminAuth");

routes.get("/admin/products", adminAuth, (req, res) => {
    Product.findAll({
        include: [{model: Supplier}]
    }).then(products => {
        res.render("admin/products/index", {products:products});
    })
});

routes.get("/admin/product/new", adminAuth, (req, res) => {
    Supplier.findAll().then(suppliers => {
        res.render("admin/products/new", {suppliers:suppliers});
    });
});

routes.post("/product/new", adminAuth, (req,res) => {
    
    var {title, code, price, amount, picture, supplier } = req.body
    
    Product.create({
        title: title,
        slug: slugify(title),
        code: code,
        price: price,
        amount: amount,
        picture: picture,
        supplierId: supplier
    }).then(() => {
        res.redirect("/admin/products");
    });
});

routes.post("/products/delete", adminAuth, (req, res) => {
    var id = req.body.id;
    if(id != undefined){
        if(!isNaN(id)){ //is it a number or not?
            Product.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                res.redirect("/admin/products");
            });
        }else{
            res.redirect("/admin/products");
        }
    }else{
        res.redirect("/admin/products");
    }
});

routes.get("/admin/products/edit/:id", adminAuth, (req,res) => {
    var id = req.params.id;

    if(isNaN(id)){
        res.redirect("/admin/products");
    };

    Product.findByPk(id).then(product => { //Search supplier by its ID
        if(product != undefined){
            Supplier.findAll().then( suppliers => {
                res.render("admin/products/edit", {product: product, suppliers: suppliers});
            });            
        }else{
            res.redirect("/admin/products");
        }
    }).catch(err => {
        res.redirect("/admin/products");
    });
});

routes.post("/product/update", adminAuth, (req,res) => {

    var {id, title, code, price, amount, picture, supplier } = req.body

    Product.update(
        {
            title: title, 
            slug: slugify(title),
            code: code, price: price, 
            amount: amount, 
            picture: picture, 
            supplierId: supplier 
        },
        {
        where: {
            id:id
        }
    }).then(() => {
        res.redirect("/admin/products");
    }).catch(err => {
        res.redirect("/admin/products");
    });
});

module.exports = routes;