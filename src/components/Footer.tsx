
import Link from 'next/link';
import { Button } from './ui/button';

export function Footer() {
  return (
    <footer className="bg-secondary">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
                 <Link href="/" className="flex items-center gap-2 font-headline text-2xl font-bold mb-4 text-primary">
                    SweetCake
                 </Link>
                 <p className="text-muted-foreground text-sm">Where every bite tastes like a celebration. Freshly baked goods made with love.</p>
                 <div className="flex space-x-2 mt-4">
                     {/* Social media icons would go here */}
                 </div>
            </div>
            <div>
                <h4 className="font-bold mb-4">Quick Links</h4>
                <nav className="flex flex-col gap-2 text-muted-foreground">
                    <Link href="/" className="hover:text-primary">Home</Link>
                    <Link href="/menu" className="hover:text-primary">Menu</Link>
                    <Link href="/about" className="hover:text-primary">About Us</Link>
                    <Link href="/contact" className="hover:text-primary">Contact</Link>
                </nav>
            </div>
            <div>
                 <h4 className="font-bold mb-4">Information</h4>
                <nav className="flex flex-col gap-2 text-muted-foreground">
                    <Link href="#" className="hover:text-primary">Privacy Policy</Link>
                    <Link href="#" className="hover:text-primary">Terms of Service</Link>
                    <Link href="/admin/login" className="hover:text-primary">Admin</Link>
                </nav>
            </div>
            <div>
                 <h4 className="font-bold mb-4">Contact Us</h4>
                 <div className="text-sm text-muted-foreground space-y-2">
                    <p>123 Bakery St, Sweetville</p>
                    <p>hello@sweetcake.com</p>
                    <p>+1 234 567 890</p>
                 </div>
            </div>
        </div>
        <div className="border-t pt-8 mt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} SweetCake. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
