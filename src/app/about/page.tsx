import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us - CrumblePop',
  description: 'Learn about the story and passion behind CrumblePop bakery.',
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold">Our Story</h1>
        <p className="mt-4 text-lg text-muted-foreground">From a home kitchen to your hearts.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="order-2 lg:order-1">
          <h2 className="text-3xl font-bold mb-4">Baking with Passion</h2>
          <p className="text-lg mb-4 text-muted-foreground leading-relaxed">
            CrumblePop started from a simple love for baking. What began as a hobby, sharing sweet treats with friends and family, quickly blossomed into a passion for creating delightful and memorable desserts for everyone. We believe that a good cake or brownie can make any day special.
          </p>
          <p className="text-lg mb-4 text-muted-foreground leading-relaxed">
            Our mission is to use only the finest, freshest ingredients to craft desserts that not only look beautiful but taste even better. Every item on our menu is a piece of our heart, baked with care, precision, and a whole lot of love.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Thank you for being a part of our journey. We hope our creations bring a little sweetness to your day!
          </p>
        </div>
        <div className="order-1 lg:order-2">
          <Image
            src="https://placehold.co/600x700.png"
            alt="Happy baker"
            width={600}
            height={700}
            className="rounded-lg shadow-xl w-full h-auto"
            data-ai-hint="happy baker"
          />
        </div>
      </div>
    </div>
  );
}
