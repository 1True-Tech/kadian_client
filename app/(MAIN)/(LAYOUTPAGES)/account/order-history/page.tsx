"use client";
import { mockProducts } from "@/assets/dummy-data/mockData";
import OrderHistoryItem from "@/components/pages/account/OrderHistoryItem";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUserStore } from "@/store/user";
import { OrderPreviewReady } from "@/types/user";
import { useEffect, useState } from "react";

export default function Page() {
  const { user } = useUserStore();
  const [orders, setOrders] = useState<OrderPreviewReady[]>([]);

  useEffect(() => {
    if (user) {
      const ordersPreview = user.orders.map((o) => {
        const items = o.items.map((oi) => {
          const product = mockProducts.find((mp) => mp._id === oi.id);
          const productVariant = product?.variants.find(
            (pv) => pv.sku === oi.variantSku
          );
          return {
            ...oi,
            product: {
              id: product?._id,
              name: product?.name,
              slug: product?.slug,
              basePrice: product?.basePrice,
              variant: productVariant,
            },
          };
        });
        return {
          ...o,
          items,
        };
      }) as OrderPreviewReady[];

      setOrders(ordersPreview);
    }
  }, [user]);

  if (!user) return null;
  return (
    <main className="w-full">
      <Card className="!bg-transparent !shadow-none !border-none !p-0">
        <CardContent className="!px-0">
          <div className="space-y-6">
            {orders.map((order, idx) => (
              <OrderHistoryItem key={idx} {...order} />
            ))}
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
