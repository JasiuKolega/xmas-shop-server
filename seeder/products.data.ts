import { Product } from '@prisma/client';

export interface IProductPart extends Pick<Product, 'name' | 'images'> {}

export const products: IProductPart[] = [
  {
    name: 'Caramel Frappuccino',
    images: [
      '/uploads/images/products/frappuccino.webp',
      '/uploads/images/products/frappuccino_2.webp',
      '/uploads/images/products/frappuccino_3.webp',
    ],
  },
  {
    name: 'Mocha Cookie Crumble Frappuccino',
    images: [
      '/uploads/images/products/mocha-cookie.webp',
      '/uploads/images/products/mocha-cookie_2.webp',
      '/uploads/images/products/mocha-cookie_3.webp',
    ],
  },
  {
    name: 'White Chocolate Macadamia Cream',
    images: [
      '/uploads/images/products/cold-coffee.webp',
      '/uploads/images/products/cold-coffee_2.webp',
      '/uploads/images/products/cold-coffee_3.webp',
    ],
  },
  {
    name: 'Java Chip Frappuccino® Blended Beverage',
    images: [
      '/uploads/images/products/java-chip-frappuccino.webp',
      '/uploads/images/products/java-chip-frappuccino_2.webp',
      '/uploads/images/products/java-chip-frappuccino_3.webp',
    ],
  },
];
