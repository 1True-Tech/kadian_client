'use client';

import { ProductVariantReady } from '@/types/product';
import { useState } from 'react';

export default function ProductActions({ variant }: { variant: ProductVariantReady }) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="space-y-2 mt-4">
      <div className="flex items-center gap-2">
        <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
        <span>{quantity}</span>
        <button onClick={() => setQuantity(quantity + 1)}>+</button>
      </div>
      <div className="flex gap-2">
        <button className="btn btn-primary w-full">Add to Cart</button>
        <button className="btn w-full">Buy Now</button>
      </div>
    </div>
  );
}
