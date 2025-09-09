import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getStatusColor } from "@/lib/utils/getStatusColor";
import { OrdersResponseData } from "@/types/order";
import { OrderPreviewReady } from "@/types/user";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function OrderHistoryItem(order: OrdersResponseData) {
    console.log(order)
  return (
    <div key={order.id} className="border rounded-lg p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-medium">Order #{order.id}</h3>
          <p className="text-sm text-muted-foreground">
            Placed on {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>
        <Badge variant={getStatusColor(order.status) as any}>
          {order.status}
        </Badge>
      </div>

      <div className="space-y-3">
        {/* {order..map((item) => {
          console.log(item);
          return (
            <div key={item.product.id} className="flex gap-4">
              <Image
                width={720}
                height={480}
                src={
                  item.product.variant ? item.product.variant.images[0].src : ""
                }
                alt={
                  item.product.variant
                    ? item.product.variant.images[0].alt
                    : item.product.variant
                }
                className="w-16 h-16 object-cover rounded"
              />
              <Link href={`/product/${item.product.slug}`}>
                <div className="flex-1">
                  <h4 className="font-medium">{item.product.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    Qty: {item.quantity}
                  </p>
                  <p className="text-sm font-medium">${item.price}</p>
                </div>
              </Link>
            </div>
          );
        })} */}
      </div>

      <div className="flex justify-between items-center mt-4 pt-4 border-t">
        <span className="font-semibold">Total: ${order.totalAmount}</span>
        <Link href={`/account/order-history/${order.id}`}>
        <Button variant="outline" size="sm">
          View Details
        </Button>
        </Link>
      </div>
    </div>
  );
}
