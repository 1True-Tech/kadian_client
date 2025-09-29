"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import type { StyleGuide } from "@/types/guides";
import { ImageIcon } from "lucide-react";
import { PortableText } from "next-sanity";
import Image from "next/image";

interface StyleGuideDetailsProps {
  styleGuide: StyleGuide;
}

export default function StyleGuideDetails({
  styleGuide,
}: StyleGuideDetailsProps) {
  return (
    <section className="py-16 bg-background">
      <div className="px-container">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-up">
          <div className="text-sm font-medium text-muted-foreground mb-2 tracking-wide uppercase">
            {styleGuide.category}
          </div>
          <h1 className="heading-section text-5xl font-cinzel mb-4 text-primary">
            {styleGuide.title}
          </h1>
          {styleGuide.introduction && (
            <div className="prose prose-elegant max-w-2xl mx-auto text-lg">
              <PortableText value={styleGuide.introduction} />
            </div>
          )}
        </div>

        {/* Style Guide Content */}
        <div className="space-y-20">
          {styleGuide.sections.map((section, index) => (
            <React.Fragment key={index}>
              <div className="space-y-8">
                <h2 className="text-2xl font-semibold text-primary mb-2">{section.title}</h2>

                {/* Section Content */}
                <div className="prose prose-elegant max-w-none text-lg">
                  {section.content}
                </div>

                {/* Image Gallery */}
                {section.styleImages && section.styleImages.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                    {section.styleImages.map((image, imageIndex) => (
                      <Card key={imageIndex} className="overflow-hidden border border-accent/40 shadow-sm">
                        <CardContent className="p-0">
                          <div className="relative aspect-[3/4]">
                            {image.src ? (
                              <Image
                                src={image.src}
                                alt={image.alt}
                                fill
                                className="object-cover transition-transform duration-700 hover:scale-105"
                              />
                            ) : (
                              <div className="absolute inset-0 bg-muted flex items-center justify-center">
                                <ImageIcon className="h-16 w-16 text-muted-foreground/30" />
                              </div>
                            )}
                          </div>
                          {image.caption && (
                            <div className="p-4">
                              <p className="text-sm text-muted-foreground">
                                {image.caption}
                              </p>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
              {index < styleGuide.sections.length - 1 && (
                <div className="my-12 border-t border-dashed border-accent/30" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
