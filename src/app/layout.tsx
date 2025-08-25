import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import './globals.css';

export const metadata: Metadata = {
  title: 'CrumblePop',
  description: 'Deliciously crafted cakes and brownies, made with love.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Alegreya:wght@400;700&family=Belleza&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body">
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
