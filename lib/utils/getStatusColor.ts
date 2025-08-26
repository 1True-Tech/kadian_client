export const getStatusColor = (status: string) => {
  switch (status) {
    case "delivered":
      return "success";
    case "shipped":
      return "default";
    case "processing":
      return "warning";
    case "pending":
      return "secondary";
    case "cancelled":
      return "destructive";
    default:
      return "secondary";
  }
};