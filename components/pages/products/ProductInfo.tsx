import ProductVariantSelector from './ProductVariantSelector';
import ProductActions from './ProductActions';
import { ProductReady } from '@/types/product';

export default function ProductInfo({ product }: { product: ProductReady }) {
  const baseVariant = product.variants.find((v) => v.isBase) || product.variants[0];

  return (
    <div className="space-y-4 relative isolate">
      <h1 className="text-3xl font-bold">{product.name}</h1>
      <p className="text-muted-foreground">{product.description}</p>
      <p className="text-xl font-semibold text-accent">${baseVariant.price}</p>

      <div>
        <p className="text-sm text-gray-500">Brand: {product.brand.name}</p>
        <p className="text-sm text-gray-500">SKU: {baseVariant.sku}</p>
      </div>

      <ProductVariantSelector variants={product.variants} />
      <ProductActions variant={baseVariant} />
    </div>
  );
}
