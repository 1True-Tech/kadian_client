"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Pencil, RotateCcwIcon } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { InventoryItem } from "@/types/inventory";
import { ProductReady, ProductVariant } from "@/types/product";
import Image from "next/image";
import { useQuery } from "@/lib/server/client-hook";
import InventoryEditModal from "./InventoryEditModal";

interface InventoryProps {
  items: (InventoryItem & { productData?: ProductReady })[];
}

export default function Inventory({ items }: InventoryProps) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [editableItem, setEditableItem] = useState<{
    item: InventoryItem & { productData?: ProductReady };
    variantSku: string;
  } | null>(null);
  const refInvent = useQuery("refreshInventory");
  const refreshInventory = () => refInvent.run();

  return (
    <>
      <InventoryEditModal
        data={editableItem}
        onSave={() => setEditableItem(null)}
        onClose={() => setEditableItem(null)}
      />

      <Card className="w-full !rounded-none">
        <CardContent className="p-4 flex flex-col items-end gap-peers">
          <Button variant="glow" size="sm" className="w-fit" onClick={refreshInventory}>
            <RotateCcwIcon className="h-4 w-4 mr-1" /> Refresh
          </Button>

          {/* Wrap table in horizontal scroll for small screens */}
          <div className="w-full overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Variants</TableHead>
                  <TableHead>Updated</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {items.map((item, index) => {
                  const isExpanded = expanded === item.productData?._id;
                  return (
                    <>
                      <TableRow key={index}>
                        <TableCell className="font-medium">
                          {item.productData?.name}
                        </TableCell>
                        <TableCell>
                          {item.productData?.variants.length}
                        </TableCell>
                        <TableCell>
                          {new Date(item.productData?._updatedAt||item.productData?._createdAt||"").toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              setExpanded(
                                isExpanded
                                  ? null
                                  : item.productData?._id || null
                              )
                            }
                          >
                            {isExpanded ? (
                              <ChevronUp className="h-4 w-4" />
                            ) : (
                              <ChevronDown className="h-4 w-4" />
                            )}
                          </Button>
                        </TableCell>
                      </TableRow>

                      {isExpanded && (
                        <TableRow>
                          <TableCell colSpan={4} className="!bg-white !px-0">
                            {/* Nested scroll container for many columns */}
                            <div className="overflow-x-auto w-full md:max-w-[calc(100vw-22.25rem)]">
                              <Table className="w-full border hidden md:table">
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Image</TableHead>
                                    <TableHead>SKU</TableHead>
                                    <TableHead>Price</TableHead>
                                    <TableHead>Stock</TableHead>
                                    <TableHead>Threshold</TableHead>
                                    <TableHead>Color</TableHead>
                                    <TableHead>Size</TableHead>
                                    <TableHead>Weight</TableHead>
                                    <TableHead>Actions</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {item.productData?.variants.map(
                                    (variant: ProductVariant, idx) => (
                                      <TableRow key={variant.sku + idx}>
                                        <TableCell>
                                          {variant.images?.[0] && (
                                            <Image
                                              width={64}
                                              height={64}
                                              src={variant.images[0].src}
                                              alt={
                                                variant.images[0].alt ||
                                                "Variant"
                                              }
                                              className="w-16 h-16 object-cover rounded-md"
                                            />
                                          )}
                                        </TableCell>
                                        <TableCell>{variant.sku}</TableCell>
                                        <TableCell>${variant.price}</TableCell>
                                        <TableCell>{variant.stock}</TableCell>
                                        <TableCell>
                                          {variant.stockThreshold ?? "-"}
                                        </TableCell>
                                        <TableCell>
                                          {variant.color?.name ?? "-"}
                                        </TableCell>
                                        <TableCell>
                                          {variant.size.label}
                                        </TableCell>
                                        <TableCell>
                                          {variant.weight
                                            ? `${variant.weight.value} ${variant.weight.unit}`
                                            : "-"}
                                        </TableCell>
                                        <TableCell>
                                          <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => {
                                              setEditableItem({
                                                item: item,
                                                variantSku: variant.sku,
                                              });
                                            }}
                                          >
                                            <Pencil className="h-4 w-4 mr-1" />{" "}
                                            Edit
                                          </Button>
                                        </TableCell>
                                      </TableRow>
                                    )
                                  )}
                                </TableBody>
                              </Table>

                              {/* Mobile card layout */}
                              <div className="grid gap-4 md:hidden">
                                {item.productData?.variants.map(
                                  (variant: ProductVariant, idx) => (
                                    <div
                                      key={variant.sku + idx}
                                      className="p-4 border rounded-lg bg-white flex flex-col gap-2"
                                    >
                                      <div className="flex items-center gap-3">
                                        {variant.images?.[0] && (
                                          <Image
                                            width={64}
                                            height={64}
                                            src={variant.images[0].src}
                                            alt={
                                              variant.images[0].alt || "Variant"
                                            }
                                            className="w-16 h-16 object-cover rounded-md"
                                          />
                                        )}
                                        <div>
                                          <p className="font-medium">
                                            {variant.sku}
                                          </p>
                                          <p className="text-sm text-muted-foreground">
                                            ${variant.price} | Stock:{" "}
                                            {variant.stock}
                                          </p>
                                        </div>
                                      </div>
                                      <div className="text-sm space-y-1">
                                        <p>
                                          Threshold:{" "}
                                          {variant.stockThreshold ?? "-"}
                                        </p>
                                        <p>
                                          Color: {variant.color?.name ?? "-"}
                                        </p>
                                        <p>Size: {variant.size.label}</p>
                                        <p>
                                          Weight:{" "}
                                          {variant.weight
                                            ? `${variant.weight.value} ${variant.weight.unit}`
                                            : "-"}
                                        </p>
                                      </div>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        className="mt-2 self-start"
                                        onClick={() => {
                                          setEditableItem({
                                            item: item,
                                            variantSku: variant.sku,
                                          });
                                        }}
                                      >
                                        <Pencil className="h-4 w-4 mr-1" /> Edit
                                      </Button>
                                    </div>
                                  )
                                )}
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
