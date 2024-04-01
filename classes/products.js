const fsPromises = require('fs').promises;

class products {

    constructor(id, name, categoryId) {
        this.id = id;
        this.name = name;
        this.categoryId = categoryId;
    }

    save = async () => {
        try {
            const productsData = await fsPromises.readFile('data/products.json');
            const Products = JSON.parse(productsData);
            Products.push(this);
            await fsPromises.writeFile('data/products.json', JSON.stringify(Products));
        }
        catch (err) {
            console.error(err);
        }
    }
}
module.exports = products;