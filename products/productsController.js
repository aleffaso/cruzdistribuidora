const express = require('express');
const routes = express.Router();
const slugify = require("slugify");
const dotenv = require('dotenv');

const Product = require('./Product');
const Supplier = require('../suppliers/Supplier');
const adminAuth = require("../middleware/adminAuth");
const { upload, uploadS3 } = require("../middleware/uploadImage");

dotenv.config({path: './.env'})

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

routes.post("/product/new", adminAuth, upload.single("picture"), (req,res) => {

    const { title, code, price, amount, supplier } = req.body;
    const url = 'https://cruzdistribuidora.s3.us-east-2.amazonaws.com/';
    const name = Date.now().toString().slice(0,8)+'.jpg';
    const picture = url + name;


    Product.create({
        title: title,
        slug: slugify(title),
        code: code,
        price: price,
        amount: amount,
        picture: picture,
        supplierId: supplier
    }).then(() =>{
        uploadS3(name, req.file.buffer)
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

routes.post("/product/update", adminAuth, upload.single("picture"), (req,res) => {

    var {id, title, code, price, amount, picture, supplier } = req.body
    var split = picture.split('/').slice(-1);

    const url = 'https://cruzdistribuidora.s3.us-east-2.amazonaws.com/';
    const name = split.toString();
    const newPicture = url + name;

    Product.update(
        {
            title: title, 
            slug: title,
            code: code, price: price, 
            amount: amount, 
            picture: newPicture, 
            supplierId: supplier 
        },
        {
        where: {
            id:id
        }
    }).then(() => {
        uploadS3(name, req.file.buffer)
        res.redirect("/admin/products");
    }).catch(err => {
        res.redirect("/admin/products");
    });
});

module.exports = routes;