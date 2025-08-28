

"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Package, Users, CreditCard } from 'lucide-react';
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
import { Skeleton } from "@/components/ui/skeleton";
import { useProductStore } from "@/hooks/use-product-store";

export default function AdminDashboard() {
    const { orders, totalRevenue, totalOrders } = useOrderStore();
    const { products } = useProductStore();
    const [isClient, setIsClient] = useState(false);
    const [totalCustomers, setTotalCustomers] = useState(0);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (isClient) {
            const uniqueCustomers = new Set(orders.map(order => order.customer.phone));
            setTotalCustomers(uniqueCustomers.size);
        }
    }, [orders, isClient]);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
    }
    
    if (!isClient) {
        return (
            <div className="flex-1 space-y-4">
                 <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                 <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent><Skeleton className="h-8 w-24" /></CardContent>
                    </Card>
                     <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
                            <Package className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent><Skeleton className="h-8 w-12" /></CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                           <Skeleton className="h-8 w-20" />
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                            <CreditCard className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="h-8 w-16" />
                        </CardContent>
                    </Card>
                 </div>
                 <Card>
                    <CardHeader><CardTitle>Recent Orders</CardTitle></CardHeader>
                    <CardContent><Skeleton className="h-24 w-full" /></CardContent>
                 </Card>
            </div>
        )
    }
    
    return (
        <div className="flex-1 space-y-4">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Revenue
                        </CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{formatCurrency(totalRevenue())}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Products
                        </CardTitle>
                        <Package className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{products.length}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+{totalCustomers}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                           Total Orders
                        </CardTitle>
                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+{totalOrders()}</div>
                    </CardContent>
                </Card>
            </div>
             <Card>
                <CardHeader>
                    <CardTitle>Recent Orders</CardTitle>
                </CardHeader>
                <CardContent>
                   {orders.length > 0 ? (
                       <Table>
                           <TableHeader>
                               <TableRow>
                                   <TableHead>Customer</TableHead>
                                   <TableHead>Contact</TableHead>
                                   <TableHead>Items</TableHead>
                                   <TableHead className="text-right">Total</TableHead>
                                   <TableHead>Date</TableHead>
                               </TableRow>
                           </TableHeader>
                           <TableBody>
                               {orders.slice(0, 10).map((order: Order) => (
                                   <TableRow key={order.id}>
                                       <TableCell>{order.customer.name}</TableCell>
                                       <TableCell>{order.customer.phone}</TableCell>
                                       <TableCell>{order.items.reduce((acc, item) => acc + item.quantity, 0)}</TableCell>
                                       <TableCell className="text-right">{formatCurrency(order.total)}</TableCell>
                                       <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                                   </TableRow>
                               ))}
                           </TableBody>
                       </Table>
                   ) : (
                    <p>You have no recent orders.</p>
                   )}
                </CardContent>
            </Card>
        </div>
    );
}
