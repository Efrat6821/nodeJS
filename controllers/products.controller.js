const express = require('express');
const { Router } = require('express');

const router = Router();
const fs = require('fs');
const { log } = require('console');
const fsPromises = require('fs').promises;
const productsClass = require('../classes/products.js');
const { Category, Product } = require('../conectionToDB/db.js');
const { ObjectId } = require('mongodb');

router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        log(products);
        res.send(products);
    }
    catch (err) {
        console.error(err);
    }
});


router.get('/:categoryId', async (req, res) => {
    try {
        const products = await Product.find();
        const category = parseInt(req.params.categoryId);
        const productByCategory = products.filter(p => p.categoryId === category);
        if (productByCategory[0] === undefined) {
            res.status(404).send('there are no products in the requested category!')
        }
        else {
            const sortProducts = productByCategory.toSorted((a, b) => {
                return a.name.localeCompare(b.name);
            });
            res.status(200).send(sortProducts)
        }
    }
    catch (err) {
        console.error(err);
    }
});
router.get('/:categoryId/:productId', async (req, res) => {
    try {
        const products = await Product.find();
        const category = parseInt(req.params.categoryId);
        const Idproduct = parseInt(req.params.productId);
        const productById = products.find(p => p.categoryId === category && p.id === Idproduct);
        if (productById) {
            res.status(200).send(productById)
        }
        else {
            res.status(404).send('there are no products in the requested category or id product')
        }
    }
    catch (err) {
        console.error(err);
    }
});


router.put('/:id', async (req, res) => {
    try {
        const idProduct = new ObjectId(req.params.id);
        const newData = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(idProduct, newData, { new: true });
        if (!updatedProduct) {
            return res.status(404).send('product not found');
        }
        res.send('The product has been updated successfully');
    }
    catch (err) {
        console.error(err);
    }

});

router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const newProduct = new Product(data);
        await newProduct.save();
        res.send('the new product has been successfully added');
    }
    catch (err) {
        console.error(err);
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const idProduct = new ObjectId(req.params.id);
        const deletedProduct = await Product.findByIdAndDelete(idProduct);
        if (!deletedProduct) {
            return res.status(404).send('product not found');
        }
        res.send('The product has been deleted successfully');
    }
    catch (err) {
        console.error(err);
    }

});

module.exports = router;