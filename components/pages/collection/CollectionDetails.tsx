"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Collection } from "@/types/shop";
import { CalendarIcon, ImageIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface CollectionDetailsProps {
  collection: Collection;
}

export default function CollectionDetails({ collection }: CollectionDetailsProps) {
  return (
    <section className="py-16">
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

        {/* Collection Image Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {collection.collection_images.map((image, index) => (
            <div key={index} className="relative h-96 rounded-lg overflow-hidden">
              {image.src ? (
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                />
              ) : (
                <span className="absolute inset-0 bg-muted flex items-center justify-center">
                  <ImageIcon className="h-16 w-16 text-muted-foreground/30" />
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Products in this collection */}
        <div className="space-y-12">
          <h2 className="text-3xl font-cinzel text-center mb-8">Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {collection.products.map((product) => (
              <Link href={`/product/${product.slug.current}`} key={product._id}>
                <Card className="card-premium overflow-hidden group cursor-pointer hover-lift">
                  <CardContent className="p-0 relative overflow-hidden">
                    <div className="relative h-96">
                      {product.image.src ? (
                        <Image
                          width={720}
                          height={480}
                          src={product.image.src}
                          alt={product.image.alt}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <span className="absolute inset-0 bg-muted flex items-center justify-center">
                          <ImageIcon className="h-16 w-16 text-muted-foreground/30" />
                        </span>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

                      <div className="absolute bottom-8 left-8 right-8 text-white">
                        <h3 className="text-2xl font-light mb-2">{product.name}</h3>
                        <Button variant="outline" className="btn-ghost-elegant bg-white/10 border-white/30 text-white hover:bg-white/20">
                          View Product
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
