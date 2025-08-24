import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingBag } from "lucide-react";
import Image from "next/image";

const FeaturedProducts = () => {
  const products = [
    {
      id: 1,
      name: "Elegant Midi Dress",
      price: "$89.99",
      originalPrice: "$129.99",
      image: "/images/content/image (3).jpg",
      category: "Women",
      isNew: true,
      isSale: true,
    },
    {
      id: 2,
      name: "Casual Summer Top",
      price: "$45.99",
      image: "/images/content/image (7).jpg",
      category: "Women",
      isNew: false,
      isSale: false,
    },
    {
      id: 3,
      name: "Kids Playful Outfit",
      price: "$35.99",
      image: "/images/content/image (9).jpg",
      category: "Children",
      isNew: true,
      isSale: false,
    },
    {
      id: 4,
      name: "Classic Blouse",
      price: "$65.99",
      originalPrice: "$85.99",
      image: "/images/content/image (1).jpg",
      category: "Women",
      isNew: false,
      isSale: true,
    },
  ];

  return (
    <section className="py-16 bg-secondary/30">
      <div className=" px-container">
        <div className="text-center mb-12 animate-fade-up">
          <h2 className="heading-section  text-4xl font-cinzel mb-4 bg-clip-text bg-conic-30 via-accent via-50% from-foreground to-foreground text-transparent">Featured Collection</h2>
          <p className="text-elegant max-w-2xl mx-auto">
            Discover our carefully curated selection of premium pieces designed for the modern lifestyle.
          </p>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,_minmax(10rem,1fr))] md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
          {products.map((product, index) => (
            <Card key={product.id} className="card-product overflow-hidden group animate-fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <Image
                    width={720}
                    height={480}
                    src={product.image}
                    alt={product.name}
                    className="w-full h-45 sm:h-65 md:h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {product.isNew && (
                      <Badge className="bg-rose-gold text-rose-gold-foreground">New</Badge>
                    )}
                    {product.isSale && (
                      <Badge variant="destructive">Sale</Badge>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button size="icon" variant="secondary" className="h-8 w-8">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="secondary" className="h-8 w-8">
                      <ShoppingBag className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Quick Add to Cart */}
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button className="w-full btn-rose">
                      Quick Add
                    </Button>
                  </div>
                </div>

                <div className="p-4">
                  <p className="text-sm text-muted-foreground mb-1">{product.category}</p>
                  <h3 className="font-medium mb-2">{product.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-rose-gold">{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        {product.originalPrice}
                      </span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button className="btn-hero">
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;