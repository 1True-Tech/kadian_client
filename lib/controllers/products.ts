import {dummyProducts} from "@/assets/dummy-data/products"
import { ProductReady } from "@/types/product";
export function getProductBySlug(slug: string): ProductReady | null {
    const product = dummyProducts.find(p => p.slug===slug)
    if (product) {
        return product as unknown as ProductReady;
    }
    return null;
}
