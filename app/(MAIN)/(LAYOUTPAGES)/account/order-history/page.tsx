"use client";
import OrderHistoryItem from "@/components/pages/account/OrderHistoryItem";
import { Card, CardContent } from "@/components/ui/card";
import { useUserStore } from "@/store/user";

export default function Page() {
  const { user } = useUserStore();


  if (!user) return null;
  const {orders} = user
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
