"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ProductVariant } from "@/types/product";
import { MinusIcon, PlusIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";

export default function ProductActions({
  variant,
}: {
  variant: ProductVariant;
}) {
  const [quantity, setQuantity] = useState(0); // 0 = not in cart

  const inCart = quantity > 0;
  const total = (variant.price * quantity).toFixed(2);

  return (
    <div
      className={cn(
        "sticky bottom-4 md:relative flex items-center gap-peers w-full z-20",
        "transition-all duration-300 animate-fade-in"
      )}
    >
      <div className="w-full bg-card p-small rounded-md flex flex-col gap-peers relative isolate z-0">
        {/* In Cart View */}
        {inCart ? (
          <>
            <div className="flex items-center justify-between">
              {/* Total price */}
              <span className="text-lg font-semibold text-primary">
                Total: ${total}
              </span>
            </div>
            <div className="p-small rounded-full flex items-center gap-peers">
              {/* Quantity controls */}
              <div className="w-full flex items-center gap-container bg-muted rounded-full px-small py-small">
                <Button
                  variant={"ghost"}
                  onClick={() => setQuantity((q) => Math.max(0, q - 1))}
                  className="w-full shrink h-10 text-lg flex items-center justify-center rounded-full bg-white border text-primary hover:bg-muted transition-all"
                >
                  <MinusIcon/>
                </Button>
                <span className="text-sm font-medium">{quantity}</span>
                <Button
                  variant={"ghost"}
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-full shrink h-10 text-lg flex items-center justify-center rounded-full bg-white border text-primary hover:bg-muted transition-all"
                >
                  <PlusIcon/>
                </Button>
              </div>
              {/* Remove Button */}
              <Button
                variant={"destructive"}
                onClick={() => setQuantity(0)}
                className="w-fit rounded-full border py-3 text-sm font-semibold"
              >
                <Trash2Icon />
                Remove
              </Button>
            </div>
          </>
        ) : (
          // Not in cart view
          <Button
            variant={"secondary"}
            onClick={() => setQuantity(1)}
            className="w-full rounded-full py-3 text-base font-semibold transition-colors animate-bounce-self"
          >
            Add to Cart
          </Button>
        )}
      </div>
    </div>
  );
}
