"use client";
import { mockProducts } from "@/assets/dummy-data/mockData";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store/user";
import { CartItemReady, OrderPreviewReady } from "@/types/user";
import { LoaderCircleIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";

function OrderItemDetail({ item }: { item: CartItemReady }) {
  const { product, quantity } = item;
  const { name, variant } = product;
  const unit = variant.price;
  const total = ((unit * quantity)||0).toFixed(2);

  const image =
    variant.images.find((img) => img.isPrimary) || variant.images[0];

  return (
    <div className="flex items-center gap-4 py-4 border-b">
      <div className="w-20 h-20 relative">
        <Image src={image.src} alt={image.alt} fill className="rounded" />
      </div>

      <div className="flex-1">
        <Link className="w-fit" href={`/product/${item.product.slug}`}>
          <p className="font-medium">{name}</p>
        </Link>
        <p className="text-sm">Size: {variant.size}</p>
        <p className="text-sm">Color: {variant.color}</p>
      </div>
      <div className="text-right">
        <p className="text-sm">${(unit||0).toFixed(2)}</p>
        <p className="text-sm">Qty: {quantity}</p>
        <p className="font-semibold">${total}</p>
      </div>
    </div>
  );
}

export default function OrderDetail(props: { id: string }) {
  const { user } = useUserStore();
  const [order, setOrder] = useState<
    OrderPreviewReady | null | "not-initialized"
  >("not-initialized");

  useEffect(() => {
    if (user) {
      const order = user.orders.find((o) => o.id === props.id);
      if (!order) {
        setOrder(null);
        return;
      }
      const ordersItem = order.items.map((oi) => {
        const product = mockProducts.find((mp) => mp._id === oi.id);
        const productVariant = product?.variants.find(
          (pv) => pv.sku === oi.variantSku
        );
        return {
          ...oi,
          product: {
            id: product?._id,
            name: product?.name,
            slug: product?.slug,
            basePrice: product?.basePrice,
            variant: productVariant,
          },
        };
      });

      const orderPreview = {
        ...order,
        items: ordersItem,
      } as OrderPreviewReady;

      setOrder(orderPreview);
    }
  }, [user]);
  if (order === "not-initialized") return
    <div className="w-5 h-5 animate-spin text-muted-foreground hidden sm:flex items-center justify-center">
      <LoaderCircleIcon className="h-5 w-5" />
    </div>;

  if (!order) return notFound();
  const { id, date, status, total, items, shippingAddress } =
    order as OrderPreviewReady;

  return (
    <div className="w-full p-6 bg-white rounded-lg shadow">
      <header className="mb-6">
        <h2 className="text-xl font-semibold">Order {id}</h2>
        <p className="text-sm">Date: {date}</p>
        <p className="text-sm capitalize">Status: {status}</p>
      </header>

      <section>
        {items &&
          items.map((item) => (
            <OrderItemDetail key={item.product.id} item={item} />
          ))}
      </section>

      <div className="mt-4 text-right">
        <p className="text-lg font-semibold">Total ${total.toFixed(2)}</p>
      </div>

      <section className="mt-8">
        <h3 className="text-lg font-medium mb-2">Shipping Address</h3>
        <p>{shippingAddress.name}</p>
        <p>{shippingAddress.street}</p>
        <p>
          {shippingAddress.city}, {shippingAddress.state}{" "}
          {shippingAddress.zipCode}
        </p>
        <p>{shippingAddress.country}</p>
      </section>

      <div className="mt-6 text-right">
        <Button variant="default">Track Package</Button>
      </div>
    </div>
  );
}
