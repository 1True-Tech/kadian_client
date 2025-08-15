// app/(shop)/product/[product]/page.tsx
import { notFound } from 'next/navigation';
import { ParamsProps } from '@/types';
import { getProductBySlug } from '@/lib/controllers/products';
import ProductDetails from '@/components/pages/products/ProductDetails';

export default async function ProductPage({ params }: ParamsProps<{ product: string }>) {
  const {product} = await params
  const data = getProductBySlug(product);

  if (!data) return notFound();

  return <ProductDetails product={data} />;
}
