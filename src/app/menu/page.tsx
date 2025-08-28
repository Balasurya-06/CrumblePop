
"use client";

import { useProductStore } from "@/hooks/use-product-store";
import { ProductCard } from "@/components/ProductCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSearchParams } from 'next/navigation';
import { Suspense } from "react";

function MenuContent() {
  const searchParams = useSearchParams();
  const { getProducts } = useProductStore();

  const cakes = getProducts("Cakes");
  const brownies = getProducts("Brownies");
  const defaultTab = searchParams.get("category") === "Brownies" ? "brownies" : "cakes";

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold">Our Menu</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Handcrafted with the finest ingredients, just for you.
        </p>
      </div>
      <Tabs defaultValue={defaultTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:w-1/2 mx-auto">
          <TabsTrigger value="cakes">Cakes</TabsTrigger>
          <TabsTrigger value="brownies">Brownies</TabsTrigger>
        </TabsList>
        <TabsContent value="cakes">
          <div className="grid grid-cols-1 gap-8 pt-8 md:grid-cols-2 lg:grid-cols-3">
            {cakes.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="brownies">
          <div className="grid grid-cols-1 gap-8 pt-8 md:grid-cols-2 lg:grid-cols-3">
            {brownies.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default function MenuPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <MenuContent />
        </Suspense>
    )
}
