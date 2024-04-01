const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    id: Number,
    name: String,
});

const productSchema = new mongoose.Schema({
    id: Number,
    name: String,
    categoryId: Number,
});

const Category = mongoose.model('categories', categorySchema);
const Product = mongoose.model('product', productSchema);

module.exports = { Category, Product };