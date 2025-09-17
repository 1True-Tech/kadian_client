import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

import { Category } from "@/types/shop";
import Link from "next/link";
import { ImageIcon } from "lucide-react";

const CategoryShowcase = ({ categories }: { categories: Category[] }) => {
  return (
    <section className="py-16">
      <div className="px-container">
        <div className="text-center mb-12 animate-fade-up">
          <h2 className="heading-section text-4xl font-cinzel mb-4 bg-clip-text bg-conic-30 bg-foreground via-accent via-50% from-foreground to-foreground text-transparent">
            Shop by Category
          </h2>
          <p className="text-elegant max-w-2xl mx-auto">
            Explore our thoughtfully designed collections, each crafted with
            attention to detail and quality.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {categories.map((category, index) => (
            <Link
              href={`/category/${category.slug.current}`}
              key={category._id}
            >
              <Card
                className="card-premium overflow-hidden group cursor-pointer hover-lift animate-fade-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <CardContent className="p-0 relative overflow-hidden">
                  <div className="relative h-96">
                    {category.category_images[0]?.src ? (
                      <Image
                        width={720}
                        height={480}
                        src={category.category_images[0]?.src}
                        alt={category.category_images[0]?.alt || category.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <span className="size-full transition-transform duration-500 group-hover:scale-105 bg-muted flex items-center justify-center">
                        <ImageIcon className="h-16 w-16 text-muted-foreground/30" />
                      </span>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

                    <div className="absolute bottom-8 left-8 right-8 text-white">
                      <h3 className="text-2xl font-light mb-2">
                        {category.name}
                      </h3>
                      <p className="text-white/90 mb-4">
                        {category.description}
                      </p>
                      <Button
                        variant="outline"
                        className="btn-ghost-elegant bg-white/10 border-white/30 text-white hover:bg-white/20"
                      >
                        Explore Category
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcase;
