import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getBestsellers, getProducts } from '@/lib/products';
import { ProductCard } from '@/components/ProductCard';
import { CakeSlice, Cookie } from 'lucide-react';

export default function Home() {
  const bestsellers = getBestsellers();

  return (
    <div className="flex flex-col">
      <section className="relative h-[60vh] w-full text-white">
        <Image
          src="https://placehold.co/1600x900.png"
          alt="Bakery showcase"
          layout="fill"
          objectFit="cover"
          className="brightness-50"
          data-ai-hint="bakery interior"
        />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center">
          <h1 className="text-5xl font-bold tracking-tight text-white md:text-7xl lg:text-8xl">CrumblePop</h1>
          <p className="mt-4 max-w-2xl text-lg text-gray-200 md:text-xl">
            Baked with love, delivered with a smile. Discover your new favorite treat.
          </p>
          <Button asChild size="lg" className="mt-8 bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href="/menu">Order Now</Link>
          </Button>
        </div>
      </section>

      <section id="categories" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">Shop by Category</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <Link href="/menu?category=Cakes">
              <Card className="group transform overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                <CardContent className="relative h-64 w-full p-0">
                  <Image src="https://placehold.co/600x400.png" alt="Cakes" layout="fill" objectFit="cover" data-ai-hint="delicious cake" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <h3 className="text-3xl font-bold text-white flex items-center gap-2"><CakeSlice className="h-8 w-8" /> Cakes</h3>
                  </div>
                </CardContent>
              </Card>
            </Link>
            <Link href="/menu?category=Brownies">
              <Card className="group transform overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                <CardContent className="relative h-64 w-full p-0">
                  <Image src="https://placehold.co/600x400.png" alt="Brownies" layout="fill" objectFit="cover" data-ai-hint="gooey brownie" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <h3 className="text-3xl font-bold text-white flex items-center gap-2"><Cookie className="h-8 w-8" /> Brownies</h3>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>
      
      <section id="bestsellers" className="bg-secondary/50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">Our Bestsellers</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {bestsellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
