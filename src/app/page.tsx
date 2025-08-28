

"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';

// Custom icons as inline SVGs
const SliceOfCakeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-primary"><path d="M16.43 16.43 22 22"/><path d="M12.43 2.43 18 8l-5.57 5.57"/><path d="M12.43 2.43 2.43 12.43a4.24 4.24 0 0 0 0 6l6 6a4.24 4.24 0 0 0 6 0l10-10"/><path d="m2.43 12.43 5.14 5.14c.3.3.7.5 1.18.5a1.69 1.69 0 0 0 1.18-.5l5.14-5.14"/><path d="M18 8 9.77 16.23c-.3.3-.7.5-1.18.5a1.69 1.69 0 0 1-1.18-.5l-5.14-5.14"/></svg>
);

const CupcakeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-primary"><path d="M12 2a4 4 0 0 1 4 4v5a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2V6a4 4 0 0 1 4-4Z"/><path d="M12 13a4 4 0 0 1 4 4v5H8v-5a4 4 0 0 1 4-4Z"/><path d="M12 13a4 4 0 0 0-4 4"/><path d="M12 2v5"/></svg>
);


const PieIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-primary"><path d="M12 2.5a9.5 9.5 0 0 1 8.07 4.93l-4.57 4.57A2 2 0 0 0 14 11h-2a2 2 0 0 0-2 2v2a2 2 0 0 0 .5 1.5l4.57 4.57A9.5 9.5 0 1 1 12 2.5Z"/><path d="M8 16a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2Z"/><path d="M12.5 2.5A9.5 9.5 0 0 0 12 2.5h0Z"/></svg>
);


const CakeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-primary"><path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8"/><path d="M4 16h16"/><path d="M12 3v10"/><path d="M12 3a5 5 0 0 1 5 5c0 1.66-1.34 3-3 3s-3-1.34-3-3a5 5 0 0 1 5-5z"/></svg>
);


const newProducts = [
    {
        name: 'Choco',
        image: 'https://picsum.photos/300/300?random=1',
        price: '4.99',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        hint: 'chocolate cake'
    },
    {
        name: 'Carrot',
        image: 'https://picsum.photos/300/300?random=2',
        price: '5.00',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        hint: 'carrot cake'
    },
    {
        name: 'Strawberry',
        image: 'https://picsum.photos/300/300?random=3',
        price: '6.50',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        hint: 'strawberry cake'
    }
]

const categories = [
    { name: 'Slice of Cake', icon: <SliceOfCakeIcon />},
    { name: 'Cupcakes', icon: <CupcakeIcon />},
    { name: 'Pie Cake', icon: <PieIcon /> },
    { name: 'Cake', icon: <CakeIcon /> },
]

