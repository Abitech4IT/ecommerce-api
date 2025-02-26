import Product from "@models/product.model";

// Find all  products
const getAllProducts = async () => {
  return await Product.findAll();
};

const getProductById = async (id: string) => {
  return await Product.findByPk(id);
};

const repo = {
  getAllProducts,
  getProductById,
};

export default repo;
