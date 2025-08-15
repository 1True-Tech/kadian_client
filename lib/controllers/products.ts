import {dummyProducts} from "@/assets/dummy-data/products"
import { ProductReady } from "@/types/product";
export function getProductBySlug(slug: string): ProductReady | null {
    const product = dummyProducts.find(p => p.slug===slug)
    console.log(slug,product)
  return product as ProductReady ;
}
