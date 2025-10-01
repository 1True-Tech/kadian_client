"use client";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store/user";
import { OrdersResponseData, OrderItem } from "@/types/order";
import { LoaderCircleIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";

function OrderItemDetail({ item }: { item: OrderItem }) {
  const { product, quantity, price } = item;
  const name = product?.name || "";
  const variant = product?.variants?.find(v => v.sku === item.variantSku);
  const image = variant?.images?.[0] || product?.mainImage || product?.gallery?.[0];
  const size = variant?.size?.label || "-";
  const color = variant?.color?.name || "-";
  const total = ((price * quantity) || 0).toFixed(2);

  return (
    <div className="flex items-center gap-4 py-4 border-b">
      <div className="w-20 h-20 relative">
        {image?.src && (
          <Image src={image.src} alt={image.alt || name} fill className="rounded" />
        )}
      </div>
      <div className="flex-1">
        <Link className="w-fit" href={product?.slug ? `/product/${product.slug}` : "#"}>
          <p className="font-medium">{name}</p>
        </Link>
        <p className="text-sm">Size: {size}</p>
        <p className="text-sm">Color: {color}</p>
      </div>
      <div className="text-right">
        <p className="text-sm">${price.toFixed(2)}</p>
        <p className="text-sm">Qty: {quantity}</p>
        <p className="font-semibold">${total}</p>
      </div>
    </div>
  );
}

export default function OrderDetail(props: { id: string }) {
  const { user } = useUserStore();
  const [order, setOrder] = useState<OrdersResponseData | null | "not-initialized">("not-initialized");

  useEffect(() => {
    if (user) {
      const order = user.orders?.find((o) => o.id === props.id);
      if (!order) {
        setOrder(null);
        return;
      }

      setOrder(order);
    }
  }, [user]);
  if (order === "not-initialized") return
    <div className="w-5 h-5 animate-spin text-muted-foreground hidden sm:flex items-center justify-center">
      <LoaderCircleIcon className="h-5 w-5" />
    </div>;

  if (!order) return notFound();
  const { id, createdAt, status, totalAmount, items, payment, customerInfo, shippingAddress } = order as OrdersResponseData;

  return (
    <div className="w-full p-6 bg-white rounded-lg shadow">
      <header className="mb-6">
        <h2 className="text-xl font-semibold">Order {id}</h2>
        <p className="text-sm">Date: {new Date(createdAt).toLocaleDateString()}</p>
        <p className="text-sm capitalize">Status: {status}</p>
      </header>

      <section>
        {items &&
          items.map((item) => (
            <OrderItemDetail key={item.productId + item.variantSku} item={item} />
          ))}
      </section>

      <div className="mt-4 text-right">
        <p className="text-lg font-semibold">Total ${totalAmount.toFixed(2)}</p>
      </div>

      {/* Payment Details */}
      {payment && (
        <section className="mt-8">
          <h3 className="text-lg font-medium mb-2">Payment Details</h3>
          <p>Method: {payment.method}</p>
          <p>Status: {payment.status}</p>
          <p>Amount: ${payment.amount?.toFixed(2)}</p>
          {payment.reference && <p>Reference: {payment.reference}</p>}
          {payment.paidAt && <p>Paid At: {payment.paidAt ? new Date(payment.paidAt).toLocaleString() : "-"}</p>}
        </section>
      )}

      {/* Customer Info */}
      {customerInfo && (
        <section className="mt-8">
          <h3 className="text-lg font-medium mb-2">Customer Info</h3>
          <p>Name: {customerInfo.name.first} {customerInfo.name.last}</p>
          <p>Email: {customerInfo.email}</p>
          {customerInfo.phone && <p>Phone: {customerInfo.phone}</p>}
        </section>
      )}

      {/* Shipping Address */}
      {shippingAddress && (
        <section className="mt-8">
          <h3 className="text-lg font-medium mb-2">Shipping Address</h3>
          <p>{shippingAddress.line1}</p>
          {shippingAddress.line2 && <p>{shippingAddress.line2}</p>}
          <p>
            {shippingAddress.city}, {shippingAddress.state} {shippingAddress.postal}
          </p>
          <p>{shippingAddress.country}</p>
        </section>
      )}

      <div className="mt-6 text-right">
        <Link href={`/account/order-history/${id}/tracking`}>
          <Button variant="default">Track Package</Button>
        </Link>
      </div>
    </div>
  );
}
