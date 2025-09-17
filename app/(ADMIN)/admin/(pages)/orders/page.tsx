"use client"
import { useQuery } from "@/lib/server/client-hook";
import { DataTable } from "../components/data-table";
import { columns } from "../components/orders-columns";


export default function OrdersPage() {
  // Fetch orders data
  const {data, run, status} = useQuery("getAllOrders")

  if(status === "idle"){
    run()
  }
  if (!data?.success || !data.orders) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8">Orders Management</h1>
        <p className="text-red-500">Failed to load orders data.</p>
      </div>
    );
  }

  if(!data.orders) return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Orders Management</h1>
      <p className="text-red-500">No orders found.</p>
    </div>
  )

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Orders Management</h1>
      <div className="rounded-md border">
        <DataTable columns={columns} data={data.orders} />
      </div>
    </div>
  );
}
