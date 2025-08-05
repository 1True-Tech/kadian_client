import { Button } from "@/components/ui/button";
import { ProductListing } from "@/types/product";

interface ProductCardProps {
  product: ProductListing;
}

export default function ProductCard({ product }: ProductCardProps) {
  // const handleAdd = () => {
  //   console.log("Add to cart:", product._id);
  // };

  const isInCart = false; // Replace with real cart logic

  return (
    <div className="w-full flex flex-col gap-2 product-card">
      <div className="w-full aspect-square min-h-52 overflow-hidden relative group isolate bg-secondary flex items-center justify-center rounded-md">
        {product.mainImage?.url ? (
          <img
            src={product.mainImage.url}
            alt={product.mainImage.alt}
            className="size-full z-0 object-cover object-center transition duration-300 group-hover:brightness-50"
          />
        ) : (
          <i className="pi pi-image text-5xl z-0 text-accent"></i>
        )}
      </div>

      <ul className="w-full flex flex-col gap-1">
        <li>
          <a href={`/shop/${product.slug}`} className="hover:text-primary hover:underline hover:underline-offset-2 transition duration-300 line-clamp-1">
            {product.name}
          </a>
        </li>
        <li className="text-muted-foreground text-sm">{product.brandName}</li>
        <li className="text-base font-semibold">
          {product.currency === "USD" ? "$" : "₦"} {product.price}
        </li>
      </ul>
      {
        isInCart ? (
          <div className="hover-bottom-action shadow-md absolute left-1/2 -translate-x-1/2 flex items-center gap-1 min-[498px]:gap-3 justify-center text-light transition duration-300 delay-[250ms] -bottom-[100%]">
            <button className="bg-danger flex items-center justify-center py-1 min-[498px]:py-2 px-2 min-[498px]:px-4">
              <i className="pi pi-trash text-base min-[498px]:text-lg"></i>
            </button>
            <div className="bg-primary flex items-center gap-1 min-[498px]:gap-3">
              <button className="flex items-center justify-center py-1 min-[498px]:py-2 px-2 min-[498px]:px-4">
                <i className="pi pi-minus text-base min-[498px]:text-lg"></i>
              </button>
              <span>2</span>
              <button className="flex items-center justify-center py-1 min-[498px]:py-2 px-2 min-[498px]:px-4">
                <i className="pi pi-plus text-base min-[498px]:text-lg"></i>
              </button>
            </div>
          </div>
        ):<div className="w-full">
          <Button className="!w-full !bg-accent">Add to cart</Button>
        </div>
      }
    </div>
  );
}
