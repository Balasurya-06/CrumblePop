
export type ProductSize = {
  name: string;
  price: number;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  category: 'Cakes' | 'Brownies';
  images: string[];
  sizes: ProductSize[];
  isBestseller?: boolean;
};

export type CartItem = {
  id: string; // Unique ID for cart item (e.g., productId-size)
  productId: string;
  name: string;
  size: string;
  quantity: number;
  price: number;
  image: string;
};

export type Order = {
  id: string;
  customer: {
    name: string;
    phone: string;
    address: string;
  };
  items: CartItem[];
  total: number;
  date: string;
};
