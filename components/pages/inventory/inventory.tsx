"use client";

import { Fragment, useState } from "react";
import { ChevronDown, ChevronUp, Pencil } from "lucide-react";
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

interface InventoryProps {
  items: (InventoryItem & { productData?: ProductReady })[];
}

export default function Inventory({ items }: InventoryProps) {
  const [expanded, setExpanded] = useState<string | null>(null);
  console.log(items)
  return (
    <Card className="w-full !rounded-none">
      <CardContent className="p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Threshold</TableHead>
              <TableHead>Updated</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {items.map((item, index) => (
              <Fragment key={index}>
                {item.productData?.variants.map(
                  (variant: ProductVariant, idx) => {
                    const isExpanded = expanded === variant.sku;
                    return (
                      <TableRow key={idx}>
                        <TableCell className="font-medium">
                          {item.productData?.name}
                        </TableCell>
                        <TableCell>{variant.sku}</TableCell>
                        <TableCell>${variant.price}</TableCell>
                        <TableCell>{variant.stock}</TableCell>
                        <TableCell>{variant.stockThreshold ?? "-"}</TableCell>
                        <TableCell>
                          {new Date(item.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              setExpanded(isExpanded ? null : variant.sku)
                            }
                          >
                            {isExpanded ? (
                              <ChevronUp className="h-4 w-4" />
                            ) : (
                              <ChevronDown className="h-4 w-4" />
                            )}
                          </Button>
                          {item.productData && (
                            <Button
                              variant="outline"
                              size="sm"
                              // onClick={() => onEdit(item?.productData)}
                            >
                              <Pencil className="h-4 w-4 mr-1" /> Edit
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  }
                )}

                {item.productData?.variants.map(
                  (variant: ProductVariant, idx) =>
                    expanded === variant.sku && (
                      <TableRow key={variant.sku + "-details" + "-" + idx}>
                        <TableCell colSpan={7} className="bg-muted/50">
                          <div className="flex gap-4">
                            {variant.images?.[0] && (
                              <Image
                                width={500}
                                height={500}
                                src={variant.images[0].src}
                                alt={variant.images[0].alt || "Variant image"}
                                className="w-16 h-16 object-cover rounded-md"
                              />
                            )}
                            <div>
                              <p>
                                <span className="font-medium">Color:</span>{" "}
                                {variant.color?.name ?? "-"}
                              </p>
                              <p>
                                <span className="font-medium">Size:</span>{" "}
                                {variant.size.label}
                              </p>
                              {variant.weight && (
                                <p>
                                  <span className="font-medium">Weight:</span>{" "}
                                  {variant.weight.value} {variant.weight.unit}
                                </p>
                              )}
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                )}
              </Fragment>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
