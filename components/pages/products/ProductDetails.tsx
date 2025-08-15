import { ProductReady } from '@/types/product';
import ProductGallery from './ProductGallery';
import ProductInfo from './ProductInfo';
// import ProductTabs from './ProductTabs';

export default function ProductDetails({ product }: { product: ProductReady }) {
  return (
    <div className="container mx-auto px-4 py-10 grid md:grid-cols-2 gap-12">
      <ProductGallery images={product.gallery} />
      <ProductInfo product={product} />
      <div className="lg:col-span-2">
        {/* <ProductTabs product={product} /> */}
      </div>
    </div>
  );
}
