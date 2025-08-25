import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us - CrumblePop',
  description: 'Learn about the story and passion behind CrumblePop bakery.',
};

export default function AboutPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold font-headline">Our Story</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">From a home kitchen with a dream to a beloved local bakery, this is how CrumblePop came to be.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 text-lg leading-relaxed text-muted-foreground">
            <h2 className="text-3xl font-bold mb-4 text-foreground font-headline">Baking with Passion</h2>
            <p className="mb-4">
              CrumblePop started from a simple, yet powerful love for baking. What began as a weekend hobby, sharing sweet treats with friends and family, quickly blossomed into a full-blown passion for creating delightful and memorable desserts for everyone. We believe that a good cake or brownie isn't just a dessert; it's a centerpiece for celebration, a comfort on a tough day, and a way to make any moment special.
            </p>
            <p className="mb-4">
              Our mission is to use only the finest, freshest ingredients to craft desserts that not only look beautiful but taste even better. Every single item on our menu is a piece of our heart, baked with meticulous care, precision, and a whole lot of love. We pour our soul into every recipe, ensuring each bite is a perfect experience.
            </p>
            <p>
              Thank you for being a part of our sweet journey. We hope our creations bring a little pop of joy and a whole lot of crumble-in-your-mouth goodness to your day!
            </p>
          </div>
          <div className="order-1 lg:order-2">
            <Image
              src="https://placehold.co/600x700.png"
              alt="Happy baker holding a freshly baked cake"
              width={600}
              height={700}
              className="rounded-lg shadow-xl w-full h-auto"
              data-ai-hint="happy baker cake"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
