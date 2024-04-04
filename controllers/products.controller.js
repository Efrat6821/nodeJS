const express = require('express');
const { Router } = require('express');

const router = Router();
const fs = require('fs');
const { log } = require('console');
const fsPromises = require('fs').promises;
const productsClass = require('../classes/products.js');
const { Category, Product } = require('../conectionToDB/db.js');
const { ObjectId } = require('mongodb');
const productSrvice = require('../services/productsSrvice.js');


router.get('/', async (req, res) => {
  try {
    const products = await productSrvice.GetAllProduct();
    console.log(products);
    res.send(products);
  }
  catch (err) {
    console.error(err);
  }
});


router.get('/:categoryId', async (req, res) => {
  try {
    const category = parseInt(req.params.categoryId);
    const prodctsById = await productSrvice.GetAllProductByCategoryId(category);
    if (prodctsById === "category not found")
      res.status(404).send('there are no products in the requested category!');
    res.status(200).send(prodctsById);
  }
  catch (err) {
    console.error(err);
  }
});
router.get('/:categoryId/:productId', async (req, res) => {
  try {
    const categoryId = parseInt(req.params.categoryId);
    const productId = parseInt(req.params.productId);
    const productById = await productSrvice.GetProductByCategoryIdAndProductId(categoryId, productId);
    if (productById === "product not found")
      res.status(404).send('there are no products in the requested category or id product');
    res.status(200).send(productById);
  }
  catch (err) {
    console.error(err);
  }
});


router.put('/:id', async (req, res) => {
  try {
    const productId = new ObjectId(req.params.id);
    const newData = req.body;
    const updatedProduct = await productSrvice.UpdateProduct(productId, newData);
    if (updatedProduct === "not found") {
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
    await productSrvice.CreateProduct(data);
    res.send('the new product has been successfully added');
  }
  catch (err) {
    console.error(err);
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const productId = new ObjectId(req.params.id);
    const deletedProduct = await productSrvice.DeleteProduct(productId);
    if (deletedProduct === "not found") {
      return res.status(404).send('product not found');
    }
    res.send('The product has been deleted successfully');
  }
  catch (err) {
    console.error(err);
  }
});

module.exports = router;