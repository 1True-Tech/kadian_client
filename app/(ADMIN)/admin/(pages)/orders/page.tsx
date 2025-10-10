"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader } from "@/components/ui/loaders";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@/lib/server/client-hook";
import type { OrdersResponseDetails } from "@/types/order";
import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

export default function OrdersPage() {
  const { data, run, status } = useQuery("getAllOrders");
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  if (status === "idle") run();

  if (!data?.success && status === "error") {
    return (
      <div className="mx-auto p-4">
        <h1 className="text-3xl font-bold mb-8">Orders Management</h1>
        <p className="text-red-500">Failed to load orders data.</p>
      </div>
    );
  }

  if (status === "loading" || !data) {
    return (
      <div className="mx-auto p-4">
        <h1 className="text-3xl font-bold mb-8">Orders Management</h1>
        <div className="w-full h-20">
          <Loader
            loader="hr-line-loader"
            loaderSize="parent"
            type="content-loader"
            unLoad={false}
          />
        </div>
      </div>
    );
  }

  if (!data.data?.length) {
    return (
      <div className="mx-auto p-4">
        <h1 className="text-3xl font-bold mb-8">Orders Management</h1>
        <p className="text-gray-500">No orders found.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Orders Management</h1>

      <Card className="w-full">
        <CardContent className="p-4">
          <div className="w-full overflow-x-auto">
            <Table className="w-full min-w-[700px]">
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
                {data.data.map((order: OrdersResponseDetails, idex) => {
                  const isExpanded = expandedOrder === order.id;
                  const firstImage = order.items
                    ?.map((i) => i.product?.mainImage)
                    .find((img) => img?.src);
                  return (
                    <React.Fragment key={idex}>
                      <TableRow>
                        <TableCell className="font-medium">
                          <Link
                            href={`/admin/orders/${order.id}`}
                            className="flex items-center gap-2"
                          >
                            {firstImage?.src && (
                              <Image
                                width={200}
                                height={200}
                                src={firstImage.src}
                                alt={firstImage?.alt || "Product image"}
                                loading="lazy"
                                className="w-8 h-8 rounded object-cover"
                              />
                            )}
                            <span className="font-medium break-all">
                              {order.id}
                            </span>
                          </Link>
                        </TableCell>
                        <TableCell>{`${order.customerInfo?.name.first ?? "-"} ${order.customerInfo?.name.last ?? "-"}`}</TableCell>
                        <TableCell>
                          {order.createdAt
                            ? new Date(order.createdAt).toLocaleDateString()
                            : "-"}
                        </TableCell>
                        <TableCell>
                          ${order.totalAmount?.toFixed(2) ?? "-"}
                        </TableCell>
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
                              <h2 className="font-semibold mb-2">
                                Order Items
                              </h2>
                              <div className="w-full overflow-x-auto">
                                <Table className="w-full min-w-[500px] border">
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
                                        <TableCell>
                                          <div className="flex items-center gap-2">
                                            {item.product?.mainImage?.src ? (
                                              <Image
                                                width={50}
                                                height={50}
                                                src={item.product.mainImage.src}
                                                loading="lazy"
                                                alt={
                                                  item.product.mainImage.alt ||
                                                  item.product?.name
                                                }
                                                className="w-10 h-10 object-cover rounded"
                                              />
                                            ) : (
                                              <div className="w-10 h-10 bg-muted flex items-center justify-center rounded">
                                                <span className="text-muted-foreground/30">
                                                  No Image
                                                </span>
                                              </div>
                                            )}
                                            <span>{item.product?.name}</span>
                                          </div>
                                        </TableCell>
                                        <TableCell>{item.variantSku}</TableCell>
                                        <TableCell>{item.quantity}</TableCell>
                                        <TableCell>${item.price}</TableCell>
                                        <TableCell>
                                          $
                                          {(item.quantity * item.price).toFixed(
                                            2
                                          )}
                                        </TableCell>
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </React.Fragment>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
