"use client";
import { ShoppingBagIcon } from "lucide-react";
import { Button, ButtonProps } from "../ui/button";

export default function AddToCartButton({
  productId,
  ...props
}: ButtonProps& { productId: string }) {
  return (
    <Button
      size="icon"
      variant="secondary"
      className="h-8 w-8 !bg-black !text-white"
      {...props}
    >
      <ShoppingBagIcon className="h-4 w-4" />
    </Button>
  );
}
