export default function ProductCardSkeleton() {
  return (
    <div className="w-full flex flex-col gap-2 animate-pulse">
      <div className="w-full aspect-square min-h-52 bg-muted rounded-md" />
      <div className="space-y-1">
        <div className="h-4 bg-muted rounded w-3/4" />
        <div className="h-3 bg-muted rounded w-1/2" />
        <div className="h-4 bg-muted rounded w-1/3" />
      </div>
    </div>
  );
}