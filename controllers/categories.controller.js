const express = require('express');
const { Router } = require('express');

const router = Router();
const { log } = require('console');
const { Category, Product } = require('../conectionToDB/db.js');
const { ObjectId } = require('mongodb');
const categoriesSrvice = require('../services/categoriesService.js');



router.get('/', async (req, res) => {
  try {
    const categories = await categoriesSrvice.GetAllCategories();
    res.send(categories);
  }
  catch (err) {
    console.error(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const idcategory = parseInt(req.params.id);
    const category = await categoriesSrvice.GetCtegoryById(idcategory);
    if (category[0]) {
      res.send(category);
    }
    else {
      res.status(404).send('id not exist');
    }
  }
  catch (err) {
    console.error(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const idcategory = new ObjectId(req.params.id);
    const newData = req.body;
    const update = await categoriesSrvice.UpdatedCategory(idcategory, newData);
    if (update === "not found") {
      return res.status(404).send('Category not found');
    }
    res.send('The category has been updated successfully');
  }
  catch (err) {
    console.error(err);
    res.status(500).send('An error occurred during category update');
  }

});

router.post('/', async (req, res) => {
  try {
    const data = req.body;
    await categoriesSrvice.CreateCategory(data);
    res.send('the new category has been successfully added');
  }
  catch (err) {
    console.error(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const categoryId = new ObjectId(req.params.id);
    const deletedCategory = await categoriesSrvice.DeleteCategory(categoryId);
    if (deletedCategory === "not found") {
      return res.status(404).send('Category not found');
    }
    res.send('The category has been deleted successfully');
  }
  catch (err) {
    console.error(err);
  }

});

module.exports = router;