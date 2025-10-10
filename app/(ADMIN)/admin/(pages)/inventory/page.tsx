import Inventory from "@/components/pages/inventory/inventory";
import { Loader } from "@/components/ui/loaders";
import baseUrl from "@/lib/utils/baseurl";
import { InventoryItemsResponse } from "@/types/inventory";

export default async function InventoryPage() {
  const res = await fetch(`${baseUrl}/api/inventory`, {
    cache: "no-store",
  });
  const inventoryData: InventoryItemsResponse = await res.json();

  if (!inventoryData.data)
    return (
      <div className="w-full h-20">
        <Loader
          loader="hr-line-loader"
          loaderSize="parent"
          type="content-loader"
          unLoad={false}
        />
      </div>
    );

  return <Inventory items={inventoryData.data} />;
}
