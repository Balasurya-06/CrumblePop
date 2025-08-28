
"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Image from 'next/image';

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');

  return (
    <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[80vh]">
      <Card className="w-full max-w-2xl text-center shadow-lg">
        <CardHeader>
          <div className="mx-auto bg-green-100 rounded-full p-4 w-fit">
            <CheckCircle className="h-16 w-16 text-green-600" />
          </div>
          <CardTitle className="text-3xl mt-4">Order Placed Successfully!</CardTitle>
          <CardDescription className="text-md text-muted-foreground">
            Please complete the payment using the details below to confirm your order.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {orderId && (
              <p className="text-muted-foreground text-lg">Your Order ID is: <span className="font-bold text-foreground">{orderId}</span></p>
          )}
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="p-4 border rounded-lg">
                <Image 
                    src="https://placehold.co/250x250.png"
                    alt="Payment QR Code"
                    width={250}
                    height={250}
                    data-ai-hint="payment QR code"
                />
            </div>
            <div className="text-left space-y-4">
                <h3 className="text-2xl font-bold">Scan to Pay</h3>
                <p className="text-muted-foreground">Or pay using UPI:</p>
                <div className="bg-muted p-3 rounded-md">
                    <p className="font-mono text-lg font-semibold tracking-wider">your-upi-id@okhdfcbank</p>
                </div>
                <p className="text-sm text-muted-foreground">
                    After payment, please send a screenshot to our WhatsApp number. Your order will be confirmed upon payment verification.
                </p>
            </div>
          </div>
          <Button asChild className="mt-8">
            <Link href="/menu">Continue Shopping</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default function OrderConfirmationPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <OrderConfirmationContent />
        </Suspense>
    )
}
