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
import Image from "next/image";

interface SizeGuideListProps {
  initialGuides: SizeGuide[];
}

export default function SizeGuideList({ initialGuides }: SizeGuideListProps) {
  return (
    <section className="py-16">
      <div className="px-container">
        <div className="text-center mb-12 animate-fade-up">
          <h1 className="heading-section text-4xl font-cinzel mb-4">Size Guide</h1>
          <p className="text-elegant max-w-2xl mx-auto">
            Find your perfect fit with our detailed size charts and measurement guides.
          </p>
        </div>

        <div className="grid gap-12">
          {initialGuides.map((guide) => (
            <Card key={guide._id} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-8">
                  {/* Image Gallery */}
                  <div className="md:w-1/3">
                    {guide.images?.[0] ? (
                      <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
                        <Image
                          src={guide.images[0].src}
                          alt={guide.images[0].alt}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="aspect-[3/4] bg-muted rounded-lg flex items-center justify-center">
                        <ImageIcon className="h-16 w-16 text-muted-foreground/30" />
                      </div>
                    )}
                  </div>

                  {/* Size Chart */}
                  <div className="md:w-2/3 space-y-6">
                    <div>
                      <h2 className="text-2xl font-light mb-2">{guide.title}</h2>
                      <p className="text-muted-foreground">
                        Category: {guide.category.name}
                      </p>
                    </div>

                    {guide.measurementInstructions && (
                      <div className="prose prose-sm max-w-none">
                        {guide.measurementInstructions}
                      </div>
                    )}

                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Size</TableHead>
                            <TableHead>Chest ({guide.sizeChart.units})</TableHead>
                            <TableHead>Waist ({guide.sizeChart.units})</TableHead>
                            <TableHead>Hips ({guide.sizeChart.units})</TableHead>
                            <TableHead>Inseam ({guide.sizeChart.units})</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {guide.sizeChart.measurements.map((measurement, index) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium">
                                {measurement.sizeName}
                              </TableCell>
                              <TableCell>{measurement.chest}</TableCell>
                              <TableCell>{measurement.waist}</TableCell>
                              <TableCell>{measurement.hips}</TableCell>
                              <TableCell>{measurement.inseam}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
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
