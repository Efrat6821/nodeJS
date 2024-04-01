const express = require('express');
const { Router } = require('express');

const router = Router();
const { log } = require('console');
const { Category, Product } = require('../conectionToDB/db.js');
const { ObjectId } = require('mongodb');


router.get('/', async (req, res) => {
    try {
        const Categories = await Category.find();
        const sortCategories = Categories.toSorted((a, b) => {
            return a.name.localeCompare(b.name);
        });
        log(sortCategories);
        res.send(sortCategories);
    }
    catch (err) {
        console.error(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const idcategory = parseInt(req.params.id);
        const Categories = await Category.find();
        const categoryID = Categories.filter(c => c.id === idcategory);
        if (categoryID[0]) {
            res.send(categoryID);
        }
        else {
            res.status(404).send('id not exist')
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
        const updatedCategory = await Category.findByIdAndUpdate(idcategory, newData, { new: true });
        console.log(updatedCategory);
        if (!updatedCategory) {
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
        const newCategory = new Category(data);
        await newCategory.save();
        res.send('the new category has been successfully added');
    }
    catch (err) {
        console.error(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const categoryId = new ObjectId(req.params.id);
        const deletedCategory = await Category.findByIdAndDelete(categoryId);
        if (!deletedCategory) {
            return res.status(404).send('Category not found');
        }
        res.send('The category has been deleted successfully');
    }
    catch (err) {
        console.error(err);
    }

});

module.exports = router;