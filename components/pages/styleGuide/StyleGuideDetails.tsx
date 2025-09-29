"use client";

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
    <section className="py-16">
      <div className="px-container">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-up">
          <div className="text-sm font-medium text-muted-foreground mb-2">
            {styleGuide.category}
          </div>
          <h1 className="heading-section text-4xl font-cinzel mb-4">
            {styleGuide.title}
          </h1>
          {styleGuide.introduction && (
            <div className="prose prose-elegant max-w-2xl mx-auto">
              <PortableText value={styleGuide.introduction} />
            </div>
          )}
        </div>

        {/* Style Guide Content */}
        <div className="space-y-16">
          {styleGuide.sections.map((section, index) => (
            <div key={index} className="space-y-8">
              <h2 className="text-2xl font-light">{section.title}</h2>

              {/* Section Content */}
              <div className="prose prose-elegant max-w-none">
                {section.content}
              </div>

              {/* Image Gallery */}
              {section.styleImages && section.styleImages.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {section.styleImages.map((image, imageIndex) => (
                    <Card key={imageIndex} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="relative aspect-[3/4]">
                          {image.src ? (
                            <Image
                              src={image.src}
                              alt={image.alt}
                              fill
                              className="object-cover"
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
          ))}
        </div>
      </div>
    </section>
  );
}
