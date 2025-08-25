import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function OrderConfirmationPage() {
  return (
    <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[60vh]">
      <Card className="w-full max-w-lg text-center shadow-lg">
        <CardHeader>
          <div className="mx-auto bg-green-100 rounded-full p-4 w-fit">
            <CheckCircle className="h-16 w-16 text-green-600" />
          </div>
          <CardTitle className="text-3xl mt-4">Order Placed Successfully!</CardTitle>
          <CardDescription className="text-md">
            Thank you for your order. We've received it and will start preparing it right away. You will receive a confirmation on WhatsApp shortly.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Your Order ID is: <span className="font-bold text-foreground">CP-{Math.floor(Math.random() * 90000) + 10000}</span></p>
          <Button asChild className="mt-8">
            <Link href="/menu">Continue Shopping</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
