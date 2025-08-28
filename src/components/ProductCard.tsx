"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import type { Product } from '@/lib/types';
import { useCartStore } from '@/hooks/use-cart-store';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    // For simplicity, we add the first size option to the cart.
    // A more complex implementation would allow size selection.
    const selectedSize = product.sizes[0];
    addItem({
      productId: product.id,
      name: product.name,
      size: selectedSize.name,
      price: selectedSize.price,
      image: product.images[0],
    });
  };

  return (
    <Card 
      className="flex flex-col overflow-hidden transition-shadow duration-300 hover:shadow-xl group cursor-pointer"
      onClick={handleAddToCart}
    >
      <CardContent className="p-0">
        <div className="relative h-80 w-full">
          <Image
            src={product.images[0]}
            alt={product.name}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-500 group-hover:scale-110"
            data-ai-hint={`${product.category === 'Cakes' ? 'cake' : 'brownie'} product`}
          />
        </div>
        <div className="p-4 bg-card">
          <h3 className="text-lg font-headline font-semibold text-accent">{product.name}</h3>
          <p className="mt-2 text-md font-bold text-primary">₹{product.sizes[0].price}</p>
        </div>
      </CardContent>
    </Card>
  );
}
