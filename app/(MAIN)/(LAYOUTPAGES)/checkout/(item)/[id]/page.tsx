"use client";
import { OrderReview } from "@/components/pages/checkout/OrderReview";
import { PaymentMethodForm } from "@/components/pages/checkout/PaymentMethod";
import { UserInfoForm } from "@/components/pages/checkout/userInfo";
import { useCheckoutStore } from "@/store/checkout";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const { id } = useParams() as { id: string };
  const {
    currentFlow,
    actions: { setOrderId },
  } = useCheckoutStore();

  useEffect(() => {
    setOrderId(id);
  }, [id, setOrderId]);

  return currentFlow === "UserInfo" ? (
    <UserInfoForm />
  ) : currentFlow === "Review" ? (
    <OrderReview />
  ) : (
    <PaymentMethodForm />
  );
}
