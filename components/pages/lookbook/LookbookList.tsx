"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Lookbook } from "@/types/guides";
import Image from "next/image";
import Link from "next/link";

interface LookbookListProps {
  initialLookbooks: Lookbook[];
}

export default function LookbookList({ initialLookbooks }: LookbookListProps) {
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
    <section className="py-20 bg-background">
      <div className="px-container">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-widest text-accent mb-2">
            The Kadian Edit
          </p>
          <h1 className="text-5xl sm:text-6xl font-cinzel text-primary mb-4">
            Lookbook
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg font-light">
            Curated collections that define each season. Styled with precision and shot in cinematic detail.
          </p>
        </div>

        {/* Tabs by Year */}
        <Tabs defaultValue={years[0]} className="w-full">
          <TabsList className="flex flex-wrap justify-center gap-3 mb-12 h-fit">
            {years.map((year) => (
              <TabsTrigger
                key={year}
                value={year}
                className="px-5 py-2 rounded-full text-sm font-medium uppercase tracking-wide transition-colors border border-accent/20 hover:border-accent/50 data-[state=active]:bg-accent data-[state=active]:text-background"
              >
                {year}
              </TabsTrigger>
            ))}
          </TabsList>

          {years.map((year) => (
            <TabsContent key={year} value={year}>
              {/* Lookbook Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {lookbooksByYear[Number(year)].map((lookbook) => (
                  <Link
                    key={lookbook._id}
                    href={`/lookbook/${lookbook.slug.current}`}
                    className="group block"
                  >
                    <Card className="border-none shadow-none bg-transparent">
                      <CardContent className="p-0 relative overflow-hidden">
                        {lookbook.looks[0]?.image && (
                          <div className="relative aspect-[3/4] overflow-hidden">
                            <Image
                              src={lookbook.looks[0].image.src}
                              alt={lookbook.looks[0].image.alt}
                              fill
                              loading="lazy"
                              className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                          </div>
                        )}
                        <div className="absolute bottom-8 left-6 right-6 text-white">
                          <p className="text-xs uppercase tracking-widest opacity-80 mb-1">
                            {lookbook.season.name} {lookbook.season.year}
                          </p>
                          <h2 className="text-2xl font-light leading-tight">
                            {lookbook.title}
                          </h2>
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
