const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      where: { userId: req.user.userId },
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, sku, price, stock } = req.body;
    const newProduct = await prisma.product.create({
      data: {
        name,
        sku,
        price: parseFloat(price),
        stock: parseInt(stock),
        userId: req.user.userId,
      },
    });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ error: "Could not create product" });
  }
};

module.exports = { getAllProducts, createProduct };
