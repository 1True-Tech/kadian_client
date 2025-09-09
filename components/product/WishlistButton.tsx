"use client";
import { useUserStore } from "@/store/user";
import { HeartIcon } from "lucide-react";
import { Button, ButtonProps } from "../ui/button";
import { useQuery } from "@/lib/server/client-hook";
import { cn } from "@/lib/utils";

export default function WishlistButton({
  productId,
  ...props
}: ButtonProps & { productId: string }) {
  const { user,actions } = useUserStore();
  const { run } = useQuery("updateWishlist");
  const removeFromWishList = useQuery("deleteWishlistItem");
  if (!user) return null;
  async function handleAddToWishlist() {
    run({
      body: {
        updateData:[{
          productId
        }]
      },
    });
    if (user) {
      actions.setUser({
        ...user,
        wishList:[
          ...user.wishList,
          {productId}
        ]
      });
    }
  }
  async function handleRemoveFromWishlist() {
    removeFromWishList.run({
      params:{
        id:productId
      }
    });
    if (user) {
      actions.setUser({
        ...user,
        wishList:user.wishList.filter(i => i.productId !== productId)
      });
    }
  }
  

  const isInWishlist = user.wishList.map(w => w.productId).includes(productId)
  return (
    <Button
      size="icon"
      variant="secondary"
      className="h-8 w-8 !bg-white !text-black"
      {...props}
      onClick={isInWishlist?handleRemoveFromWishlist:handleAddToWishlist}
    >
      <HeartIcon className={
        cn(
          "h-4 w-4",
          {"fill-red-400": isInWishlist}
        )
      } />
    </Button>
  );
}
