"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Lookbook } from "@/types/guides";
import { ImageIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface LookbookListProps {
  initialLookbooks: Lookbook[];
}

export default function LookbookList({ initialLookbooks }: LookbookListProps) {
  // Group lookbooks by year
  const lookbooksByYear = initialLookbooks.reduce(
    (acc, lookbook) => {
      const year = lookbook.season.year;
      if (!acc[year]) acc[year] = [];
      acc[year].push(lookbook);
      return acc;
    },
    {} as Record<number, Lookbook[]>
  );

  const years = Object.keys(lookbooksByYear).sort((a, b) => Number(b) - Number(a));

  return (
    <section className="py-16 bg-background">
      <div className="px-container">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-up">
          <h1 className="heading-section text-5xl font-cinzel mb-4 text-primary">
            Lookbook
          </h1>
          <p className="text-elegant max-w-2xl mx-auto text-lg">
            Explore our seasonal collections. Discover curated looks, outfit inspiration, and shop the styles you love.
          </p>
        </div>

        {/* Tabs by year */}
        <Tabs defaultValue={years[0]} className="w-full">
          <TabsList className="w-full flex flex-wrap justify-center gap-2 mb-8">
            {years.map((year) => (
              <TabsTrigger
                key={year}
                value={year}
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-6 py-2 rounded-full font-semibold text-lg transition-colors duration-300"
              >
                {year}
              </TabsTrigger>
            ))}
          </TabsList>

          {years.map((year) => (
            <TabsContent key={year} value={year}>
              {/* Masonry Layout */}
              <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                {lookbooksByYear[Number(year)].map((lookbook, index) => (
                  <Link key={lookbook._id} href={`/lookbook/${lookbook.slug.current}`}>
                    <Card className={`overflow-hidden group cursor-pointer break-inside mb-6 rounded-xl border border-accent/20 shadow-lg hover:scale-105 hover:-translate-y-1 transition-transform duration-500`}>
                      <CardContent className="p-0 relative">
                        {lookbook.looks[0]?.image ? (
                          <div className={`relative aspect-[2/3] md:aspect-[3/4]`}>
                            <Image
                              src={lookbook.looks[0].image.src}
                              alt={lookbook.looks[0].image.alt}
                              fill
                              loading="lazy"
                              className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
                          </div>
                        ) : (
                          <div className="aspect-[2/3] bg-muted flex items-center justify-center">
                            <ImageIcon className="h-16 w-16 text-muted-foreground/30" />
                          </div>
                        )}
                        <div className="absolute bottom-6 left-6 right-6 text-white">
                          <div className="text-sm font-medium mb-1">
                            {lookbook.season.name} {lookbook.season.year}
                          </div>
                          <h2 className="text-xl font-light">{lookbook.title}</h2>
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
