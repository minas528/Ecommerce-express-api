const Product = require("../models/Products");

exports.products = async () => {
  let perPage = 10,
      page = Math.max(0, req.param("page"));
  const products = await Product.find()
                                .select("id")
                                .limit(perPage)
                                .skip(perPage * page)
                                .sort("price");
  return products;
};

exports.productById = async (id) => {
  const product = await Product.findById(id);
  return product;
};

exports.createProduct = async (payload) => {
  const newProduct = await Product.create(payload);
  return newProduct;
};

exports.updateProduct = async (id) => {
  const product = await Product.findByIdAndUpdate(id);
  return product;
};

exports.removeProduct = async (id) => {
  const product = await Product.findByIdAndRemove(id);
  return product;
};
