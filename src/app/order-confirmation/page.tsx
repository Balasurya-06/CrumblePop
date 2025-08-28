
"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');

  return (
    <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[80vh]">
      <Card className="w-full max-w-lg text-center shadow-lg">
        <CardHeader>
          <div className="mx-auto bg-green-100 rounded-full p-4 w-fit">
            <CheckCircle className="h-16 w-16 text-green-600" />
          </div>
          <CardTitle className="text-3xl mt-4">Order Placed Successfully!</CardTitle>
          <CardDescription className="text-md text-muted-foreground">
            Thank you for your purchase. We've received your payment confirmation and will start preparing your order right away!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {orderId && (
              <p className="text-muted-foreground text-lg">Your Order ID is: <span className="font-bold text-foreground">{orderId}</span></p>
          )}
          <p>You will receive a WhatsApp message from us shortly.</p>
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