export default function Home() {
  return (
    <div className="flex flex-col bg-background">
      <section className="w-full" style={{backgroundImage: "url('/strawberry-bg.png')", backgroundSize: "cover", backgroundPosition: "center"}}>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center px-4 py-16 md:py-24">
          <div className="order-1 md:order-1 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-2"><span className="text-black">Every One </span><span className="text-primary">Love's</span></h2>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4"><span className="text-black">Natural and</span><br /><span className="text-primary">healthy Cakes.</span></h1>
            <p className="mt-6 max-w-md mx-auto md:mx-0 text-lg text-muted-foreground">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <div className="flex gap-4 mt-8 justify-center md:justify-start">
              <Button size="lg" className="rounded-full px-8 py-6 text-lg">ORDER NOW</Button>
              <Button size="lg" variant="outline" className="rounded-full px-8 py-6 text-lg">EXPLORE MORE</Button>
            </div>
          </div>
          <div className="order-2 md:order-2">
            <div className="relative w-full h-[400px] md:h-[500px] rounded-full overflow-hidden border-8 border-white shadow-xl">
              <Image 
                src="https://i.etsystatic.com/48449877/r/il/f64ccd/5591642315/il_1588xN.5591642315_cn4z.jpg" 
                alt="Delicious layered cake with berries" 
                fill
                className="object-cover"
                data-ai-hint="strawberry cake"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                {categories.map(category => (
                    <div key={category.name} className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                        <div className="bg-primary/10 p-4 rounded-full">{category.icon}</div>
                        <p className="mt-3 font-medium">{category.name}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-24">
          <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-12 items-center">
                  <div className="md:col-span-1 text-center md:text-left">
                     <h2 className="text-3xl font-bold md:text-4xl mb-2">Our <span className="text-primary">Cakes</span></h2>
                     <p className="mt-4 text-muted-foreground">
                        Freshly baked goods made with love. Every bite tastes like a celebration.
                     </p>
                     <Button variant="outline" className="mt-6 rounded-full px-6">View All</Button>
                  </div>
                  <div className="md:col-span-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                         {newProducts.map(product => (
                            <Card key={product.name} className="overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-shadow">
                                <CardContent className="p-0">
                                  <div className="relative h-48 w-full">
                                      <Image
                                          src={product.image}
                                          alt={product.name}
                                          fill
                                          className="object-cover"
                                          data-ai-hint={product.hint}
                                      />
                                      <div className="absolute top-3 right-3 bg-white rounded-full px-3 py-1 text-sm font-bold shadow-md">
                                        ${product.price}
                                      </div>
                                  </div>
                                  <div className="p-4">
                                    <h3 className="text-xl font-bold">{product.name}</h3>
                                    <p className="text-sm text-muted-foreground mt-2">{product.description}</p>
                                    <Button className="w-full mt-4 rounded-full" size="sm">Add to Cart</Button>
                                  </div>
                                </CardContent>
                            </Card>
                         ))}
                      </div>
                  </div>
              </div>
          </div>
      </section>

      <section className="py-20 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <Image 
                src="https://c8.alamy.com/zooms/9/56ee904c6cd4476aac5bbcaba57d725e/2bww6e0.jpg" 
                alt="Cheesecake with blueberries and lemon" 
                width={600} 
                height={700} 
                className="rounded-xl shadow-xl w-full h-auto"
                data-ai-hint="cheesecake blueberries lemon"
              />
            </div>
            <div>
              <h2 className="text-4xl font-bold md:text-5xl">Why Choose Our Cake?</h2>
              <p className="mt-4 text-muted-foreground">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              <ul className="mt-8 space-y-6">
                {[...Array(3)].map((_, i) => (
                   <li key={i} className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full text-primary-foreground flex items-center justify-center font-bold">
                        {i + 1}
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-bold">Lorem ipsum dolor sit amet</h4>
                        <p className="text-muted-foreground">Consectetur adipiscing elit.</p>
                      </div>
                   </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-secondary py-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-2xl font-headline italic text-primary">Crafted with Love, Tasted with Joy</p>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-3xl font-bold mb-6">Contact Us</h3>
              <form className="space-y-4">
                <Input placeholder="Input your name" />
                <Input type="email" placeholder="Input your email address" />
                <Input placeholder="Input your subject" />
                <Textarea placeholder="Input your message" rows={5} />
                <Button type="submit" size="lg" className="rounded-full">Send Message</Button>
              </form>
            </div>
            <div className="md:pl-12">
              <h3 className="text-3xl font-bold mb-6">Get in Touch</h3>
              <p className="text-muted-foreground mb-8">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Mail className="w-6 h-6 text-primary" />
                  <div>
                    <h4 className="font-semibold">Email Us</h4>
                    <p className="text-muted-foreground">hello@crumblepop.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Phone className="w-6 h-6 text-primary" />
                  <div>
                    <h4 className="font-semibold">Call Us</h4>
                    <p className="text-muted-foreground">+1 234 567 890</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Globe className="w-6 h-6 text-primary" />
                   <div>
                    <h4 className="font-semibold">Our Website</h4>
                    <p className="text-muted-foreground">www.crumblepop.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <MapPin className="w-6 h-6 text-primary" />
                  <div>
                    <h4 className="font-semibold">Our Location</h4>
                    <p className="text-muted-foreground">123 Bakery St, Sweetville</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
