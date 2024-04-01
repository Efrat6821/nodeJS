const fsPromises = require('fs').promises;


class categories {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }

    save = async () => {
        try {
            const CategoriesData = await fsPromises.readFile('./data/categories.json');
            const Categories = JSON.parse(CategoriesData);
            Categories.push(this);
            await fsPromises.writeFile('./data/categories.json', JSON.stringify(Categories));
        }
        catch (err) {
            console.error(err);
        }
    }
}
module.exports = categories;