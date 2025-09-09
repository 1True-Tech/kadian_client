import { OrderStatus } from "@/types/order";

export const getStatusColor = (status: OrderStatus) => {
  switch (status) {
    case "completed":
      return "success";
    case "paid":
      return "success";
    case "shipped":
      return "warning";
    case "pending":
      return "default";
    case "cancelled":
      return "destructive";
    default:
      return "secondary";
  }
};