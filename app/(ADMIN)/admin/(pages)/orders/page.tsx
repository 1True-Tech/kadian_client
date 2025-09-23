"use client";

import { useState } from "react";
import { useQuery } from "@/lib/server/client-hook";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { OrdersResponseData, OrdersResponseDetails } from "@/types/order";
import Link from "next/link";

export default function OrdersPage() {
  const { data, run, status } = useQuery("getAllOrders");
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  console.log(data)
  if (status === "idle") run();

  if (!data?.success) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8">Orders Management</h1>
        <p className="text-red-500">Failed to load orders data.</p>
      </div>
    );
  }

  if (!data.orders?.length) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8">Orders Management</h1>
        <p className="text-gray-500">No orders found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Orders Management</h1>

      <Card className="w-full">
        <CardContent className="p-4">
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.orders.map((order: OrdersResponseDetails, idex) => {
                const isExpanded = expandedOrder === order.id;

                return (
                  <>
                    <TableRow key={idex}>
                      <TableCell className="font-medium"><Link href={`/admin/orders/${order.id}`}>
                      {order.id}
                      </Link></TableCell>
                      <TableCell>{`${order.customerInfo?.name.first?? "-"} ${order.customerInfo?.name.last?? "-"}`}</TableCell>
                      <TableCell>
                        {order.createdAt
                          ? new Date(order.createdAt).toLocaleDateString()
                          : "-"}
                      </TableCell>
                      <TableCell>${order.totalAmount?.toFixed(2) ?? "-"}</TableCell>
                      <TableCell>{order.status ?? "-"}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            setExpandedOrder(isExpanded ? null : order.id)
                          }
                        >
                          {isExpanded ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </Button>
                      </TableCell>
                    </TableRow>

                    {isExpanded && (
                      <TableRow>
                        <TableCell colSpan={6} className="bg-muted/40">
                          <div className="p-4">
                            <h2 className="font-semibold mb-2">Order Items</h2>
                            <Table className="w-full border">
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Product</TableHead>
                                  <TableHead>SKU</TableHead>
                                  <TableHead>Quantity</TableHead>
                                  <TableHead>Price</TableHead>
                                  <TableHead>Subtotal</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {order.items?.map((item, idx) => (
                                  <TableRow key={idx}>
                                    <TableCell>{item.productId}</TableCell>
                                    <TableCell>{item.variantSku}</TableCell>
                                    <TableCell>{item.quantity}</TableCell>
                                    <TableCell>${item.price}</TableCell>
                                    <TableCell>
                                      ${(item.quantity * item.price).toFixed(2)}
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
