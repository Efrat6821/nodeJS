const { Product } = require('../conectionToDB/db.js');

const GetAllProduct = async () => await Product.find();
const GetAllProductByCategoryId = async (categoryId) => {
  const products = await Product.find();
  const productByCategory = products.filter(p => p.categoryId === categoryId);
  if (productByCategory[0] === undefined)
    return "category not found";
  const sortProducts = productByCategory.toSorted((a, b) => {
    return a.name.localeCompare(b.name);
  });
  return sortProducts;
};

const GetProductByCategoryIdAndProductId = async (categoryId, productId) => {
  const products = await Product.find();
  const productById = products.find(p => p.categoryId === categoryId && p.id === productId);
  if (!productById)
    return "product not found";
  return productById;
};

const UpdateProduct = async (productId, newProduct) => {
  const updatedProduct = await Product.findByIdAndUpdate(productId, newProduct, { new: true });
  if (!updatedProduct)
    return "not found";
  return "ok";

};

const CreateProduct = async (newProduct) => {
  const product = new Product(newProduct);
  await product.save();
};

const DeleteProduct = async (productId) => {
  const deletedProduct = await Product.findByIdAndDelete(productId);
  if (!deletedProduct)
    return "not found";
  return "ok";

};
module.exports = { GetAllProduct, GetAllProductByCategoryId, GetProductByCategoryIdAndProductId, UpdateProduct, CreateProduct, DeleteProduct };