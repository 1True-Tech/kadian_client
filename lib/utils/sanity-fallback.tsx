"use client";

import { Skeleton } from "@/components/ui/skeleton";

/**
 * Safely renders Sanity content with fallbacks
 * @param value The value to check
 * @param fallback Optional fallback component/value to render if value is missing
 * @param render Function to render the value if it exists
 */
export function SafeRender<T>({
  value,
  fallback = null,
  render,
  skeleton = false,
}: {
  value: T | null | undefined;
  fallback?: React.ReactNode;
  render: (value: T) => React.ReactNode;
  skeleton?: boolean | React.ReactNode;
}) {
  if (value === null || value === undefined) {
    if (skeleton === true) {
      return <Skeleton className="h-4 w-24" />;
    } else if (skeleton) {
      return <>{skeleton}</>;
    }
    return <>{fallback}</>;
  }
  
  return <>{render(value)}</>;
}

/**
 * Safely renders an array of Sanity content with fallbacks
 * @param array The array to check
 * @param fallback Optional fallback component/value to render if array is empty
 * @param render Function to render each item in the array
 */
export function SafeArrayRender<T>({
  array,
  fallback = null,
  render,
  emptyMessage = "No items available",
}: {
  array: T[] | null | undefined;
  fallback?: React.ReactNode;
  render: (items: T[]) => React.ReactNode;
  emptyMessage?: string;
}) {
  if (!array || array.length === 0) {
    if (fallback) {
      return <>{fallback}</>;
    }
    return <div className="text-muted-foreground text-sm">{emptyMessage}</div>;
  }
  
  return <>{render(array)}</>;
}