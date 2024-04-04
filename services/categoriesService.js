const { Category } = require('../conectionToDB/db.js');

const GetAllCategories = async () => {
  const Categories = await Category.find();
  const sortCategories = Categories.toSorted((a, b) => {
    return a.name.localeCompare(b.name);
  });
  console.log("services");
  console.log(sortCategories);
  return sortCategories;
};

const GetCtegoryById = async (id) => {
  const Categories = await Category.find();
  const categoryID = Categories.filter(c => c.id === id);
  return categoryID;
};

const UpdatedCategory = async (id, newCategory) => {
  const updatedCategory = await Category.findByIdAndUpdate(id, newCategory, { new: true });
  console.log(updatedCategory);
  if (!updatedCategory) {
    return "not found";
  }
  return "ok";
};

const CreateCategory = async (newCategory) => {
  const category = new Category(newCategory);
  await category.save();
};

const DeleteCategory = async (id) => {
  const deletedCategory = await Category.findByIdAndDelete(id);
  if (!deletedCategory)
    return "not found";
  return "ok";
};
module.exports = { GetAllCategories, GetCtegoryById, UpdatedCategory, CreateCategory, DeleteCategory };