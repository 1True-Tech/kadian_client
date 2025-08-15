'use client';

import { ProductVariantReady } from "@/types/product";


export default function ProductVariantSelector({
  variants,
}: {
  variants: ProductVariantReady[];
}) {
  return (
    <div className="space-y-2">
      <div>
        <label className="font-medium">Size:</label>
        <div className="flex gap-2 mt-1">
          {variants.map((v) => (
            <button key={v.size} className="border px-3 py-1 rounded hover:bg-gray-100">
              {v.size}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="font-medium">Color:</label>
        <div className="flex gap-2 mt-1">
          {[...new Set(variants.map((v) => v.color))].map((color) => (
            <div key={color} className="w-6 h-6 rounded-full border bg-gray-400" title={color}></div>
          ))}
        </div>
      </div>
    </div>
  );
}
