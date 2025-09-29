"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
    <section className="py-16 bg-background">
      <div className="px-container">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-up">
          <div className="text-sm font-medium text-muted-foreground mb-2 tracking-wide uppercase">
            {lookbook.season.name} {lookbook.season.year}
          </div>
          <h1 className="heading-section text-5xl font-cinzel mb-4 text-primary">
            {lookbook.title}
          </h1>
          {lookbook.introduction && (
            <div className="prose prose-elegant max-w-2xl mx-auto text-lg">
              <PortableText value={lookbook.introduction} />
            </div>
          )}
        </div>

        {/* Lookbook Content */}
        <div className="space-y-24">
          {lookbook.looks.map((look, index) => (
            <React.Fragment key={index}>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* Look Image */}
                <div className="relative aspect-[2/3] rounded-xl overflow-hidden shadow-lg border border-accent">
                  {look.image.src ? (
                    <Image
                      src={look.image.src}
                      alt={look.image.alt}
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-muted flex items-center justify-center">
                      <ImageIcon className="h-16 w-16 text-muted-foreground/30" />
                    </div>
                  )}
                  {look.image.caption && (
                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-2 text-sm">
                      {look.image.caption}
                    </div>
                  )}
                </div>

                {/* Look Details */}
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold text-primary mb-2">Outfit Details</h2>
                  <div className="space-y-4">
                    {look.outfitDetails.map((detail, detailIndex) => (
                      <Card key={detailIndex} className="border border-accent/40 shadow-sm">
                        <CardContent className="p-4 flex gap-4 items-center">
                          {/* Product Image */}
                          <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-muted">
                            {detail.productLink.image.src ? (
                              <Image
                                src={detail.productLink.image.src}
                                alt={detail.productLink.image.alt}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <div className="w-full h-full bg-muted flex items-center justify-center">
                                <ImageIcon className="h-8 w-8 text-muted-foreground/30" />
                              </div>
                            )}
                          </div>
                          {/* Product Details */}
                          <div className="flex-1">
                            <h3 className="font-medium mb-1 text-lg text-primary">
                              {detail.name}
                            </h3>
                            {detail.description && (
                              <p className="text-sm text-muted-foreground mb-2">
                                {detail.description}
                              </p>
                            )}
                            <Link href={`/product/${detail.productLink.slug.current}`}>
                              <Button variant="outline" size="sm" className="mt-2">
                                View Product
                              </Button>
                            </Link>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
              {index < lookbook.looks.length - 1 && (
                <div className="my-12 border-t border-dashed border-accent/30" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
