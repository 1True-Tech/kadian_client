"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function LookbookSkeleton() {
  return (
    <div className="min-h-screen py-16">
      <div className="px-container">
        {/* Header Skeleton */}
        <div className="text-center mb-12">
          <Skeleton className="h-12 w-64 mx-auto mb-4" />
          <Skeleton className="h-6 w-full max-w-2xl mx-auto" />
        </div>

        {/* Main Image Skeleton */}
        <div className="mb-16">
          <Skeleton className="h-[60vh] w-full rounded-lg" />
        </div>

        {/* Content Sections Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
          <Skeleton className="h-80 rounded-lg" />
        </div>

        {/* Gallery Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {Array(6).fill(0).map((_, index) => (
            <Skeleton key={index} className="h-80 rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  );
}