"use client";
import { useUserStore } from "@/store/user";
import { HeartIcon } from "lucide-react";
import { Button, ButtonProps } from "../ui/button";

export default function WishlistButton({
  productId,
  ...props
}: ButtonProps & { productId: string }) {
  const { user } = useUserStore();
  if (!user) return null;
  return (
    <Button
      size="icon"
      variant="secondary"
      className="h-8 w-8 !bg-white !text-black"
      {...props}
    >
      <HeartIcon className="h-4 w-4" />
    </Button>
  );
}
