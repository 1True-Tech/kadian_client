"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Collection } from "@/types/shop";
import { CalendarIcon, ImageIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface CollectionProductsProps {
  collection: Collection;
}

export default function CollectionProducts({ collection }: CollectionProductsProps) {
  return (
    <div className="py-16">
      <div className="px-container">
        {/* Collection Header */}
        <div className="text-center mb-12 animate-fade-up">
          <h1 className="heading-section text-4xl font-cinzel mb-4">{collection.title}</h1>
          <p className="text-elegant max-w-2xl mx-auto">{collection.description}</p>
          {collection.dateRange && (
            <div className="flex items-center justify-center gap-2 mt-4 text-muted-foreground">
              <CalendarIcon className="h-4 w-4" />
              <span>
                {new Date(collection.dateRange.startDate).toLocaleDateString()} - 
                {new Date(collection.dateRange.endDate).toLocaleDateString()}
              </span>
            </div>
          )}
        </div>

        {/* Collection Banner */}
        {collection.collection_images.length > 0 ? (
          <div className="w-full h-[40vh] mb-16 relative rounded-lg overflow-hidden">
            <Image
              src={collection.collection_images[0].src}
              alt={collection.collection_images[0].alt}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/80"></div>
          </div>
        ) : (
          <div className="w-full h-[40vh] mb-16 relative rounded-lg overflow-hidden bg-muted flex items-center justify-center">
            <ImageIcon className="h-20 w-20 text-muted-foreground/30" />
          </div>
        )}

        {/* Products Grid */}
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-light">Products in Collection</h2>
            <p className="text-muted-foreground">{collection.products.length} items</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {collection.products.map((product) => (
              <Link href={`/product/${product.slug.current}`} key={product._id}>
                <Card className="group hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-0">
                    <div className="aspect-square relative">
                      {product.image.src ? (
                        <Image
                          src={product.image.src}
                          alt={product.image.alt}
                          fill
                          className="object-cover rounded-t-lg transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <span className="absolute inset-0 bg-muted flex items-center justify-center rounded-t-lg">
                          <ImageIcon className="h-10 w-10 text-muted-foreground/30" />
                        </span>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-lg mb-2 group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                      <Button variant="outline" size="sm" className="w-full">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
