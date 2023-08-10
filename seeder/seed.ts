import { Prisma, PrismaClient, Product } from '@prisma/client';
import { faker } from '@faker-js/faker';
import * as dotenv from 'dotenv';
import { IProductPart, products } from './products.data';

function convertToSlug(name: string): string {
  return name
    .toLowerCase() // Convert the name to lowercase
    .replace(/[\s_]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/[^\w-]+/g, '') // Remove any non-alphanumeric characters except hyphens
    .trim() // Remove leading and trailing whitespace
    .replace(/-{2,}/g, '-'); // Replace multiple consecutive hyphens with a single one
}

const prisma = new PrismaClient();

const fakerProduct = (product: IProductPart): Prisma.ProductCreateInput => ({
  name: product.name,
  images: product.images,
  description: faker.commerce.productDescription(),
  price: faker.number.int({ min: 4, max: 20 }),
  slug: convertToSlug(product.name),
  reviews: {
    createMany: {
      data: Array.from({
        length: faker.number.int({ min: 1, max: 4 }),
      }).map(() => ({
        text: faker.lorem.paragraph(),
        rating: faker.number.int({ min: 1, max: 5 }),
      })),
    },
  },
});

async function main() {
  const fakerRounds = 10;
  dotenv.config();
  console.log('Seeding...');
  /// --------- Products ---------------
  await Promise.all(
    products.map(async (product) => {
      await prisma.product.create({ data: fakerProduct(product) });
    }),
  );
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
