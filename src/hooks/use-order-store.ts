
"use client";

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { Order } from '@/lib/types';

interface OrderState {
  orders: Order[];
  addOrder: (order: Order) => void;
  totalOrders: () => number;
  totalRevenue: () => number;
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      orders: [],
      
      addOrder: (newOrder) => {
        set((state) => ({
          orders: [newOrder, ...state.orders],
        }));
      },

      totalOrders: () => {
        return get().orders.length;
      },

      totalRevenue: () => {
        return get().orders.reduce((total, order) => total + order.total, 0);
      },
    }),
    {
      name: 'order-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
