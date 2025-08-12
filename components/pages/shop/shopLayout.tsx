"use client";
import { processShopCategory } from "@/lib/controllers/processShop/processShopCategory";
import { useShopParams } from "@/lib/hooks/nav/shopParams";
import { HasSlot } from "@/types";
import { ShopCategoryReady } from "@/types/shop";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ShopLayout({ children }: HasSlot) {
  const { category, collection } = useShopParams();
  const [shopCategory, setShopCategory] = useState<ShopCategoryReady>();
  useEffect(() => {
    async function loadShop(){
        const data = await processShopCategory(category||"")
        setShopCategory(data)
    }
    loadShop()
  }, [category,collection])
  
  return (
    <main className="w-full px-container">
      <section className="w-full rounded-xl border min-h-[40vh]">
        {
            shopCategory&&<Image src={shopCategory.category_images[0].src} alt={shopCategory.category_images[0].alt} width={1024} height={1880} className="size-full object-center object-cover"/>
        }
      </section>
      {children}
    </main>
  );
}
