"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function CategorySkeleton() {
  return (
    <section className="py-16">
      <div className="px-container">
        {/* Category Header Skeleton */}
        <div className="text-center mb-12 animate-fade-up">
          <Skeleton className="h-12 w-64 mx-auto mb-4" />
          <Skeleton className="h-6 w-full max-w-2xl mx-auto" />
        </div>

        {/* Category Image Gallery Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {[1, 2].map((index) => (
            <Skeleton key={index} className="h-96 rounded-lg" />
          ))}
        </div>

        {/* Collections Skeleton */}
        <div className="space-y-12">
          <Skeleton className="h-10 w-48 mx-auto mb-8" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-0">
                  <Skeleton className="h-96 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}