const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await prisma.product.create({
    data: { name: "Sample Product", sku: "SKU001", price: 10.99, stock: 50 },
  });
}
main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
