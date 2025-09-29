// app/checkout/page.tsx
import { redirect } from "next/navigation";

export default function CheckoutIndex() {
  redirect("/checkout/create-order-checkout");
}
