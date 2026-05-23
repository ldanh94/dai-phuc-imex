import { PrismaClient, Prisma } from "../src/lib/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

const productData: Prisma.ProductCreateInput[] = [
  {
    type: "FORESTRY",
    nameEn: "Wood",
    nameVi: "Gỗ",
    descEn: "High quality timber sourced from sustainable forests, suitable for construction and furniture manufacturing.",
    descVi: "Gỗ chất lượng cao có nguồn gốc từ các khu rừng bền vững, phù hợp cho xây dựng và sản xuất nội thất.",
    imageUrls: [
      "https://ik.imagekit.io/daiphucimex/products/forestry/wood/wood-1.jpg",
      "https://ik.imagekit.io/daiphucimex/products/forestry/wood/wood-2.jpg",
      "https://ik.imagekit.io/daiphucimex/products/forestry/wood/wood-3.jpg",
    ]
  },
  {
    type: "FORESTRY",
    nameEn: "Cinnamon",
    nameVi: "Quế",
    descEn: "Premium cinnamon bark with rich aroma and spicy-sweet flavor, perfect for culinary and medicinal uses.",
    descVi: "Vỏ quế cao cấp với hương thơm đậm đà và vị cay ngọt, hoàn hảo cho mục đích ẩm thực và y học.",
    imageUrls: [
      "https://ik.imagekit.io/daiphucimex/products/forestry/cinnamon/cinnamon-1.jpg",
      "https://ik.imagekit.io/daiphucimex/products/forestry/cinnamon/cinnamon-2.jpg",
      "https://ik.imagekit.io/daiphucimex/products/forestry/cinnamon/cinnamon-3.jpg",
    ]
  },
  {
    type: "AGRICULTURE",
    nameEn: "Coconut Shell Charcoal",
    nameVi: "Than Gáo Dừa",
    descEn: "Eco-friendly coconut shell charcoal briquettes, offering high heat, long burning time, and minimal ash.",
    descVi: "Than sinh học làm từ gáo dừa thân thiện với môi trường, cho nhiệt lượng cao, thời gian cháy lâu và ít tro.",
    imageUrls: [
      "https://ik.imagekit.io/daiphucimex/products/agriculture/coconut-shell-charcoal/coconut-shell-charcoal-1.jpg",
      "https://ik.imagekit.io/daiphucimex/products/agriculture/coconut-shell-charcoal/coconut-shell-charcoal-2.jpg",
    ]
  },
  {
    type: "AGRICULTURE",
    nameEn: "Bamboo",
    nameVi: "Tre",
    descEn: "Fresh and strong bamboo, harvested at peak maturity. Ideal for construction and manufacturing.",
    descVi: "Tre tươi và chắc khỏe, được thu hoạch ở độ chín cao nhất. Lý tưởng cho xây dựng và sản xuất.",
    imageUrls: [
      "https://ik.imagekit.io/daiphucimex/products/agriculture/bamboo/bamboo-1.jpg",
      "https://ik.imagekit.io/daiphucimex/products/agriculture/bamboo/bamboo-2.jpg",
    ]
  }
];

export async function main() {
  console.log(`Clearing existing products...`);
  await prisma.product.deleteMany({});
  
  console.log(`Start seeding ...`);
  for (const p of productData) {
    const product = await prisma.product.create({
      data: p,
    });
    console.log(`Created product with id: ${product.id} (${product.nameEn})`);
  }
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });