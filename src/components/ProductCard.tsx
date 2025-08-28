
"use client";

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import type { Product } from '@/lib/types';
import { useCartStore } from '@/hooks/use-cart-store';
import { toast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Prevents the card's onClick from firing
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
    toast({
        title: "Added to cart!",
        description: `${product.name} (${selectedSize.name}) has been added to your cart.`,
    });
  };

  return (
    <Card 
      className="flex flex-col overflow-hidden transition-shadow duration-300 hover:shadow-xl group"
    >
      <CardContent className="p-0 flex flex-col flex-grow">
        <div className="relative h-80 w-full">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            data-ai-hint={`${product.category === 'Cakes' ? 'cake' : 'brownie'} product`}
          />
        </div>
        <div className="p-4 bg-card flex flex-col flex-grow">
          <h3 className="text-lg font-headline font-semibold text-accent flex-grow">{product.name}</h3>
          <div className="mt-4 flex justify-between items-center">
            <p className="text-md font-bold text-primary">₹{product.sizes[0].price}</p>
            <Button onClick={handleAddToCart}>Add to Cart</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
