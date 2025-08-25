import { imageAssetWithAlt } from "./structures";
import { ReadyImage } from "./home";
import { ProductCardDataRaw, ProductCardDataReady } from "./product";

interface ShopCategoryBase {
  description: string;
  name: string;
  slug: string;
}
interface ShopCategoryRaw extends ShopCategoryBase {
  category_images: imageAssetWithAlt[];
  collections: ShopCollectionRaw[]
}
interface ShopCategoryReady extends ShopCategoryBase{
  category_images: ReadyImage[];
  collections: ShopCollectionReady[]
}


interface ShopCollectionBase {
  title: string;
  slug: string;
  description: string;
}
interface ShopCollectionRaw extends ShopCollectionBase {
  collection_images: imageAssetWithAlt[];
  products: ProductCardDataRaw[];
}
interface ShopCollectionReady extends ShopCollectionBase {
  collection_images: ReadyImage[];
  products: ProductCardDataReady[];
}
