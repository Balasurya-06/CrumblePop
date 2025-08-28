import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getBestsellers } from '@/lib/products';
import { ProductCard } from '@/components/ProductCard';
import { Star, Cake, Truck, Award } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export default function Home() {
  const bestsellers = getBestsellers();
  const features = [
    {
      icon: <Award className="h-10 w-10 text-primary" />,
      title: 'Freshly Baked Daily',
      description: 'Every bite begins with quality. Our baked goods are made fresh each day.',
    },
    {
      icon: <Cake className="h-10 w-10 text-primary" />,
      title: 'Custom Cake Builder',
      description: 'We create made-to-order cakes tailored to your taste, style, and celebration.',
    },
    {
      icon: <Truck className="h-10 w-10 text-primary" />,
      title: 'Easy & Fast Delivery',
      description: 'Skip the line and get your favorites delivered straight to your door.',
    },
  ];

  return (
    <div className="flex flex-col">
      <section className="w-full bg-background pt-12 md:pt-24">
        <div className="container mx-auto px-4">
          <div className="relative flex flex-col items-center justify-center rounded-3xl bg-accent/90 px-8 py-16 text-center text-accent-foreground md:px-12 lg:py-24">
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 transform rounded-full bg-secondary px-6 py-2">
              <p className="text-sm font-semibold text-secondary-foreground">Sweet & Savory</p>
            </div>
            <h1 className="text-5xl font-bold tracking-tight md:text-7xl lg:text-8xl">
              Baking Meets
              <br />
              <span className="text-primary">Craving</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg">
              Our bakery is built on simple values: quality ingredients, handmade care, and the joy of sharing something sweet with the ones you love.
            </p>
            <Button asChild size="lg" className="mt-8 bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href="/menu">Shop Now</Link>
            </Button>
            <div className="absolute -bottom-16 -left-16 hidden lg:block">
              <Image src="https://placehold.co/300x400.png" alt="Decorated Cake" width={300} height={400} className="rounded-lg" data-ai-hint="pink donut cake" />
            </div>
             <div className="absolute -bottom-12 -right-16 hidden lg:block">
              <Image src="https://placehold.co/300x300.png" alt="Stack of Bagels" width={300} height={300} className="rounded-lg" data-ai-hint="fresh baked bagels" />
            </div>
          </div>
          <p className="mt-12 text-center text-lg font-medium text-accent md:text-xl">Your Daily Dose of Delicious. From Our Oven to Your Event</p>
        </div>
      </section>

      <section id="features" className="bg-secondary py-20 md:py-32 mt-16">
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
              <div className="lg:col-span-1 md:col-span-2">
                 <h2 className="text-4xl font-bold md:text-5xl">Bringing you fresh, handcrafted bakes made with love ❤️</h2>
              </div>
              <div className="lg:col-span-2 md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-8">
                  {features.map((feature) => (
                  <div key={feature.title} className="text-center md:text-left">
                    <div className="flex justify-center md:justify-start">{feature.icon}</div>
                    <h3 className="mt-4 text-xl font-bold">{feature.title}</h3>
                    <p className="mt-2 text-muted-foreground">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
                <div className="relative h-96">
                     <Image src="https://placehold.co/500x500.png" alt="Hand holding a cookie" layout="fill" objectFit="contain" className="rounded-lg" data-ai-hint="hand holding cookie" />
                </div>
                 <div className="text-center lg:text-left">
                    <div className="flex justify-center lg:justify-start items-baseline gap-2">
                        <p className="text-6xl font-bold text-primary">4.5</p>
                        <div className="flex">
                            {[...Array(4)].map((_, i) => <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />)}
                            <Star className="w-6 h-6 text-yellow-200 fill-current" />
                        </div>
                    </div>
                     <p className="text-muted-foreground mt-2">4502 Reviews</p>
                    <blockquote className="mt-6 text-xl italic text-accent">
                        "Absolutely the best bakery in town! The cakes are not only stunning but incredibly delicious."
                    </blockquote>
                    <div className="mt-4 flex items-center justify-center lg:justify-start gap-4">
                        <Avatar className="w-12 h-12">
                            <AvatarFallback>EJ</AvatarFallback>
                        </Avatar>
                        <p className="font-bold text-lg">Elsa Jason</p>
                    </div>
                </div>
            </div>
        </div>
      </section>

      <section id="bestsellers" className="py-20 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
              <h2 className="text-4xl font-bold md:text-5xl">Our Goodness Delights</h2>
              <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">From golden-crust breads to rich, decadent cakes, every item we bake is a labor of love. Using only the finest ingredients.</p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {bestsellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
