
"use client";

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { Product } from '@/lib/types';
import { products as initialProducts } from '@/lib/products';

interface ProductState {
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  getProductById: (productId: string) => Product | undefined;
  getProducts: (category?: 'Cakes' | 'Brownies') => Product[];
  getBestsellers: () => Product[];
}

export const useProductStore = create<ProductState>()(
  persist(
    (set, get) => ({
      products: initialProducts,
      
      addProduct: (newProduct) => {
        set((state) => ({
          products: [...state.products, newProduct],
        }));
      },
      
      updateProduct: (updatedProduct) => {
        set((state) => ({
          products: state.products.map((p) =>
            p.id === updatedProduct.id ? updatedProduct : p
          ),
        }));
      },
      
      deleteProduct: (productId) => {
        set((state) => ({
          products: state.products.filter((p) => p.id !== productId),
        }));
      },

      getProductById: (productId: string) => {
        return get().products.find((p) => p.id === productId);
      },

      getProducts: (category?: 'Cakes' | 'Brownies') => {
        const { products } = get();
        if (category) {
          return products.filter((product) => product.category === category);
        }
        return products;
      },

      getBestsellers: () => {
        return get().products.filter((product) => product.isBestseller);
      }
    }),
    {
      name: 'product-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
