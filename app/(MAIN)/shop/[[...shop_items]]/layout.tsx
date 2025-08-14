// import { processShopCategory } from "@/lib/controllers/processShop/processShopCategory";
import { HasSlot } from "@/types";


export interface ShopLayoutPropWithParams extends HasSlot {
  params: Promise<{ shop_items: [string, string] }>;
}
export default async function layout({
  children,
}: ShopLayoutPropWithParams) {

  


  return (children
  );
}
