
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

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  phone: z.string().regex(/^\d{10}$/, { message: "Please enter a valid 10-digit phone number." }),
  address: z.string().min(10, { message: "Address must be at least 10 characters." }),
});

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

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && totalItems() === 0) {
      router.replace('/menu');
    }
  }, [isClient, totalItems, router]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      address: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const orderId = `CP-${Date.now()}`;
    addOrder({
      id: orderId,
      customer: values,
      items: items,
      total: totalPrice(),
      date: new Date().toISOString(),
    });
    clearCart();
    router.push(`/order-confirmation?orderId=${orderId}`);
  }

  if (!isClient) {
    return <CheckoutSkeleton />;
  }
  
  if (items.length === 0) {
    return <CheckoutSkeleton />;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-center text-4xl font-bold mb-8">Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <Card>
          <CardHeader>
            <CardTitle>Delivery Information</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                <Button type="submit" className="w-full" size="lg">Place Order (Cash on Delivery)</Button>
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
  );
}
