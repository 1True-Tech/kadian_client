import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getStatusColor } from "@/lib/utils/getStatusColor";
import { OrdersResponseData } from "@/types/order";
import { OrderPreviewReady } from "@/types/user";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function OrderHistoryItem(order: OrdersResponseData) {
    
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
        {order.items && order.items.map((item, index) => (
          <div key={index} className="flex gap-4">
            <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center">
              {item.image ? (
                <Image
                  width={64}
                  height={64}
                  src={item.image}
                  alt={item.name || "Product image"}
                  className="w-16 h-16 object-cover rounded"
                />
              ) : (
                <span className="text-xs text-gray-500">No image</span>
              )}
            </div>
            <div className="flex-1">
              <h4 className="font-medium">{item.name}</h4>
              <p className="text-sm text-muted-foreground">
                Qty: {item.quantity}
              </p>
              <p className="text-sm font-medium">${item.price}</p>
              {item.variantSku && (
                <p className="text-xs text-muted-foreground">SKU: {item.variantSku}</p>
              )}
            </div>
          </div>
        ))}
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
