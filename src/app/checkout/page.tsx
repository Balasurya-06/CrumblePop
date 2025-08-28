
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCartStore } from "@/hooks/use-cart-store";
import { useOrderStore } from "@/hooks/use-order-store";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { PaymentDialog } from "@/components/PaymentDialog";
import type { Order } from "@/lib/types";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  phone: z.string().regex(/^\d{10}$/, { message: "Please enter a valid 10-digit phone number." }),
  address: z.string().min(10, { message: "Address must be at least 10 characters." }),
});

type CheckoutFormValues = z.infer<typeof formSchema>;

function CheckoutSkeleton() {
  return (
      <div className="container mx-auto px-4 py-12">
          <h1 className="text-center text-4xl font-bold mb-8">Checkout</h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <Card>
                  <CardHeader><CardTitle>Delivery Information</CardTitle></CardHeader>
                  <CardContent className="space-y-6">
                      <div className="space-y-2">
                         <Skeleton className="h-4 w-20" />
                         <Skeleton className="h-10 w-full" />
                      </div>
                       <div className="space-y-2">
                         <Skeleton className="h-4 w-20" />
                         <Skeleton className="h-10 w-full" />
                      </div>
                       <div className="space-y-2">
                         <Skeleton className="h-4 w-20" />
                         <Skeleton className="h-20 w-full" />
                      </div>
                      <Skeleton className="h-12 w-full" />
                  </CardContent>
              </Card>
              <Card>
                  <CardHeader><CardTitle>Order Summary</CardTitle></CardHeader>
                   <CardContent className="space-y-4">
                      <Skeleton className="h-16 w-full" />
                      <Skeleton className="h-16 w-full" />
                      <Separator />
                      <Skeleton className="h-8 w-full" />
                  </CardContent>
                  <CardFooter>
                      <Skeleton className="h-10 w-full" />
                  </CardFooter>
              </Card>
          </div>
      </div>
  );
}

export default function CheckoutPage() {
  const { items, totalPrice, clearCart, totalItems } = useCartStore();
  const addOrder = useOrderStore((state) => state.addOrder);
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [customerDetails, setCustomerDetails] = useState<CheckoutFormValues | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && totalItems() === 0) {
      router.replace('/menu');
    }
  }, [isClient, totalItems, router]);

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      address: "",
    },
  });

  function onFormSubmit(values: CheckoutFormValues) {
    setCustomerDetails(values);
    setIsPaymentDialogOpen(true);
  }

  function onPaymentConfirm(screenshotDataUrl: string) {
    if (!customerDetails) return;

    const orderId = `CP-${Date.now()}`;
    const newOrder: Omit<Order, 'status'> = {
      id: orderId,
      customer: customerDetails,
      items: items,
      total: totalPrice(),
      date: new Date().toISOString(),
      paymentScreenshot: screenshotDataUrl,
    }
    
    addOrder(newOrder);
    clearCart();
    setIsPaymentDialogOpen(false);
    
    const message = `Thank you for your order! Your Order ID is *${orderId}*. We have received your payment confirmation and will begin processing your order shortly.`;
    const whatsappUrl = `https://wa.me/91${customerDetails.phone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    router.push(`/order-confirmation?orderId=${orderId}`);
  }


  if (!isClient) {
    return <CheckoutSkeleton />;
  }
  
  if (items.length === 0) {
    return <CheckoutSkeleton />;
  }

  return (
    <>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-center text-4xl font-bold mb-8">Checkout</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <Card>
            <CardHeader>
              <CardTitle>Delivery Information</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>WhatsApp Number</FormLabel>
                        <FormControl>
                          <Input placeholder="10-digit phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Delivery Address</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Full address including landmarks" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full" size="lg">Proceed to Payment</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <Image src={item.image} alt={item.name} width={60} height={60} className="rounded-md"/>
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.size} x {item.quantity}
                      </p>
                    </div>
                  </div>
                  <p>₹{item.price * item.quantity}</p>
                </div>
              ))}
              <Separator />
              <div className="flex justify-between text-lg font-bold">
                  <p>Delivery Charges</p>
                  <p className="text-green-600">Free</p>
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex w-full justify-between text-xl font-bold">
                  <p>Total</p>
                  <p>₹{totalPrice()}</p>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
      <PaymentDialog 
        isOpen={isPaymentDialogOpen}
        onClose={() => setIsPaymentDialogOpen(false)}
        onConfirm={onPaymentConfirm}
      />
    </>
  );
}
