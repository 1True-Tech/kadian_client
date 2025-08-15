import ShopNav from "@/components/pages/shop/shopNav";
import processColors from "@/lib/controllers/processColors";
import { processShopListNavigations } from "@/lib/controllers/processShopListNavigations";
import { HasSlot } from "@/types";

export default async function layout({ children }: HasSlot) {
  const shopListData = await processShopListNavigations();
  const availableColors = await processColors();
  const shopNavOnly = shopListData.find((s) => s.label.includes("Shop"));
  return (
    <main className="w-full md:px-container flex flex-col md:flex-row gap-peers">
      <ShopNav availableColors={availableColors} shopNavOnly={shopNavOnly} />
      {children}
    </main>
  );
}
