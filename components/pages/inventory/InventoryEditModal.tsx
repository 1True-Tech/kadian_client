"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { InventoryItem } from "@/types/inventory";
import { ProductReady, ProductVariant } from "@/types/product";
import { client } from "@/lib/utils/NSClient";

type Props = {
  data: {
    item: InventoryItem & { productData?: ProductReady };
    variantSku: string;
  } | null;
  onClose?: () => void;
  onSave?: (status: "good" | "bad") => void;
};

export default function InventoryEditModal({ data, onClose, onSave }: Props) {
  

  const { item, variantSku } = data!;
  const variant = item.productData?.variants.find(
    (v: ProductVariant) => v.sku === variantSku
  );

  const [opened, setOpened] = useState(true);
  const [price, setPrice] = useState(variant?.price ?? 0);
  const [stock, setStock] = useState(variant?.stock ?? 0);
  const [threshold, setThreshold] = useState(variant?.stockThreshold ?? 0);
  if (!data) return null;

  const handleSave = async () => {
    try {
      const res = await fetch("/api/inventory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          docId: item.productData?._id,
          variantSku,
          price,
          stock,
          stockThreshold: threshold,
        }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error);

      onSave?.("good");
      onClose?.();
    } catch (err) {
      console.error(err);
      onSave?.("bad");
    }
  };

  return (
    <Dialog
      open={opened}
      onOpenChange={() => {
        setOpened(false);
        if (onClose) {
          onClose();
        }
      }}
    >
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            Edit Variant – {item.productData?.name} ({variantSku})
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div>
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(parseFloat(e.target.value))}
            />
          </div>

          <div>
            <Label htmlFor="stock">Stock</Label>
            <Input
              id="stock"
              type="number"
              value={stock}
              onChange={(e) => setStock(parseInt(e.target.value))}
            />
          </div>

          <div>
            <Label htmlFor="threshold">Threshold</Label>
            <Input
              id="threshold"
              type="number"
              value={threshold}
              onChange={(e) => setThreshold(parseInt(e.target.value))}
            />
          </div>

          {variant?.color?.name && (
            <p className="text-sm text-muted-foreground">
              Color: {variant.color.name}
            </p>
          )}
          {variant?.size?.label && (
            <p className="text-sm text-muted-foreground">
              Size: {variant.size.label}
            </p>
          )}
          {variant?.weight && (
            <p className="text-sm text-muted-foreground">
              Weight: {variant.weight.value} {variant.weight.unit}
            </p>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
