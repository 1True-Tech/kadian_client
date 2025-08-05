import ProductCard from ".";
import ProductCardSkeleton from "./skeleton";

const mock = {
  _id: "123",
  name: "Silk Midi Dress",
  slug: "silk-midi-dress",
  mainImage: { url: "/images/sample.jpg", alt: "Silk Midi Dress" },
  brandName: "Avery & Co.",
  price: 12500,
  currency: "JAD",
  isInStock: true,
};

export default function ProductGridPreview({ loading = false }) {
  const items = loading ? Array(6).fill(null) : Array(6).fill(mock);

  return (
    <div className="px-container grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
      {items.map((item, idx) =>
        loading ? (
          <ProductCardSkeleton key={idx} />
        ) : (
          <ProductCard key={idx} product={item} />
        )
      )}
    </div>
  );
}
