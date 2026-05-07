import { cn } from "@/lib/utils";

export function ProductSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("animate-pulse", className)}>
      <div className="aspect-[3/4] bg-muted" />
      <div className="pt-4 space-y-2">
        <div className="h-2 w-1/3 bg-muted" />
        <div className="h-5 w-3/4 bg-muted" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 12 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
      {Array.from({ length: count }).map((_, i) => (
        <ProductSkeleton key={i} />
      ))}
    </div>
  );
}
