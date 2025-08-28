import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="border-t pt-8 text-center text-sm text-muted-foreground flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} CrumblePop. All Rights Reserved.</p>
           <div className="flex items-center gap-6">
              <Link href="/menu" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Bakery</Link>
              <Link href="/about" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">About Us</Link>
              <Link href="/contact" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Contact</Link>
              <Link href="/admin/login" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Admin</Link>
           </div>
        </div>
      </div>
    </footer>
  );
}
