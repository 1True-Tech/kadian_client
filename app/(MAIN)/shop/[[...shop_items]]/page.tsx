import { HasNoSlot } from "@/types";
import { ShopLayoutPropWithParams } from "./layout";

export default async function ShopPages({params}:HasNoSlot<ShopLayoutPropWithParams>) {
    const {shop_items} = await params
  return <div>{shop_items[0]}, {shop_items[1]}</div>;
}
