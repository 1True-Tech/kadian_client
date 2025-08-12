import { processShopCategory } from "@/lib/controllers/processShop/processShopCategory";
import { HasSlot } from "@/types";
import Image from "next/image";
import Link from "next/link";

export interface ShopLayoutPropWithParams extends HasSlot {
  params: Promise<{ shop_items: [string, string] }>;
}
export default async function layout({
  children,
  params,
}: ShopLayoutPropWithParams) {
  const { shop_items } = await params;
  const shopCategory = await processShopCategory(shop_items[0]);
  const [category, collection] = shop_items
  return (
    <main className="w-full px-container">
      <section className="w-full isolate relative text-white rounded-xl border-2 border-accent overflow-hidden h-[40vh] flex items-center justify-center flex-col gap-5">
        {shopCategory && (
          <Image
            src={shopCategory.category_images[0].src}
            alt={shopCategory.category_images[0].alt}
            width={1024}
            height={1880}
            className="size-full brightness-50 absolute inset-0 -z-10 object-center object-cover"
          />
        )}
        <div className="w-full flex flex-col gap-2 items-center justify-center">
          <h2 className="font-cinzel text-4xl uppercase">{shopCategory.name}</h2>
        <em className="text-base not-italic text-white/70">
          <Link href={"/shop"} className="link text-white">shop</Link>
          {category&&collection? <Link href={`/shop/${category}`} className="link text-white">/{shop_items[0]}</Link>:`/${category}`}
          {collection&&`/${collection}`}
        </em>
        <p>{shopCategory.description}</p>
        </div>
      </section>
      {children}
    </main>
  );
}
