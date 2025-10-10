"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Lookbook } from "@/types/guides";
import { ImageIcon } from "lucide-react";
import { PortableText } from "next-sanity";
import Image from "next/image";
import Link from "next/link";

interface LookbookDetailsProps {
  lookbook: Lookbook;
}

export default function LookbookDetails({ lookbook }: LookbookDetailsProps) {
  return (
    <section className="py-20 bg-background">
      <div className="px-container">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="text-sm font-medium text-accent mb-2 tracking-wide uppercase">
            {lookbook.season.name} {lookbook.season.year}
          </div>
          <h1 className="text-5xl font-cinzel mb-4 text-primary">{lookbook.title}</h1>
          {lookbook.introduction && (
            <div className="prose prose-elegant max-w-2xl mx-auto text-lg text-muted-foreground">
              <PortableText value={lookbook.introduction} />
            </div>
          )}
        </div>

        {/* Looks */}
        <div className="space-y-32">
          {lookbook.looks.map((look, index) => (
            <div key={index} className="space-y-12">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* Look Image */}
                <div className="relative w-full rounded-xl overflow-hidden shadow-xl border border-accent/30 group">
                  {look.image.src ? (
                    <Image
                      src={look.image.src}
                      alt={look.image.alt}
                      width={400}
                      height={400}
                      loading="lazy"
                      className="object-cover size-full max-h-[50vh] transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-96 bg-muted flex items-center justify-center">
                      <ImageIcon className="h-16 w-16 text-muted-foreground/30" />
                    </div>
                  )}
                  {look.image.caption && (
                    <div className="absolute bottom-0 left-0 right-0 bg-black/40 backdrop-blur-sm text-white p-3 text-sm">
                      {look.image.caption}
                    </div>
                  )}
                </div>

                {/* Products */}
                <div className="space-y-6">
                  {look.products?.map((tagged, idx) => (
                    <Card
                      key={idx}
                      className="border border-accent/30 shadow-sm hover:shadow-md transition-shadow duration-300"
                    >
                      <CardContent className="p-4 flex gap-4 items-center">
                        {/* Product Image */}
                        <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-muted">
                          {tagged.product.image.src ? (
                            <Image
                              src={tagged.product.image.src}
                              alt={tagged.product.image.alt}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-muted flex items-center justify-center">
                              <ImageIcon className="h-8 w-8 text-muted-foreground/30" />
                            </div>
                          )}
                        </div>

                        {/* Product Info */}
                        <div className="flex-1">
                          <h3 className="font-medium mb-1 text-lg text-primary">
                            {tagged.product.name}
                          </h3>
                          {tagged.product.price && (
                            <p className="text-sm text-muted-foreground mb-1">
                              ${tagged.product.price}
                            </p>
                          )}
                          <Link href={`/product/${tagged.product.slug.current}`}>
                            <Button
                              variant="outline"
                              size="sm"
                              className="mt-2 transition-colors duration-300 hover:bg-primary hover:text-primary-foreground"
                            >
                              View Product
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Optional Styling Notes */}
              {look.styleNotes && (
                <div className="max-w-2xl mx-auto prose prose-elegant text-muted-foreground">
                  <h3 className="text-lg font-medium text-primary mb-2">Styling Notes</h3>
                  <p>{look.styleNotes}</p>
                </div>
              )}

              {index < lookbook.looks.length - 1 && (
                <div className="my-16 border-t border-dashed border-accent/30" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
