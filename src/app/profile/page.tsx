
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useOrderStore } from "@/hooks/use-order-store";
import type { Order } from "@/lib/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

type User = {
  name: string;
  email: string;
};

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { orders } = useOrderStore();
  const [userOrders, setUserOrders] = useState<Order[]>([]);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (!loggedInUser) {
      router.replace("/login");
    } else {
      const parsedUser = JSON.parse(loggedInUser);
      setUser(parsedUser);
      // This is a simplification. In a real app, you'd fetch orders for this specific user from a backend.
      // Here, we filter orders from the store based on the logged-in user's name.
      const currentUserOrders = orders.filter(order => order.customer.name === parsedUser.name);
      setUserOrders(currentUserOrders);
      setIsLoading(false);
    }
  }, [router, orders]);

  const getUserInitials = (name: string) => {
    const names = name.split(' ');
    return names.length > 1 ? `${names[0][0]}${names[1][0]}` : name.substring(0, 2);
  };
  
  const formatCurrency = (amount: number) => {
      return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
  }

  if (isLoading || !user) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <div className="flex items-center gap-4">
              <Skeleton className="h-20 w-20 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-64" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
             <Skeleton className="h-8 w-40 mb-4" />
             <div className="space-y-4">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
             </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20 text-3xl">
              <AvatarFallback>{getUserInitials(user.name)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-3xl">{user.name}</CardTitle>
              <CardDescription className="text-lg">{user.email}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <h3 className="text-2xl font-bold mb-4 mt-6">Your Orders</h3>
          {userOrders.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {userOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell><Badge variant="outline">{order.id}</Badge></TableCell>
                    <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                    <TableCell>{order.items.reduce((acc, item) => acc + item.quantity, 0)}</TableCell>
                    <TableCell className="text-right font-medium">{formatCurrency(order.total)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-muted-foreground">You haven't placed any orders yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
