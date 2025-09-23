"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

const FeaturedProductsFallback = () => {
  return (
    <section className="py-16 bg-secondary/30">
      <div className="px-container">
        <div className="text-center mb-12">
          <Skeleton className="h-10 w-64 mx-auto mb-4" />
          <Skeleton className="h-4 w-full max-w-2xl mx-auto" />
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,_minmax(10rem,1fr))] md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
          {[...Array(4)].map((_, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="relative">
                  <Skeleton className="w-full aspect-[3/4]" />
                  <div className="absolute top-2 right-2">
                    <Skeleton className="h-8 w-8 rounded-full" />
                  </div>
                </div>
                <div className="p-4 space-y-2">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <div className="flex justify-between items-center mt-2">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-8 w-8 rounded-full" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProductsFallback;