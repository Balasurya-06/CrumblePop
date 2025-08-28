
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useProductStore } from '@/hooks/use-product-store';
import { ProductCard } from '@/components/ProductCard';
import { Star, Cake, Truck, Award } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export default function Home() {
  const { getBestsellers } = useProductStore();
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

  const testimonials = [
      {
        quote: "Absolutely the best bakery in town! The cakes are not only stunning but incredibly delicious. The attention to detail is unmatched. Highly recommend the Choco Fudge Fantasy!",
        name: "Samantha R.",
        handle: "FoodieFave",
        image: "https://picsum.photos/100/100"
      },
      {
        quote: "I ordered a custom Red Velvet cake for my anniversary, and it was a huge hit! The cream cheese frosting was to die for. CrumblePop is my new go-to for special occasions.",
        name: "Michael B.",
        handle: "DessertDude",
        image: "https://picsum.photos/101/101"
      },
      {
        quote: "The brownies are out of this world. Fudgy, rich, and so satisfying. The Nutella Swirl is a must-try. Fast delivery and beautiful packaging too!",
        name: "Jessica L.",
        handle: "SweetTooth",
        image: "https://picsum.photos/102/102"
      }
  ]

  return (
    <div className="flex flex-col">
       <section className="w-full bg-secondary">
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center px-4 py-16 md:py-24">
            <div className="text-center md:text-left">
              <h1 className="text-5xl lg:text-7xl font-bold font-headline tracking-tight">
                Baking Meets <br />
                <span className="text-primary">Craving</span>
              </h1>
              <p className="mt-6 max-w-md mx-auto md:mx-0 text-lg text-muted-foreground">
                Our bakery is built on simple values: quality ingredients, handmade care, and the joy of sharing something sweet with the ones you love.
              </p>
              <Button asChild size="lg" className="mt-8">
                <Link href="/menu">Explore Our Menu</Link>
              </Button>
            </div>
             <div className="relative h-80 md:h-[450px]">
                <Image src="https://picsum.photos/800/600" alt="Assortment of delicious baked goods" className="rounded-lg object-cover shadow-xl" fill data-ai-hint="delicious baked goods" />
            </div>
          </div>
       </section>

      <section id="features" className="bg-background py-20 md:py-24">
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
              {features.map((feature) => (
              <div key={feature.title}>
                <div className="flex justify-center bg-primary/10 rounded-full p-4 w-fit mx-auto">
                    {feature.icon}
                </div>
                <h3 className="mt-6 text-xl font-bold">{feature.title}</h3>
                <p className="mt-2 text-muted-foreground">{feature.description}</p>
              </div>
            ))}
            </div>
        </div>
      </section>

      <section id="bestsellers" className="py-20 md:py-24 bg-secondary">
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

       <section id="testimonials" className="bg-background py-20 md:py-24">
        <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold md:text-5xl">What Our Customers Say</h2>
              <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">We love our customers, and they love us back! Here's what they have to say about our treats.</p>
          </div>
           <Carousel
                opts={{
                    align: "start",
                    loop: true,
                }}
                className="w-full"
            >
            <CarouselContent>
            {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-1">
                    <Card className="h-full">
                        <CardContent className="flex flex-col items-center text-center p-6 h-full">
                            <Star className="w-8 h-8 text-yellow-400 fill-current mb-4" />
                            <p className="text-muted-foreground italic flex-grow">"{testimonial.quote}"</p>
                            <div className="mt-6">
                                <Avatar className="w-16 h-16 mx-auto mb-2">
                                     <AvatarImage src={testimonial.image} alt={testimonial.name} />
                                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <p className="font-bold text-lg">{testimonial.name}</p>
                                <p className="text-sm text-muted-foreground">@{testimonial.handle}</p>
                            </div>
                        </CardContent>
                    </Card>
                    </div>
                </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
            </Carousel>
        </div>
       </section>
    </div>
  );
}
