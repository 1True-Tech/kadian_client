"use client";

import { useQuery } from "@/lib/server/client-hook";
import { useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { OrdersResponseDetails, OrderStatus } from "@/types/order";
import { ImageViewer } from "@/components/ui/imageViewer";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { useState } from "react";
import { toast } from "sonner";
import { Loader2Icon } from "lucide-react";

export default function OrderDetailsPage() {
  const { id } = useParams() as {id:string}; // expects /orders/[id]
  const { data, run, status } = useQuery("getOrder");
  const updateOrder = useQuery("updateOrder");
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");

  console.log(data)
  
  const orderStatuses = ["initiated", "processing", "shipped", "delivered", "cancelled", "paid"];

  if (status === "idle") run({params:{id}});
    
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
        <p>Loading orders...</p>
        <Loader2Icon className="animate-spin h-6 w-6 text-gray-500 mt-4" />
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
        body:{
          status: selectedStatus as OrderStatus
        }
      })
      
      const result = response;
      
      if (result?.success) {
        toast.success(`Order status updated to ${selectedStatus}`);
        // Refresh order data
        run({params:{id}});
      } else {
        toast.error(result?.message || 'Failed to update order status');
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      toast.error('An error occurred while updating order status');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold">Order #{order.id}</h1>

      {/* Summary */}
      <Card>
        <CardContent className="p-4 space-y-2">
          <p>
            <span className="font-semibold">Customer:</span>{" "}
            {order.customerInfo?.name
              ? `${order.customerInfo.name.first} ${order.customerInfo.name.last}`
              : "-"}
          </p>
          <p>
            <span className="font-semibold">Email:</span>{" "}
            {order.customerInfo?.email ?? "-"}
          </p>
          <p>
            <span className="font-semibold">Phone:</span>{" "}
            {order.customerInfo?.phone ?? "-"}
          </p>
          <div className="flex items-center gap-4">
            <p>
              <span className="font-semibold">Status:</span> {order.status}
            </p>
            <div className="flex items-center gap-2 ml-4">
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-[180px]">
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
                {isUpdating ? "Updating..." : "Update Status"}
              </Button>
            </div>
          </div>
          <p>
            <span className="font-semibold">Total:</span> $
            {order.totalAmount?.toFixed(2)}
          </p>
          <p>
            <span className="font-semibold">Created:</span>{" "}
            {new Date(order.createdAt).toLocaleString()}
          </p>
          <p>
            <span className="font-semibold">Updated:</span>{" "}
            {new Date(order.updatedAt).toLocaleString()}
          </p>
        </CardContent>
      </Card>

      {/* Shipping Address */}
      {order.shippingAddress && <Card>
        <CardContent className="p-4 space-y-1">
          <h2 className="font-semibold mb-2">Shipping Address</h2>
          <p>{order.shippingAddress.line1}</p>
          {order.shippingAddress.line2 && <p>{order.shippingAddress.line2}</p>}
          <p>
            {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
            {order.shippingAddress.postal}
          </p>
          <p>{order.shippingAddress.country}</p>
        </CardContent>
      </Card>}

      {/* Payment */}
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
              <ImageViewer src={`/api/images/${order.payment.proof.imageId}`} alt={order.payment.proof.filename}/>
            </div>
          )}
        </CardContent>
      </Card>

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
