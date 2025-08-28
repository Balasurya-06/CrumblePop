import type { Product } from './types';

export const products: Product[] = [
  {
    id: 'cake-1',
    name: 'Choco Fudge Fantasy',
    description: 'A decadent chocolate cake layered with hazelnut cream, crunchy wafer bits, and topped with Ferrero Rocher chocolates. A true indulgence.',
    category: 'Cakes',
    images: ['https://picsum.photos/600/600'],
    sizes: [
      { name: '0.5 kg', price: 600 },
      { name: '1 kg', price: 1100 },
      { name: '1.5 kg', price: 1600 },
    ],
    isBestseller: true,
  },
  {
    id: 'cake-2',
    name: 'Dark Chocolate Cake',
    description: 'Rich, moist chocolate sponge filled and frosted with a silky smooth chocolate truffle ganache. A classic choice for any celebration.',
    category: 'Cakes',
    images: ['https://picsum.photos/601/601'],
    sizes: [
      { name: '0.5 kg', price: 550 },
      { name: '1 kg', price: 1000 },
    ],
    isBestseller: true,
  },
  {
    id: 'brownie-1',
    name: 'Almond Butter Cookie',
    description: 'The ultimate brownie for chocolate lovers. Fudgy, dense, and packed with milk, white, and dark chocolate chunks.',
    category: 'Brownies',
    images: ['https://picsum.photos/602/602'],
    sizes: [
      { name: 'Pack of 4', price: 400 },
      { name: 'Pack of 8', price: 750 },
    ],
    isBestseller: true,
  },
  {
    id: 'brownie-2',
    name: 'Freshly Baked Croissants',
    description: 'A classic fudgy brownie loaded with toasted walnuts for a satisfying crunch. The perfect balance of rich and nutty.',
    category: 'Brownies',
    images: ['https://picsum.photos/603/603'],
    sizes: [
      { name: 'Pack of 4', price: 380 },
      { name: 'Pack of 8', price: 720 },
    ],
    isBestseller: true,
  },
  {
    id: 'cake-3',
    name: 'Red Velvet Cake',
    description: 'A stunning crimson cake with a hint of cocoa, layered with our signature cream cheese frosting. Both beautiful and delicious.',
    category: 'Cakes',
    images: ['https://picsum.photos/604/604'],
    sizes: [
      { name: '0.5 kg', price: 650 },
      { name: '1 kg', price: 1200 },
    ],
  },
  {
    id: 'brownie-3',
    name: 'Nutella Swirl Brownie',
    description: 'Our signature brownie swirled with generous amounts of creamy Nutella. A heavenly combination you won\'t forget.',
    category: 'Brownies',
    images: ['https://picsum.photos/605/605'],
    sizes: [
      { name: 'Pack of 4', price: 420 },
      { name: 'Pack of 8', price: 800 },
    ],
  },
];
