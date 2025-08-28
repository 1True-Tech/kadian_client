"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Lookbook } from "@/types/guides";
import { ImageIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface LookbookDetailsProps {
  lookbook: Lookbook;
}

export default function LookbookDetails({ lookbook }: LookbookDetailsProps) {
  return (
    <section className="py-16">
      <div className="px-container">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-up">
          <div className="text-sm font-medium text-muted-foreground mb-2">
            {lookbook.season.name} {lookbook.season.year}
          </div>
          <h1 className="heading-section text-4xl font-cinzel mb-4">
            {lookbook.title}
          </h1>
          {lookbook.introduction && (
            <div className="prose prose-elegant max-w-2xl mx-auto">
              {lookbook.introduction}
            </div>
          )}
        </div>

        {/* Lookbook Content */}
        <div className="space-y-24">
          {lookbook.looks.map((look, index) => (
            <div key={index} className="grid md:grid-cols-2 gap-8">
              {/* Look Image */}
              <div className="relative aspect-[2/3] rounded-lg overflow-hidden">
                {look.image.src ? (
                  <Image
                    src={look.image.src}
                    alt={look.image.alt}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 bg-muted flex items-center justify-center">
                    <ImageIcon className="h-16 w-16 text-muted-foreground/30" />
                  </div>
                )}
              </div>

              {/* Look Details */}
              <div className="space-y-6">
                {look.image.caption && (
                  <p className="text-lg font-light">{look.image.caption}</p>
                )}

                {/* Outfit Details */}
                <div className="space-y-4">
                  {look.outfitDetails.map((detail, detailIndex) => (
                    <Card key={detailIndex}>
                      <CardContent className="p-4">
                        <div className="flex gap-4">
                          {/* Product Image */}
                          <div className="relative w-24 h-24">
                            {detail.productLink.image.src ? (
                              <Image
                                src={detail.productLink.image.src}
                                alt={detail.productLink.image.alt}
                                fill
                                className="object-cover rounded"
                              />
                            ) : (
                              <div className="w-full h-full bg-muted rounded flex items-center justify-center">
                                <ImageIcon className="h-8 w-8 text-muted-foreground/30" />
                              </div>
                            )}
                          </div>

                          {/* Product Details */}
                          <div className="flex-1">
                            <h3 className="font-medium mb-1">
                              {detail.name}
                            </h3>
                            {detail.description && (
                              <p className="text-sm text-muted-foreground mb-2">
                                {detail.description}
                              </p>
                            )}
                            <Link href={`/product/${detail.productLink.slug.current}`}>
                              <Button variant="outline" size="sm">
                                View Product
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
