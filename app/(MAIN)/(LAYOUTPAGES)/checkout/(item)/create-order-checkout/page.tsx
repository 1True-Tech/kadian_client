"use client";
import { OrderReview } from "@/components/pages/checkout/OrderReview";
import { UserInfoForm } from "@/components/pages/checkout/userInfo";
import { useCheckoutStore } from "@/store/checkout";
import { FaCreditCard } from "react-icons/fa";

export default function CreateOrderCheckoutPage() {
  const { currentFlow } = useCheckoutStore();

  return currentFlow === "UserInfo" ? (
    <UserInfoForm />
  ) : currentFlow === "Review" ? (
    <OrderReview />
  ) : (
    <div className="flex flex-col items-center justify-center min-h-[60vh] w-full bg-background animate-pulse">
      <div className="flex flex-col items-center gap-4">
        <span className="block size-20 p-5 relative before:absolute before:size-full before:border-t-2 before:rounded-full before:inset-0 before:animate-spin">
          <FaCreditCard className="text-primary size-full" size={48} />
        </span>
        <div className="text-lg font-semibold text-muted-foreground">
          Loading Payment Methods
        </div>
      </div>
    </div>
  );
}
