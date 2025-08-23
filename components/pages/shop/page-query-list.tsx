"use client";

import useShopFiltersStore from "@/store/shopFilters";

export default function PageQueryList() {
  const { filters, clearFilters, updateFilter } = useShopFiltersStore();

  const handleRemovePrice = () => {
    updateFilter({ price: { from: 0, to: 0 } });
  };

  return (
    <div className="w-full flex items-center flex-wrap gap-2 overflow-x-auto py-4">
      <span className="font-medium text-gray-700">Active Filter</span>

      {filters.collections?.map((name) => (
        <Tag
          key={`col-${name}`}
          label={name}
          onRemove={() => updateFilter({ collections: [] })}
        />
      ))}

      {filters.categories?.map((name) => (
        <Tag
          key={`cat-${name}`}
          label={name}
          onRemove={() => updateFilter({ categories: [] })}
        />
      ))}

      {filters.colors?.map((name) => (
        <Tag
          key={`colr-${name}`}
          label={name}
          onRemove={() => updateFilter({ colors: [] })}
        />
      ))}

      {(filters.price?.from || filters.price?.to) && (
        <Tag
          label={`Price: $${filters.price?.from} - $${filters.price?.to}`}
          onRemove={handleRemovePrice}
        />
      )}

      {filters.search && (
        <Tag
          label={`Search: ${filters.search}`}
          onRemove={() => updateFilter({ search: "" })}
        />
      )}

      <button
        onClick={clearFilters}
        className="ml-auto text-sm text-gray-600 underline whitespace-nowrap"
      >
        Clear All
      </button>
    </div>
  );
}

function Tag({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center bg-[#FF9900] text-white text-sm rounded-full px-3 py-1">
      {label}
      <button
        onClick={onRemove}
        className="ml-2 font-bold leading-none hover:opacity-70"
        aria-label={`Remove ${label}`}
      >
        ×
      </button>
    </span>
  );
}
