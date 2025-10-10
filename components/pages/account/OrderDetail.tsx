"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
import { useQuery } from "@/lib/server/client-hook";
import { useUserStore } from "@/store/user";
import { OrderItem, OrdersResponseData } from "@/types/order";
import { LoaderCircleIcon, XCircleIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Tooltip, TooltipTrigger } from "@/components/ui/tooltip";

function OrderItemDetail({ item }: { item: OrderItem }) {
  const { product, quantity, price } = item;
  const name = product?.name || "";
  const variant = product?.variants?.find((v) => v.sku === item.variantSku);
  const image =
    variant?.images?.[0] || product?.mainImage || product?.gallery?.[0];
  const size = variant?.size?.label || "-";
  const color = variant?.color?.name || "-";
  const total = (price * quantity || 0).toFixed(2);

  return (
    <div className="flex items-center gap-4 py-4 border-b">
      <div className="w-20 h-20 relative">
        {image?.src && (
          <Image
            src={image.src}
            alt={image.alt || name}
            loading="lazy"
            fill
            className="rounded"
          />
        )}
      </div>
      <div className="flex-1">
        <Link
          className="w-fit"
          href={product?.slug ? `/product/${product.slug}` : "#"}
        >
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
  const [order, setOrder] = useState<
    OrdersResponseData | null | "not-initialized"
  >("not-initialized");
  const {
    run: cancelOrderRun,
    data: cancelOrderData,
    status: cancelOrderStatus,
  } = useQuery("cancelOrder");
  useEffect(() => {
    if (!cancelOrderStatus) return;

    if (cancelOrderStatus === "loading") {
      toast.loading("Canceling order...", { id: "cancel-order" });
      return;
    }

    if (cancelOrderStatus === "success") {
      if (cancelOrderData?.statusCode === 200) {
        toast.success("Order canceled successfully!", { id: "cancel-order" });
      } else {
        toast.error(cancelOrderData?.message || "Failed to cancel order.", {
          id: "cancel-order",
        });
      }
    }

    if (cancelOrderStatus === "error") {
      toast.error("Failed to cancel order.", { id: "cancel-order" });
    }
  }, [cancelOrderStatus, cancelOrderData]);

  useEffect(() => {
    if (user) {
      const order = user.orders?.find((o) => o.id === props.id);
      if (!order) {
        setOrder(null);
        return;
      }

      setOrder(order);
    }
  }, [props.id, user]);

  if (order === "not-initialized") return;
  <div className="w-5 h-5 animate-spin text-muted-foreground hidden sm:flex items-center justify-center">
    <LoaderCircleIcon className="h-5 w-5" />
  </div>;

  if (!order || !order.id) return notFound();
  const {
    id,
    createdAt,
    status,
    totalAmount,
    items,
    payment,
    customerInfo,
    shippingAddress,
  } = order;
  const createdAtDate = new Date(createdAt);
  const now = new Date();
  const fourDaysInMs = 4 * 24 * 60 * 60 * 1000; // 4 days in milliseconds

  const isOlderThanFourDays =
    now.getTime() - createdAtDate.getTime() > fourDaysInMs;

  return (
    <div className="w-full p-6 bg-white rounded-lg shadow">
      <header className="mb-6">
        <h2 className="text-base sm:text-lg md:text-xl font-semibold truncate">
          Order <em className="not-italic text-foreground/70">{id}</em>
        </h2>
        <p className="text-sm">
          Date: {new Date(createdAt).toLocaleDateString()}
        </p>
        <p className="text-sm capitalize">Status: {status}</p>
      </header>

      <section>
        {items &&
          items.map((item) => (
            <OrderItemDetail
              key={item.productId + item.variantSku}
              item={item}
            />
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
          {payment.paidAt && (
            <p>
              Paid At:{" "}
              {payment.paidAt ? new Date(payment.paidAt).toLocaleString() : "-"}
            </p>
          )}
        </section>
      )}

      {/* Customer Info */}
      {customerInfo && (
        <section className="mt-8">
          <h3 className="text-lg font-medium mb-2">Customer Info</h3>
          <p>
            Name: {customerInfo.name.first} {customerInfo.name.last}
          </p>
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
            {shippingAddress.city}, {shippingAddress.state}{" "}
            {shippingAddress.postal}
          </p>
          <p>{shippingAddress.country}</p>
        </section>
      )}

      <div className="mt-6 text-right flex items-center gap-small">
        {isOlderThanFourDays ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={"destructive"}
                  className="flex w-full items-center gap-2 opacity-30 rounded-lg px-3 py-2"
                >
                  <XCircleIcon className="h-4 w-4" />
                  Cancel Order
                </Button>
              </TooltipTrigger>
              <TooltipContent className="max-w-52">
                <p>
                  Order placed more than 4 days ago, can&rsquo;t cancel order
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant={"destructive"}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2"
              >
                <XCircleIcon className="h-4 w-4" />
                Cancel Order
              </Button>
            </AlertDialogTrigger>

            <AlertDialogContent className="rounded-2xl">
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Cancel order <b>{order.id}</b>?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. The order will be permanently
                  canceled and the customer will be notified.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel className="rounded-lg">
                  Keep Order
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={() =>
                    cancelOrderRun({
                      params: {
                        id,
                      },
                    })
                  }
                  className="rounded-lg bg-red-600 hover:bg-red-700 focus:ring-red-600"
                >
                  Yes, Cancel
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}

        <Link href={`/account/order-history/${id}/tracking`}>
          <Button variant="default">Track Package</Button>
        </Link>
      </div>
    </div>
  );
}
