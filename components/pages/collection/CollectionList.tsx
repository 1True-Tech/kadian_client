"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Collection } from "@/types/shop";
import { ImageIcon, SearchIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Input } from "@/components/ui/input";

interface CollectionListProps {
  initialCollections: Collection[];
}

export default function CollectionList({ initialCollections }: CollectionListProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCollections = initialCollections.filter(collection =>
    collection.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    collection.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="py-16">
      <div className="px-container">
        <div className="text-center mb-12 animate-fade-up">
          <h2 className="heading-section text-4xl font-cinzel mb-4">
            Our Collections
          </h2>
          <p className="text-elegant max-w-2xl mx-auto">
            Discover our latest collections, featuring timeless designs and contemporary styles.
          </p>
          <div className="max-w-md mx-auto mt-8">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="search"
                placeholder="Search collections..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCollections.map((collection) => (
            <Link href={`/collection/${collection.slug.current}`} key={collection._id}>
              <Card className="card-premium overflow-hidden group cursor-pointer hover-lift animate-fade-up">
                <CardContent className="p-0 relative overflow-hidden">
                  <div className="relative h-96">
                    {collection.collection_images[0]?.src ? (
                      <Image
                        width={720}
                        height={480}
                        src={collection.collection_images[0].src}
                        alt={collection.collection_images[0].alt}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <span className="absolute inset-0 bg-muted flex items-center justify-center">
                        <ImageIcon className="h-16 w-16 text-muted-foreground/30" />
                      </span>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

                    <div className="absolute bottom-8 left-8 right-8 text-white">
                      <h3 className="text-2xl font-light mb-2">{collection.title}</h3>
                      <p className="text-white/90 mb-4">{collection.description}</p>
                      <Button variant="outline" className="btn-ghost-elegant bg-white/10 border-white/30 text-white hover:bg-white/20">
                        View Collection
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
}
