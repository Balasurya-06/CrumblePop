import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getBestsellers } from '@/lib/products';
import { ProductCard } from '@/components/ProductCard';
import { CakeSlice, Cookie, Star } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function Home() {
  const bestsellers = getBestsellers();
  const testimonials = [
    {
      name: 'Priya S.',
      avatar: 'PS',
      text: "The Ferrero Rocher cake was the star of our party! Absolutely divine and worth every penny. Will be ordering again for sure!",
    },
    {
      name: 'Rahul M.',
      avatar: 'RM',
      text: "I'm a huge brownie fan, and the Triple Chocolate Brownies from CrumblePop are the best I've ever had. So fudgy and rich!",
    },
    {
      name: 'Anjali T.',
      avatar: 'AT',
      text: "Ordered a custom Red Velvet cake for my anniversary. It was not only beautiful but tasted heavenly. Highly recommended!",
    },
  ];

  return (
    <div className="flex flex-col">
      <section className="relative h-[75vh] w-full text-white">
        <Image
          src="https://placehold.co/1600x900.png"
          alt="Beautifully decorated cake on a stand"
          layout="fill"
          objectFit="cover"
          className="brightness-[0.6]"
          data-ai-hint="bakery showcase interior"
        />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center p-4">
          <h1 className="text-5xl font-bold tracking-tight text-white md:text-7xl lg:text-8xl font-headline">CrumblePop</h1>
          <p className="mt-4 max-w-2xl text-lg text-gray-200 md:text-xl">
            Baked with love, delivered with a smile. Discover your new favorite treat.
          </p>
          <Button asChild size="lg" className="mt-8">
            <Link href="/menu">Order Now</Link>
          </Button>
        </div>
      </section>

      <section id="categories" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">Shop by Category</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <Link href="/menu?category=Cakes">
              <Card className="group transform overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                <CardContent className="relative h-80 w-full p-0">
                  <Image src="https://placehold.co/600x400.png" alt="A variety of delicious cakes" layout="fill" objectFit="cover" data-ai-hint="delicious cake collection" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <h3 className="text-4xl font-bold text-white flex items-center gap-3"><CakeSlice className="h-10 w-10" /> Cakes</h3>
                  </div>
                </CardContent>
              </Card>
            </Link>
            <Link href="/menu?category=Brownies">
              <Card className="group transform overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                <CardContent className="relative h-80 w-full p-0">
                  <Image src="https://placehold.co/600x400.png" alt="A stack of gooey brownies" layout="fill" objectFit="cover" data-ai-hint="gooey brownie stack" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <h3 className="text-4xl font-bold text-white flex items-center gap-3"><Cookie className="h-10 w-10" /> Brownies</h3>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>
      
      <section id="bestsellers" className="bg-secondary py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">Our Bestsellers</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {bestsellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">What Our Customers Say</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.name} className="p-6 text-center flex flex-col items-center">
                 <Avatar className="w-16 h-16 mb-4">
                    <AvatarFallback className="text-2xl bg-secondary">{testimonial.avatar}</AvatarFallback>
                </Avatar>
                <div className="flex mb-2">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />)}
                </div>
                <p className="text-muted-foreground mb-4 flex-grow">"{testimonial.text}"</p>
                <p className="font-bold font-headline text-lg">{testimonial.name}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
