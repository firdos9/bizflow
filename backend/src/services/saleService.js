const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createSale = async (productId, quantity) => {
  return await prisma.$transaction(async (tx) => {
    // 1. Decrease stock
    await tx.product.update({
      where: { id: productId },
      data: { stock: { decrement: quantity } },
    });
    // 2. Create the sale record
    return await tx.sale.create({ data: { productId, quantity } });
  });
};
module.exports = { createSale };
