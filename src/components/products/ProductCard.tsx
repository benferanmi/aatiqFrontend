import { Link } from "react-router-dom";
import { archiveNumber, formatPrice } from "@/lib/helpers";
import type { Product } from "@/lib/types";
import { cn } from "@/lib/utils";

interface Props {
  product: Product;
  size?: "default" | "large" | "small";
  index?: number;
}

export default function ProductCard({
  product,
  size = "default",
  index = 0,
}: Props) {
  const ratio =
    size === "large"
      ? "aspect-[4/5]"
      : size === "small"
        ? "aspect-square"
        : "aspect-[4/5]";

  return (
    <Link
      to={`/products/${product.slug}`}
      className="group block"
      style={{ animationDelay: `${(index % 6) * 70}ms` }}
    >
      {/* Image container — CONSISTENT BACKGROUND */}
      <div
        className={cn(
          "relative overflow-hidden",
          ratio,
          // CRITICAL: Use consistent secondary background (#EFE7DD)
          "bg-[#EFE7DD]",
        )}
      >
        {/* Image with proper containment + padding */}
        <div className="absolute inset-0 flex items-center justify-center p-6">
          <img
            src={product.images[0]?.url}
            alt={product.title}
            loading="lazy"
            className="h-full w-full object-contain"
          />
        </div>

        {/* Featured badge */}
        {product.isFeatured && (
          <span className="absolute top-3 left-3 font-mono text-[9px] uppercase tracking-widest bg-background/85 backdrop-blur px-2 py-1 text-gold z-10">
            Featured
          </span>
        )}

        {/* Archive number */}
        <span className="absolute bottom-3 right-3 font-mono text-[9px] uppercase tracking-widest bg-background/85 backdrop-blur px-2 py-1 z-10">
          {archiveNumber(product.itemNumber)}
        </span>

        {/* Hover overlay — subtle elevation effect */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Card metadata */}
      <div className="pt-4 flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          {/* Category + era */}
          <p className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-muted-foreground">
            {product.categoryId ? product.categoryName : "Uncategorized"}
            {product.ageRangeId && ` · ${product.ageRangeLabel || ""}`}
          </p>

          {/* Title */}
          <h3
            className={cn(
              "mt-1 font-display leading-tight group-hover:text-gold transition-colors duration-300 line-clamp-2",
              size === "large" ? "text-2xl md:text-3xl" : "text-lg md:text-xl",
            )}
          >
            {product.title}
          </h3>
        </div>

        {/* Price — right aligned */}
        {product.price && (
          <p className="font-mono text-xs whitespace-nowrap pt-1 text-gold font-semibold">
            {formatPrice(product.price)}
          </p>
        )}
      </div>
    </Link>
  );
}
