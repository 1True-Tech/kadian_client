"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { SizeGuide } from "@/types/guides";
import { ImageIcon } from "lucide-react";
import { PortableText } from "next-sanity";
import Image from "next/image";
import { useState } from "react";

interface SizeGuideListProps {
  initialGuides: SizeGuide[];
}

export default function SizeGuideList({ initialGuides }: SizeGuideListProps) {
  const [unit, setUnit] = useState<"in" | "cm">("in");

  const convertUnit = (value: number) => (unit === "cm" ? (value * 2.54).toFixed(1) : value);

  return (
    <section className="py-16 bg-background">
      <div className="px-container">
        {/* Heading */}
        <div className="text-center mb-16 animate-fade-up">
          <h1 className="heading-section text-4xl sm:text-5xl font-cinzel mb-4">
            Size Guide
          </h1>
          <p className="text-elegant max-w-2xl mx-auto text-lg sm:text-xl">
            Find your perfect fit with our detailed size charts, model references, and measurement guides.
          </p>
          <div className="mt-4 flex justify-center gap-4">
            <button
              className={`px-4 py-1 rounded-md font-semibold ${
                unit === "in" ? "bg-accent text-background" : "bg-muted text-foreground"
              }`}
              onClick={() => setUnit("in")}
            >
              Inches
            </button>
            <button
              className={`px-4 py-1 rounded-md font-semibold ${
                unit === "cm" ? "bg-accent text-background" : "bg-muted text-foreground"
              }`}
              onClick={() => setUnit("cm")}
            >
              Centimeters
            </button>
          </div>
        </div>

        {/* Size Guides */}
        <div className="grid gap-16">
          {initialGuides.map((guide) => (
            <Card
              key={guide._id}
              className="overflow-hidden border border-muted hover:border-accent transition-colors shadow-lg hover:shadow-xl"
            >
              <CardContent className="p-6 flex flex-col md:flex-row gap-8">
                {/* Model Images */}
                <div className="md:w-1/3 grid grid-cols-2 gap-2">
                  {guide.images?.length ? (
                    guide.images.map((img, idx) => (
                      <div key={idx} className="relative aspect-[3/4] rounded-lg overflow-hidden">
                        <Image
                          src={img.src}
                          alt={img.alt}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ))
                  ) : (
                    <div className="aspect-[3/4] bg-muted rounded-lg flex items-center justify-center">
                      <ImageIcon className="h-16 w-16 text-muted-foreground/40" />
                    </div>
                  )}
                </div>

                {/* Size Table */}
                <div className="md:w-2/3 space-y-6">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-bold">{guide.title}</h2>
                      <p className="text-muted-foreground mt-1">{guide.category.name}</p>
                    </div>
                  </div>

                  {guide.measurementInstructions && (
                    <div className="prose prose-sm max-w-none text-muted-foreground">
                      <PortableText value={guide.measurementInstructions} />
                    </div>
                  )}

                  <div className="overflow-x-auto rounded-lg border border-muted">
                    <Table className="min-w-full">
                      <TableHeader>
                        <TableRow className="bg-muted/10">
                          <TableHead className="text-left">Size</TableHead>
                          <TableHead>Chest ({unit})</TableHead>
                          <TableHead>Waist ({unit})</TableHead>
                          <TableHead>Hips ({unit})</TableHead>
                          <TableHead>Inseam ({unit})</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {guide.sizeChart.measurements.map((m, idx) => (
                          <TableRow
                            key={idx}
                            className={`hover:bg-accent/10 transition-colors ${
                              m.sizeName.toLowerCase() === "m" ? "bg-accent/5 font-semibold" : ""
                            }`}
                          >
                            <TableCell className="font-medium">{m.sizeName}</TableCell>
                            <TableCell>{convertUnit(m.chest)}</TableCell>
                            <TableCell>{convertUnit(m.waist)}</TableCell>
                            <TableCell>{convertUnit(m.hips)}</TableCell>
                            <TableCell>{convertUnit(m.inseam)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
