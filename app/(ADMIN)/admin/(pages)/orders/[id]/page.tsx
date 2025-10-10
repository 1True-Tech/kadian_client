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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ImageViewer } from "@/components/ui/imageViewer";
import { Loader } from "@/components/ui/loaders";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@/lib/server/client-hook";
import type { OrdersResponseDetails, OrderStatus } from "@/types/order";
import {
  CalendarIcon,
  CheckCircleIcon,
  DollarSignIcon,
  MailIcon,
  PhoneIcon,
  RefreshCwIcon,
  Trash2Icon,
  UserIcon,
  XCircleIcon,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function OrderDetailsPage() {
  const { id } = useParams() as { id: string }; // expects /orders/[id]
  const { data, run, status } = useQuery("getOrder");
  const updateOrder = useQuery("updateOrder");
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const {
    run: cancelOrderRun,
    data: cancelOrderData,
    status: cancelOrderStatus,
  } = useQuery("cancelOrder");
  const {
    run: deleteOrderRun,
    data: deleteOrderData,
    status: deleteOrderStatus,
  } = useQuery("deleteOrder");
  const router = useRouter();

  const orderStatuses: OrderStatus[] = [
    "completed",
    "pending",
    "shipped",
    "cancelled",
    "paid",
  ];
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
    if (!deleteOrderStatus) return;

    if (deleteOrderStatus === "loading") {
      toast.loading("Deleting order...", { id: "delete-order" });
      return;
    }

    if (deleteOrderStatus === "success") {
      if (deleteOrderData?.statusCode === 200) {
        toast.success("Order deleted successfully!", { id: "delete-order" });
        router.replace("/admin/orders");
      } else {
        toast.error(deleteOrderData?.message || "Failed to delete order.", {
          id: "delete-order",
        });
      }
    }

    if (deleteOrderStatus === "error") {
      toast.error("Failed to delete order.", { id: "delete-order" });
    }
  }, [deleteOrderStatus, deleteOrderData, router]);

  if (status === "idle") run({ params: { id } });

  if ((!data?.success || !data.data) && status === "error") {
    return (
      <div className="mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Order Details</h1>
        <p className="text-red-500">Failed to load order data.</p>
      </div>
    );
  }

  if (status === "loading" || !data?.data) {
    return (
      <div className="mx-auto p-4">
        <h1 className="text-3xl font-bold mb-8">Orders Management</h1>
        <div className="w-full h-20">
          <Loader
            loader="hr-line-loader"
            loaderSize="parent"
            type="content-loader"
            unLoad={false}
          />
        </div>
      </div>
    );
  }

  const order: OrdersResponseDetails = data.data;

  // Set initial selected status from order data
  if (selectedStatus === "" && order.status) {
    setSelectedStatus(order.status);
  }

  const updateOrderStatus = async () => {
    if (!selectedStatus || selectedStatus === order.status) return;

    setIsUpdating(true);
    try {
      const response = await updateOrder.run({
        params: { id },
        body: {
          status: selectedStatus as OrderStatus,
        },
      });

      const result = response;

      if (result?.success) {
        toast.success(`Order status updated to ${selectedStatus}`);
        // Refresh order data
        run({ params: { id } });
      } else {
        toast.error(result?.message || "Failed to update order status");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("An error occurred while updating order status");
    } finally {
      setIsUpdating(false);
    }
  };
  const createdAtDate = new Date(order.createdAt);
  const now = new Date();
  const fourDaysInMs = 4 * 24 * 60 * 60 * 1000;
  const isOlderThanFourDays =
    now.getTime() - createdAtDate.getTime() > fourDaysInMs;

  return (
    <div className="mx-auto p-4 space-y-6">
      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">
        Order #{order.id}
      </h1>

      {/* Summary */}
      <Card>
        <CardContent className="p-4 space-y-4">
          <p className="flex items-center gap-2">
            <UserIcon className="w-4 h-4 text-muted-foreground" />
            <span className="font-semibold">Customer:</span>
            <span>
              {order.customerInfo?.name
                ? `${order.customerInfo.name.first} ${order.customerInfo.name.last}`
                : "-"}
            </span>
          </p>

          <p className="flex items-center gap-2">
            <MailIcon className="w-4 h-4 text-muted-foreground" />
            <span className="font-semibold">Email:</span>
            <span>{order.customerInfo?.email ?? "-"}</span>
          </p>

          <p className="flex items-center gap-2">
            <PhoneIcon className="w-4 h-4 text-muted-foreground" />
            <span className="font-semibold">Phone:</span>
            <span>{order.customerInfo?.phone ?? "-"}</span>
          </p>

          <div className="flex items-center gap-2 flex-wrap">
            <CheckCircleIcon className="w-4 h-4 text-muted-foreground" />
            <span className="font-semibold">Status:</span>
            <span>{order.status}</span>
            {(order.status === "pending" || order.status === "shipped") && (
              <>
                <Select
                  value={selectedStatus}
                  onValueChange={setSelectedStatus}
                >
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {orderStatuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  onClick={updateOrderStatus}
                  disabled={isUpdating || selectedStatus === order.status}
                  size="sm"
                >
                  {isUpdating ? (
                    <div className="flex items-center gap-1">
                      <RefreshCwIcon className="w-4 h-4 animate-spin" />
                      Updating...
                    </div>
                  ) : (
                    "Update Status"
                  )}
                </Button>
              </>
            )}
          </div>

          <p className="flex items-center gap-2">
            <DollarSignIcon className="w-4 h-4 text-muted-foreground" />
            <span className="font-semibold">Total:</span>
            <span>${order.totalAmount?.toFixed(2)}</span>
          </p>

          <p className="flex items-center gap-2">
            <CalendarIcon className="w-4 h-4 text-muted-foreground" />
            <span className="font-semibold">Created:</span>
            <span>{new Date(order.createdAt).toLocaleString()}</span>
          </p>

          <p className="flex items-center gap-2">
            <CalendarIcon className="w-4 h-4 text-muted-foreground" />
            <span className="font-semibold">Updated:</span>
            <span>{new Date(order.updatedAt).toLocaleString()}</span>
          </p>

          <div className="w-full flex items-center gap-small">
            {/* Cancel Order */}
            {isOlderThanFourDays ||
            order.status === "completed" ||
            order.status === "paid" ||
            order.status === "shipped" ? (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="destructive"
                      className="flex items-center gap-2 opacity-30 rounded-lg px-3 py-2"
                    >
                      <XCircleIcon className="h-4 w-4" />
                      Cancel Order
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-52">
                    <p>
                      {isOlderThanFourDays
                        ? "Order placed more than 4 days ago, can’t cancel order"
                        : order.status === "completed"
                          ? "Order has already been completed, cannot cancel"
                          : order.status === "paid"
                            ? "Order has been paid, canceling is not allowed"
                            : "You can cancel this order"}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="destructive"
                    className="flex items-center gap-2 rounded-lg px-3 py-2"
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
                      This action cannot be undone. The order will be
                      permanently canceled and the customer will be notified.
                    </AlertDialogDescription>
                  </AlertDialogHeader>

                  <AlertDialogFooter>
                    <AlertDialogCancel className="rounded-lg">
                      Keep Order
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() =>
                        cancelOrderRun({
                          params: { id: order.id },
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

            {/* Delete Order */}
            {isOlderThanFourDays ||
            order.status === "completed" ||
            order.status === "paid" ||
            order.status === "shipped" ? (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="destructive"
                      className="flex items-center gap-2 opacity-30 rounded-lg px-3 py-2"
                    >
                      <Trash2Icon className="h-4 w-4" />
                      Delete Order
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-52">
                    <p>
                      {isOlderThanFourDays
                        ? "Order placed more than 4 days ago, can’t delete order"
                        : order.status === "completed"
                          ? "Order has already been completed, cannot delete"
                          : order.status === "paid"
                            ? "Order has been paid, deleting is not allowed"
                            : "You can delete this order"}
                    </p>{" "}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="destructive"
                    className="flex items-center gap-2 rounded-lg px-3 py-2"
                    disabled={deleteOrderStatus === "loading"}
                  >
                    <Trash2Icon className="h-4 w-4" />
                    Delete Order
                  </Button>
                </AlertDialogTrigger>

                <AlertDialogContent className="rounded-2xl">
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Delete order <b>{order.id}</b>?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. The order will be
                      permanently removed from the system.
                    </AlertDialogDescription>
                  </AlertDialogHeader>

                  <AlertDialogFooter>
                    <AlertDialogCancel className="rounded-lg">
                      Keep Order
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() =>
                        deleteOrderRun({ params: { id: order.id } })
                      }
                      className="rounded-lg bg-red-600 hover:bg-red-700 focus:ring-red-600"
                    >
                      Yes, Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Shipping Address */}
      {order.shippingAddress && (
        <Card>
          <CardContent className="p-4 space-y-1">
            <h2 className="font-semibold mb-2">Shipping Address</h2>
            <p>{order.shippingAddress.line1}</p>
            {order.shippingAddress.line2 && (
              <p>{order.shippingAddress.line2}</p>
            )}
            <p>
              {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
              {order.shippingAddress.postal}
            </p>
            <p>{order.shippingAddress.country}</p>
          </CardContent>
        </Card>
      )}

      {/* Payment */}
      {order.payment && (
        <Card>
          <CardContent className="p-4 space-y-1">
            <h2 className="font-semibold mb-2">Payment</h2>
            <p>
              <span className="font-semibold">Method:</span>{" "}
              {order.payment.method}
            </p>
            <p>
              <span className="font-semibold">Status:</span>{" "}
              {order.payment.status}
            </p>
            <p>
              <span className="font-semibold">Amount:</span> $
              {order.payment.amount.toFixed(2)}
            </p>
            {order.payment.reference && (
              <p>
                <span className="font-semibold">Reference:</span>{" "}
                {order.payment.reference}
              </p>
            )}
            {order.payment.proof && order.payment.method !== "card" && (
              <div>
                <span className="font-semibold">Proof:</span>{" "}
                <ImageViewer
                  src={`/api/images/${order.payment.proof.imageId}`}
                  alt={order.payment.proof.filename}
                />
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Items */}
      <Card>
        <CardContent className="p-4">
          <h2 className="font-semibold mb-2">Items</h2>
          <Table className="w-full border">
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Subtotal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order.items?.map((item, idx) => (
                <TableRow key={idx}>
                  <TableCell>{item.productId}</TableCell>
                  <TableCell>{item.variantSku}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>${item.price.toFixed(2)}</TableCell>
                  <TableCell>
                    ${(item.quantity * item.price).toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
