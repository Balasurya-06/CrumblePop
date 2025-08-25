"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { Product } from '@/lib/types';
import { useCartStore } from '@/hooks/use-cart-store';
import { Badge } from '@/components/ui/badge';
import { ShoppingBag } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const addItem = useCartStore((state) => state.addItem);

  const handleSizeChange = (sizeName: string) => {
    const newSize = product.sizes.find(s => s.name === sizeName);
    if (newSize) {
      setSelectedSize(newSize);
    }
  };

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: product.name,
      size: selectedSize.name,
      price: selectedSize.price,
      image: product.images[0],
    });
  };

  return (
    <Card className="flex flex-col overflow-hidden transition-shadow duration-300 hover:shadow-xl">
      <CardHeader className="p-0">
        <div className="relative h-64 w-full">
          <Image
            src={product.images[0]}
            alt={product.name}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 group-hover:scale-105"
            data-ai-hint={`${product.category === 'Cakes' ? 'cake' : 'brownie'} product`}
          />
          {product.isBestseller && <Badge className="absolute right-2 top-2">Bestseller</Badge>}
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-4">
        <CardTitle className="text-xl">{product.name}</CardTitle>
        <CardDescription className="mt-2 min-h-[3rem] text-sm">{product.description}</CardDescription>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-4 p-4">
        <div className="flex w-full items-center justify-between">
          <Select defaultValue={selectedSize.name} onValueChange={handleSizeChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select size" />
            </SelectTrigger>
            <SelectContent>
              {product.sizes.map((size) => (
                <SelectItem key={size.name} value={size.name}>
                  {size.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xl font-bold text-accent">₹{selectedSize.price}</p>
        </div>
        <Button onClick={handleAddToCart} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
          <ShoppingBag className="mr-2 h-4 w-4" /> Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
