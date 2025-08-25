import Link from 'next/link';
import { Cake, Instagram, Facebook, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-secondary/50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="flex flex-col items-center md:items-start">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Cake className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold font-headline text-accent">CrumblePop</span>
            </Link>
            <p className="text-center text-muted-foreground md:text-left">
              Baked with love, delivered with a smile.
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-bold font-headline mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/menu" className="text-muted-foreground hover:text-primary">Menu</Link></li>
              <li><Link href="/about" className="text-muted-foreground hover:text-primary">About Us</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary">Contact</Link></li>
            </ul>
          </div>
          <div className="text-center md:text-right">
            <h3 className="text-lg font-bold font-headline mb-4">Follow Us</h3>
            <div className="flex justify-center md:justify-end space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary"><Instagram /></Link>
              <Link href="#" className="text-muted-foreground hover:text-primary"><Facebook /></Link>
              <Link href="#" className="text-muted-foreground hover:text-primary"><Twitter /></Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} CrumblePop. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
