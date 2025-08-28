
"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Package, Users, CreditCard, CheckCircle, Link as LinkIcon } from 'lucide-react';
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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function DashboardSkeleton() {
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
    );
}


export default function AdminDashboard() {
    const { orders, totalRevenue, totalOrders, updateOrderStatus } = useOrderStore();
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
    
    const handleAcceptOrder = (order: Order) => {
        updateOrderStatus(order.id, 'Accepted');
        const message = `Your order *${order.id}* has been approved! We will deliver it shortly. Thank you for choosing CrumblePop!`;
        const whatsappUrl = `https://wa.me/91${order.customer.phone}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    }

    const handleMarkAsDelivered = (order: Order) => {
        updateOrderStatus(order.id, 'Delivered');
        const message = `Your order *${order.id}* has been dispatched from the bakery! It will reach you soon. Thank you for choosing CrumblePop!`;
        const whatsappUrl = `https://wa.me/91${order.customer.phone}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    }

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
    }
    
    if (!isClient) {
        return <DashboardSkeleton />;
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
                                   <TableHead>Items</TableHead>
                                   <TableHead>Payment</TableHead>
                                   <TableHead>Date</TableHead>
                                   <TableHead>Status</TableHead>
                                   <TableHead className="text-right">Actions</TableHead>
                               </TableRow>
                           </TableHeader>
                           <TableBody>
                               {orders.slice(0, 10).map((order: Order) => (
                                   <TableRow key={order.id}>
                                       <TableCell>
                                           <div className="font-medium">{order.customer.name}</div>
                                           <div className="text-sm text-muted-foreground">{order.customer.phone}</div>
                                       </TableCell>
                                       <TableCell>{order.items.reduce((acc, item) => acc + item.quantity, 0)}</TableCell>
                                       <TableCell>
                                           <a href={order.paymentScreenshot} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline inline-flex items-center">
                                                <LinkIcon className="h-4 w-4 mr-1" />
                                                View
                                           </a>
                                       </TableCell>
                                       <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                                       <TableCell>
                                            <Badge className={cn({
                                                'bg-yellow-500 text-white': order.status === 'Pending',
                                                'bg-blue-500 text-white': order.status === 'Accepted',
                                                'bg-red-500 text-white': order.status === 'Declined',
                                                'bg-green-500 text-white': order.status === 'Delivered',
                                            })}>
                                                {order.status}
                                            </Badge>
                                       </TableCell>
                                       <TableCell className="text-right">
                                        {order.status === 'Pending' ? (
                                            <div className="flex gap-2 justify-end">
                                                <Button size="sm" onClick={() => handleAcceptOrder(order)}>Accept</Button>
                                                <Button size="sm" variant="destructive" onClick={() => updateOrderStatus(order.id, 'Declined')}>Decline</Button>
                                            </div>
                                        ) : order.status === 'Accepted' ? (
                                            <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => handleMarkAsDelivered(order)}>
                                                <CheckCircle className="mr-2 h-4 w-4" />
                                                Mark as Delivered
                                            </Button>
                                        ) : (
                                            <span>-</span>
                                        )}
                                       </TableCell>
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
