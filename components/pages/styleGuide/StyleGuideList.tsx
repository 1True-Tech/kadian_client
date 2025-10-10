"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { StyleGuide } from "@/types/guides";
import { ImageIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface StyleGuideListProps {
  initialGuides: StyleGuide[];
}

const categoryLabels: Record<string, string> = {
  bodyType: "Body Type Guide",
  occasion: "Occasion Styling",
  colors: "Color Combinations",
  essentials: "Wardrobe Essentials",
  trends: "Seasonal Trends",
  mixMatch: "Mix and Match",
};

export default function StyleGuideList({ initialGuides }: StyleGuideListProps) {
  // Group guides by category
  const guidesByCategory = initialGuides.reduce(
    (acc, guide) => {
      if (!acc[guide.category]) {
        acc[guide.category] = [];
      }
      acc[guide.category].push(guide);
      return acc;
    },
    {} as Record<string, StyleGuide[]>
  );

  const categories = Object.keys(guidesByCategory);

  return (
    <section className="py-16 bg-background">
      <div className="px-container">
        <div className="text-center mb-12 animate-fade-up">
          <h1 className="heading-section text-5xl font-cinzel mb-4 text-primary">
            Style Guide
          </h1>
          <p className="text-elegant max-w-2xl mx-auto text-lg">
            Expert fashion advice and styling tips for every occasion and body
            type. Browse curated guides, discover new trends, and elevate your
            wardrobe.
          </p>
        </div>

        <Tabs defaultValue={categories[0]} className="w-full">
          <TabsList className="w-full flex flex-wrap justify-center gap-2 h-auto bg-transparent mb-8">
            {categories.map((category) => (
              <TabsTrigger
                key={category}
                value={category}
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-6 py-2 rounded-full font-semibold text-lg"
              >
                {categoryLabels[category]}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category} value={category}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {guidesByCategory[category].map((guide) => (
                  <Link
                    key={guide._id}
                    href={`/style-guide/${guide.slug.current}`}
                  >
                    <Card className="card-premium overflow-hidden group cursor-pointer hover-lift border border-accent/40 shadow-md">
                      <CardContent className="p-0 relative">
                        {guide.sections[0]?.styleImages?.[0] ? (
                          <div className="relative aspect-[3/2]">
                            <Image
                              src={guide.sections[0].styleImages[0].src}
                              alt={guide.sections[0].styleImages[0].alt}
                              loading="lazy"
                              fill
                              className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                          </div>
                        ) : (
                          <div className="aspect-[3/2] bg-muted flex items-center justify-center">
                            <ImageIcon className="h-16 w-16 text-muted-foreground/30" />
                          </div>
                        )}
                        <div className="absolute bottom-6 left-6 right-6 text-white">
                          <div className="text-sm font-medium mb-2">
                            {categoryLabels[category]}
                          </div>
                          <h2 className="text-xl font-light">{guide.title}</h2>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
