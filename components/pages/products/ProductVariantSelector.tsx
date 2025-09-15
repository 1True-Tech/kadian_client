'use client';

import { ProductVariant } from "@/types/product";


export default function ProductVariantSelector({
  variants,
}: {
  variants: ProductVariant[];
}) {
  return (
    <div className="space-y-2">
      <div>
        <label className="font-medium">Size:</label>
        <div className="flex gap-2 mt-1">
          {variants.map((v) => (
            <button key={v.size.label} className="border px-3 py-1 rounded hover:bg-gray-100">
              {v.size.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="font-medium">Color:</label>
        <div className="flex gap-2 mt-1">
          {[...new Set(variants.map((v) => v.color))].map((color, idx) => (
            <div key={idx} className="w-6 h-6 rounded-full border bg-gray-400" title={color?.name}></div>
          ))}
        </div>
      </div>
    </div>
  );
}
