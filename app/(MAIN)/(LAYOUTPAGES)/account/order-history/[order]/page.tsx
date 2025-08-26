import OrderDetail from "@/components/pages/account/OrderDetail";
import { ParamsProps } from "@/types/structures";
import { notFound } from "next/navigation";

export default async function Page({ params }: ParamsProps<{ order: string }>) {
  const { order } = await params;
    if(!order) return notFound();
  return <OrderDetail id={order}/>;
}
