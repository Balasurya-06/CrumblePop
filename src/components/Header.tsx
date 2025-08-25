"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Cake, Menu, ShoppingBag, X, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/hooks/use-cart-store';
import { CartSheet } from './CartSheet';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const navLinks = [
  { href: '/menu', label: 'Menu' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const [isClient, setIsClient] = useState(false);
  const totalItems = useCartStore((state) => state.totalItems());

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Cake className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold font-headline text-accent">CrumblePop</span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground flex items-center gap-1">
              {link.icon} {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <CartSheet>
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingBag className="h-6 w-6" />
              {isClient && totalItems > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {totalItems}
                </span>
              )}
            </Button>
          </CartSheet>
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="flex flex-col gap-6 pt-8">
                  {navLinks.map((link) => (
                    <Link key={link.href} href={link.href} className="text-lg font-medium text-foreground transition-colors hover:text-primary flex items-center gap-2">
                      {link.icon} {link.label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
